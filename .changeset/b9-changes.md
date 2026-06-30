---
"@iodigital-com/components": patch
---

Unify form error API and fix state consistency across form components. Adds `state`+`message` props to `io-checkbox-group`, `io-radio-group`, and `io-switch` (deprecating `error`/`errorMessage`). Fixes `io-checkbox-group` to preserve per-child state when group state is `'none'`. Extends `io-checkbox-group` aria denylist with `aria-required` and `role`. Removes double error `<p>` rendering from `io-input-password`, `io-input-search`, and `io-input-date`. Makes `name` prop optional (non-null-asserted) on `io-radio-group` and `io-checkbox-group`, emitting a `console.error` when omitted.
