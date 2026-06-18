---
"@iodigital-com/components": minor
---

fix(io-tooltip): WCAG 1.4.13 hoverable tooltip panel and 12 floating-ui placement variants (#663)

**Bug fixes (WCAG 1.4.13 — hoverable):**
- Removed `pointer-events: none` from the global tooltip overlay (`.io-tooltip-overlay` in `app.css`) and the shadow CSS (`io-tooltip-styles.ts`). The tooltip panel is now interactive so users can move the pointer into it to read or copy content.
- Added a 150 ms hide-delay (`scheduleHide()`) after `pointerout` from the trigger, giving the pointer time to travel onto the panel without the tooltip disappearing.
- If the pointer enters the tooltip panel (`pointerover` on the overlay element), any pending hide timer is cancelled immediately.

**New features:**
- `IoTooltipPlacement` type extended from 4 → 12 variants, matching all floating-ui placement strings:
  `top | top-start | top-end | bottom | bottom-start | bottom-end | left | left-start | left-end | right | right-start | right-end`
- `isPlacement()` guard updated to recognise all 12 values; invalid attribute values still fall back to `'top'`.
