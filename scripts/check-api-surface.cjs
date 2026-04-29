/**
 * check-api-surface.cjs
 *
 * Validates that the current `dist/types/components.d.ts` introduces no
 * breaking changes relative to the committed baseline in `docs/api-surface.json`.
 *
 * Breaking changes detected:
 *   - Component removed
 *   - Prop removed from a component
 *   - Event removed from a component
 *   - Public method removed from a component
 *
 * NOT detected (intentionally out of scope here):
 *   - Type changes (covered by TypeScript strict-mode compilation)
 *   - New additions (always non-breaking)
 *
 * Usage:
 *   node scripts/check-api-surface.cjs          # exit 0 on pass, 1 on breaking
 *   node scripts/check-api-surface.cjs --json   # machine-readable output to stdout
 *
 * In CI: failures require the PR to carry the `breaking-change` label and a
 * CHANGELOG.md entry.  See CONTRIBUTING.md for the breaking change process.
 *
 * Exits 0 on pass, 1 on breaking changes detected, 2 on configuration error.
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT      = path.resolve(__dirname, '..');
const BASELINE  = path.join(ROOT, 'docs', 'api-surface.json');
const SNAPPER   = path.join(ROOT, 'scripts', 'snapshot-api-surface.cjs');

// ---------------------------------------------------------------------------
// Parse the live types file the same way the snapper does — but return the
// in-memory structure rather than writing a file.
// ---------------------------------------------------------------------------

function extractBlock(src, startIdx) {
  let depth = 0;
  let start = -1;
  for (let i = startIdx; i < src.length; i++) {
    if (src[i] === '{') {
      depth++;
      if (start === -1) start = i;
    } else if (src[i] === '}') {
      depth--;
      if (depth === 0) return src.slice(start + 1, i);
    }
  }
  return null;
}

function parseInterfaceMembers(block) {
  const props   = {};
  const methods = {};
  const stripped = block.replace(/\/\*[\s\S]*?\*\//g, '');
  const memberRe = /^\s*"?([A-Za-z_$][A-Za-z0-9_$]*)"?\s*:\s*([\s\S]*?);?\s*$/gm;
  let m;
  while ((m = memberRe.exec(stripped)) !== null) {
    const name = m[1];
    const type = m[2].trim().replace(/\s+/g, ' ');
    if (!type) continue;
    if (type.includes('=>')) {
      methods[name] = type;
    } else {
      props[name] = type;
    }
  }
  return { props, methods };
}

function toKebab(className) {
  return className
    .replace(/^Io/, 'io-')
    .replace(/([A-Z])/g, (c) => '-' + c.toLowerCase())
    .replace(/^io--/, 'io-');
}

function parseComponentsNamespace(src) {
  const nsMatch = src.match(/export\s+namespace\s+Components\s*\{/);
  if (!nsMatch) throw new Error('Could not find `export namespace Components` in types file.');
  const nsBody = extractBlock(src, nsMatch.index);
  if (!nsBody) throw new Error('Could not extract Components namespace block.');

  const result = {};
  const ifaceRe = /interface\s+(Io[A-Za-z]+)\s*\{/g;
  let im;
  while ((im = ifaceRe.exec(nsBody)) !== null) {
    const tagName = toKebab(im[1]);
    const body    = extractBlock(nsBody, im.index);
    if (!body) continue;
    const { props, methods } = parseInterfaceMembers(body);
    result[tagName] = { props, methods };
  }
  return result;
}

function parseEventMaps(src) {
  const result = {};
  const emRe = /interface\s+HTML(Io[A-Za-z]+)ElementEventMap\s*\{/g;
  let em;
  while ((em = emRe.exec(src)) !== null) {
    const tagName = toKebab(em[1]);
    const body    = extractBlock(src, em.index);
    if (!body) continue;
    const events = {};
    const evRe = /"([^"]+)"\s*:\s*([^;]+);/g;
    let ev;
    while ((ev = evRe.exec(body)) !== null) {
      events[ev[1]] = ev[2].trim();
    }
    result[tagName] = events;
  }
  return result;
}

function parseLiveTypes(typesFile) {
  const src = fs.readFileSync(typesFile, 'utf8');
  const components = parseComponentsNamespace(src);
  const eventMaps  = parseEventMaps(src);

  for (const [tag, events] of Object.entries(eventMaps)) {
    if (components[tag]) {
      components[tag].events = events;
    } else {
      components[tag] = { props: {}, methods: {}, events };
    }
  }
  for (const tag of Object.keys(components)) {
    if (!components[tag].events) components[tag].events = {};
  }
  return components;
}

// ---------------------------------------------------------------------------
// Diff engine
// ---------------------------------------------------------------------------

/**
 * Compare baseline vs current and collect breaking changes.
 * A breaking change is any REMOVAL from the public API:
 *   - removed component
 *   - removed prop
 *   - removed event
 *   - removed method
 */
function diff(baseline, current) {
  const breaks = [];

  for (const [tag, baseDef] of Object.entries(baseline.components)) {
    if (!current[tag]) {
      breaks.push({
        severity: 'BREAKING',
        component: tag,
        kind: 'component-removed',
        message: `Component <${tag}> was removed from the public API.`,
      });
      continue;
    }

    const curDef = current[tag];

    // Props
    for (const prop of Object.keys(baseDef.props || {})) {
      if (!(prop in (curDef.props || {}))) {
        breaks.push({
          severity: 'BREAKING',
          component: tag,
          kind: 'prop-removed',
          name: prop,
          message: `<${tag}> prop "${prop}" was removed.`,
        });
      }
    }

    // Events
    for (const event of Object.keys(baseDef.events || {})) {
      if (!(event in (curDef.events || {}))) {
        breaks.push({
          severity: 'BREAKING',
          component: tag,
          kind: 'event-removed',
          name: event,
          message: `<${tag}> event "${event}" was removed.`,
        });
      }
    }

    // Methods
    for (const method of Object.keys(baseDef.methods || {})) {
      if (!(method in (curDef.methods || {}))) {
        breaks.push({
          severity: 'BREAKING',
          component: tag,
          kind: 'method-removed',
          name: method,
          message: `<${tag}> method "${method}()" was removed.`,
        });
      }
    }
  }

  return breaks;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const jsonMode = process.argv.includes('--json');

  // 1. Load baseline
  if (!fs.existsSync(BASELINE)) {
    const msg = '[api-surface] docs/api-surface.json not found. Run `npm run api:snapshot` first.';
    if (jsonMode) process.stdout.write(JSON.stringify({ error: msg, breaks: [] }) + '\n');
    else console.error(msg);
    process.exit(2);
  }

  let baseline;
  try {
    baseline = JSON.parse(fs.readFileSync(BASELINE, 'utf8'));
  } catch (e) {
    const msg = `[api-surface] Could not parse docs/api-surface.json: ${e.message}`;
    if (jsonMode) process.stdout.write(JSON.stringify({ error: msg, breaks: [] }) + '\n');
    else console.error(msg);
    process.exit(2);
  }

  // 2. Parse live types
  const TYPES_FILE = path.join(ROOT, 'io-components', 'dist', 'types', 'components.d.ts');
  if (!fs.existsSync(TYPES_FILE)) {
    const msg = '[api-surface] dist/types/components.d.ts not found. Run `npm run build:components` first.';
    if (jsonMode) process.stdout.write(JSON.stringify({ error: msg, breaks: [] }) + '\n');
    else console.error(msg);
    process.exit(2);
  }

  let current;
  try {
    current = parseLiveTypes(TYPES_FILE);
  } catch (e) {
    const msg = `[api-surface] Parse error on dist/types/components.d.ts: ${e.message}`;
    if (jsonMode) process.stdout.write(JSON.stringify({ error: msg, breaks: [] }) + '\n');
    else console.error(msg);
    process.exit(2);
  }

  // 3. Diff
  const breaks = diff(baseline, current);

  if (jsonMode) {
    process.stdout.write(JSON.stringify({ breaks }, null, 2) + '\n');
    process.exit(breaks.length > 0 ? 1 : 0);
  }

  if (breaks.length === 0) {
    console.log('[api-surface] ✓ No breaking API changes detected.');
    process.exit(0);
  }

  console.error('\n[api-surface] ✗ BREAKING API CHANGES DETECTED\n');
  console.error('The following public API members were removed or renamed:');
  console.error('');

  for (const b of breaks) {
    console.error(`  [${b.kind}] ${b.message}`);
  }

  console.error('');
  console.error('If this is intentional:');
  console.error('  1. Add the `breaking-change` label to your PR.');
  console.error('  2. Add a CHANGELOG.md entry under [Unreleased] > Breaking Changes.');
  console.error('  3. Update the baseline: npm run api:snapshot');
  console.error('');
  process.exit(1);
}

main();
