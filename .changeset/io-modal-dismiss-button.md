---
"@iodigital-com/components": minor
---

feat(io-modal): add `dismissButton` prop and WCAG 4.1.2 accessible-name warning (#646)

- Add `@Prop() dismissButton = true` — when `false`, hides the built-in close (×) button and suppresses ESC-key / native cancel-event dismissal; enables confirmation-style dialogs where the user must explicitly choose an action
- Add dev-time `console.error` in `componentWillLoad()` when no accessible name is provided (`heading`, `aria-label`, or `aria-labelledby`) to enforce WCAG 4.1.2 dialog labelling requirement
