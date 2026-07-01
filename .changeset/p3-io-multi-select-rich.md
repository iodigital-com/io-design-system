---
"@iodigital-com/components": minor
---

feat(io-option, io-multi-select): add icon prop + slot to io-option (#1057), add filterable/filterPlaceholder props to io-multi-select (#1061)

**io-option — Issue #1057:**
- Add `@Prop() icon?: string` — when set, renders an `<io-icon>` before the label text
- Add default slot support — slotted rich HTML content replaces the `label` prop display
- Update `IoOptionConnectDetail` type to include `icon?: string`
- Example: `<io-option value="us" icon="flag-us">United States</io-option>`

**io-multi-select — Issue #1061:**
- Add `@Prop() filterable = false` — shows a search input at the top of the dropdown for client-side filtering (preferred name; `filter` retained for backward compatibility)
- Add `@Prop() filterPlaceholder = 'Search...'` — placeholder text for the filter input
- Add `--io-multi-select-filter-height` CSS custom property (component-scoped override for the filter input height, defaults to `--io-combobox-filter-height`)
- The filter input is aria-labeled ("Filter options"), keyboard-accessible (Tab into filter, Arrow keys to options), and announces its controls via `aria-controls` pointing to the listbox

