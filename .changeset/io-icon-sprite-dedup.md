---
"@iodigital-com/components": minor
---

feat(io-icon): deduplicate SVG rendering via document-level sprite

Each unique icon name is now injected once as a `<symbol>` in a hidden
`<svg id="io-icon-sprite">` appended to `document.body`. Every `io-icon`
instance references its symbol via `<use href="#io-icon-{name}">` instead
of stamping the full SVG path data inline. This eliminates redundant DOM
nodes when the same icon is used multiple times on a page.

- `injectIconSprite()` in `global/app.ts` pre-injects all symbols at library
  init time (guards against SSR with `typeof document` check)
- `ensureIconSymbol(name)` provides a lazy per-icon fallback for edge cases
- `iconSource` (custom SVG URL) path is unchanged — still renders inline
- Accessibility is preserved: decorative icons carry `aria-hidden="true"`,
  labelled icons carry `role="img"` + `aria-label` on the outer `<svg>`
