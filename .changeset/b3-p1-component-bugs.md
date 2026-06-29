---
"@iodigital-com/components": minor
---

fix: P1 component bug fixes — spinner token, ESC handler scoping, popover window listener cleanup, pagination Space scroll, event propagation (#1128, #995, #993, #957, #925, #935)

- io-spinner: replace hardcoded `0.7s`/`1500ms` with `--io-spinner-duration` and `--io-spinner-duration-reduced` tokens registered in `docs/public-css-api.json`
- io-flyout, io-sheet: move ESC handler from `@Listen('keydown', {target:'document'})` to `<Host onKeyDown>` — no longer fires for every keystroke when closed
- io-popover: replace 4 always-on `@Listen({target:'window'})` decorators with `attachWindowListeners()`/`detachWindowListeners()` called on open/close — zero window listeners while closed
- io-pagination: add `onKeyDown` Space-key `preventDefault` on all page buttons — prevents viewport scroll on Space activation
- io-checkbox, io-switch: call `ev.stopPropagation()` + `ev.stopImmediatePropagation()` in `handleChange` — prevents double-fire via native + custom events
- io-input, io-input-password, io-input-search, io-input-date, io-textarea: same stop-propagation in all four event handlers (input, change, focus, blur)
