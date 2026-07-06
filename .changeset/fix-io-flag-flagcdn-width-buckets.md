---
"@iodigital-com/components": patch
---

Fix io-flag requesting invalid flagcdn.com image widths. `getFlagSrc` now snaps arbitrary pixel sizes up to the nearest width flagcdn.com actually serves (20/40/80/160/320/640/1280/2560), preventing 404/ORB-blocked flag images at non-standard sizes.
