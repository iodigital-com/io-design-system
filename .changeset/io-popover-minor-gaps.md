---
"@iodigital-com/components": patch
---

fix(io-popover): disconnectedCallback cleanup, aria-haspopup on trigger (#652)

- Fixes memory leak: disconnectedCallback now removes panelEl keydown listener via detachFocusTrap
- Adds aria-haspopup="dialog" to trigger (including inner shadow DOM button for custom elements) for WCAG 4.1.2 compliance
