---
"@io-digital/components": minor
---

feat(io-breadcrumb): label prop, target/itemLabel on items, focus ring, CSS tokens, separator default fix (#627)

**New features:**
- `label` prop on `io-breadcrumb` (`@Prop() label = 'Breadcrumb'`) bound to `aria-label` on the inner `<nav>` landmark. Override for non-English deployments or when multiple breadcrumbs appear on the same page — fixes duplicate unlabelled landmark violations (WCAG SC 2.4.6 / 4.1.2).
- `target` prop on `io-breadcrumb-item` (`@Prop() target?: string`) — bound to the rendered `<a target={this.target}>`. When `target="_blank"`, `rel="noopener noreferrer"` is added automatically to prevent tab-napping (WCAG SC 3.2.2).
- `itemLabel` prop on `io-breadcrumb-item` (`@Prop() itemLabel?: string`) — binds to `aria-label` on the rendered `<a>` or `<span>`. Use for icon-only items or to augment link names with context like "opens in new tab" (WCAG SC 4.1.2).

**Bug fixes:**
- Separator default aligned: styles file default changed from `'›'` (guillemet) to `'/'` to match storefront API documentation — resolves contract mismatch.
- Focus ring on `io-breadcrumb-item` links now includes `box-shadow: 0 0 0 4px var(--io-focus-outer)` in `a:focus-visible`, matching the dual-ring focus pattern used across other iO DS interactive components (WCAG SC 2.4.11).

**CSS override tokens added (io-breadcrumb-item):**
- `--io-breadcrumb-item-color` — link color (default: `var(--io-color-primary)`).
- `--io-breadcrumb-current-color` — current page item text color (default: `var(--io-text-secondary)`).
- `--io-breadcrumb-separator-color` — separator character color (default: `var(--io-color-grey-4)`).
- `--io-breadcrumb-font-size` — font size applied uniformly to links, current item, and separator (default: `var(--io-font-size-sm)`).
