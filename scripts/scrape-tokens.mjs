/**
 * scrape-tokens.mjs
 *
 * Visits each URL in token-page-list.json with a headless Chromium browser,
 * extracts CSS custom properties plus style/component metadata, and writes the
 * raw result to docs/tokens.live.json.
 *
 * Usage:
 *   node scripts/scrape-tokens.mjs
 *   node scripts/scrape-tokens.mjs --resume   # skip URLs already in tokens.live.json
 */

import { chromium } from 'playwright';
import { readFileSync, writeFileSync, appendFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dir = dirname(fileURLToPath(import.meta.url));
const root = join(__dir, '..');

const PAGES_FILE = join(__dir, 'token-page-list.json');
const OUT_FILE   = join(root, 'docs', 'tokens.live.json');
const LOGS_DIR   = join(root, 'logs');
const DELAY_MS   = 1500;
const TIMEOUT_MS = 45_000;

// ── Logging ──────────────────────────────────────────────────────────────────

if (!existsSync(LOGS_DIR)) mkdirSync(LOGS_DIR, { recursive: true });

const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const logFile = join(LOGS_DIR, `scrape-${ts}.log`);

function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  console.log(line);
  appendFileSync(logFile, line + '\n');
}

// ── Load page list ────────────────────────────────────────────────────────────

const pages = JSON.parse(readFileSync(PAGES_FILE, 'utf8'));
log(`Loaded ${pages.length} pages from token-page-list.json`);

// ── Resume support ────────────────────────────────────────────────────────────

const resume = process.argv.includes('--resume');
let existing = {};
if (resume && existsSync(OUT_FILE)) {
  existing = JSON.parse(readFileSync(OUT_FILE, 'utf8'));
  log(`Resume mode: ${Object.keys(existing).length} pages already scraped`);
}

// ── Scrape ────────────────────────────────────────────────────────────────────

const delay = ms => new Promise(r => setTimeout(r, ms));

const result = { ...existing };

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  userAgent:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
    '(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  locale: 'en-US',
});

for (const { url, label } of pages) {
  if (resume && existing[url]) {
    log(`  skip (cached): ${url}`);
    continue;
  }

  const page = await context.newPage();
  try {
    log(`Scraping [${label}] ${url}`);
    await page.goto(url, { waitUntil: 'networkidle', timeout: TIMEOUT_MS });

    // Extra settle time for any deferred CSS-in-JS tokens
    await page.waitForTimeout(800);

    const payload = await page.evaluate(() => {
      const style = getComputedStyle(document.documentElement);
      /** @type {Record<string,string>} */
      const found = {};
      for (const prop of style) {
        if (prop.startsWith('--')) {
          const value = style.getPropertyValue(prop).trim();
          if (value) found[prop] = value;
        }
      }

      const classCounts = new Map();
      document.querySelectorAll('[class]').forEach(node => {
        const rawClass = node.getAttribute('class') || '';
        rawClass
          .split(/\s+/)
          .map(c => c.trim())
          .filter(Boolean)
          .forEach(c => classCounts.set(c, (classCounts.get(c) ?? 0) + 1));
      });

      const classes = [...classCounts.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([name, count]) => ({ name, count }));

      const blockCounts = new Map();
      for (const [name, count] of classCounts.entries()) {
        const block = name.split('__')[0].split('--')[0];
        if (!block) continue;
        blockCounts.set(block, (blockCounts.get(block) ?? 0) + count);
      }

      const components = [...blockCounts.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([name, count]) => ({ name, count }));

      const customElements = [...new Set(
        [...document.querySelectorAll('*')]
          .map(el => el.tagName.toLowerCase())
          .filter(tag => tag.includes('-'))
      )].sort();

      return { tokens: found, styles: { classes }, components: { blocks: components, customElements } };
    });

    const tokenCount = Object.keys(payload.tokens).length;
    const classCount = payload.styles.classes.length;
    const blockCount = payload.components.blocks.length;
    result[url] = { label, scrapedAt: new Date().toISOString(), ...payload };
    log(`  ✓ ${tokenCount} CSS vars, ${classCount} classes, ${blockCount} component blocks`);
  } catch (err) {
    log(`  ✗ ERROR: ${err.message}`);
    result[url] = {
      label,
      scrapedAt: new Date().toISOString(),
      error: err.message,
      tokens: {},
      styles: { classes: [] },
      components: { blocks: [], customElements: [] },
    };
  } finally {
    await page.close();
  }

  await delay(DELAY_MS);
}

await browser.close();

writeFileSync(OUT_FILE, JSON.stringify(result, null, 2));
log(`\nDone. Written → ${OUT_FILE}`);
log(`Log file      → ${logFile}`);
