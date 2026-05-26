---
"@io-digital/components": minor
---

feat(io-text, io-heading): add typography primitive components (#346)

Adds two new light DOM typography primitives:

- **io-text**: Body copy component rendering `p`, `span`, `div`, `blockquote`, or `time` with token-driven font size (`xs`–`xl`), weight (`regular`–`bold`), color (8 semantic values), alignment, and optional single-line ellipsis truncation.

- **io-heading**: Heading component rendering `h1`–`h6` with token-driven font size (`sm`–`4xl`), weight (`regular`/`semibold`/`bold`), color (`primary`/`secondary`/`inherit`), alignment, and optional ellipsis. Visual size is fully decoupled from semantic heading level. Logs a dev warning and falls back to `h2` if the required `tag` prop is omitted.

Both components use **light DOM** (no Shadow DOM) intentionally — typography primitives must be fully stylable from outside.
