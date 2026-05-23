---
"@io-digital/components": minor
---

feat(tokens): dark mode token overrides for all components (#175)

- Adds `[data-theme="dark"]` overrides in `app.css` for component-level tokens that used light-only primitives: `--io-color-primary`, `--io-focus-inner`, `--io-focus-outer`, `--io-surface-elevated`, `--io-option-hover-bg`, `--io-button-group-bg/color/border-color`, `--io-skeleton-bg`
- Adds new semantic tokens `--io-surface-elevated` and `--io-option-hover-bg` to `:root` with light-mode defaults
- Adds dark-mode source primitives: `--io-color-dark-primary` (#4d4dff — WCAG AA on dark bg) and `--io-color-dark-focus-inner` (#ff9eb5 — 9.5:1 vs dark bg)
- Replaces hardcoded `--io-color-grey-1` in `io-option-styles.ts` and `io-select-styles.ts` with `--io-option-hover-bg` so dark mode hover propagates through Shadow DOM
- Adds `scripts/check-dark-mode-tokens.cjs` governance script (runs in `governance:check`) that validates every light-primitive token has a dark override
- Adds dark/light preview toggle to the `Playground` component in the storefront — scoped to the preview div so docs remain light while components preview dark
