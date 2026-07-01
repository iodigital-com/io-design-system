---
'@iodigital-com/components': minor
---

feat(io-table): add hideLabel and multiline to io-table-head-cell (#1035)

- `hideLabel` prop: visually hides the column label via sr-only while preserving it for screen readers — enables accessible select-all header cells
- `multiline` prop: drops `white-space: nowrap` to allow header text wrapping in fixed-layout tables

feat(io-table): add selectionState prop to io-table-head-row (#1055)

- `selectionState: 'none' | 'some' | 'all'` — tri-state convenience prop that drives both checked and indeterminate states from a single, clearly-named value
- Existing `selectAllChecked` / `selectAllIndeterminate` props continue to work as a fallback when `selectionState` is not provided

feat(io-table): add empty-state slot and loading overlay (#1051)

- `empty` named slot: rendered automatically when `io-table-body` has no `io-table-body-row` children (detected via slotchange)
- `loading` named slot + `loading` prop: absolutely-positioned overlay with `aria-busy="true"` on the scroll wrapper
- New public-api tokens: `--io-table-empty-min-height`, `--io-table-loading-bg`

feat(io-scroller): add sticky indicator and ARIA pass-through (#1038)

- `sticky` prop: switches indicator buttons to `position: sticky` during long scrolls
- `scrollRole` prop: forwards a custom ARIA role to the scroll container (e.g. `"tablist"`)
- `scrollAriaOrientation` prop: overrides the derived `aria-orientation` attribute
- `scrollAriaLabel` prop: overrides the auto-generated aria-label
- New public-api token: `--io-scroller-indicator-sticky-offset`

docs(io-table): document tri-state sort and full-word direction values (#1044)

- `IoTableSortDirection` JSDoc explains tri-state cycling and ARIA-aligned full-word values vs Porsche bi-state short-form
- `IoTableSortDetail` JSDoc documents the `key` naming rationale
- Accessibility tab: new "Tri-state sort" section with design rationale and best practices
