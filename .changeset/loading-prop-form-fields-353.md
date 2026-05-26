---
'@io-digital/components': minor
---

feat(form-fields): add loading prop to io-input, io-textarea, io-select, io-checkbox, io-radio (#353)

When `loading=true`:
- The field is disabled for interaction (`isDisabled = disabled || loading`)
- A spinner (`<io-spinner size="sm">`) is shown in a component-specific position
- `aria-busy="true"` is set on the host element
- The wrapper gets a `*--loading` modifier class (`pointer-events: none`)

Spinner placement per component:
- `io-input`: replaces the suffix slot
- `io-textarea`: absolute-positioned at top-right of the field
- `io-select`: replaces the chevron icon (both native and combobox modes)
- `io-checkbox`: replaces the checkbox control
- `io-radio`: replaces the radio control
