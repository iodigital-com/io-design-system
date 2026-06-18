---
"@iodigital-com/components": patch
---

fix(io-divider): add aria-label on labeled variant, default slot support, and forced-colors visibility

- Set aria-label on the labeled divider separator element for better WCAG 4.1.2 label exposure
- Add default slot support as alternative to label prop for rich separator content
- Add @State() hasSlotContent to track when slot has content
- Add onSlotchange handler directly on <slot> element to update slot state
- Render slot content when present, falls back to label prop text
- Add @media (forced-colors: active) rule in styles to ensure divider visibility in Windows High Contrast Mode
- All divider variants (horizontal, vertical, labeled) now use ButtonText color in forced-colors mode
- Add 11 new tests for aria-label, slot handling, and forced-colors support
