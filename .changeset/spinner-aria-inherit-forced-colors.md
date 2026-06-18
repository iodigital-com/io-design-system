---
"@iodigital-com/components": minor
---

feat(io-spinner): aria prop, inherit size, forced-colors support (#647)

- Add `aria` prop: `Partial<Record<'aria-label'|'aria-describedby'|'aria-live'|'aria-atomic', string>>` — spreads ARIA attrs onto Host; `aria['aria-label']` takes precedence over the `label` prop
- Add `'inherit'` to `IoSpinnerSize` union — renders `1em × 1em`, scales with parent `font-size`
- Add `@media (forced-colors: active)` CSS rule: `border-color: Canvas; border-top-color: ButtonText` so the spinning arc remains visible in Windows High Contrast Mode
