---
"@iodigital-com/components": patch
---

fix(io-button): add align-self: flex-start to host to prevent flex stretch

When io-button is placed in a flex container with taller siblings, the default
flex align-items: stretch causes the :host element to stretch vertically. Adding
align-self: flex-start to the :host CSS block prevents this unwanted stretching
while preserving inline-flex layout. Fixes #624.
