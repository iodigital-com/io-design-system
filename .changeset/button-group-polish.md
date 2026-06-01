---
"@iodigital-com/components": patch
---

fix(button-group): pixel-perfect alignment, label a11y, compact mode, and API cleanup

- Exact 42px container / 32px button height matching PageHeader reference
- Border radius 12px container / 8px inner (optical inset formula)
- Hover: text color change only — no background (matches reference)
- Compact mode: 4px×6px padding, 12px font, 16.8px line-height, no button border
- Primary variant: solid blue active state; Secondary variant: white fill + shadow
- Label: font-size/weight/color aligned to form-system standard (io-input parity)
- Fix: removed aria-hidden from label span — aria-labelledby association now works
- Fix: removed dead :host([size]) CSS blocks
- Fix: wired --io-button-group-btn-radius-compact into compact block
- Fix: removed stale --io-button-group-hover-bg token
