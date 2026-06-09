---
'@io-digital/components': patch
---

fix(io-input, io-select, io-textarea, io-pin-code): suppress eager FACE error state before user interaction

Required fields no longer show error state on mount. `faceInvalid` is now gated behind an internal `touched` flag that is set on the first blur event. Consumers who need immediate validation can still drive error state via the `state="error"` prop. `touched` resets on form reset.
