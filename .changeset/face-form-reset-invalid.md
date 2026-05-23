---
"@io-digital/components": patch
---

fix(io-checkbox,io-radio): FACE form reset + :invalid support

- `formResetCallback()` restores `defaultChecked` so form.reset() works correctly
- `@State() faceInvalid` tracks FACE invalidity; `aria-invalid` now reflects both the explicit `error` prop and form validation state (WCAG 4.1.3)
- Error border gains `border-width: 2px` as a non-color indicator (WCAG 1.4.1)
- New `:host(:invalid)` CSS rule mirrors the prop-driven error style via browser FACE pseudo-class
- `io-radio.formResetCallback` includes mutual exclusion guard to prevent multiple radios checking after reset
