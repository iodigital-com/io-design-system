---
"@iodigital-com/components": minor
---

feat(io-tabs): add size, compact, labelledby, and panelIds props

- `size: IoTabsSize` ('small' | 'medium') — controls tab button font-size via CSS class
- `compact: boolean` — reduces tab button padding using density tokens (reflects to host attribute)
- `labelledby?: string` — renders aria-labelledby on the tablist div for WCAG 4.1.2 compliance
- `panelIds?: string[]` — maps 1:1 to slotted buttons; sets aria-controls on each button for full ARIA tabs pattern
