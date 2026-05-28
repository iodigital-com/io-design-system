---
'@io-digital/components': major
---

**BREAKING**: Remove `variant="text"` from `io-wordmark`.

The typographic web-font wordmark variant has been removed. The `IoWordmarkVariant` type is now `'mark' | 'lockup'` and the default variant changes from `'text'` to `'mark'`.

The following props are also removed as they were exclusive to the text variant:
- `mono`
- `href`
- `target`
- `rel`

**Migration:**

| Before | After |
|--------|-------|
| `<io-wordmark />` | `<io-wordmark variant="mark" />` |
| `<io-wordmark variant="text" />` | `<io-wordmark variant="mark" />` |
| `<io-wordmark href="/" />` | Use a native `<a>` wrapping `<io-wordmark variant="mark" />` |
| `<io-wordmark mono />` | Use `color="black"` or `color="white"` for consistent colour |

Use `variant="lockup"` for any placement that requires the official brand name alongside the mark.
