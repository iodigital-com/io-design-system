---
"@iodigital-com/components": minor
---

fix(io-toast-item): mark decorative variant icon with aria-hidden=true to prevent double-announcement by screen readers

feat(io-toast): add --io-toast-position-offset and --io-toast-stack-gap public CSS tokens for consumer fine-tuning of corner spacing

feat(io-toast-item): add showProgress prop rendering a countdown progress bar that pauses on hover/focus-within and respects prefers-reduced-motion

feat(io-toast): support multi-action toasts via actions array on IoToastMessage; backward-compatible with existing actionLabel/actionHref API

feat(io-banner): add named heading slot for rich title content (inline links, interpolated text); falls back to heading prop

refactor(io-banner): replace four inline SVG paths with io-icon using shared getNotificationIconName utility

refactor(io-banner): compose io-button for action and dismiss controls; remove bespoke .banner__action and .banner__dismiss CSS

feat(io-inline-notification): add named heading slot for rich title content

refactor(io-inline-notification): replace four inline SVG paths with io-icon using shared getNotificationIconName utility

refactor(io-inline-notification): compose io-button for dismiss control; remove bespoke raw button with inline SVG
