---
"@iodigital-com/components": minor
---

feat(io-toast): action/CTA API for io-toast-item, position prop reflect (#661)

**New features:**

- `actionLabel?: string` prop on `io-toast-item` — when set, renders a secondary call-to-action beside the notification text.
- `actionHref?: string` prop on `io-toast-item` — when set alongside `actionLabel`, renders the CTA as an `<a href>` anchor; when omitted the CTA is a `<button>` that emits the `action` event.
- `@Event({ bubbles: false }) action: EventEmitter<void>` on `io-toast-item` — fires when the action button (not link) is clicked.
- `actionLabel` and `actionHref` added to `IoToastMessage` interface and passed through `io-toast` to `io-toast-item` automatically.

**Bug fixes:**

- `position` prop on `io-toast` changed from `@Prop()` to `@Prop({ reflect: true })` so CSS `:host([position='...'])` selectors work correctly for consumer style overrides.
