---
"@iodigital-com/components": minor
---

fix(io-button-group): correct type default, compact padding, icon support, label alignment

- **#598** — `type` prop now defaults to `'single'` (was `'multiple'`). The storefront, configurator, and API docs all documented `'single'` as the default; the component was incorrect.
- **#599** — `--io-button-group-padding-x-compact` changed from `6px` to `var(--io-space-3)` (12px), matching the existing dark-theme override value and removing visual cramping in compact mode.
- **#600** — Icon support added: pass `icon="icon-name"` on child `<io-button>` elements to render a Lucide icon before the label. The icon name is extracted during slot parsing (reading the JS property first, falling back to the attribute) and forwarded to an internal `<io-icon size="sm">` element. Text-only groups are unaffected.
- **#602** — Label misalignment fixed: `flex-direction: column` baked into `:host` CSS permanently so the label always stacks above the group. Previously a conditional `<Host style={...}>` was fragile and failed to apply when `compact` prop changed.
