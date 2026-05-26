---
'@io-digital/components': minor
---

feat(io-accordion): add sticky and background props

- `background: 'transparent' | 'surface' | 'canvas'` prop (default `transparent`) — applies `var(--io-bg-surface)` or `var(--io-bg-page)` fill to the accordion host element
- `sticky: boolean` prop (default `false`) — when `true`, the accordion trigger becomes `position: sticky; top: 0` using `var(--io-z-sticky)` to stay visible while scrolling through long expanded content
- Dev warning when `sticky=true` with `background="transparent"` since a transparent sticky header causes content bleed-through
- Both props use `@Prop({ reflect: true })` so they drive `:host([prop])` CSS selectors
