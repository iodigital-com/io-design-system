---
'@iodigital-com/components': minor
---

feat(form): add isParentGroupRequired utility, LoadingMessage live-region primitive, and prefers-contrast media query

- `is-parent-group-required.ts`: new utility that returns true when a host element is a direct child of an `io-checkbox-group` or `io-radio-group` that is `required`. Used by `io-checkbox` and `io-radio` to suppress their own required asterisk (`*`) when the parent group already shows the indicator — prevents duplicate visual markers and double AT announcements (closes #1155)
- `LoadingMessage`: new shared functional component rendering a polite `role="status"` live-region that announces `'Loading'` on entry and `'Loading finished'` on exit. Wired into `io-button` and `io-input` with localizable `loadingDescription` and `loadingFinishedDescription` props. Replaces the inline live-region in `io-button` and adds equivalent coverage to `io-input`. Addresses WCAG SC 4.1.3 Status Messages gap (closes #1157, closes #1046)
- `app.css`: adds `@media (prefers-contrast: more)` block overriding `--io-border-interactive`, `--io-border`, `--io-focus-inner`, and `--io-focus-outer` to maximum-contrast values for users who request more contrast via OS/browser preferences — WCAG SC 1.4.6 AAA (closes #1126)
