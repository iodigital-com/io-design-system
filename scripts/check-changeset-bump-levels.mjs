/**
 * Governance check: flags changesets marked `major` and requires explicit
 * justification. Fails CI if a `major` bump is present without a line
 * starting with "VISUAL OVERHAUL:" in the changeset body — enforcing the
 * project versioning policy (major = brand/design overhaul only).
 *
 * Run via: node scripts/check-changeset-bump-levels.mjs
 */

import { readdirSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const changesetDir = resolve(__dirname, '../.changeset');

const files = readdirSync(changesetDir).filter(
  (f) => f.endsWith('.md') && f !== 'README.md',
);

let failed = false;

for (const file of files) {
  const content = readFileSync(resolve(changesetDir, file), 'utf-8');
  const lines = content.split('\n');

  const isMajor = lines.some((l) => l.trim().endsWith('major'));
  if (!isMajor) continue;

  const hasJustification = lines.some((l) =>
    l.trim().startsWith('VISUAL OVERHAUL:'),
  );

  if (!hasJustification) {
    console.error(`
✗  ${file} uses a MAJOR bump without justification.

   Per the project versioning policy, \`major\` is reserved for complete
   visual overhauls (new color system, full token rename, brand redesign).

   If this IS a visual overhaul, add this line to the changeset body:
     VISUAL OVERHAUL: <one sentence describing what changed>

   If this is NOT a visual overhaul, downgrade the bump to \`minor\`:
     - New component / prop / feature  → minor
     - Breaking default change          → minor
     - Bug fix / a11y / style tweak     → patch
`);
    failed = true;
  } else {
    console.log(`✓  ${file} — major bump justified`);
  }
}

if (failed) process.exit(1);
if (files.length === 0 || !files.some((f) => readFileSync(resolve(changesetDir, f), 'utf-8').includes('major'))) {
  console.log('No major changesets found.');
}
