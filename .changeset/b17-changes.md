---
"@iodigital-com/components": patch
---

refactor(forms): extract shared FACE utilities — syncFormState, StateMessage, Required, IO_FIELD_STATES

- **#1141** Add `src/utils/form/sync-form-state.ts` — centralises ElementInternals wiring across all 8 form components. Fixes the `disabled=true` invalid-form-control-not-focusable browser error by skipping `setValidity` for disabled fields. Refactored: io-input, io-textarea, io-checkbox, io-radio, io-select, io-switch, io-multi-select, io-pin-code.
- **#1151** Add `src/components/common/state-message/StateMessage.tsx` — shared functional component for error/success/warning message rendering. `role="alert"` for error, `role="status"` for success/warning. Adopted by io-input, io-textarea, io-checkbox, io-radio, io-select.
- **#1143** Add `src/components/common/required/Required.tsx` — shared functional component for the required asterisk indicator (`aria-hidden="true"`). CSS class unified to `.io-required` across all form components.
- **#1171** Add `IO_FIELD_STATES` runtime constant to `src/utils/field-state.ts` and mirror to `io-storefront/src/utils/field-state.ts`. Storefront stories for io-input, io-textarea, io-checkbox, io-radio, io-select, io-input-search, io-input-password, io-input-date, io-pin-code now use `[...IO_FIELD_STATES]` instead of literal arrays.
- **#1140** Document warning state semantics with JSDoc in `field-state.ts`: warning is advisory-only, never affects FACE validity, uses `role="status"` (polite). Add `field-state.spec.ts` locking the FACE/role contract.
