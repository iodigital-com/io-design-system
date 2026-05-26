---
"@io-digital/components": minor
---

feat(io-modal,io-drawer): add background prop and motion lifecycle events (#357)

- Adds `background: 'canvas' | 'surface' | 'elevated'` prop to `io-modal` and `io-drawer` (default `'canvas'`). Maps to `--io-bg-page`, `--io-bg-surface`, and `--io-bg-raised` tokens respectively.
- Adds `motionVisibleEnd` event emitted after the open animation/transition completes (`transitionend` on the panel element).
- Adds `motionHiddenEnd` event emitted after the close animation/transition completes.
- Transition listener is attached in `componentDidLoad` and cleaned up in `disconnectedCallback`.
