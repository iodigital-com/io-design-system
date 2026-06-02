/**
 * Verifies the ng-packagr output for @iodigital-com/components-angular.
 *
 * Checks that all files referenced by the root package.json `exports`,
 * `main`, `module`, and `types` fields actually exist in dist/. Fails fast
 * with a clear message so CI catches resolution breakage before publish.
 */

import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkgRoot = resolve(__dirname, '../io-components-angular');
const pkg = JSON.parse(readFileSync(resolve(pkgRoot, 'package.json'), 'utf-8'));

function relativePosixPath(inputPath) {
  return inputPath.replace(/\\/g, '/').replace(/^\.\//, '');
}

function resolveAndValidateWithinPackage(relativePath, label) {
  if (typeof relativePath !== 'string' || relativePath.trim().length === 0) {
    throw new Error(`Missing required field: ${label}`);
  }

  const normalized = relativePosixPath(relativePath);
  if (normalized.startsWith('../') || normalized.includes('/../')) {
    throw new Error(`Invalid path outside package root for ${label}: ${relativePath}`);
  }

  const resolved = resolve(pkgRoot, normalized);
  const expectedPrefix = `${pkgRoot}/`;
  const normalizedResolved = resolved.replace(/\\/g, '/');
  const normalizedRoot = pkgRoot.replace(/\\/g, '/');

  if (normalizedResolved !== normalizedRoot && !normalizedResolved.startsWith(expectedPrefix)) {
    throw new Error(`Resolved path escapes package root for ${label}: ${relativePath}`);
  }

  return resolved;
}

const requiredFields = {
  main: pkg.main,
  module: pkg.module,
  types: pkg.types,
  'exports["."].default': pkg.exports?.['.']?.default,
  'exports["."].types': pkg.exports?.['.']?.types,
};

const distPkg = resolve(pkgRoot, 'dist/package.json');

if (!existsSync(distPkg)) {
  console.error('✗  dist/package.json not found — ng-packagr build may have failed.');
  console.error('   Run `npm run build:wrapper:angular` and retry.');
  process.exit(1);
}

const distExports = JSON.parse(readFileSync(distPkg, 'utf-8')).exports ?? {};

const distDefault = distExports['.']?.default;
const distTypes = distExports['.']?.types;

const requiredDistFields = {
  'dist.exports["."].default': distDefault,
  'dist.exports["."].types': distTypes,
};

for (const [label, value] of Object.entries({ ...requiredFields, ...requiredDistFields })) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    console.error(`✗  Missing required field: ${label}`);
    process.exit(1);
  }
}

// Also verify dist/package.json exports resolve correctly (relative to dist/)
const distFiles = [
  resolveAndValidateWithinPackage(`dist/${relativePosixPath(distDefault)}`, 'dist.exports["."].default'),
  resolveAndValidateWithinPackage(`dist/${relativePosixPath(distTypes)}`, 'dist.exports["."].types'),
];

const rootFiles = Object.entries(requiredFields)
  .map(([label, value]) => resolveAndValidateWithinPackage(value, label));

let failed = false;

for (const file of [...rootFiles, ...distFiles]) {
  if (!existsSync(file)) {
    console.error(`✗  Missing: ${file.replace(pkgRoot + '/', '')}`);
    failed = true;
  } else {
    console.log(`✓  Found:   ${file.replace(pkgRoot + '/', '')}`);
  }
}

if (failed) {
  console.error('\nAngular build verification failed. Run `npm run build:wrapper:angular` and retry.');
  process.exit(1);
} else {
  console.log('\nAngular build verification passed.');
}
