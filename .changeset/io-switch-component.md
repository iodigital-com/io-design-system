---
"@io-digital/components": minor
---

feat(io-switch): FACE toggle/switch component with role=switch and keyboard nav (#342)

Adds the `io-switch` web component — a form-associated toggle switch with:
- `role="switch"` on the interactive element with `aria-checked` state
- FACE pattern: `formAssociated: true`, double optional-chaining on all `internals` calls
- `formResetCallback()` restores initial checked state
- `syncFormValue()` submits value when on, null when off
- Required validity via `setValidity({ valueMissing: true })`
- Space toggles; Enter not intercepted (preserves form submit)
- Token-driven pill track + animated thumb with `var(--io-motion-fast)` transition
- Error state: track uses `var(--io-color-error)` when `error=true` or `faceInvalid=true`
- Focus ring via `var(--io-focus-ring-active)` on track
- New CSS tokens: `--io-switch-track-width/height/radius`, `--io-switch-thumb-size/radius/offset-off/offset-on`
