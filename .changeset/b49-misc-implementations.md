---
"@iodigital-com/components": minor
---

Add io-product-tile commerce primitive, dialog shared utilities, io-icon SVG sprite deduplication, and BreakpointCustomizable responsive props for io-button.

- feat(io-product-tile): new commerce primitive with heading, price, sale price, like button, image slot, and accessible sr-only price labels (issue #1097)
- refactor(io-modal): extract shared dialog utils (scroll-lock, focus-trap, backdrop-click, inert, transition-end) to utils/dialog/ (issue #959)
- perf(io-icon): add SVG sprite deduplication via shared <symbol> + <use> pattern to reduce DOM clones (issue #1040)
- feat(io-button): add BreakpointCustomizable<T> type for size, hideLabel, and iconPosition props with @media CSS generation (issue #1056)
