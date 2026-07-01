---
"@iodigital-com/components": minor
---

feat(io-tooltip): add theme, max-width, delay tokens, long-press support, WCAG 1.4.13

- Add `theme: 'dark' | 'light'` prop — light theme renders white background with primary text, suitable for use on dark surfaces
- Add `--io-tooltip-max-width` token (default 20rem) — consumer override for panel width
- Add `--io-tooltip-bg` and `--io-tooltip-color` public-api tokens for dark theme colors
- Add `--io-tooltip-show-delay` (default 500ms) and `--io-tooltip-hide-delay` (default 150ms) tokens — read at runtime by the attribute engine
- Touch device long-press support: `pointerdown` + 500ms fires show; `pointerup` before timer cancels; tap-outside dismisses
- Esc dismisses any active tooltip including touch-triggered ones
- Hover show is now delayed via `--io-tooltip-show-delay` (prevents tooltip flash on rapid mouse movement)
- All new tokens registered in `docs/public-css-api.json` and `docs/token-runtime-reconciliation.json` with dark mode overrides

feat(io-progress): add circular and step shape variants

- Add `shape: 'linear' | 'circular' | 'step'` prop (default `'linear'` — existing behavior unchanged)
- Circular variant renders SVG track + fill rings with `stroke-dasharray` bound to percentage; supports all existing `color`, `size`, `animated`, `indeterminate`, `showLabel` props
- Step variant renders segmented bar where `max - min` segments are derived from range; filled segments use existing color tokens
- New public-api tokens: `--io-progress-circle-size-{sm,md,lg}` and `--io-progress-circle-thickness`
- All new tokens registered in `docs/public-css-api.json` and `docs/token-runtime-reconciliation.json`
