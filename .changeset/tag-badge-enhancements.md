---
"@iodigital-com/components": minor
---

feat(io-tag, io-badge, io-tag-dismissible): semantic variant API, appearance modifier, icon props, optional label

- io-tag and io-badge: introduce semantic `variant` prop (`neutral | primary | info | success | warning | error | subtle`) replacing brand-colour `color` names; `color` is still accepted with a dev-mode deprecation warning
- io-tag and io-badge: add `appearance` prop (`soft | solid | frosted`) for fill-style control; frosted applies `backdrop-filter: blur` over a translucent fill
- io-tag and io-badge: add `icon` (IoIconName) and `iconSource` (custom SVG URL) props for leading icons; matches io-tag-dismissible API
- io-tag: deprecate `removable` prop with dev-mode console.warn pointing to `<io-tag-dismissible>`; removable still works for backwards compatibility
- io-tag-dismissible: make `label` prop optional; when omitted, the default slot is rendered as chip content and the dismiss button aria-label falls back to slot text content then 'Remove'
