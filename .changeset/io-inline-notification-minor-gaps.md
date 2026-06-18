---
"@iodigital-com/components": minor
---

feat(io-inline-notification): headingTag prop, warning ARIA role fix, dismiss touch target (#638)

- Adds headingTag prop (defaults to 'h5') replacing unsemantic <strong> for correct document outline
- Fixes WCAG 4.1.3: warning variant now uses role="alert"/aria-live="assertive" (was role="status"/polite)
- Fixes WCAG 2.5.8: dismiss button minimum touch target increased to 24×24px
