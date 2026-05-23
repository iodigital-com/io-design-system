#!/usr/bin/env node
'use strict';

/**
 * check-public-css-api.cjs
 *
 * Verifies that every CSS custom property declared as public-api in
 * docs/public-css-api.json is still present in the component styles source.
 *
 * Run: node scripts/check-public-css-api.cjs
 */

const fs = require('fs');
const path = require('path');

const API_JSON = path.join(__dirname, '../docs/public-css-api.json');
const STYLES_GLOB_DIR = path.join(__dirname, '../io-components/src/components');

// Read public API list
const apiData = JSON.parse(fs.readFileSync(API_JSON, 'utf8'));
const publicEntries = apiData.filter(e => e.classification === 'public-api');
const publicVars = publicEntries.map(e => e.cssVar);

if (publicVars.length === 0) {
  console.warn('⚠️  No public-api entries found in docs/public-css-api.json');
  process.exit(0);
}

// Search all -styles.ts files for these vars
const allStyleFiles = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.name.endsWith('-styles.ts')) {
      allStyleFiles.push(full);
    }
  }
}

walk(STYLES_GLOB_DIR);

if (allStyleFiles.length === 0) {
  console.error('❌ No -styles.ts files found under', STYLES_GLOB_DIR);
  process.exit(1);
}

const allStyleContent = allStyleFiles.map(f => fs.readFileSync(f, 'utf8')).join('\n');

const missing = publicVars.filter(v => !allStyleContent.includes(v));

if (missing.length > 0) {
  console.error(
    '❌ Public CSS API check failed — the following vars are declared public but missing from component styles:'
  );
  missing.forEach(v => console.error('   ' + v));
  console.error(
    '\nIf a token was removed, update docs/public-css-api.json or reclassify it as internal.'
  );
  process.exit(1);
}

console.log('✅ Public CSS API check passed — ' + publicVars.length + ' public vars verified across ' + allStyleFiles.length + ' style files.');
