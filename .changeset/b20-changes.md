---
"@iodigital-com/components": patch
---

fix(io-multi-select): improve ARIA semantics, keyboard UX, and field-state parity

- Trigger `aria-label` now summarises selection (e.g. "Label: A, B") so screen readers announce selections without relying on chip DOM order (#937)
- Typeahead: single printable keypress while listbox is open jumps to first matching option; buffer resets after 500 ms (#1077)
- Chevron rotates 180° when dropdown opens, respects `prefers-reduced-motion` (#1075)
- Inline "Clear selection" button placed as sibling of trigger (44×44 px, keyboard-accessible) so users can clear without opening the dropdown (#1111)
- Add `maxSelections` prop; blocks additions beyond the cap and emits `limitreached` event with `{ max, attempted }`; over-limit unselected options rendered `aria-disabled` (#1070)
- Add `description`, `helperText`, and `warning` state props for parity with `io-select` (#910)
