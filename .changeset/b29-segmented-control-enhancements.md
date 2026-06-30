---
"@iodigital-com/components": minor
---

feat(io-segmented-control): align fieldset semantics, reconcile ARIA roles, add validation surface, noWrap scroll mode, and columns prop

- #1080 — wraps segments in an inner `<fieldset role="radiogroup">` with `<legend>` to align group semantics with io-radio-group; removes `role="group"` from Host
- #1084 — moves `role="radio"` and `aria-checked` from the Host onto the inner `<button>` in io-segment to prevent screen-reader double-announcement
- #1074 — adds `required`, `error`, and `errorMessage` props with FACE validity wiring (`valueMissing`), `role="alert"` error message, and `--io-segmented-control-border-error-width` token (WCAG 1.4.1)
- #1072 — adds `noWrap` prop that wraps the slot in `<io-scroller>` for horizontal scroll on many segments
- #1063 — adds `columns` prop (`'auto' | number`) that switches the bar from flex to CSS grid for equal-width segment cells
