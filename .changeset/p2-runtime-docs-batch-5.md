---
"@iodigital-com/components": minor
---

P2 batch 5 — runtime/docs fixes: flyout backdrop token (#875), popover open event (#849), tabs update contract (#829)

- io-flyout: replace cross-component `--io-drawer-backdrop` with scoped `--io-flyout-backdrop` token
- io-popover: add `open` event emitted when panel transitions to open state (symmetric with `dismiss`)
- io-tabs: document that `update` fires only on user interaction, never on programmatic `activeTabIndex` changes
