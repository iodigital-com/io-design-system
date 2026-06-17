---
"@io-digital/components": minor
---

feat(io-checkbox): blur event, compact prop, formStateRestoreCallback, aria-disabled on loading, value default 'on', CSS tokens, keydown guard (#630)

**New features:**
- `blur` event (`EventEmitter<FocusEvent>`, bubbles: false, composed: true) — enables form library touched/dirty tracking. Native blur is stopped before re-emitting via the EventEmitter.
- `compact` prop (`@Prop({ reflect: true }) compact = false`) — dense layout mode scaling checkbox to 75% size with smaller label font via internal `--_io-checkbox-scaling` token.
- `formStateRestoreCallback` — FACE contract implementation enabling browser bfcache restore and autofill for checkboxes.
- `@Listen('keydown')` guard — prevents Space key from toggling when `disabled` or `loading`.

**Bug fixes / alignment:**
- Default `value` changed from `''` to `'on'` to match native HTML checkbox default (RFC 1866 §8.1.2).
- `aria-disabled="true"` added to the native input when `loading=true` (WCAG SC 4.1.2). The native input is now always kept in the DOM when loading — only the visual is swapped via conditional rendering — preventing stale `ref` issues in form libraries.

**CSS tokens:**
- `--io-checkbox-border-color` — consumer override for resting/hover border colour.
- `--io-checkbox-background-color` — consumer override for checked/indeterminate fill colour.
- `--io-checkbox-icon-color` — consumer override for checkmark/dash icon colour independent of fill.
- Removed hardcoded hex fallbacks for `success`/`warning` border and message colours; now uses `--io-color-success` / `--io-color-warning` tokens unconditionally.
