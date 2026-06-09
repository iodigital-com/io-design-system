---
'@iodigital-com/components': patch
---

fix(io-modal): hide footer divider when footer slot is empty

`modal__footer` rendered unconditionally, showing a top-border divider over
nothing when no `slot="footer"` content was slotted. Adds `@State hasFooterSlot`
driven by `slotchange` + `componentDidLoad` init, toggling `.modal__footer--hidden`
(display:none) so the footer and its border only appear when content is present.
