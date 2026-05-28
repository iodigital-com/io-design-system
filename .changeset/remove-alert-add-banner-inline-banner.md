---
"@iodigital-com/components": major
---

**BREAKING:** Removed `io-alert` and replaced it with two purpose-built components.

- **Removed:** `io-alert` — the single component that mixed page-level and inline use cases
- **Added:** `io-banner` — full-width page-level notification strip controlled by an `open` prop. Dismissing automatically sets `open=false`.
- **Added:** `io-inline-banner` — inline content-level notification that fits within the document flow. Consumer controls visibility by mounting/unmounting.

Both new components share the same four severity variants (`info`, `success`, `warning`, `error`), optional `heading`, optional `dismissible` button with auto-resolved `dismissLabel`, and the same ARIA live region strategy as the removed `io-alert`.

**Migration:**
- Replace `<io-alert>` with `<io-inline-banner>` for form-level and section-level feedback.
- Use `<io-banner open>` for page-wide announcements, maintenance notices, and persistent system messages.
