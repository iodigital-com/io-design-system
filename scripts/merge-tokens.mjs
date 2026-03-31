/**
 * merge-tokens.mjs
 *
 * Reads docs/tokens.live.json (output of scrape-tokens.mjs) and merges the
 * discovered CSS custom properties into docs/tokens.json under a new top-level
 * "pageTokens" key, grouped by CSS variable prefix.
 *
 * Rules:
 *   - Variables that already appear in the existing design-system namespace
 *     (--io-*) are ignored — they are covered by the existing tokens.
 *   - Variables are grouped by their first CSS-name segment after "--",
 *     e.g. --hero-color-primary → group "hero".
 *   - Duplicates across pages are merged; if value differs per page the most
 *     commonly observed value wins.
 *   - If a variable's resolved value matches a primitive already in tokens.json
 *     an "$aliasOf" annotation is added.
 *   - The "pageTokens" key is completely replaced on every run so this script
 *     is safely idempotent.
 *
 * Usage:
 *   node scripts/merge-tokens.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const root  = join(__dir, '..');

const LIVE_FILE   = join(root, 'docs', 'tokens.live.json');
const TOKENS_FILE = join(root, 'docs', 'tokens.json');
const TOKEN_FILE  = join(root, 'docs', 'token.json');

// ── Load inputs ───────────────────────────────────────────────────────────────

const live   = JSON.parse(readFileSync(LIVE_FILE, 'utf8'));
const tokens = JSON.parse(readFileSync(TOKENS_FILE, 'utf8'));

// ── Build reverse-lookup: value → existing token path ────────────────────────

/** @type {Map<string, string>} */
const valueLookup = new Map();

function indexNode(node, path) {
  if (typeof node !== 'object' || node === null) return;
  if ('$value' in node) {
    const v = String(node.$value).toLowerCase().trim();
    if (v && !valueLookup.has(v)) {
      valueLookup.set(v, path);
    }
  } else {
    for (const [key, child] of Object.entries(node)) {
      if (!key.startsWith('$')) indexNode(child, path ? `${path}.${key}` : key);
    }
  }
}

indexNode(tokens, '');
console.log(`Built value-lookup from ${valueLookup.size} existing token primitives.`);

// ── Collect + deduplicate across pages ───────────────────────────────────────

/**
 * Tally of observed { value → count } per CSS variable name.
 * @type {Map<string, Map<string, number>>}
 */
const tally = new Map();

for (const [url, page] of Object.entries(live)) {
  if (!page.tokens || typeof page.tokens !== 'object') continue;

  for (const [prop, value] of Object.entries(page.tokens)) {
    // Skip design-system tokens — already covered by tokens.json
    if (prop.startsWith('--io-')) continue;
    // Skip Tailwind CSS internal state variables — not design tokens
    if (prop.startsWith('--tw-')) continue;
    // Skip single-character or obviously non-token vars
    if (prop.length < 4 || !value) continue;

    if (!tally.has(prop)) tally.set(prop, new Map());
    const counts = tally.get(prop);
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
}

console.log(`Collected ${tally.size} unique non-io CSS custom properties.`);

// ── Resolve winning value for each property ───────────────────────────────────

/** @type {Map<string, string>} */
const resolved = new Map();

for (const [prop, counts] of tally) {
  let best = '';
  let bestCount = 0;
  for (const [value, count] of counts) {
    if (count > bestCount) { best = value; bestCount = count; }
  }
  resolved.set(prop, best);
}

// ── Group by prefix ───────────────────────────────────────────────────────────

/**
 * CSS var name → prefix group (first segment after "--").
 * "--hero-color-primary" → "hero"
 */
function prefixOf(prop) {
  const bare = prop.slice(2); // strip leading "--"
  const dash = bare.indexOf('-');
  return dash === -1 ? bare : bare.slice(0, dash);
}

/** @type {Map<string, Array<{prop: string, value: string}>>} */
const groups = new Map();

for (const [prop, value] of resolved) {
  const prefix = prefixOf(prop);
  if (!groups.has(prefix)) groups.set(prefix, []);
  groups.get(prefix).push({ prop, value });
}

// Sort groups and tokens within groups alphabetically
const sortedGroups = [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));

// ── Build pageTokens structure ────────────────────────────────────────────────

/** Camel-cased key from a CSS custom property */
function propToKey(prop) {
  return prop
    .slice(2)                          // strip "--"
    .split('-')
    .map((seg, i) => i === 0 ? seg : seg.charAt(0).toUpperCase() + seg.slice(1))
    .join('');
}

const pageTokens = {};

for (const [prefix, entries] of sortedGroups) {
  const group = {};

  for (const { prop, value } of entries.sort((a, b) => a.prop.localeCompare(b.prop))) {
    const key = propToKey(prop);

    const token = { $value: value, $cssVar: prop };

    // Alias annotation
    const normalised = value.toLowerCase().trim();
    if (valueLookup.has(normalised)) {
      token.$aliasOf = valueLookup.get(normalised);
    }

    group[key] = token;
  }

  pageTokens[prefix] = {
    $description: `CSS custom properties with prefix "--${prefix}-*" found on iodigital.com`,
    ...group,
  };
}

// ── Build pageStyles + pageComponents structures ─────────────────────────────

const styleClassCounts = new Map();
const componentBlockCounts = new Map();
const customElementSet = new Set();

for (const page of Object.values(live)) {
  const classes = page?.styles?.classes ?? [];
  for (const item of classes) {
    if (!item?.name) continue;
    styleClassCounts.set(item.name, (styleClassCounts.get(item.name) ?? 0) + (item.count ?? 1));
  }

  const blocks = page?.components?.blocks ?? [];
  for (const item of blocks) {
    if (!item?.name) continue;
    componentBlockCounts.set(item.name, (componentBlockCounts.get(item.name) ?? 0) + (item.count ?? 1));
  }

  const customElements = page?.components?.customElements ?? [];
  for (const tag of customElements) {
    customElementSet.add(tag);
  }
}

const sortedClasses = [...styleClassCounts.entries()]
  .filter(([name, count]) => count >= 2 && name.length >= 3)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 120);

const sortedBlocks = [...componentBlockCounts.entries()]
  .filter(([name, count]) => count >= 2 && name.length >= 3)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 80);

const pageStyles = {
  $description: 'Most-used CSS class selectors detected across scraped iodigital.com pages',
};
for (const [name, count] of sortedClasses) {
  pageStyles[name.replace(/[^a-zA-Z0-9]+/g, '_')] = {
    $value: `.${name}`,
    $usageCount: count,
  };
}

const pageComponents = {
  $description: 'Component-like class blocks and custom elements discovered across scraped pages',
  blocks: {
    $description: 'Top class block names (BEM-like base names)',
  },
  customElements: {
    $description: 'Custom element tags detected in the DOM',
  },
};

for (const [name, count] of sortedBlocks) {
  pageComponents.blocks[name.replace(/[^a-zA-Z0-9]+/g, '_')] = {
    $value: name,
    $usageCount: count,
  };
}

for (const tag of [...customElementSet].sort()) {
  pageComponents.customElements[tag.replace(/[^a-zA-Z0-9]+/g, '_')] = {
    $value: tag,
  };
}

// ── Write back ────────────────────────────────────────────────────────────────

// Remove any stale pageTokens key, then add fresh one
delete tokens.pageTokens;
tokens.pageTokens = pageTokens;
delete tokens.pageStyles;
tokens.pageStyles = pageStyles;
delete tokens.pageComponents;
tokens.pageComponents = pageComponents;

writeFileSync(TOKENS_FILE, JSON.stringify(tokens, null, 2) + '\n');
writeFileSync(TOKEN_FILE, JSON.stringify(tokens, null, 2) + '\n');

const totalTokens = [...sortedGroups].reduce((n, [, e]) => n + e.length, 0);
const totalGroups = sortedGroups.length;
console.log(`\nMerge complete:`);
console.log(`  Groups   : ${totalGroups}`);
console.log(`  Tokens   : ${totalTokens}`);
console.log(`  Written  : ${TOKENS_FILE}`);
console.log(`  Mirror   : ${TOKEN_FILE}`);
