export function getBannerStyles(): string {
  return `
    :host {
      display: block;
      font-family: var(--io-font-primary);
    }

    /* ── Popover container — uses top-layer to escape z-index races ──
       The popover element itself is invisible; only .banner is styled. */

    .banner__popover {
      position: fixed;
      inset: 0;
      pointer-events: none;
      background: transparent;
      border: none;
      padding: 0;
      margin: 0;
      overflow: visible;
      max-width: none;
      max-height: none;
    }

    .banner__popover:popover-open {
      display: block;
    }

    .banner {
      position: fixed;
      left: var(--io-banner-inset-x, var(--io-space-4));
      right: var(--io-banner-inset-x, var(--io-space-4));
      margin: 0 auto;
      max-width: var(--io-banner-max-w, var(--io-breakpoint-md, 768px));
      /* z-index: fallback for browsers without Popover API support */
      z-index: var(--io-banner-z-index, var(--io-z-toast));
      pointer-events: auto;

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
    }

    /* ── Position variants — top (default for ≥640px) ────────── */

    .banner--position-top {
      top: var(--io-banner-top, var(--io-space-4));
      bottom: auto;
      /* Enter from top: slide down */
      animation: io-banner-in-top var(--io-duration-overlay-enter, 300ms) var(--io-ease-overlay-enter, cubic-bezier(0, 0, 0.2, 1)) both;
    }

    @keyframes io-banner-in-top {
      from {
        opacity: 0;
        transform: translateY(calc(-100% - var(--io-space-4)));
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* ── Position variants — bottom (default for <640px) ─────── */

    .banner--position-bottom {
      top: auto;
      bottom: var(--io-banner-bottom, var(--io-space-4));
      /* Enter from bottom: slide up */
      animation: io-banner-in-bottom var(--io-duration-overlay-enter, 300ms) var(--io-ease-overlay-enter, cubic-bezier(0, 0, 0.2, 1)) both;
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
      .banner--position-top,
      .banner--position-bottom {
        animation: none;
        transition: none;
      }
    }
  `;
}
