---
"@iodigital-com/components": patch
---

Add automatic dark-mode via `@media (prefers-color-scheme: dark)` and `.io-scheme-*` utility classes; add missing dark-mode overrides for overlays, shadows, and primary tints; fix `--io-focus-inner` contrast on solid buttons via `outline + outline-offset`; replace primitive token references in io-tag, io-tag-dismissible, io-badge, io-pagination, and io-sheet with semantic tokens that flip in dark mode; add `@media (forced-colors: active)` blocks to io-button, io-input, io-checkbox, io-radio, io-select, io-tag, and io-badge for WCAG 1.4.1 / 1.4.11 Windows High Contrast Mode support.
