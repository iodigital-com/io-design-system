---
"@iodigital-com/components": minor
---

fix(io-drawer, io-modal): restore focus to trigger element on close (WCAG 2.4.3); include slotted footer elements in modal focus trap (#1091, #972)

- io-drawer: capture `focusTrigger` before `showModal()` on open; restore via `.focus()` on close
- io-modal: `setupFocusTrap()` now collects slotted light-DOM children via `slot.assignedElements({ flatten: true })` in addition to shadow-DOM focusables, so slot="footer" buttons are reachable by Tab
