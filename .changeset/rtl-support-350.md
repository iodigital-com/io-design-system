---
'@io-digital/components': minor
---

feat(a11y): add RTL support to io-button, io-breadcrumb, and io-input

- `io-button`: arrow icons (`forward`, `back`) flip direction in RTL via `:host-context([dir="rtl"])` + `scaleX(-1)`; hover animation shift direction reverses; link variant underline anchors from the right edge
- `io-breadcrumb`: separator glyph (e.g. `›` chevron) mirrors via `scaleX(-1)` in RTL; `ol` element gets `direction: rtl` for correct visual order
- `io-input`: label anchor mirrors from `left: 0` to `right: 0` in RTL; prefix/suffix slot padding swaps sides; error icon mirrors from right to left; `input-field-row` gets `direction: rtl` so prefix/suffix positions swap automatically
- All RTL rules use `:host-context([dir="rtl"])` to traverse the Shadow DOM boundary and respond to `dir="rtl"` on any ancestor element
