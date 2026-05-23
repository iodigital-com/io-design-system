# @io-digital/components

## 1.1.0

### Minor Changes

- d077906: feat(wave-i): modal open/close methods, input readonly+slots, FACE form integration, axe-core a11y testing

  - `io-modal`: add programmatic `show()` and `close()` `@Method`s (#164)
  - `io-input`: add `readonly` prop and `prefix`/`suffix` named slots (#165)
  - `io-input`, `io-textarea`, `io-select`, `io-checkbox`, `io-radio`: implement form-associated custom elements (FACE) — values now participate in native `<form>` submit and `FormData` (#166)
  - `io-*`: WCAG 1.4.11 audit — introduce `--io-border-interactive` (#767676) token; fix failing contrast on `io-checkbox`, `io-radio`, and `io-select`/`io-option` checkbox indicators (#230)
