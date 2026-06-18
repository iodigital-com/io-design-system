---
"@iodigital-com/components": minor
---

fix(io-multi-select): auto-placement bug, chip touch targets, blur/toggle events, formStateRestoreCallback (#649)

- CRITICAL: fixes dropdownDirection=auto always resolving to bottom-start (flip middleware now active for auto; pinned directions use new getMultiSelectPinnedMiddleware without flip)
- WCAG 2.5.8: chip remove buttons now have 24x24px minimum touch target (min-width/min-height)
- Adds blur event for touched/dirty form tracking (emitted from trigger onBlur when dropdown is closed)
- Adds toggle event signalling dropdown open/close state changes
- Adds formStateRestoreCallback for browser form state restoration (supports FormData and comma-separated string)
