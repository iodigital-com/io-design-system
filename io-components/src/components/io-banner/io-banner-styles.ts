export function getBannerStyles(): string {
  return `
    :host {
      display: block;
      font-family: var(--io-font-primary);
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

    /* Bottom position override — flip inset and animation direction */
    :host([position='bottom']) .banner {
      top: auto;
      bottom: var(--io-banner-bottom, var(--io-space-4));
      animation-name: io-banner-in-bottom;
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

    .banner__icon {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--io-icon-size-md);
      height: var(--io-icon-size-md);
      color: var(--banner-icon-color);
    }

    .banner__icon svg {
      width: var(--io-icon-size-md);
      height: var(--io-icon-size-md);
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

    .banner__dismiss {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: var(--io-touch-target-min);
      min-height: var(--io-touch-target-min);
      padding: 0;
      background: transparent;
      border: none;
      cursor: pointer;
      color: var(--io-text-secondary);
      transition: color var(--io-motion-fast);
    }

    .banner__dismiss:hover {
      color: var(--io-text-primary);
    }

    .banner__dismiss:focus-visible {
      box-shadow: var(--io-focus-ring-active);
      outline: none;
      border-radius: var(--io-border-radius-sm);
    }

    .banner__dismiss svg {
      width: var(--io-icon-size-sm);
      height: var(--io-icon-size-sm);
      pointer-events: none;
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
      .banner {
        animation: none;
      }
      .banner__dismiss {
        transition: none;
      }
    }
  `;
}
