---
"@iodigital-com/components": patch
---

fix(io-pin-code): Enter now submits parent form via requestSubmit(); Dead/Process keys recover via blur-rAF-focus; SMS autofill distributes bulk input across all slots. feat(io-pin-code): add `mode` prop ('numeric'|'alphanumeric'), extend `length` range to 1-8, add `description` prop (renders between label and slots, wired into aria-describedby), and add `validationMessage` prop for customising the required-field error string.
