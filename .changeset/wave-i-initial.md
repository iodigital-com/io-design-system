---
"@io-digital/components": minor
"@io-digital/components-react": minor
"@io-digital/components-vue": minor
"@io-digital/components-angular": minor
---

feat(wave-i): modal open/close methods, input readonly+slots, FACE form integration, axe-core a11y testing

- `io-modal`: add programmatic `open()` and `close()` `@Method`s (#164)
- `io-input`: add `readonly` prop and `prefix`/`suffix` named slots (#165)
- `io-input`, `io-textarea`, `io-select`, `io-checkbox`, `io-radio`: implement form-associated custom elements (FACE) — values now participate in native `<form>` submit and `FormData` (#166)
- `io-*`: systematic WCAG 1.4.11 non-text contrast audit; failing token values corrected (#230)
