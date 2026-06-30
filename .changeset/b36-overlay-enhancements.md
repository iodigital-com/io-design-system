---
"@iodigital-com/components": minor
---

feat(overlays): add two-phase enter/exit transitions, fullscreen modal, sheet background/dismiss props, flyout sticky footer, and banner responsive position

- **#1137** — Replace keyframe animations with CSS property transitions across io-modal, io-sheet, io-drawer (via shared tokens), io-flyout. Enter uses longer duration + ease-in (decelerate); exit uses shorter duration + ease-out (accelerate). `prefers-reduced-motion` collapses both phases to 0ms. New tokens: `--io-duration-overlay-enter`, `--io-duration-overlay-exit`, `--io-ease-overlay-enter`, `--io-ease-overlay-exit`, `--io-motion-entrance-offset-down`.
- **#976** — `io-modal` gains `fullscreen: boolean = false` prop. When true, the modal fills the full viewport at or below `--io-modal-fullscreen-breakpoint` (default 640px) and centers on larger screens.
- **#965** — `io-sheet` adds `dismissButton: boolean = true` (controls × button and ESC dismissal) and `disableBackdropClick: boolean = false` (controls backdrop-click dismissal) props. The `dismissible` prop is deprecated but remains functional for one minor version.
- **#974** — `io-sheet` adds `background: 'canvas' | 'surface' | 'elevated' = 'canvas'` prop matching sibling overlay APIs.
- **#989** — `io-flyout` adds `footerBehavior: 'sticky' | 'fixed' = 'sticky'` prop with IntersectionObserver-driven scroll shadow, and a `sub-footer` slot for secondary content rendered after the main footer. New token: `--io-flyout-sticky-top`.
- **#1002** — `io-banner` gains responsive `position` prop (accepts `{ base, s, m, l }` breakpoint object; defaults to `{ base: 'bottom', s: 'top' }`). Banner renders inside `<div popover="manual">` to escape z-index stacking races with native top-layer elements.
