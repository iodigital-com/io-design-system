---
"@iodigital-com/components": minor
---

feat(io-stepper, io-breadcrumb): B38 batch enhancements

io-stepper / io-step:
- #955: Add `error` status variant to `IoStepStatus` union with red X-mark icon and `--io-step-error-color` token
- #962: Add `description` named slot to `io-step` for secondary text under the step label, with `--io-step-description-color` token
- #964: Add horizontal scroll with active-step centering via `scrollIntoView` on load, step change, and ResizeObserver; cap child count at 9 with console.error guard
- #970: Complete vertical orientation layout — circle left, label-group to the right, connector as a vertical line; horizontal layout is now scrollable with hidden scrollbars
- #973: Log `console.error` in `componentWillLoad` when `status="current"` and `disabled=true` are both set (contradictory, current step must remain focusable)

io-breadcrumb:
- #969: Add opt-in `seo` prop (default `false`) that renders a `<script type="application/ld+json">` BreadcrumbList graph; re-generates on slotchange; SSG-safe
- #960: Replace inline-expand ellipsis behavior with an `io-popover` menu listing hidden items as links; ellipsis button gains `aria-haspopup="menu"` and `aria-expanded` state; no layout shift on open/close
