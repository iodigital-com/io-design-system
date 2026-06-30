---
"@iodigital-com/components": minor
---

Add shared utility helpers, global CSS utilities, and new tokens.

- **sr-only utility** (#1082): new `getSrOnlyStyles()` helper in `utils/sr-only.ts` centralises the visually-hidden pattern; 12 component style files refactored to consume it; global `.io-sr-only` class added to `app.css`.
- **control-size scale** (#1119): new `--io-control-size-{xs,sm,md,lg,xl}` canonical token scale (24–64px); `--io-touch-target-min-size` duplicate removed; multi-select chip, stepper circle, and pin-code slot tokens now reference the scale.
- **utility classes** (#1095, #1144): new `.io-focus-visible`, `.io-skeleton` (with shimmer keyframe and reduced-motion path), `.io-prose-heading-{xs–xl}`, and `.io-prose-text-{xs–xl}` global utility classes in `app.css`; skeleton tokens `--io-skeleton-duration`, `--io-skeleton-bg-start`, `--io-skeleton-bg-end` added with dark-mode overrides.
- **top-layer controller** (#1150): new `utils/top-layer-controller.ts` — `createTopLayerController()` defers overlay close until exit transition finishes; feature-detects `transition-behavior: allow-discrete`; reduces-motion path is synchronous; fully unit-tested.
- **animateBar helper** (#1160): new `utils/animate-bar.ts` — `animateBar()` JS-driven Web Animations API helper for sliding tab indicators, segmented-control thumbs, and moving markers; reduced-motion path snaps instantly; fully unit-tested.
