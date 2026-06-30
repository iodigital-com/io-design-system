---
"@iodigital-com/components": minor
---

feat(motion): add scale-in animation for checkbox icon and radio dot, motion utility getTransition(), and progress transition override token

- io-checkbox: `.checkbox-icon` now scales from 0 to 1 on check/uncheck via `var(--io-duration-xs) var(--io-ease-out)` (120ms ease-out cubic-bezier). Indeterminate icon also animates. Respects `prefers-reduced-motion`.
- io-radio: `.radio-dot` transition updated from `--io-motion-fast` to `--io-duration-xs var(--io-ease-out)` for consistent micro-interaction timing across form controls. Respects `prefers-reduced-motion`.
- global: adds `--io-duration-xs` (120ms) duration primitive and `--io-ease-out` (alias for `--io-motion-easing-ease-out`) for readable micro-interaction CSS.
- motion utility: new `getTransition(property, duration?, easing?)` helper in `src/utils/motion.ts` — centralises transition shorthands so components reference tokens rather than inline values.
- io-progress: fill-width transition routed through `--io-progress-transition-duration` public-api token (defaults to `var(--io-motion-base)`). Consumers can override or set to `0s` to disable. Indeterminate animation duration uses `var(--io-motion-extra-slow)`.
- docs: `[data-theme="only-dark|only-light"]` block in app.css annotated with future `light-dark()` simplification path (#1132). Storefront theming page already documents per-subtree theme overrides.
