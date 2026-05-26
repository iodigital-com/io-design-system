---
'@io-digital/components': minor
---

feat(forms): add hideLabel prop to visually hide labels while preserving accessibility

- `hideLabel: boolean` prop (default `false`) added to `io-input`, `io-textarea`, `io-select`, `io-checkbox`, and `io-radio`
- When `hideLabel=true`, the label text is rendered but visually hidden using the sr-only technique (`position: absolute; width: 1px; height: 1px; ...`)
- Screen readers and assistive technologies continue to read the label — no accessibility regression
- Dev console warning emitted when `hideLabel=true` and `label` is an empty string, prompting developers to always supply a meaningful accessible label
- `label` prop remains required for accessibility on all components
- Uses `@Prop({ reflect: true })` so `:host([hide-label])` CSS selectors are available for external styling
