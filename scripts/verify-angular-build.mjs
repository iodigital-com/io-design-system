/**
 * Verifies the ng-packagr output for @iodigital-com/components-angular.
 *
 * Checks that all files referenced by the root package.json `exports`,
 * `main`, `module`, and `types` fields actually exist in dist/. Fails fast
 * with a clear message so CI catches resolution breakage before publish.
 */

import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkgRoot = resolve(__dirname, '../io-components-angular');
const pkg = JSON.parse(readFileSync(resolve(pkgRoot, 'package.json'), 'utf-8'));

const required = [
  pkg.main,
  pkg.module,
  pkg.types,
  pkg.exports?.['.']?.default,
  pkg.exports?.['.']?.types,
];

const distPkg = resolve(pkgRoot, 'dist/package.json');
const distExports = JSON.parse(readFileSync(distPkg, 'utf-8')).exports ?? {};

// Also verify dist/package.json exports resolve correctly (relative to dist/)
const distFiles = [
  distExports['.']?.default,
  distExports['.']?.types,
].filter(Boolean).map(f => resolve(pkgRoot, 'dist', f.replace(/^\.\//, '')));

const rootFiles = required
  .filter(Boolean)
  .map(f => resolve(pkgRoot, f));

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
