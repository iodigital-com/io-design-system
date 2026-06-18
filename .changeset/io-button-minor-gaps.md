---
"@iodigital-com/components": minor
---

feat(io-button): compact prop, typed ARIA attributes, disabled anchor focusability

- Adds `compact` prop — reduces vertical padding via `--io-button-padding-y-compact` token without changing the size classification
- Types `aria` prop as `Partial<Record<IoButtonAriaAttribute, string>>` for compile-time guidance on semantically-relevant ARIA attributes (exports `IO_BUTTON_ARIA_ATTRIBUTES` const)
- Fixes WCAG 2.4.3: disabled/loading anchor-as-button now retains `tabIndex=0` so keyboard users can discover it
