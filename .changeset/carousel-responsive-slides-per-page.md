---
"@iodigital-com/components": minor
---

feat(io-carousel): add responsive `slidesPerPage` breakpoint map and accurate pagination

`slidesPerPage` now accepts a responsive breakpoint map `{ sm?, md?, lg?, xl? }` that is resolved at runtime via `matchMedia`. Each key corresponds to a min-width breakpoint (sm=640px, md=768px, lg=1024px, xl=1280px); the largest matching key wins. When no key matches the viewport, the value falls back to `1`.

Pagination dots now reflect the actual number of pages (`ceil(totalSlides / slidesPerPage)`) rather than the raw slide count, and each dot navigates to the start of its corresponding page.

When `slidesPerPage` is a number > 1, slotted slides are automatically sized to fill exactly `1/N` of the visible track width via a new `--io-carousel-slides-per-page` internal CSS custom property.
