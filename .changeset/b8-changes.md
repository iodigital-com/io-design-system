---
"@iodigital-com/components": patch
---

Fix form and notification live-region and accessibility correctness (#1094, #1092, #941, #1024, #1076). Error live-regions in io-input, io-checkbox, io-radio, and io-textarea are now permanently mounted with aria-describedby pre-established before any error occurs. io-checkbox and io-radio gain a ::after pseudo-element extending the hit zone to 24 px minimum (WCAG 2.5.8). io-radio mutual exclusion is now scoped to the nearest io-radio-group, preventing cross-group interference when two groups share the same name. io-inline-notification moves role/aria-live off the Host element onto the inner div with a variant-keyed remount so severity changes are re-announced. io-banner keeps its live-region wrapper permanently mounted, toggling visibility via aria-hidden and display:none so the first-open announcement is reliable across NVDA, JAWS, and VoiceOver.
