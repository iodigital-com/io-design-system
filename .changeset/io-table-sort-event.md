---
"@iodigital-com/components": minor
---

feat(io-table): aggregated sortChange event, ARIA APG sort-button, labelled scroll region (#664)

- `io-table` now emits a non-bubbling `sortChange` event (detail: `{ key, direction }`) that aggregates the bubbling `sort` events from all `io-table-head-cell` children — consumers attach one listener on `io-table` instead of one per column across shadow-DOM boundaries
- `io-table-head-cell` sortable columns now render a `<button type="button">` inside the `<th>` (ARIA APG sort-button pattern); `aria-sort` stays on the `<th>` (columnheader); keyboard activation (Enter/Space) is handled natively by the browser — custom `handleKeyDown` removed
- `io-table` scroll wrapper (`role="region"`) now always carries `aria-label` equal to the `caption` value when provided, giving the landmark an accessible name (WCAG 1.3.1)
