---
"@iodigital-com/components": patch
---

fix(io-toast, io-banner): live region mounts, focus restore, stacked dismiss, dismiss double-emit

io-toast: host role is now always "status" (never mutates to alertdialog); a separate always-mounted role="alert" assertive region is populated only for persistent/error toasts, preventing screen-reader live-region re-registration. The toast manager now shows up to 3 toasts simultaneously with independent auto-dismiss timers, and exposes `dismiss(id?)`, `dismissAll()`, and `getQueue()` on both the manager and the io-toast element.

io-banner: the inner live-region wrapper is now always present in the DOM and toggled via aria-hidden + CSS display:none (fixes NVDA/JAWS first-open missed announcement). Focus management refactored: opener element is captured on open and restored on dismiss (WCAG 2.4.3). Focus moves to the dismiss button whenever open && dismissible transitions become true (including runtime toggles). A _dismissing guard prevents duplicate dismiss events from rapid Escape presses; an exit animation plays before open is set to false.
