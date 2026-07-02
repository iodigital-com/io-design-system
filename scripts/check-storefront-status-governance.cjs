#!/usr/bin/env node

'use strict';

const fs = require('node:fs');
const path = require('node:path');

const repoRoot = path.resolve(__dirname, '..');

const sitemapPath = path.join(repoRoot, 'io-storefront/src/sitemap.ts');
const statusBadgePath = path.join(repoRoot, 'io-storefront/src/components/StatusBadge.tsx');
const homepagePath = path.join(repoRoot, 'io-storefront/src/app/page.tsx');

const layoutPaths = [
  'io-storefront/src/app/components/io-accordion/layout.tsx',
  'io-storefront/src/app/components/io-badge/layout.tsx',
  'io-storefront/src/app/components/io-input/layout.tsx',
  'io-storefront/src/app/components/io-pagination/layout.tsx',
  'io-storefront/src/app/components/io-carousel/layout.tsx',
].map((relative) => path.join(repoRoot, relative));

const allowedStatuses = new Set(['stable', 'beta']);
const errors = [];

function read(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    errors.push(`Missing required file: ${path.relative(repoRoot, filePath)}`);
    return '';
  }
}

function requireContains(content, filePath, expectedText) {
  if (!content.includes(expectedText)) {
    errors.push(`${path.relative(repoRoot, filePath)} is missing required text: ${expectedText}`);
  }
}

const sitemap = read(sitemapPath);
const badge = read(statusBadgePath);
const homepage = read(homepagePath);

if (sitemap) {
  requireContains(sitemap, sitemapPath, "export type ComponentStatus = 'stable' | 'beta';");

  const statusRegex = /status:\s*'([^']+)'/g;
  let match = statusRegex.exec(sitemap);
  while (match) {
    const value = match[1];
    if (!allowedStatuses.has(value)) {
      errors.push(`io-storefront/src/sitemap.ts has invalid status value: '${value}'`);
    }
    match = statusRegex.exec(sitemap);
  }
}

if (badge) {
  requireContains(badge, statusBadgePath, "status === 'stable'");
  requireContains(badge, statusBadgePath, "status === 'beta'");
}

if (homepage) {
  if (/status:\s*'(stable|beta)'/.test(homepage)) {
    errors.push('io-storefront/src/app/page.tsx must not hardcode component status literals; source status from sitemap.');
  }
  requireContains(homepage, homepagePath, 'getComponentItems');
}

for (const layoutPath of layoutPaths) {
  const content = read(layoutPath);
  if (!content) continue;

  if (/status="(stable|beta)"/.test(content)) {
    errors.push(`${path.relative(repoRoot, layoutPath)} must not hardcode status literals.`);
  }

  if (!content.includes('getComponentStatusBySlug')) {
    errors.push(`${path.relative(repoRoot, layoutPath)} must source status via getComponentStatusBySlug.`);
  }
}

if (errors.length > 0) {
  console.error('[status-governance] Validation failed:');
  for (const error of errors) {
    console.error(`[status-governance] - ${error}`);
  }
  process.exit(1);
}

console.log('[status-governance] OK: status model and canonical rendering constraints validated.');
