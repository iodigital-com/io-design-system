---
"@iodigital-com/components": minor
---

fix(io-input,io-textarea): error state visual polish + message/helperText consistency

**io-input + io-textarea — border fix**
Remove `border-bottom-width: var(--io-input-border-error-width)` /
`var(--io-textarea-border-error-width)`. Both tokens were undefined,
causing the browser to fall back to `medium` (3px). Error border now
matches success/warning (1px default).

**io-input — message class fix**
Error message `<p>` was using class `input-error` (no typography rules).
Changed to `input-message input-message--error` — consistent with the
CSS that was already in place.

**io-input — success/warning now show message prop**
`message` prop previously only rendered in error state. Success and
warning states now render the message with appropriate colour
(`input-message--success` / `input-message--warning`) and ARIA role
(`role="status"`).

**io-input — helperText always visible**
`helperText` / `description` slot now renders independently of validation
state. Consumers can provide persistent contextual hints (e.g.
"We'll never share your email") that stay visible alongside error,
success, or warning messages.

**io-input — Lucide state icons**
Replaced custom 14×14 filled SVG paths with Lucide stroke icons:
`circle-alert` (error), `circle-check` (success), `triangle-alert`
(warning). Consistent with Lucide icon language used elsewhere in
the product.
