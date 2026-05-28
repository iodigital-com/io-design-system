---
"@iodigital-com/components": major
---

**io-banner** redesigned as a fixed viewport overlay: `position: fixed`, card-style appearance (white background, 1px colored border, border-radius, drop shadow), and a slide-in entry animation. No more thick left accent border.

**io-inline-banner renamed to io-inline-notification** (breaking rename): the tag `io-inline-banner` is removed and replaced by `io-inline-notification`. Update all usages — no behaviour change, only the tag name and class name differ.

**io-inline-notification** also adopts the same card-style design as io-banner (without fixed positioning or shadow).
