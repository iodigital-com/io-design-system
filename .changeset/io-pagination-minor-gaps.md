---
"@iodigital-com/components": minor
---

feat(io-pagination): intl prop for i18n, type=button safety fix, previousPage in change event (#645)

- Adds `intl` prop (IoPaginationIntl) for localizing nav/page/prev/next labels
- Adds `type="button"` to all pagination buttons to prevent accidental form submission
- Extends IoPaginationChangeDetail with `previousPage: number`
