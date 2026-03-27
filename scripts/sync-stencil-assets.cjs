/**
 * sync-stencil-assets.cjs
 * ========================
 * Copies the Stencil-built io-components assets from dist/ into the
 * io-storefront's public/ directory so Next.js can serve them.
 *
 * Run via: npm run sync:stencil-assets
 * Called automatically by: npm run build:storefront:release
 */

const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'io-components', 'dist', 'io-components');
const targetDir = path.join(__dirname, '..', 'io-storefront', 'public', 'stencil');

if (!fs.existsSync(sourceDir)) {
  console.error(`[sync-stencil-assets] Source directory does not exist: ${sourceDir}`);
  console.error('[sync-stencil-assets] Run "npm run build:components" first.');
  process.exit(1);
}

fs.mkdirSync(targetDir, { recursive: true });
fs.cpSync(sourceDir, targetDir, { recursive: true, force: true });

console.log(`[sync-stencil-assets] ✓ Synced assets:`);
console.log(`  ${sourceDir}`);
console.log(`  → ${targetDir}`);
