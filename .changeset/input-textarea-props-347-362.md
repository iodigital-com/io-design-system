---
'@io-digital/components': minor
---

feat(io-input): add `minLength`, `spellCheck`, `autoComplete`, `loading`, `counter`, `form` props; `loading` shows an `io-spinner` and suppresses `input`/`change` events; `counter` renders a live character count when `maxLength` is set; `minLength` wired to FACE validity via `@Watch`

feat(io-textarea): add `readOnly`, `minLength`, `spellCheck`, `loading`, `counter`, `form`, `wrap` props; `readOnly` maps to native `readonly` + `aria-readonly="true"` + dashed-border visual state; all other props mirror io-input semantics; `wrap` forwarded as native `wrap` attribute

Closes #347, Closes #362
