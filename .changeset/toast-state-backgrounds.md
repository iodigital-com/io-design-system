---
"@iodigital-com/components": patch
---

**io-toast-item:** replace left-border accent with state background colors.

- Removed `--io-toast-item-accent-border-width` token and the 4px left accent border
- Each variant now uses its soft state token as the card background (`--io-color-{state}-soft`)
- Added frosted glass effect via `backdrop-filter: blur(var(--io-toast-item-blur, 12px))`
- Added `--io-toast-item-blur` token (default 12px) for consumer override
- Neutral variant keeps `--io-bg-card` (white); icon retains accent color as state indicator
