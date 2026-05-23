# @io-digital/components

## 1.2.0

### Minor Changes

- 477e2b5: feat(io-tag): add `label` prop for contextual remove button accessible name

  Adds a `label` string prop to `io-tag`. When `removable` is `true`, the remove
  button's `aria-label` is set to `"Remove ${label}"` instead of the generic `"Remove"`,
  so screen reader users can identify which tag will be removed (WCAG 2.4.6, 4.1.2).

  Also fixes the remove button touch target to meet the 44×44 px minimum
  (WCAG 2.5.5) by adding `min-height` to `.tag-group` and `min-width` / `min-height`
  to `.tag__remove` via `var(--io-touch-target-min)`.

## 1.1.0

### Minor Changes

- d077906: feat(wave-i): modal open/close methods, input readonly+slots, FACE form integration, axe-core a11y testing

  - `io-modal`: add programmatic `show()` and `close()` `@Method`s (#164)
  - `io-input`: add `readonly` prop and `prefix`/`suffix` named slots (#165)
  - `io-input`, `io-textarea`, `io-select`, `io-checkbox`, `io-radio`: implement form-associated custom elements (FACE) — values now participate in native `<form>` submit and `FormData` (#166)
  - `io-*`: WCAG 1.4.11 audit — introduce `--io-border-interactive` (#767676) token; fix failing contrast on `io-checkbox`, `io-radio`, and `io-select`/`io-option` checkbox indicators (#230)
