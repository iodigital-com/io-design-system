const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const filePath = path.join(repoRoot, 'io-components-vue', 'src', 'components.ts');

if (!fs.existsSync(filePath)) {
  console.error(`[check-vue-wrapper-duplicates] File not found: ${filePath}`);
  process.exit(1);
}

const source = fs.readFileSync(filePath, 'utf8');
const defineContainerRegex = /export const\s+(\w+)\s*=\s*\/\*@__PURE__\*\/\s*defineContainer<[\s\S]*?>\([\s\S]*?\[([\s\S]*?)\]\s*\);/g;

const duplicateReports = [];
let containersScanned = 0;

for (const match of source.matchAll(defineContainerRegex)) {
  containersScanned += 1;
  const componentName = match[1];
  const entriesSource = match[2];
  const entryRegex = /['"]([^'"]+)['"]/g;

  const seen = new Set();
  const duplicates = new Set();

  for (const entryMatch of entriesSource.matchAll(entryRegex)) {
    const entry = entryMatch[1];
    if (seen.has(entry)) {
      duplicates.add(entry);
    } else {
      seen.add(entry);
    }
  }

  if (duplicates.size > 0) {
    duplicateReports.push({ componentName, duplicates: [...duplicates] });
  }
}

if (containersScanned === 0) {
  console.error('[check-vue-wrapper-duplicates] No defineContainer entries were parsed.');
  console.error('[check-vue-wrapper-duplicates] Aborting to avoid a false pass due to parser drift.');
  process.exit(1);
}

if (duplicateReports.length > 0) {
  console.error('[check-vue-wrapper-duplicates] Duplicate defineContainer entries detected:');
  duplicateReports.forEach(({ componentName, duplicates }) => {
    console.error(`  - ${componentName}: ${duplicates.join(', ')}`);
  });
  process.exit(1);
}

console.log('[check-vue-wrapper-duplicates] No duplicate defineContainer entries found.');
