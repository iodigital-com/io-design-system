---
'@iodigital-com/components': minor
---

feat(io-input-password, io-input-search, io-input-date): add spellCheck prop and label/description/message slots (#913, #931)

- Add `spellCheck?: boolean` prop to io-input-password, io-input-search, and io-input-date, passed through to the native `<input spellcheck>` attribute (matching io-input's existing spellCheck prop)
- Add `slot="label"`, `slot="description"`, and `slot="message"` slots to all three components, following the same pattern as io-input
  - `slot="label"` renders inside the `<label>` element for rich label markup
  - `slot="description"` replaces the plain-text `helperText` prop when rich content is needed
  - `slot="message"` replaces the plain-text `message` prop in error/success/warning states
- Slot presence is tracked via `onSlotchange` on each `<slot>` element (not `@Listen`)
