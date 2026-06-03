---
"@iodigital-com/components": patch
---

fix(io-modal): hide backdrop div when modal is closed — prevents pointer-event interception

The `modal__backdrop` div introduced in 1.0.3 was always visible in the shadow
DOM even when `open=false`, causing it to intercept pointer events on elements
behind the modal (e.g. the "Add location" button on the Locations page was
unclickable because the invisible backdrop div covered the whole viewport).

Fixes:
- `.modal__backdrop` defaults to `display: none; pointer-events: none`
- Backdrop and dialog positioning are both scoped to `:host([prevent-top-layer][open=""])`
  so they only apply when the modal is truly open (Stencil sets `open=""` for
  `open=true`, and removes the attribute for `open=false`)
