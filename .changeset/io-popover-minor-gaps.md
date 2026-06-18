---
"@iodigital-com/components": minor
---

fix(io-popover): disconnectedCallback cleanup, aria-haspopup on trigger (#652)

- Fixes memory leak: disconnectedCallback now removes global window click listener
- Adds aria-haspopup="dialog" + aria-expanded to trigger for WCAG 4.1.2 compliance
