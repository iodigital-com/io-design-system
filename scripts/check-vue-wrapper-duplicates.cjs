const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const filePath = path.join(repoRoot, 'io-components-vue', 'src', 'components.ts');

if (!fs.existsSync(filePath)) {
  console.error(`[check-vue-wrapper-duplicates] File not found: ${filePath}`);
  process.exit(1);
}

const source = fs.readFileSync(filePath, 'utf8');

/**
 * Match each defineContainer call and capture ALL bracket-delimited arrays.
 *
 * @stencil/vue-output-target ≥ 0.9 generates two arrays per component:
 *   defineContainer<T>('tag', define, [prop, ..., eventProp], [eventProp])
 *                                      ^^^^ props + events ^^^^  ^^events^^
 *
 * Older versions generated a single array for props only.
 *
 * The type annotation ': StencilVueComponent<...>' may appear between the
 * identifier and the '=' sign — '[^=]*' allows for this.
 *
 * Duplicate detection is scoped per-array so that intentional cross-array
 * repetition (event names appearing in both the props array and the events
 * array) is NOT flagged as a duplicate.
 */
const defineContainerRegex = /export const\s+(\w+)[^=]*=\s*\/\*@__PURE__\*\/\s*defineContainer<[\s\S]*?>\([\s\S]*?(\[[\s\S]*?\])(\s*,\s*(\[[\s\S]*?\]))?\s*\);/g;

const duplicateReports = [];
let containersScanned = 0;

for (const match of source.matchAll(defineContainerRegex)) {
  containersScanned += 1;
  const componentName = match[1];

  // Collect each array in the call (props array, optional events array)
  const arrays = [match[2], match[4]].filter(Boolean);
  const entryRegex = /['"]([^'"]+)['"]/g;

  for (const arraySource of arrays) {
    const seen = new Set();
    const duplicates = new Set();

    for (const entryMatch of arraySource.matchAll(entryRegex)) {
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
