#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = process.cwd();

const targets = [
  'io-components/src/components',
  'io-components-react/src',
  'io-components-angular/src',
  'io-components-vue/src',
  'io-storefront/src',
];

const exts = new Set(['.ts', '.tsx', '.js', '.jsx', '.mdx']);

const legacyEvents = [
  'ioInput',
  'ioChange',
  'ioFocus',
  'ioBlur',
  'ioOpen',
  'ioClose',
  'ioClick',
  'ioToggle',
  'ioRemove',
  'ioToastDismiss',
];

const eventLiteralPattern = new RegExp(`["'\\\`](${legacyEvents.join('|')})["'\\\`]`, 'g');
const onIoPropPattern = /\bonIo[A-Z][A-Za-z0-9_]*\b/g;
const decoratorPattern = /@Event\([^)]*\)\s*(ioInput|ioChange|ioFocus|ioBlur|ioOpen|ioClose|ioClick|ioToggle|ioRemove|ioToastDismiss)\b/g;
const emitPattern = /\bthis\.(ioInput|ioChange|ioFocus|ioBlur|ioOpen|ioClose|ioClick|ioToggle|ioRemove|ioToastDismiss)\.emit\b/g;
const angularBindingPattern = /\((ioInput|ioChange|ioFocus|ioBlur|ioOpen|ioClose|ioClick|ioToggle|ioRemove|ioToastDismiss)\)=/g;
const vueBindingPattern = /@io-(input|change|focus|blur|open|close|click|toggle|remove|toast-dismiss)\b/g;

const skipDirs = new Set(['node_modules', '.git', 'dist', 'coverage', '.next', 'www']);

function walk(dir, out) {
  const abs = path.join(root, dir);
  if (!fs.existsSync(abs)) return;

  for (const entry of fs.readdirSync(abs, { withFileTypes: true })) {
    if (entry.name.startsWith('.') && entry.name !== '.storybook') continue;
    if (entry.isDirectory()) {
      if (skipDirs.has(entry.name)) continue;
      walk(path.join(dir, entry.name), out);
      continue;
    }

    const ext = path.extname(entry.name);
    if (!exts.has(ext)) continue;

    out.push(path.join(dir, entry.name));
  }
}

function findMatches(relPath) {
  const absPath = path.join(root, relPath);
  const text = fs.readFileSync(absPath, 'utf8');
  const findings = [];

  const checks = [
    ['legacy event literal', eventLiteralPattern],
    ['legacy onIo prop', onIoPropPattern],
    ['legacy @Event name', decoratorPattern],
    ['legacy emitter call', emitPattern],
    ['legacy Angular binding', angularBindingPattern],
    ['legacy Vue binding', vueBindingPattern],
  ];

  for (const [label, regex] of checks) {
    regex.lastIndex = 0;
    let match;
    while ((match = regex.exec(text)) !== null) {
      const index = match.index;
      const line = text.slice(0, index).split('\n').length;
      const lineText = text.split('\n')[line - 1].trim();
      findings.push({ label, line, lineText });
    }
  }

  return findings;
}

const files = [];
for (const target of targets) {
  walk(target, files);
}

const violations = [];
for (const relPath of files) {
  const matches = findMatches(relPath);
  if (matches.length > 0) {
    for (const match of matches) {
      violations.push({ relPath, ...match });
    }
  }
}

if (violations.length > 0) {
  console.error('❌ Legacy io*-prefixed event references found:');
  for (const violation of violations.slice(0, 80)) {
    console.error(`- ${violation.relPath}:${violation.line} [${violation.label}] ${violation.lineText}`);
  }
  if (violations.length > 80) {
    console.error(`...and ${violations.length - 80} more`);
  }
  process.exit(1);
}

console.log('✅ Event guard passed: no legacy io*-prefixed event API references found.');
