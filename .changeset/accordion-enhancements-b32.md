---
'@iodigital-com/components': minor
---

feat(io-accordion): add keyboard navigation, defaultExpanded coordination, summary slots, frosted background, and indent prop

- #1087: ArrowDown/ArrowUp moves focus between sibling accordion headers; Home/End jump to first/last; disabled headers are skipped
- #1066: When multiple siblings have `defaultExpanded=true` and `allowMultiple=false`, only the first in DOM order remains open after mount
- #1042: New `summary`, `summary-before`, and `summary-after` slots — `summary-before`/`summary-after` render outside the trigger button so interactive children (edit/delete buttons) remain independently operable
- #1029: New `frosted` value for the `background` prop — applies `backdrop-filter: blur(12px)` for legibility over image/video backdrops; customisable via `--io-accordion-bg-frosted`
- #1023: New `indent` boolean prop — indents panel content to align with the summary text column past the expand/collapse icon; customisable via `--io-accordion-indent`
