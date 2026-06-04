---
"@iodigital-com/components": patch
---

fix: post-release audit fixes — WCAG compliance, FACE reset, a11y coverage

**WCAG fixes**
- `io-input` + `io-textarea` error state now changes `border-bottom-width` alongside `border-bottom-color`, satisfying WCAG 1.4.1 (use of color). New public tokens: `--io-input-border-error-width` and `--io-textarea-border-error-width` (both `2px`).
- `io-select` combobox dropdown border and filter input now use `--io-border-interactive` (#767676, 4.57:1) instead of `--io-border` (~1.3:1), satisfying WCAG 1.4.11.
- `io-select` + `io-textarea` hidden FACE error message (`select-message--hidden` / `textarea-message--hidden`) now has `display: none` — empty `role="alert"` was previously announced by screen readers (WCAG 3.3.1).
- `io-pin-code` focus ring now uses `:focus-visible` instead of `:focus` — ring no longer appears on mouse click.

**FACE fixes**
- `io-checkbox` + `io-radio` `formResetCallback` now clears `faceInvalid = false` before `syncFormValue()`, preventing a spurious validation error on form reset when the default state is `required + unchecked`.

**Token hygiene**
- `io-button-group` focus ring: removed undefined `--io-shadow-focus-ring` fallback — now uses `var(--io-focus-ring-active)` only, consistent with all other components.
- `io-multi-select`, `io-option`, `io-select`: hardcoded `16px`/`18px` icon sizes replaced with `var(--io-icon-size-sm)` / `var(--io-icon-size-md)`.

**Test coverage**
- Added `.a11y.spec.ts` (axe-core) for `io-link`, `io-modal`, `io-pagination`, `io-select`, `io-spinner`, `io-tabs`, `io-textarea`, `io-toast`, `io-tooltip`.
- Added `.disabled.spec.ts` for `io-drawer` and `io-tabs-bar`.
- Migrated `io-banner` + `io-inline-notification` a11y specs from raw `axe.run()` to the shared `renderAndCheckA11y` helper.
- Removed `@ts-expect-error` from `io-scroller.spec.ts` — private state now tested via host class assertions.
