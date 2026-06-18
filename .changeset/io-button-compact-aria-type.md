---
"@iodigital-com/components": minor
---

feat(io-button): add compact prop, narrow aria type, fix disabled anchor tab order

- Add `compact` boolean prop (default false) — applies `.btn--compact` CSS modifier with reduced padding (`var(--io-space-1)`) and fixed height (`var(--io-space-8)`) for dense layouts
- Type the `aria` prop as `Partial<Record<IoButtonAriaAttribute, string>>` with `IoButtonAriaAttribute = 'aria-label' | 'aria-description' | 'aria-expanded' | 'aria-pressed' | 'aria-haspopup'`
- Disabled anchor-as-button (href + disabled/loading) now gets `tabIndex=0` so keyboard users retain focus access while `aria-disabled` prevents activation
