---
'@iodigital-com/components': minor
---

B49: io-multi-select a11y chips fix, io-input stepper + indicator + counter SR fix, io-radio blur event

- fix(io-multi-select): chip remove buttons use tabIndex=-1 to preserve combobox tab order; chips container gets role=group; Backspace on trigger removes last chip (#937)
- feat(io-input): add stepper prop — renders custom +/- buttons for type=number and suppresses native spin buttons; scroll-wheel value changes always suppressed for number inputs (#929)
- feat(io-radio): add blur event (EventEmitter<FocusEvent>) for parity with io-checkbox and io-switch (#933)
- feat(io-input): add indicator prop (IoIconName) — renders a Lucide icon in the prefix area (#934)
- fix(io-input): counter SR live region now reads "X of Y characters" instead of "X characters remaining"; debounce removed so updates are immediate (#921)
