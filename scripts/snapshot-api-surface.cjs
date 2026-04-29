/**
 * snapshot-api-surface.cjs
 *
 * Parses io-components/dist/types/components.d.ts and writes a structured
 * public-API snapshot to docs/api-surface.json.
 *
 * Run after `npm run build:components` to update the committed baseline:
 *   node scripts/snapshot-api-surface.cjs
 *
 * The snapshot captures, per component:
 *   - props   : prop name → type string
 *   - events  : event name → detail type string
 *   - methods : method name → signature string
 *
 * Exits 0 on success, 1 on parse error.
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT        = path.resolve(__dirname, '..');
const TYPES_FILE  = path.join(ROOT, 'io-components', 'dist', 'types', 'components.d.ts');
const OUTPUT_FILE = path.join(ROOT, 'docs', 'api-surface.json');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Extract the text of a brace-delimited block starting at `startIdx` inside
 * `src`. Returns the inner text (excluding the outer braces) or null.
 */
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

/**
 * Given the inner text of a `Components.IoX` interface, return a map of
 * { propName -> typeString } and { methodName -> signatureString }.
 * Methods are lines whose type contains `=>` (function signatures).
 */
function parseInterfaceMembers(block) {
  const props   = {};
  const methods = {};

  // Strip JSDoc comments to avoid false matches
  const stripped = block.replace(/\/\*[\s\S]*?\*\//g, '');

  // Match: "memberName": TYPE;  (quoted or unquoted)
  const memberRe = /^\s*"?([A-Za-z_$][A-Za-z0-9_$]*)"?\s*:\s*([\s\S]*?);?\s*$/gm;
  let m;
  while ((m = memberRe.exec(stripped)) !== null) {
    const name = m[1];
    const type = m[2].trim().replace(/\s+/g, ' ');
    if (!type) continue;
    // Heuristic: if the type contains `=>` it is a method signature
    if (type.includes('=>')) {
      methods[name] = type;
    } else {
      props[name] = type;
    }
  }

  return { props, methods };
}

/**
 * Parse the `export namespace Components { ... }` block and return a map of
 * { componentName -> { props, methods } }.
 * componentName is the lowercased web-component tag (e.g. "io-button").
 */
function parseComponentsNamespace(src) {
  const nsMatch = src.match(/export\s+namespace\s+Components\s*\{/);
  if (!nsMatch) throw new Error('Could not find `export namespace Components` in types file.');

  const nsBody  = extractBlock(src, nsMatch.index);
  if (!nsBody) throw new Error('Could not extract Components namespace block.');

  const result = {};

  // Find each `interface IoXxx {` inside the namespace
  const ifaceRe = /interface\s+(Io[A-Za-z]+)\s*\{/g;
  let im;
  while ((im = ifaceRe.exec(nsBody)) !== null) {
    const className   = im[1];                          // e.g. IoButton
    const tagName     = toKebab(className);              // e.g. io-button
    const ifaceBody   = extractBlock(nsBody, im.index);
    if (!ifaceBody) continue;
    const { props, methods } = parseInterfaceMembers(ifaceBody);
    result[tagName] = { props, methods };
  }

  return result;
}

/**
 * Parse all `HTMLIo*ElementEventMap { "eventName": DetailType; ... }` blocks
 * and return a map of { tagName -> { eventName -> detailType } }.
 */
function parseEventMaps(src) {
  const result = {};
  const emRe = /interface\s+HTML(Io[A-Za-z]+)ElementEventMap\s*\{/g;
  let em;
  while ((em = emRe.exec(src)) !== null) {
    const className = em[1];                            // e.g. IoButton
    const tagName   = toKebab(className);               // e.g. io-button
    const body      = extractBlock(src, em.index);
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

/** IoButton → io-button */
function toKebab(className) {
  return className
    .replace(/^Io/, 'io-')
    .replace(/([A-Z])/g, (c) => '-' + c.toLowerCase())
    .replace(/^io--/, 'io-');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  if (!fs.existsSync(TYPES_FILE)) {
    console.error('[api-surface] dist/types/components.d.ts not found.');
    console.error('[api-surface] Run `npm run build:components` first.');
    process.exit(1);
  }

  const src = fs.readFileSync(TYPES_FILE, 'utf8');

  let components;
  try {
    components = parseComponentsNamespace(src);
  } catch (e) {
    console.error('[api-surface] Parse error (Components namespace):', e.message);
    process.exit(1);
  }

  let eventMaps;
  try {
    eventMaps = parseEventMaps(src);
  } catch (e) {
    console.error('[api-surface] Parse error (EventMaps):', e.message);
    process.exit(1);
  }

  // Merge events into components
  for (const [tag, events] of Object.entries(eventMaps)) {
    if (components[tag]) {
      components[tag].events = events;
    } else {
      // Component exists only as event source (edge case)
      components[tag] = { props: {}, methods: {}, events };
    }
  }

  // Ensure every component has an events key
  for (const tag of Object.keys(components)) {
    if (!components[tag].events) components[tag].events = {};
  }

  const snapshot = {
    $schema: './api-surface.schema.json',
    generated: new Date().toISOString(),
    components,
  };

  // Sort keys deterministically
  snapshot.components = Object.fromEntries(
    Object.entries(snapshot.components)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([tag, def]) => [
        tag,
        {
          props:   sortObj(def.props),
          methods: sortObj(def.methods),
          events:  sortObj(def.events),
        },
      ])
  );

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(snapshot, null, 2) + '\n');
  const count = Object.keys(snapshot.components).length;
  console.log(`[api-surface] Snapshot written → docs/api-surface.json (${count} components)`);
}

function sortObj(obj) {
  return Object.fromEntries(Object.entries(obj).sort(([a], [b]) => a.localeCompare(b)));
}

main();
