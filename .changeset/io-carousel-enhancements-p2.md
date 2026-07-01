---
"@iodigital-com/components": minor
---

feat(io-carousel): add intl prop, trimSpace/edgeFade/focusOnCenterSlide layout props, and fix aria-live WCAG SC 2.2.2

- **#1030 (WCAG SC 2.2.2):** `aria-live` attribute on the slide announcement region is now always `polite`. During autoplay the region content is kept empty (silent) instead of toggling `aria-live` to `off`, which violated SC 4.1.3 and SC 2.2.2.
- **#1041 (intl):** New `@Prop() intl?: Partial<IoCarouselIntl>` — provide any subset of `{ prev, next, label, skip }` to override the individual string props for localisation. Individual props remain backward-compatible.
- **#1031 (layout):** Three new layout props:
  - `trimSpace: 'start' | 'end' | 'both' | 'none'` (default `'none'`) — trims the blank gap before the first or after the last slide.
  - `edgeFade: boolean` (default `false`) — adds a CSS gradient fade at the carousel track edges. Width is configurable via `--io-carousel-edge-fade-width` (default `64px`).
  - `focusOnCenterSlide: boolean` (default `false`) — centers the active slide in the visible track viewport when scrolling.
