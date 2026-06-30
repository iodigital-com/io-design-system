---
"@iodigital-com/components": minor
---

fix(global): add prefers-color-scheme fallback, color-scheme to :root, and forced-colors focus-ring support

- Resolves #1118: `@media (prefers-color-scheme: dark)` block mirrors `[data-theme="dark"]` so consumers without a theme JS switcher get dark tokens automatically when the OS is in dark mode
- Resolves #1133: `color-scheme: light dark` added to `:root` so native UI elements (scrollbars, form controls) adapt to the active scheme
- Resolves #1103: `@media (forced-colors: active)` redefines `--io-shadow-focus-ring` to use `ButtonText`/`ButtonFace` system colours so the focus ring remains visible in Windows High Contrast Mode (WCAG 2.4.7, 1.4.11)
