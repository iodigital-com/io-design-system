---
"@iodigital-com/components": patch
---

fix(io-modal): render dialog inside backdrop div to prevent z-index hit-test interception

In preventTopLayer mode the <dialog> had `position: fixed; z-index: calc(var(--io-z-modal) + 1)`.
This caused the browser's hit-test to land on the elevated shadow-DOM element instead of the
slotted light-DOM IoButton children. React 18 would then retarget the click to <io-modal> and
never traverse down to the `onClick` handlers on `slot="footer"` buttons.

Fix: the <dialog> is now rendered as a child of the backdrop <div> (not a sibling). The backdrop
div is the `position: fixed; flex-center` container; the dialog is a regular block element inside
it with no explicit z-index. Without the elevated z-index the shadow-DOM element no longer
intercepts pointer events, and real user clicks on Cancel/Save footer buttons reach React correctly.

The backdrop click-to-close handler now checks `ev.target === backdropEl` to distinguish clicks
on the empty backdrop area from clicks that bubble up from inside the dialog panel.
