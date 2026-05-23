---
'@io-digital/components': minor
---

feat(wave-x): add io-form-field, io-radio-group, and io-checkbox-group compound components (#196)

`io-form-field` — wraps a single slotted form control (io-input, io-select, io-textarea, io-checkbox, io-radio) and auto-wires label/id, aria-describedby, and aria-invalid accessibility attributes.

`io-radio-group` — renders a semantic fieldset/legend around slotted io-radio children, propagates the name prop and checked state, and emits a group-level change event with the selected value.

`io-checkbox-group` — renders a semantic fieldset/legend around slotted io-checkbox children, propagates the name and disabled props, and emits a group-level change event with all currently checked values.
