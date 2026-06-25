---
"@iodigital-com/storefront": patch
---

fix(docs): correct storefront accessibility and API documentation inaccuracies

- io-toast: aria-atomic value corrected from "false" to "true" with accurate description
- io-tooltip API: remove reference to non-existent --io-tooltip-hide-delay token; document hardcoded 150 ms delay
- io-tooltip a11y: add missing WCAG 1.4.13 (Content on Hover or Focus) compliance card
- io-tag-dismissible API: variant type and default corrected from "neutral" to "default"
- io-wordmark API: add missing href and target props to properties table
- io-accordion a11y: fix aria-disabled description — only aria-disabled is set, not native disabled; trigger remains in tab sequence
- io-banner a11y: add missing Escape key row to keyboard interaction table
- io-modal a11y: correct claim that no custom focus trap is used — component implements a custom Tab-key trap alongside native showModal()
