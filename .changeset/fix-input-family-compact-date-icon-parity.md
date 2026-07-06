---
"@iodigital-com/components": minor
---

Add `compact` prop to `io-input-date`, `io-input-password`, and `io-input-search` for parity with `io-input`. Remove `date`/`time` from `io-input`'s `type` prop — use `io-input-date` instead, avoiding two components that do the same job. Fix `io-input-date` rendering both its custom calendar-trigger icon and the native browser calendar icon by hiding `::-webkit-calendar-picker-indicator`.
