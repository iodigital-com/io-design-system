---
"@iodigital-com/components": minor
---

**io-checkbox** (#917): Refactor indeterminate input tracking to use an element ref (`nativeInputEl`) instead of `componentDidRender` shadow root query. Eliminates a repeated DOM query on every render cycle. Internal implementation improvement — no API change.

**io-select** (#914): Add `options-status` slot to the custom combobox listbox for async loading and error states. When content is slotted, the "No options" empty state is suppressed and the slot container is shown with `aria-live="polite"` for screen reader announcements. Usage: `<span slot="options-status">Loading...</span>`.

**io-switch** (#946): Add `alignLabel` prop (`'start' | 'end'`, default `'end'`) and `stretch` prop (`boolean`, default `false`). `alignLabel="start"` places the label before the toggle (row-reverse); `stretch=true` fills the available width with the toggle pushed to the opposite side — useful for settings list rows.
