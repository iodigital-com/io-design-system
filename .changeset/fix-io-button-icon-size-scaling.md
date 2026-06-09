---
'@io-digital/components': patch
---

fix(io-button): scale icon size with button size prop

Icon rendered by `renderIcon()` was hardcoded to `size="sm"` regardless
of the button's `size` prop. Adds `ICON_SIZE_MAP` (sm→sm, md→sm, lg→md,
xl→lg) so icon-only and regular icon-bearing buttons are visually balanced
at all four sizes.
