---
'@iodigital-com/components': patch
---

fix(a11y): keyboard navigation and focus trap fixes for io-scroller, io-table, io-tag, and io-sheet

- io-scroller: implement Arrow key keyboard handlers on the scrollable region (WCAG 2.1.1)
- io-table: add tabIndex=0 to scroll wrapper so keyboard users can reach overflowed content (WCAG 2.1.1)
- io-tag: replace disabled attribute with aria-disabled to keep disabled tags in tab order (WCAG 2.1.1)
- io-sheet: simplify focus trap to use document.activeElement exclusively — shadowRoot.activeElement returns the slot host, not the focused node, causing incorrect Tab wrap behaviour (WCAG 2.1.2)
