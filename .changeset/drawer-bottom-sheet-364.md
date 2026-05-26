---
'@io-digital/components': minor
---

feat(io-drawer): add bottom-sheet behavior for placement=bottom

When `placement="bottom"`, the drawer now renders as a mobile-optimised bottom
sheet:

- Drag handle bar rendered at the top of the panel (32px × 4px, 2px border-radius,
  `var(--io-border-hover)` color) with `aria-hidden="true"`
- `max-height: 85vh` constraint so the panel does not full-screen
- Top corners rounded with `var(--io-border-radius-lg) var(--io-border-radius-lg) 0 0`
- Swipe-down gesture on the handle closes the drawer (threshold: 80px downward
  movement via `touchstart`/`touchmove`/`touchend`)
- Touch listeners are attached in `show()` and removed in `close()` — not in
  `connectedCallback` — so they only fire while the drawer is open
- `closeOnBackdrop` remains fully functional in sheet mode
- No behavioural changes to `left`, `right`, or `top` placement
