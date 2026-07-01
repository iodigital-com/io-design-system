---
"@iodigital-com/components": minor
---

io-input: extract shared StateIcon functional component and add indicator prop rendering

- Extract `StateIcon` functional component to `common/state-icon/StateIcon.tsx` to eliminate duplicated SVG markup across io-input, io-input-password, io-input-search, io-input-date
- Wire the existing `indicator?: IoIconName` prop to render a leading icon in the input prefix area; when `indicator` is set to `true` (boolean), an icon is auto-selected based on `type` (email→mail, tel→phone, url→link)
- Add `--io-input-indicator-color` and `--io-input-indicator-size` CSS custom properties as consumer override points
- Fix malformed `.input-indicator-icon` CSS rule in io-input-styles.ts
