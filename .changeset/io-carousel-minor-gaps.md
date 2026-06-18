---
"@iodigital-com/components": minor
---

fix(io-carousel): boundary disabled states, previousIndex in update event (#639)

- WCAG 4.1.2: prev/next buttons disabled at boundaries when rewind=false
- Contextual aria-labels at boundaries for rewind=true
- IoCarouselUpdateDetail now includes previousIndex
