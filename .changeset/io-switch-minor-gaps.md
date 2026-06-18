---
"@iodigital-com/components": minor
---

feat(io-switch): loading prop, hover state, forced-colors HCM, blur event (#654)

- Adds `loading` prop: blocks interaction, shows spinner overlay, sets `aria-busy="true"` on Host
- Adds hover visual state on track via `var(--io-border-hover)` / `var(--io-color-primary-hover)` (WCAG 1.4.11)
- Adds forced-colors / Windows High Contrast Mode support via `@media (forced-colors: active)` (WCAG 1.4.11)
- Adds `blur` event (`EventEmitter<FocusEvent>`) for validation-on-blur patterns
