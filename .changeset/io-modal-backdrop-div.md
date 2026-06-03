---
"@iodigital-com/components": patch
---

fix(io-modal): render backdrop as shadow DOM div — fixes slot pointer events in React 18

**Root cause:** When `preventTopLayer=true`, making the `:host` element the
full-screen backdrop (`position: fixed; inset: 0`) causes the host to intercept
pointer events on slotted light-DOM children (`slot="footer"` IoButton elements).
Since slotted content lives in the light DOM at the host level, any click on
the visual footer area was being captured by the host backdrop before reaching
the IoButton elements — making Cancel/Save footer buttons unclickable.

**Fix:** Following the Porsche Design System pattern, the backdrop is now a
dedicated `<div class="modal__backdrop">` rendered inside the shadow DOM
*before* the `<dialog>`, and the `:host` stays as `display: contents` always.
This removes the host from the pointer-event path entirely:

- Host: `display: contents` — never intercepts pointer events
- `.modal__backdrop`: `position: fixed; inset: 0` — visual backdrop + click-to-close
- `<dialog>`: `position: fixed; z-index: +1` above backdrop
- Slotted footer buttons: rendered in dialog footer via slot, pointer events work correctly
