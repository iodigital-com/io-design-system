/**
 * check-style-literals.cjs
 *
 * Validates docs/style-literal-allowlist.json:
 *  1. Each entry references a file that exists in the workspace.
 *  2. Each entry has all required fields: file, literal, context, rationale, reviewAfter.
 *  3. reviewAfter is a valid ISO-8601 date string.
 *
 * Exits 0 on success, 1 on any violation.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const ALLOWLIST_PATH = path.join(ROOT, 'docs', 'style-literal-allowlist.json');
const REQUIRED_FIELDS = ['file', 'literal', 'context', 'rationale', 'reviewAfter'];
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

let allowlist;
try {
  allowlist = JSON.parse(fs.readFileSync(ALLOWLIST_PATH, 'utf8'));
} catch (e) {
  console.error('[style-literals] Could not parse docs/style-literal-allowlist.json:', e.message);
  process.exit(1);
}

if (!Array.isArray(allowlist.entries)) {
  console.error('[style-literals] docs/style-literal-allowlist.json must have a top-level "entries" array.');
  process.exit(1);
}

const errors = [];

for (let i = 0; i < allowlist.entries.length; i++) {
  const entry = allowlist.entries[i];
  const label = `entries[${i}] (${entry.file || '?'} / ${entry.literal || '?'})`;

  // 1. Required fields present and non-empty
  for (const field of REQUIRED_FIELDS) {
    if (!entry[field] || String(entry[field]).trim() === '') {
      errors.push(`${label}: missing or empty field "${field}"`);
    }
  }

  // 2. Referenced file exists
  if (entry.file) {
    const abs = path.join(ROOT, entry.file);
    if (!fs.existsSync(abs)) {
      errors.push(`${label}: referenced file does not exist: ${entry.file}`);
    }
  }

  // 3. reviewAfter is a valid ISO date
  if (entry.reviewAfter && !ISO_DATE_RE.test(entry.reviewAfter)) {
    errors.push(`${label}: reviewAfter "${entry.reviewAfter}" is not a valid YYYY-MM-DD date`);
  }
}

if (errors.length > 0) {
  console.error('[style-literals] Allowlist validation failed:\n' + errors.map(e => '  ' + e).join('\n'));
  process.exit(1);
}

console.log(`[style-literals] OK — ${allowlist.entries.length} allowlist entries validated.`);
