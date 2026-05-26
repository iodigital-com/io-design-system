---
'@io-digital/components': minor
---

feat(io-popover): implement click-triggered floating content panel (#345)

Adds the io-popover web component — a click-triggered floating panel with
accessible dialog semantics (role="dialog", aria-modal="true").

Features:
- placement prop: 'top' | 'bottom' | 'left' | 'right' | 'auto' (default 'bottom')
- open prop: mutable, reflects to attribute
- closeOnClickOutside prop (default true)
- label prop: accessible name via aria-labelledby
- dismiss event: emitted on Escape key or outside click
- trigger named slot: activating element with auto-managed aria-expanded
- default slot: popover panel body content
- Native Popover API (showPopover/hidePopover) with manual fallback positioning
- Focus management: first focusable element on open, trigger on close
- Token-first styling: --io-z-dropdown, --io-shadow-md, --io-border-radius-md, --io-bg-surface
- Full storefront pages: configurator, examples, usage, accessibility, API
