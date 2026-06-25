---
"@iodigital-com/components": minor
---

fix(a11y): FACE validity, error association, and lifecycle callbacks for io-input-date, io-input-password, io-input-search, io-multi-select

- io-input-date: add full `syncFormValue()` with native validity derivation, `faceInvalid`/`touched` states, `@Watch` decorators for `value`/`required`/`min`/`max`, `formDisabledCallback`, `formStateRestoreCallback`; update render for `showFaceError` + `aria-describedby` wiring (closes #817, #845)
- io-input-password: add `maxLength`/`minLength` props, full FACE validity pattern matching io-input gold standard, `formDisabledCallback`, `formStateRestoreCallback` (closes #835)
- io-input-search: add full FACE validity pattern, fix clear button firing when `disabled=true` (closes #841)
- io-multi-select: wire `aria-describedby` on trigger to include `faceErrorId` when `faceInvalid=true` and no external message (closes #840)
