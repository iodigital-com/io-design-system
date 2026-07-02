---
"@iodigital-com/components": patch
---

fix(io-icon): switch from SVG sprite/use pattern to inline SVG path rendering

The `<use href="#symbol">` pattern failed to render in Chrome when symbols were defined in a zero-size sprite container outside Shadow DOM. Icons now render their paths directly as inline SVG, eliminating the cross-document symbol reference issue.
