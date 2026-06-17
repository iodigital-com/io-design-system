---
"@io-digital/components": minor
---

feat(io-banner): Escape key dismiss, focus management, warning→assertive, position prop (#628)

- Escape key dismisses open+dismissible banner (WCAG 2.1.2)
- Focus moves to dismiss button on open (WCAG 2.4.3); keydown listener lifecycle-managed via Watch/connectedCallback/disconnectedCallback
- `warning` variant now uses `role="alert"` (assertive) alongside `error` (SC 4.1.3)
- Dismiss button gets `min-width/height: 24px` (WCAG 2.5.8)
- New `position: 'top' | 'bottom'` prop with flipped entry animation for bottom
- New `headingTag: IoBannerHeadingTag` prop (default 'h5') for semantic heading (WCAG 1.3.1)
- New `description?: string` prop renders a `<p>` below the heading
- CSS token overrides: `--io-banner-max-w`, `--io-banner-top`, `--io-banner-bottom`, `--io-banner-inset-x`, `--io-banner-z-index`
- Storefront API page and stories updated; 44 component + 18 storefront tests pass
