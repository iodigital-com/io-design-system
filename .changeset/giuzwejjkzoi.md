---
"@iodigital-com/components": patch
---

fix: resolve post-parity release blockers

- Remove internal reference terms from component source, JSDoc, and storefront pages
- Delete dead CSS selectors in io-modal-styles (backdrop shading block, CSS-var-in-@media fullscreen breakpoint)
- Remove orphaned public-css-api.json token entry for removed CSS var
- Fix io-modal focus trap to resolve slotted elements via assignedElements({ flatten: true })
- Fix io-multi-select nested button structure (button > button is invalid HTML5)
- Add @State faceInvalid to io-radio-group for WCAG 4.1.3 re-render on validation change
- Set shadow: { delegatesFocus: true } on io-toast and io-segmented-control (was shadow: true)
- Fix io-banner double keydown listener (connectedCallback registers, componentWillLoad was redundant)
- Simplify io-progress aria-valuenow to pure inline integer rounding (removes @State mutation in render)
