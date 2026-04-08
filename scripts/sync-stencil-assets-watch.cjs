/**
 * sync-stencil-assets-watch.cjs
 * =============================
 * Dev helper: continuously mirrors Stencil lazy chunks into storefront public assets.
 * This prevents stale hashed chunk filenames (p-*.entry.js) during stencil --watch.
 */

const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'io-components', 'dist', 'io-components');
const targetDir = path.join(__dirname, '..', 'io-storefront', 'public', 'stencil');

let timer;
let startedWatching = false;

function syncNow() {
  if (!fs.existsSync(sourceDir)) {
    return;
  }

  fs.mkdirSync(targetDir, { recursive: true });
  fs.cpSync(sourceDir, targetDir, { recursive: true, force: true });
  console.log(`[sync-stencil-assets-watch] synced ${new Date().toISOString()}`);
}

function scheduleSync() {
  clearTimeout(timer);
  timer = setTimeout(syncNow, 150);
}

function startWatching() {
  if (startedWatching) return;
  if (!fs.existsSync(sourceDir)) return;

  fs.mkdirSync(targetDir, { recursive: true });
  syncNow();

  fs.watch(sourceDir, { recursive: true }, () => {
    scheduleSync();
  });

  startedWatching = true;
  console.log(`[sync-stencil-assets-watch] watching ${sourceDir}`);
}

startWatching();

// Stencil may create dist folder after this script starts.
const bootstrapInterval = setInterval(() => {
  if (startedWatching) {
    clearInterval(bootstrapInterval);
    return;
  }
  startWatching();
}, 500);
