/**
 * generate-html.mjs
 *
 * Reads the "pageTokens" key from docs/tokens.json and injects matching
 * HTML sections + sidebar nav entries into docs/index.html.
 *
 * HTML injection markers (must exist in index.html):
 *   <!-- INJECT:PAGE_NAV:START -->  … <!-- INJECT:PAGE_NAV:END -->
 *   <!-- INJECT:PAGE_TOKENS:START --> … <!-- INJECT:PAGE_TOKENS:END -->
 *
 * The script is fully idempotent — run it repeatedly without side effects.
 *
 * Usage:
 *   node scripts/generate-html.mjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const root  = join(__dir, '..');

const TOKENS_FILE = join(root, 'docs', 'tokens.json');
const HTML_FILE   = join(root, 'docs', 'index.html');

// ── Marker pairs ──────────────────────────────────────────────────────────────

const NAV_START   = '<!-- INJECT:PAGE_NAV:START -->';
const NAV_END     = '<!-- INJECT:PAGE_NAV:END -->';
const TOK_START   = '<!-- INJECT:PAGE_TOKENS:START -->';
const TOK_END     = '<!-- INJECT:PAGE_TOKENS:END -->';

// ── Load tokens ───────────────────────────────────────────────────────────────

const tokens = JSON.parse(readFileSync(TOKENS_FILE, 'utf8'));
const pageTokens = tokens.pageTokens ?? {};
const pageStyles = tokens.pageStyles ?? {};
const pageComponents = tokens.pageComponents ?? {};
const groupNames = Object.keys(pageTokens).sort();

if (!groupNames.length && !Object.keys(pageStyles).length && !Object.keys(pageComponents).length) {
  console.log('No scraped page data found in tokens.json — nothing to generate.');
  process.exit(0);
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Determine if a hex colour is light (so we know what contrast text to use) */
function isLight(hex) {
  const clean = hex.replace('#', '');
  if (clean.length < 6) return true;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 155;
}

const HEX_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

/**
 * Build an inline preview snippet for a token value.
 * Returns an HTML string for the `.token-row-preview` slot.
 */
function preview(value) {
  if (HEX_RE.test(value.trim())) {
    const bg = value.trim();
    const border = bg.toLowerCase() === '#ffffff' ? 'border:1px solid #e5e5e5;' : '';
    return `<span style="display:inline-block;width:28px;height:28px;border-radius:6px;background:${escapeHtml(bg)};${border}flex-shrink:0;"></span>`;
  }
  if (/^\d+(\.\d+)?(px|rem|em|%|vh|vw)$/.test(value.trim())) {
    return `<span style="font-size:0.6875rem;font-family:'Inter',monospace;color:#a13865;background:#f7f0f4;padding:2px 6px;border-radius:4px;white-space:nowrap;">${escapeHtml(value)}</span>`;
  }
  if (/^\d+(\.\d+)?$/.test(value.trim())) {
    return `<span style="font-size:0.6875rem;font-family:'Inter',monospace;color:#747474;background:#f4f4f4;padding:2px 6px;border-radius:4px;">${escapeHtml(value)}</span>`;
  }
  return `<span style="font-size:0.6875rem;font-family:'Inter',monospace;color:#747474;opacity:0.7;">—</span>`;
}

/** Title-case a group name "heroColor" → "Hero Color" */
function titleCase(name) {
  return name
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, c => c.toUpperCase())
    .trim();
}

/** Abbreviate a group name for the nav icon, e.g. "hero" → "Hro" */
function abbrev(name) {
  const clean = titleCase(name).replace(/\s+/g, '');
  return (clean.slice(0, 1).toUpperCase() + clean.slice(1, 3)).padEnd(3, clean[1] ?? 'x');
}

// ── Build nav HTML ────────────────────────────────────────────────────────────

const navLines = [
  `    <div class="nav-group-label">Live Site</div>`,
];

for (const group of groupNames) {
  const id = `pt-${group}`;
  const label = titleCase(group);
  const icon  = abbrev(group);
  navLines.push(
    `    <a href="#${id}" class="nav-link"><span class="nav-icon">${escapeHtml(icon)}</span> ${escapeHtml(label)}</a>`
  );
}

if (Object.keys(pageStyles).some(k => !k.startsWith('$'))) {
  navLines.push(`    <a href="#pt-styles" class="nav-link"><span class="nav-icon">Sty</span> Styles</a>`);
}
if (
  Object.keys(pageComponents.blocks ?? {}).some(k => !k.startsWith('$')) ||
  Object.keys(pageComponents.customElements ?? {}).some(k => !k.startsWith('$'))
) {
  navLines.push(`    <a href="#pt-components" class="nav-link"><span class="nav-icon">Cmp</span> Components</a>`);
}

const sectionLines = [];

const styleEntries = Object.entries(pageStyles).filter(([k]) => !k.startsWith('$'));
if (styleEntries.length) {
  sectionLines.push(`    <!-- ═══════════════════════ PAGE STYLES ═══════════════════════ -->`);
  sectionLines.push(`    <section class="section" id="pt-styles">`);
  sectionLines.push(`      <div class="section-header">`);
  sectionLines.push(`        <h2>◈ Styles</h2>`);
  sectionLines.push(`        <p class="section-desc">${escapeHtml(pageStyles.$description ?? 'Scraped CSS class selector usage')}</p>`);
  sectionLines.push(`      </div>`);
  sectionLines.push(`      <div class="subsection">`);
  sectionLines.push(`        <div class="subsection-title">Top class selectors</div>`);
  sectionLines.push(`        <div class="token-grid list">`);
  for (const [, token] of styleEntries) {
    const selector = String(token.$value ?? '');
    const count = Number(token.$usageCount ?? 0);
    sectionLines.push(`          <div class="token-row" data-search="${escapeHtml((selector + ' styles').toLowerCase())}">`);
    sectionLines.push(`            <div class="token-row-preview"><span style="font-size:0.6875rem;font-family:'Inter',monospace;color:#747474;">cls</span></div>`);
    sectionLines.push(`            <div class="token-row-meta">`);
    sectionLines.push(`              <div class="token-name">${escapeHtml(selector)}</div>`);
    sectionLines.push(`              <span class="token-row-value">class selector</span>`);
    sectionLines.push(`              <div class="token-row-path">usage count: ${count}</div>`);
    sectionLines.push(`            </div>`);
    sectionLines.push(`          </div>`);
  }
  sectionLines.push(`        </div>`);
  sectionLines.push(`      </div>`);
  sectionLines.push(`    </section>`);
  sectionLines.push('');
}

const componentBlocks = Object.entries(pageComponents.blocks ?? {}).filter(([k]) => !k.startsWith('$'));
const customElements = Object.entries(pageComponents.customElements ?? {}).filter(([k]) => !k.startsWith('$'));
if (componentBlocks.length || customElements.length) {
  sectionLines.push(`    <!-- ═══════════════════════ PAGE COMPONENTS ═══════════════════════ -->`);
  sectionLines.push(`    <section class="section" id="pt-components">`);
  sectionLines.push(`      <div class="section-header">`);
  sectionLines.push(`        <h2>◈ Components</h2>`);
  sectionLines.push(`        <p class="section-desc">${escapeHtml(pageComponents.$description ?? 'Scraped component structure signals')}</p>`);
  sectionLines.push(`      </div>`);

  if (componentBlocks.length) {
    sectionLines.push(`      <div class="subsection">`);
    sectionLines.push(`        <div class="subsection-title">Class blocks</div>`);
    sectionLines.push(`        <div class="token-grid list">`);
    for (const [, token] of componentBlocks) {
      const block = String(token.$value ?? '');
      const count = Number(token.$usageCount ?? 0);
      sectionLines.push(`          <div class="token-row" data-search="${escapeHtml((block + ' block').toLowerCase())}">`);
      sectionLines.push(`            <div class="token-row-preview"><span style="font-size:0.6875rem;font-family:'Inter',monospace;color:#747474;">cmp</span></div>`);
      sectionLines.push(`            <div class="token-row-meta">`);
      sectionLines.push(`              <div class="token-name">${escapeHtml(block)}</div>`);
      sectionLines.push(`              <span class="token-row-value">class block</span>`);
      sectionLines.push(`              <div class="token-row-path">usage count: ${count}</div>`);
      sectionLines.push(`            </div>`);
      sectionLines.push(`          </div>`);
    }
    sectionLines.push(`        </div>`);
    sectionLines.push(`      </div>`);
  }

  if (customElements.length) {
    sectionLines.push(`      <div class="subsection">`);
    sectionLines.push(`        <div class="subsection-title">Custom elements</div>`);
    sectionLines.push(`        <div class="token-grid list">`);
    for (const [, token] of customElements) {
      const tag = String(token.$value ?? '');
      sectionLines.push(`          <div class="token-row" data-search="${escapeHtml((tag + ' custom element').toLowerCase())}">`);
      sectionLines.push(`            <div class="token-row-preview"><span style="font-size:0.6875rem;font-family:'Inter',monospace;color:#747474;">tag</span></div>`);
      sectionLines.push(`            <div class="token-row-meta">`);
      sectionLines.push(`              <div class="token-name">${escapeHtml(tag)}</div>`);
      sectionLines.push(`              <span class="token-row-value">custom element</span>`);
      sectionLines.push(`              <div class="token-row-path">DOM tag</div>`);
      sectionLines.push(`            </div>`);
      sectionLines.push(`          </div>`);
    }
    sectionLines.push(`        </div>`);
    sectionLines.push(`      </div>`);
  }

  sectionLines.push(`    </section>`);
  sectionLines.push('');
}

const navHtml = navLines.join('\n');

// ── Build token sections HTML ─────────────────────────────────────────────────

for (const group of groupNames) {
  const data   = pageTokens[group];
  const id     = `pt-${group}`;
  const label  = titleCase(group);
  const desc   = escapeHtml(data.$description ?? `--${group}-* CSS custom properties from iodigital.com`);

  sectionLines.push(`    <!-- ═══════════════════════ PAGE TOKEN: ${group.toUpperCase()} ═══════════════════════ -->`);
  sectionLines.push(`    <section class="section" id="${id}">`);
  sectionLines.push(`      <div class="section-header">`);
  sectionLines.push(`        <h2>◈ ${escapeHtml(label)}</h2>`);
  sectionLines.push(`        <p class="section-desc">${desc}</p>`);
  sectionLines.push(`      </div>`);
  sectionLines.push(`      <div class="subsection">`);
  sectionLines.push(`        <div class="subsection-title">All tokens (--${escapeHtml(group)}-*)</div>`);
  sectionLines.push(`        <div class="token-grid list">`);

  const entries = Object.entries(data).filter(([k]) => !k.startsWith('$'));

  for (const [key, token] of entries) {
    if (typeof token !== 'object' || !token) continue;

    const cssVar   = token.$cssVar ?? `--${group}-${key}`;
    const value    = String(token.$value ?? '');
    const aliasOf  = token.$aliasOf ? ` · alias of <em>${escapeHtml(token.$aliasOf)}</em>` : '';
    const descLine = token.$description ? `<div class="token-desc">${escapeHtml(token.$description)}</div>` : '';

    sectionLines.push(`          <div class="token-row" data-search="${escapeHtml((cssVar + ' ' + value + ' ' + key).toLowerCase())}">`);
    sectionLines.push(`            <div class="token-row-preview">${preview(value)}</div>`);
    sectionLines.push(`            <div class="token-row-meta">`);
    sectionLines.push(`              <div class="token-name">${escapeHtml(cssVar)}</div>`);
    sectionLines.push(`              <span class="token-row-value">${escapeHtml(value)}</span>`);
    sectionLines.push(`              <div class="token-row-path">${escapeHtml(key)}${aliasOf}</div>`);
    sectionLines.push(descLine ? `              ${descLine}` : '');
    sectionLines.push(`            </div>`);
    sectionLines.push(`          </div>`);
  }

  sectionLines.push(`        </div>`);
  sectionLines.push(`      </div>`);
  sectionLines.push(`    </section>`);
  sectionLines.push('');
}

const sectionsHtml = sectionLines.join('\n');

// ── Inject into HTML ──────────────────────────────────────────────────────────

let html = readFileSync(HTML_FILE, 'utf8');

function inject(source, startMarker, endMarker, content) {
  const si = source.indexOf(startMarker);
  const ei = source.indexOf(endMarker);
  if (si === -1 || ei === -1) {
    throw new Error(`Injection markers not found:\n  start: ${startMarker}\n  end:   ${endMarker}`);
  }
  return source.slice(0, si + startMarker.length) + '\n' + content + '\n    ' + source.slice(ei);
}

html = inject(html, NAV_START, NAV_END, navHtml);
html = inject(html, TOK_START, TOK_END, sectionsHtml);

writeFileSync(HTML_FILE, html);

const totalTokens = groupNames.reduce((n, g) => {
  const data = pageTokens[g];
  return n + Object.keys(data).filter(k => !k.startsWith('$')).length;
}, 0);

console.log(`\nHTML generation complete:`);
console.log(`  Groups   : ${groupNames.length}`);
console.log(`  Tokens   : ${totalTokens}`);
console.log(`  Written  : ${HTML_FILE}`);
