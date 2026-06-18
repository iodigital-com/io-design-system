---
"@iodigital-com/components": minor
---

feat(io-radio-group): roving tabindex, FACE, required propagation, aria-required (#653 #648)

- WCAG 2.1.1: Implements ARIA APG roving tabindex keyboard navigation (Arrow keys, Home, End)
- Fixes syncChildren bug: re-enabling group now correctly un-disables children
- Adds formAssociated/FACE with formResetCallback and formDisabledCallback
- Propagates required from group to children in syncChildren
- Adds aria-required on fieldset for WCAG 4.1.2
