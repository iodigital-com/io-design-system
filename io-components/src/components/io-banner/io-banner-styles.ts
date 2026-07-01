export function getBannerStyles(): string {
  return `
    :host {
      display: block;
      font-family: var(--io-font-primary);
    }

    /* The live-region wrapper is always in the DOM (issue #1076).
       aria-hidden="true" + display:none hides it from both layout and a11y tree. */
    .banner[aria-hidden='true'] {
      display: none;
    }

    .banner {
      position: fixed;
      top: var(--io-banner-top, var(--io-space-4));
      left: var(--io-banner-inset-x, var(--io-space-4));
      right: var(--io-banner-inset-x, var(--io-space-4));
      margin: 0 auto;
      max-width: var(--io-banner-max-w, var(--io-breakpoint-md, 768px));
      z-index: var(--io-banner-z-index, var(--io-z-toast));

      display: flex;
      align-items: flex-start;
      gap: var(--io-space-3);
      padding: var(--io-space-4);

      background: var(--io-bg-card);
      border: 1px solid transparent;
      border-radius: var(--io-border-radius-sm);
      box-shadow: var(--io-shadow-lg);

      font-size: var(--io-font-size-sm);
      line-height: var(--io-line-height-normal);
      color: var(--io-text-primary);

      box-sizing: border-box;
      animation: io-banner-in var(--io-motion-overlay-enter) var(--io-motion-overlay-easing) both;
    }

    @keyframes io-banner-in {
      from {
        opacity: 0;
        transform: translateY(calc(-100% - var(--io-space-4)));
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Exit animation (issue #1012) — applied while _dismissing is true */
    .banner--dismissing {
      animation: io-banner-out var(--io-motion-overlay-exit, var(--io-motion-base, 200ms)) var(--io-motion-overlay-easing, ease-in) both;
    }

    @keyframes io-banner-out {
      from {
        opacity: 1;
        transform: translateY(0);
      }
      to {
        opacity: 0;
        transform: translateY(calc(-100% - var(--io-space-4)));
      }
    }

    /* Bottom position override — flip inset and animation direction */
    :host([position='bottom']) .banner {
      top: auto;
      bottom: var(--io-banner-bottom, var(--io-space-4));
      animation-name: io-banner-in-bottom;
    }

    :host([position='bottom']) .banner--dismissing {
      animation-name: io-banner-out-bottom;
    }

    @keyframes io-banner-in-bottom {
      from {
        opacity: 0;
        transform: translateY(calc(100% + var(--io-space-4)));
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes io-banner-out-bottom {
      from {
        opacity: 1;
        transform: translateY(0);
      }
      to {
        opacity: 0;
        transform: translateY(calc(100% + var(--io-space-4)));
      }
    }

    .banner__icon {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--io-icon-size-md);
      height: var(--io-icon-size-md);
      color: var(--banner-icon-color);
    }

    .banner__body {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: var(--io-space-1);
    }

    .banner__heading {
      display: block;
      margin: 0;
      font-size: inherit;
      font-weight: var(--io-font-weight-semibold);
      color: var(--io-text-primary);
    }

    .banner__heading--hidden {
      display: none;
    }

    .banner__description {
      margin: 0;
      color: var(--io-text-primary);
    }

    .banner__content {
      color: var(--io-text-primary);
    }

    .banner__content--empty {
      display: none;
    }

    /* Variants — set border accent + icon color only */
    .banner--info {
      border-color: var(--io-color-info);
      --banner-icon-color: var(--io-color-info);
    }

    .banner--success {
      border-color: var(--io-color-success);
      --banner-icon-color: var(--io-color-success);
    }

    .banner--warning {
      border-color: var(--io-color-warning);
      --banner-icon-color: var(--io-color-warning);
    }

    .banner--error {
      border-color: var(--io-color-error);
      --banner-icon-color: var(--io-color-error);
    }

    @media (prefers-reduced-motion: reduce) {
      .banner,
      .banner--dismissing {
        animation: none;
        transition: none;
      }
    }
  `;
}
