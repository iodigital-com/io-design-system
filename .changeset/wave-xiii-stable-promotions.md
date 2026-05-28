---
"@io-digital/components": minor
---

chore: promote 9 beta components to stable (Wave XIII)

Wave XIII audit confirms all quality gates pass and no P0/P1 blockers exist for:
io-alert, io-carousel, io-heading, io-multi-select, io-pin-code, io-popover,
io-scroller, io-switch, io-text.

Evidence per component:
- io-alert: complete spec suite (spec, click, disabled, a11y); all WCAG AA tests pass
- io-carousel: complete spec suite + keyboard, lifecycle, render, utils; drag-parity deferred by design
- io-heading: spec + a11y; non-interactive component — click/disabled specs do not apply
- io-multi-select: complete spec suite (spec, click, disabled, a11y, face); FACE form association verified
- io-pin-code: complete spec suite (spec, click, disabled, a11y, face); FACE form association verified
- io-popover: spec + click + a11y; no disabled prop exists by design (popover has no disabled state)
- io-scroller: spec + a11y; non-interactive container — click/disabled specs do not apply
- io-switch: complete spec suite (spec, click, disabled, a11y, face, watch); FACE form association verified
- io-text: spec + a11y; non-interactive passive element — click/disabled specs do not apply

Storefront documentation expanded:
- io-carousel/usage: added slides-per-page, performance, mobile/touch, keyboard-access sections
- io-popover/usage: added placement/positioning, dismiss-behaviour, advanced-patterns sections
- io-popover/examples: added actions-menu and close-on-outside-click examples
- io-multi-select/examples: added pre-selected, required, maxDisplay, disabled examples
- io-heading/usage: added colour, alignment, size-vs-tag sections
- io-switch/usage: added form-integration and grouping sections
