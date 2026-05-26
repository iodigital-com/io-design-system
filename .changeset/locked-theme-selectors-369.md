---
'@io-digital/components': minor
---

feat(tokens): add [data-theme="only-dark"] and [data-theme="only-light"] locked-theme CSS selectors

- `[data-theme="only-dark"]` — applies all dark-mode token overrides to any element subtree regardless of the page-level `[data-theme]`
- `[data-theme="only-light"]` — applies all light-mode token values to any element subtree regardless of page theme
- Both selectors cascade to all children (same inheritance as standard `[data-theme="dark"]`)
- Both selectors work on any element, not just `<html>`
- Positioned after `[data-theme="dark|light"]` in source order so they win the cascade at equal specificity without needing `!important`
- No new `--io-*` token names introduced — selectors reuse existing variable names
- Documented in `docs/token-naming-conventions.md` under the Locked-Theme Selectors section
- Storefront theming page (`/developing/theming`) updated with live demo and code example
