---
"@iodigital-com/components": patch
"@iodigital-com/components-angular": patch
"@iodigital-com/components-react": patch
"@iodigital-com/components-vue": patch
---

fix(button-group): restore primary blue active state to match storefront reference style

- Active button background reverted to var(--io-color-primary) (#0000D2) across all theme blocks
- Active button text restored to white for contrast on blue background
- Active border updated to match primary color
- Syncs components-angular, components-react, components-vue to version parity with components
