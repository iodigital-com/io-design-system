---
"@io-digital/components": minor
---

feat(io-input, io-textarea, io-select, io-checkbox, io-radio): add label, description, and message named slots

All five form-field components now expose three named slots — `label`, `description`, and `message` — that allow rich HTML content (icons, badges, links, formatted text) to be embedded in the label, helper text, and error message areas respectively.

Slot content overrides the corresponding prop (`label`, `helperText`, `errorMessage`) when provided. The prop value is retained as a fallback when no slot content is present, ensuring full backward compatibility.

Key implementation details:
- Slot occupancy is tracked via `@State` boolean flags driven by `slotchange` events — never via CSS `:empty`
- `aria-describedby` IDs remain stable in the DOM; elements are hidden via CSS class when no content is present
- `onSlotchange` is wired directly on `<slot>` elements (not via `@Listen`)
- All slot containers use CSS class toggling with `display: none` for show/hide
