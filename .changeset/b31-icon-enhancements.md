---
"@iodigital-com/components": minor
---

feat(io-icon): expand size scale to 11 steps, add contrast-higher/lower colors, and document 507-icon registry

- IoIconSize now includes 2xs (8px) and 2xl–5xl (40–80px), totaling 11 steps: 2xs | xs | sm | md | lg | xl | 2xl | 3xl | 4xl | 5xl | inherit
- New CSS tokens added to app.css: --io-icon-size-2xs through --io-icon-size-5xl
- IoIconColor adds contrast-higher (--io-text-contrast-higher → #000000) and contrast-lower (--io-text-contrast-lower → #C4C4C4), completing the 5-stop neutral ramp
- New semantic tokens --io-text-contrast-higher and --io-text-contrast-lower with full dark-mode overrides
- io-icon-styles.ts updated with all new size and fixed-width CSS rules
- Storefront configurator propDefinitions updated to expose all 11 sizes and 10 color options
- iconStorySizes story updated to render all 10 numeric size steps
- Icon registry already at 507 Lucide glyphs (exceeds the ~150 target from #1058)
- All new tokens registered in docs/public-css-api.json and docs/token-runtime-reconciliation.json

Closes #1067, #1058, #1073
