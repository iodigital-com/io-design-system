---
'@iodigital-com/components': minor
---

Remove deprecated props, variants, and aliases from 14 components:

- io-badge: remove legacy color variants (beige, blue, dark, orange, rouge, outline) and DEPRECATED_BADGE_COLOR_MAP
- io-checkbox-group: remove deprecated boolean error/errorMessage props (use state/message)
- io-radio-group: remove deprecated boolean error/errorMessage props (use state/message)
- io-flyout: remove left/right position aliases (use start/end), add top/bottom positions
- io-multi-select: remove deprecated filter prop (use filterable)
- io-spinner: remove deprecated aria object prop (use aria-label on host)
- io-switch: remove deprecated boolean error/errorMessage props (use state/message)
- io-tag: remove deprecated removable prop, color prop, and IoTagColor type
- io-tag-dismissible: define IoTagDismissibleVariant type (replaces re-export of removed IoTagColor)
- io-table-head-row: remove deprecated selectAllChecked/selectAllIndeterminate props (use selectionState)
- io-textarea: remove deprecated lowercase autocomplete prop (use autoComplete)
- io-input: remove deprecated lowercase autocomplete prop (use autoComplete)
- io-toast-item: remove deprecated actionLabel/actionHref props (use actions array)
- io-toast: remove deprecated getCurrent() method from IoToastManagerClass (use getVisible())
