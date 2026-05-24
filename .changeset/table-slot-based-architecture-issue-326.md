---
"@io-digital/components": minor
---

feat(io-table): rewrite to declarative slot-based sub-component architecture (#326)

**Breaking change**: The JSON data-prop API (`columns`, `rows`, `sortable`, `selectable`, `sortKey`, `sortDirection`) has been removed from `io-table`.

**Migration guide**:

Before (deprecated):
```html
<io-table
  caption="Team members"
  sortable
  selectable
  .columns="[{ key: 'name', label: 'Name', sortable: true }]"
  .rows="[{ name: 'Alice', role: 'Admin' }]"
></io-table>
```

After (current):
```html
<io-table caption="Team members">
  <io-table-head>
    <io-table-head-row selectable select-all-checked="false">
      <io-table-head-cell sortable sort-key="name" sort-direction="none">Name</io-table-head-cell>
      <io-table-head-cell sortable sort-key="role" sort-direction="none">Role</io-table-head-cell>
    </io-table-head-row>
  </io-table-head>
  <io-table-body>
    <io-table-body-row selectable selected="false">
      <io-table-body-cell>Alice</io-table-body-cell>
      <io-table-body-cell>Admin</io-table-body-cell>
    </io-table-body-row>
  </io-table-body>
</io-table>
```

**What changed**:
- `io-table` is now a layout shell with four props: `caption`, `captionHidden`, `sticky`, `size`
- Six new sub-components added: `io-table-head`, `io-table-head-row`, `io-table-head-cell`, `io-table-body`, `io-table-body-row`, `io-table-body-cell`
- All sub-components use `shadow: false` + `display: contents` to preserve the CSS table model (fixes Chrome Bug #869308)
- Sort state is consumer-controlled: `io-table-head-cell` emits `sort` with `{ key, direction }` — update `sort-direction` prop from your handler
- Row selection is consumer-controlled: `io-table-body-row` emits `select` with `{ selected: boolean }`, `io-table-head-row` emits `selectAll` with `{ checked: boolean }`
- `--io-table-row-selected-bg` token added (light: `--io-color-primary-muted`, dark: `--io-color-dark-accent-bg`)
- `io-table-head-cell` correctly emits `aria-sort="none"` on sortable-but-unsorted columns (WAI-ARIA 1.2 compliance)
- `io-table-body-cell` supports `colspan` and `rowspan` for merged cells
