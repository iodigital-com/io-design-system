---
"@iodigital-com/components": patch
---

fix(io-button): implicit Enter-key form submission now works from sibling text inputs

`<io-button type="submit">` now participates in the browser's implicit form submission algorithm. Pressing Enter in a sibling `<input>` (text, email, password, search, tel, url, number) correctly submits the associated form — matching native `<button type="submit">` behaviour.

**Root cause**: the browser's implicit submission algorithm only traverses light DOM for native `<button>` elements. The `<button type="submit">` inside io-button's shadow root was invisible to this algorithm despite `formAssociated: true` being set.

**Fix**: adds a `keydown` listener on the associated form that calls `form.requestSubmit()` when Enter is pressed in a text-like input and this button is the first `io-button[type="submit"]` in the form.

Guards added:
- Only the first `io-button[type="submit"]` in the form triggers submission (matches native "default button" semantics)
- `textarea` Enter is intentionally excluded (inserts newline, not submit)
- Non-text input types excluded (checkbox, radio, file, image, range, color, submit, reset, button)
- `ev.isComposing` guard for IME input
- `disabled` and `loading` states respected
- Listener is cleaned up in `disconnectedCallback` and `formAssociatedCallback`
- `@Watch('type')` and `@Watch('href')` reattach the listener on runtime prop changes
