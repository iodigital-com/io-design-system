---
'@iodigital-com/components': minor
---

feat(io-input): add indicator prop for type-specific visual affordances

Adds an `indicator` prop to `io-input` that renders a leading Lucide icon in the prefix area. Pass any valid `IoIconName` string (e.g. `"mail"`, `"phone"`, `"link"`) to show a decorative, aria-hidden icon before the input value. The `TYPE_ICON_MAP` also enables boolean-style usage where `true` auto-selects the icon based on `type` (email→mail, tel→phone, url→link).

New CSS custom properties for consumer overrides:
- `--io-input-indicator-color` (default: `var(--io-text-secondary)`)
- `--io-input-indicator-size` (default: `1.25rem`)
