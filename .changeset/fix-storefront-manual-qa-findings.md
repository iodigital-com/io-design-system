---
"@iodigital-com/components": patch
---

Fix visual and containment defects found in a manual storefront QA sweep: io-banner's dismiss button no longer renders with an incorrect pill radius, io-toast's close icon is bumped to the canonical 20px size, io-button's `:host` gains `position: relative` so its sr-only loading text no longer escapes shadow-root layout, io-scroller correctly fills its container height, io-flyout's panel now becomes visible when opened, and a set of design tokens (`--io-wordmark-*`, `--io-drawer-*`, `--io-flyout-*`, and segmented control icon/badge tokens) that were declared only under `[data-theme="light"]` are now also defined on the base `:root`, fixing blank/invisible rendering in the default theme.
