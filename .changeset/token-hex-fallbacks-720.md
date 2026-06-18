---
"@iodigital-com/components": patch
---

fix(tokens): replace hardcoded hex fallbacks with token references

Replaces all var(--io-*, #hex) patterns with var(--io-*, var(--io-semantic-token))
per the token-first convention.
