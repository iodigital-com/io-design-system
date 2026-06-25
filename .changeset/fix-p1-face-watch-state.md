---
'@iodigital-com/components': patch
---

fix(p1-face): sync form control state — required propagation, formStateRestoreCallback, FACE edge cases

- io-checkbox-group: add @Watch('required') so runtime required changes re-sync children (#771)
- io-checkbox-group: propagate required prop to child io-checkbox elements in syncChildren (#804)
- io-radio-group: add formStateRestoreCallback for browser autofill and history state restore (#778)
- io-checkbox: add comment clarifying indeterminate + required = valueMissing; add FACE spec coverage (#794)
