---
'@iodigital-com/components': minor
---

fix(a11y): correct selection component semantics (#839 #856 #859)

- io-select: remove aria-hidden="true" from combobox group heading span; wrap group options in `<ul role="group" aria-labelledby>` so grouped listbox items are programmatically associated (WCAG 1.3.1)
- io-radio-group: replace aria-live="polite" with role="alert" aria-atomic="true" on the error paragraph so screen readers announce validation errors immediately (WCAG 4.1.3)
- io-segmented-control: add `label` and `hideLabel` props; wire `aria-label` to the `role="group"` Host element; log console.error when label is absent (WCAG 4.1.2)
