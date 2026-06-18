---
"@iodigital-com/components": minor
---

fix(io-checkbox-group): required indicator, role=alert, syncChildren bug, aria prop (#633)

- WCAG 1.3.1/4.1.2: required prop now renders visual indicator (*) in legend (aria-hidden) so screen readers hear the label naturally
- WCAG 4.1.3: error message changed from aria-live="polite" to role="alert" + aria-atomic="true" for immediate screen reader announcement
- Fixes syncChildren bug: re-enabling group now unconditionally assigns disabled to children (was guarded by `if (this.disabled)` preventing re-enable propagation)
- Propagates error state to child io-checkbox elements via syncChildren (error=true → state="error", error=false → state="none")
- Adds @Watch('error') to re-sync children when error prop changes
- Adds aria escape-hatch prop spread onto fieldset via applyAriaProp utility
