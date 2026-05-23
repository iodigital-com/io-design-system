#!/usr/bin/env node
/**
 * check-dark-mode-tokens.cjs
 *
 * Validates that the [data-theme="dark"] block in app.css overrides every
 * component-level CSS custom property whose :root declaration resolves to a
 * light-only primitive (--io-color-grey-*, --io-color-white, --io-color-black).
 *
 * Runs as part of `npm run governance:check`.
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');

const repoRoot = path.resolve(__dirname, '..');
const appCssPath = path.join(repoRoot, 'io-components/src/global/app.css');

function fail(message) {
  console.error(`[dark-mode-tokens] ${message}`);
  process.exit(1);
}

function readCss() {
  try {
    return fs.readFileSync(appCssPath, 'utf8');
  } catch (err) {
    fail(`Cannot read app.css: ${err.message}`);
  }
}

/**
 * Returns all --io-* var names declared inside the [data-theme="dark"] block.
 */
function extractDarkOverrides(css) {
  const darkBlockMatch = css.match(/\[data-theme="dark"\]\s*\{([^}]+)\}/s);
  if (!darkBlockMatch) {
    fail('No [data-theme="dark"] block found in app.css');
  }
  const block = darkBlockMatch[1];
  const overrides = new Set();
  for (const match of block.matchAll(/^\s*(--io-[a-z0-9-]+)\s*:/gm)) {
    overrides.add(match[1]);
  }
  return overrides;
}

/**
 * Palette primitives and intentional light-on-colored tokens that must NOT be
 * dark-overridden. These are either brand palette colors (--io-color-*) that
 * are always the same regardless of theme, or tokens whose white/light value
 * is semantically correct on dark bg (e.g. white text on a colored button).
 */
const DARK_OVERRIDE_ALLOWLIST = new Set([
  // Palette primitives — always the same colour regardless of theme
  '--io-color-white',
  '--io-color-black',
  '--io-color-grey-1',
  '--io-color-grey-2',
  '--io-color-grey-3',
  '--io-color-grey-4',
  '--io-color-grey-5',
  '--io-color-grey-6',
  '--io-color-yellow',
  '--io-color-yellow-hover',
  '--io-color-error-on-blue',
  // Intentional inverse/on-primary — white text on coloured bg is correct in both themes
  '--io-text-inverse',
  '--io-text-on-primary',
  // Active button group uses white text on primary bg — correct in both themes
  '--io-button-group-active-color',
  // Avatar text on coloured bg — white is correct in both light and dark themes
  '--io-avatar-text-blue',
  '--io-avatar-text-orange',
  '--io-avatar-text-green',
  '--io-avatar-text-purple',
]);

/**
 * Returns all --io-* semantic tokens in :root whose value references a
 * light-only primitive that needs a dark override.
 *
 * Excludes palette primitive tokens and intentional always-light tokens.
 */
const LIGHT_PRIMITIVE_RE = /var\(--io-color-(?:white|black|grey-\d+)/;
const LIGHT_HEX_RE = /#(?:fff(?:fff)?|f[a-f0-9]{5})\b/i;

function extractLightOnlyTokens(css) {
  // Extract only the :root block
  const rootMatch = css.match(/:root\s*\{([^]*?)\n\}/);
  if (!rootMatch) {
    fail('No :root block found in app.css');
  }
  const root = rootMatch[1];
  const lightTokens = [];
  for (const match of root.matchAll(/^\s*(--io-[a-z0-9-]+)\s*:\s*(.+?);/gm)) {
    const varName = match[1];
    const value = match[2].trim();
    // Skip dark-mode source values themselves
    if (varName.startsWith('--io-color-dark-')) continue;
    // Skip palette primitives and intentional light tokens
    if (DARK_OVERRIDE_ALLOWLIST.has(varName)) continue;
    // Skip all --io-color-* palette tokens (brand palette should not change per theme)
    if (varName.startsWith('--io-color-') && !varName.startsWith('--io-color-dark-')) continue;
    if (LIGHT_PRIMITIVE_RE.test(value) || LIGHT_HEX_RE.test(value)) {
      lightTokens.push(varName);
    }
  }
  return lightTokens;
}

function main() {
  const css = readCss();
  const darkOverrides = extractDarkOverrides(css);
  const lightOnlyTokens = extractLightOnlyTokens(css);

  const missing = lightOnlyTokens.filter((t) => !darkOverrides.has(t));

  if (missing.length > 0) {
    console.error('[dark-mode-tokens] The following tokens use light-only primitives in :root but have no [data-theme="dark"] override:');
    for (const t of missing) {
      console.error(`  ${t}`);
    }
    console.error('\nAdd overrides in the [data-theme="dark"] block in app.css, or use a semantic token that is already overridden.');
    process.exit(1);
  }

  console.log(`[dark-mode-tokens] OK — all ${lightOnlyTokens.length} light-primitive tokens have dark overrides.`);
}

main();
