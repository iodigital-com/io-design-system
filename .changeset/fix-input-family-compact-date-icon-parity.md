---
"@iodigital-com/components": minor
---

Remove the `compact` prop from `io-input`, `io-input-date`, `io-input-password`, and `io-input-search` — redundant with the existing `size` prop. Remove `date`/`time` from `io-input`'s `type` prop — use `io-input-date` instead, avoiding two components that do the same job. Fix `io-input-date` rendering both its custom calendar-trigger icon and the native browser calendar icon by hiding `::-webkit-calendar-picker-indicator`.
