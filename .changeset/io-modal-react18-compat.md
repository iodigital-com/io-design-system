---
"@iodigital-com/components": patch
---

fix(io-modal): default preventTopLayer to true for React 18 compatibility

`showModal()` promotes `<dialog>` to the browser top layer. React 18 delegates
synthetic events to `#root`, so click events from shadow-DOM children inside a
top-layer dialog do not reach React — causing slotted `slot="footer"` buttons
to be non-clickable.

`preventTopLayer` now defaults to `true`: the modal opens with `show()` and
manages its own backdrop, ESC key, focus-trap, scroll lock, and `inert`
attributes. Behavior is identical for all consumers; React 18 footer buttons
now work correctly without any code changes.

Set `preventTopLayer={false}` explicitly only when native top-layer stacking
is required (e.g. to guarantee the modal appears above Popover API elements).
