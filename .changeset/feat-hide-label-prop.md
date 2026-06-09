---
'@io-digital/components': minor
---

feat(hideLabel): add hideLabel prop to IoInput, IoSelect, IoTextarea, IoPinCode, IoMultiSelect, IoButtonGroup

When `hideLabel={true}` the label area is visually removed and all vertical space it
occupied collapses — no gap, no reserved height above the component.

- **IoInput / IoTextarea / IoSelect / IoButtonGroup**: existing `hideLabel` prop now fully
  collapses the wrapper `padding-top` via `:host([hide-label])` CSS rules; the `sr-only`
  label stays in the DOM so `<label for>` association remains intact for screen readers.
- **IoPinCode**: new `hideLabel` prop — hides the label `<span>` and sets `aria-label` on
  the group Host so screen readers still receive an accessible name.
- **IoMultiSelect**: new `hideLabel` prop — hides the `<label>` element and switches both
  the combobox trigger and listbox from `aria-labelledby` to `aria-label` when hidden.
- All six components emit a `console.warn` when `hideLabel=true` and no `label` is provided.
- Storefront configurators for all six components now expose `hideLabel` as a boolean toggle.
