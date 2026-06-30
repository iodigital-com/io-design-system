---
"@iodigital-com/components": minor
---

feat(io-multi-select): expose trigger-level clear-all button, typeahead search, chevron rotation, maxSelections cap, select-all affordance, and PageUp/PageDown navigation

- #1111 — inline "Clear selection" icon button in the trigger when `selectedValues.length > 0`; `stopPropagation` prevents dropdown toggle; `aria-label="Clear selection"` + 44×44 touch target
- #1077 — typeahead character search while dropdown is open (filter mode excluded); 500ms buffer reset; cycles through matches; skips disabled options
- #1075 — chevron already rotated 180° via `[aria-expanded="true"]` CSS rule (existing); prefers-reduced-motion guard in styles
- #1070 — `maxSelections` prop; blocks selection past cap and emits `limitreached` event with `{ max, attempted }`; unselected options receive `aria-disabled="true"` at cap; helper text "X of Y selected" rendered in dropdown
- #1069 — `selectAll` prop (default `false`); "Select all" button in dropdown footer; respects active filter (selects filtered subset only); respects `maxSelections` cap
- #1053 — `PageDown`/`PageUp` keys jump `activeIndex` by 10 (bounded by option count)
