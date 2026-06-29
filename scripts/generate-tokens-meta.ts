#!/usr/bin/env tsx
/**
 * generate-tokens-meta.ts
 *
 * Reads docs/public-css-api.json and io-components/src/global/app.css
 * and generates docs/tokens-meta.json — a typed, queryable token catalogue
 * that the storefront API tab can consume for auto-generated token tables.
 *
 * Run:  npx tsx scripts/generate-tokens-meta.ts
 * Or:   npm run tokens-meta:generate
 *
 * Output: docs/tokens-meta.json
 *
 * Schema version: 1
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

const repoRoot = path.resolve(__dirname, '..');

interface PublicApiEntry {
  cssVar: string;
  classification: 'public-api' | 'internal' | 'deprecated';
  component: string;
  description: string;
  deprecatedSince?: string;
  replacedBy?: string;
}

interface TokenMeta {
  cssVar: string;
  classification: 'public-api' | 'internal' | 'deprecated';
  component: string;
  description: string;
  defaultValue: string | null;
  deprecatedSince?: string;
  replacedBy?: string;
}

interface TokensMetaOutput {
  $schemaVersion: number;
  $generated: string;
  $source: string;
  tokens: TokenMeta[];
}

function stripCssComments(content: string): string {
  return content.replace(/\/\*[\s\S]*?\*\//g, '');
}

/**
 * Parse CSS custom property default values from app.css.
 * Returns a Map of cssVar → default value string.
 */
function parseAppCssDefaults(appCssPath: string): Map<string, string> {
  const content = fs.readFileSync(appCssPath, 'utf8');
  const stripped = stripCssComments(content);
  const map = new Map<string, string>();
  const regex = /(--io-[a-z0-9-]+)\s*:\s*([^;]+);/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(stripped)) !== null) {
    const varName = match[1].trim();
    const value = match[2].trim();
    if (!map.has(varName)) {
      map.set(varName, value);
    }
  }

  return map;
}

function main(): void {
  const publicApiPath = path.join(repoRoot, 'docs/public-css-api.json');
  const appCssPath = path.join(repoRoot, 'io-components/src/global/app.css');
  const outputPath = path.join(repoRoot, 'docs/tokens-meta.json');

  const publicApiEntries: PublicApiEntry[] = JSON.parse(fs.readFileSync(publicApiPath, 'utf8'));
  const defaults = parseAppCssDefaults(appCssPath);

  const tokens: TokenMeta[] = publicApiEntries.map((entry) => {
    const meta: TokenMeta = {
      cssVar: entry.cssVar,
      classification: entry.classification,
      component: entry.component,
      description: entry.description,
      defaultValue: defaults.get(entry.cssVar) ?? null,
    };

    if (entry.deprecatedSince) {
      meta.deprecatedSince = entry.deprecatedSince;
    }

    if (entry.replacedBy) {
      meta.replacedBy = entry.replacedBy;
    }

    return meta;
  });

  const output: TokensMetaOutput = {
    $schemaVersion: 1,
    $generated: new Date().toISOString(),
    $source: 'docs/public-css-api.json + io-components/src/global/app.css',
    tokens,
  };

  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2) + '\n');

  const publicCount = tokens.filter((t) => t.classification === 'public-api').length;
  const internalCount = tokens.filter((t) => t.classification === 'internal').length;
  const deprecatedCount = tokens.filter((t) => t.classification === 'deprecated').length;
  const withDefault = tokens.filter((t) => t.defaultValue !== null).length;

  console.log(`✅ tokens-meta.json generated`);
  console.log(`   ${tokens.length} total tokens`);
  console.log(`   ${publicCount} public-api | ${internalCount} internal | ${deprecatedCount} deprecated`);
  console.log(`   ${withDefault} have default values from app.css`);
}

main();
