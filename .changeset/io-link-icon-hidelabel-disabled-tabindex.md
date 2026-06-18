---
"@iodigital-com/components": minor
---

feat(io-link): add `icon`, `iconSource`, and `hideLabel` props; fix disabled `tabIndex`

- `icon` (IoIconName): renders a leading `io-icon` with `aria-hidden="true"` before the label slot
- `iconSource` (string): renders a custom inline SVG with `aria-hidden="true"` before the label slot
- `hideLabel` (boolean): visually hides the label span (screen-reader accessible) for icon-only links
- Disabled anchor now uses `tabIndex={0}` instead of `tabIndex={-1}` so keyboard users can still focus the element; `aria-disabled="true"` continues to block navigation (WCAG 2.1.1)
