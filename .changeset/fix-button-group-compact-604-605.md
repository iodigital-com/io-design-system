---
"@iodigital-com/components": patch
---

fix(io-button-group): compact mode border-radius and icon size (#604, #605)

**Border-radius (#604):** `--io-button-group-btn-radius-compact` was hardcoded to `12px` — the same radius as the pill container — making each button look like an individual pill. Changed to `calc(var(--io-button-group-pill-radius) - var(--io-button-group-pill-padding-compact))` (10px), matching the optical-inset pattern used by normal mode.

**Icon size (#605):** Icon size inside the group button was hardcoded to `"sm"` regardless of the `compact` prop. Compact buttons have a 24px visual height; `sm` icons were oversized relative to the container. Changed to `size={compact ? 'xs' : 'sm'}` so compact mode renders 12px icons.
