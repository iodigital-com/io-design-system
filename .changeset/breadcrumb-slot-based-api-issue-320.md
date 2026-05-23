---
"@io-digital/components": minor
---

feat(io-breadcrumb): migrate to declarative slot-based API with io-breadcrumb-item sub-component (#320)

**Breaking change**: The `items` (JSON string), `separator`, and `maxVisible` props have been removed from `io-breadcrumb`.

**Migration guide**:

Before (deprecated):
```html
<io-breadcrumb items='[{"label":"Home","href":"/"},{"label":"Current"}]'></io-breadcrumb>
```

After (current):
```html
<io-breadcrumb>
  <io-breadcrumb-item href="/">Home</io-breadcrumb-item>
  <io-breadcrumb-item current>Current</io-breadcrumb-item>
</io-breadcrumb>
```

**What changed**:
- `io-breadcrumb` now accepts `io-breadcrumb-item` sub-components via its default slot
- Separators are inserted programmatically via `slotchange` — no manual separator markup needed
- The last item automatically receives `aria-current="page"` if no item has `current` set explicitly
- Separator character customizable via `--io-breadcrumb-separator` CSS custom property (default `'/'`)
- New `io-breadcrumb-item` sub-component: `href` prop renders `<a>`, `current` prop renders `<span aria-current="page">`
