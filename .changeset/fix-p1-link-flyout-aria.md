---
'@iodigital-com/components': patch
---

fix(p1-aria): io-link ariaCurrent prop, external icon, io-flyout closeLabel and accessible name warning

- io-link: add `ariaCurrent` prop forwarding `aria-current` to the anchor for active nav links (#791)
- io-link: auto-render `external-link` icon when `external=true` and no explicit icon is set (#821)
- io-flyout: add `closeLabel` prop (default `'Close flyout'`) for contextual close button label (#816)
- io-flyout: fix `componentWillLoad` warning — suppress when host `aria-label` is already set (#820)
