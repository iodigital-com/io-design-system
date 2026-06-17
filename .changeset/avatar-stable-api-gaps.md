---
"@io-digital/components": minor
---

feat(io-avatar): add `role` prop and fix ARIA role/label logic (#626)

- Add `IoAvatarRole = 'img' | 'presentation' | 'none'` type
- Add `@Prop() role?: IoAvatarRole` — auto-computed from rendering mode when omitted
- Default: `role="presentation"` when image is visible (img alt carries accessible name); `role="img"` for initials and icon-only modes
- `aria-label` set only when `role="img"`: initials → `name`, icon → `alt || name || 'User avatar'`
- Add `--io-avatar-icon-size: var(--io-icon-size-md)` token to app.css (fixes undefined token in styles)
- Update storefront API, accessibility pages and stories
