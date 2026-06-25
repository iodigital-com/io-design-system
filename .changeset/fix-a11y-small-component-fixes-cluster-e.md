---
'@iodigital-com/components': patch
---

fix(a11y): small component accessibility fixes — label warnings, aria-label attribute mapping, indeterminate @Watch, and 44 px touch targets

- io-progress: add componentWillLoad console.error when neither label nor labelledBy is provided (WCAG 4.1.2)
- io-link: add componentWillLoad console.error when href prop is absent (WCAG 4.1.2)
- io-checkbox: add @Watch('indeterminate') to call syncFormValue() on programmatic indeterminate changes
- io-badge: change ariaLabel prop from string | null to string | undefined with attribute: 'aria-label' so aria-label HTML attribute is correctly mapped (matches io-wordmark pattern)
- io-banner: dismiss button min-width and min-height raised from --io-space-6 (24 px) to --io-touch-target-min (44 px) (WCAG 2.5.8)
- io-inline-notification: same dismiss button touch-target fix as io-banner
