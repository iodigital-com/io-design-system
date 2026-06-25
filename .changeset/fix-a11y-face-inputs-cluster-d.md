---
'@iodigital-com/components': minor
---

feat(a11y): full FACE lifecycle and new props for io-input-date, io-input-search, io-input-password, io-multi-select

- io-input-date: add full FACE validity (syncFormValue + @Watch + formResetCallback), readonly, loading, step props; add checkValidity/reportValidity methods; gate faceInvalid on touched; add FACE error element with aria-describedby (WCAG 3.3.1)
- io-input-search: add full FACE validity lifecycle, readonly, loading, maxLength, minLength props; gate faceInvalid on touched; add FACE error element (WCAG 3.3.1)
- io-input-password: add full FACE validity lifecycle, readonly, loading, maxLength, minLength props; gate faceInvalid on touched; add FACE error element (WCAG 3.3.1)
- io-multi-select: wire aria-describedby on combobox trigger to include face-error id when faceInvalid is active, so screen readers can announce FACE validation errors (WCAG 3.3.1, WCAG 4.1.2)
