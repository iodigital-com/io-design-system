---
'@io-digital/components': patch
---

chore(io-drawer, io-wordmark): tokenize hardcoded styles and promote to stable

- io-drawer: replace hardcoded 320px/480px/640px widths with `--io-drawer-width-sm/md/lg` tokens; replace raw `rgba(0,0,0,0.5)` backdrop with `--io-drawer-backdrop` token; promote sitemap status to stable
- io-wordmark: replace hardcoded 20px/28px/40px font sizes with `--io-wordmark-font-size-md/lg/xl` tokens; replace hardcoded `-0.01em` letter-spacing with `--io-wordmark-letter-spacing` token; promote sitemap status to stable

Closes #381
Closes #386
