---
"@iodigital-com/components": patch
---

fix(io-popover): adopt @floating-ui/dom for viewport-aware positioning with flip, shift, and autoUpdate; add directional arrow indicator via new `arrow` prop and `--io-popover-arrow-size` token; mirror `aria-controls` and `aria-expanded` onto inner shadow-DOM focusables of custom-element triggers while preserving consumer-set `aria-haspopup`; move focus into panel only when opened by keyboard (Enter/Space) per WCAG 3.2.1.
