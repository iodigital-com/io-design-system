---
"@iodigital-com/components": minor
---

fix(io-button-group): define missing gap token, unique label IDs (#640)

- Defines --io-button-group-btn-gap token in app.css (was referenced but undefined — silent layout collapse)
- Fixes WCAG 4.1.1: label IDs are now unique per instance using an idCounter pattern
