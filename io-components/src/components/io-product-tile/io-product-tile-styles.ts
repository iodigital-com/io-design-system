/**
 * io-product-tile CSS-in-JS style generator.
 *
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 */
export function getProductTileStyles(): string {
  return `
    :host {
      display: block;
      font-family: var(--io-font-primary);
    }

    /* ── Container ──────────────────────────────────────────── */

    .product-tile {
      display: flex;
      flex-direction: column;
      gap: var(--io-space-2);
      text-decoration: none;
      color: inherit;
      position: relative;
    }

    /* ── Image area ─────────────────────────────────────────── */

    .product-tile__media {
      position: relative;
      overflow: hidden;
      border-radius: var(--io-product-tile-media-radius, var(--io-border-radius-sm));
      background-color: var(--io-product-tile-media-bg, var(--io-bg-surface));
    }

    /* Aspect ratios */
    :host([aspect="square"]) .product-tile__media {
      aspect-ratio: 1 / 1;
    }

    :host([aspect="portrait"]) .product-tile__media {
      aspect-ratio: 3 / 4;
    }

    :host([aspect="landscape"]) .product-tile__media {
      aspect-ratio: 4 / 3;
    }

    /* Default: square */
    .product-tile__media {
      aspect-ratio: 1 / 1;
    }

    .product-tile__media ::slotted(img) {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    /* ── Like (wishlist) button ──────────────────────────────── */

    .product-tile__like {
      position: absolute;
      top: var(--io-space-2);
      inset-inline-end: var(--io-space-2);
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--io-product-tile-like-size, 2.5rem);
      height: var(--io-product-tile-like-size, 2.5rem);
      min-width: var(--io-product-tile-like-size, 44px);
      min-height: var(--io-product-tile-like-size, 44px);
      border-radius: var(--io-border-radius-pill);
      background-color: var(--io-product-tile-like-bg, var(--io-bg-surface));
      border: none;
      cursor: pointer;
      color: var(--io-product-tile-like-color, var(--io-text-primary));
      padding: 0;
      transition: background-color var(--io-motion-base);
    }

    .product-tile__like:focus-visible {
      outline: none;
      box-shadow: var(--io-focus-ring-active);
    }

    @media (hover: hover) and (pointer: fine) {
      .product-tile__like:hover {
        background-color: var(--io-product-tile-like-bg-hover, var(--io-bg-raised));
      }
    }

    .product-tile__like--liked {
      color: var(--io-product-tile-like-color-liked, var(--io-color-rouge));
    }

    .product-tile__like svg {
      width: var(--io-icon-size-md);
      height: var(--io-icon-size-md);
      pointer-events: none;
    }

    /* ── Content area ───────────────────────────────────────── */

    .product-tile__content {
      display: flex;
      flex-direction: column;
      gap: var(--io-space-1);
    }

    /* ── Heading ────────────────────────────────────────────── */

    .product-tile__heading {
      font-size: var(--io-product-tile-heading-size, var(--io-font-size-base));
      font-weight: var(--io-font-weight-semibold);
      line-height: var(--io-line-height-snug);
      color: var(--io-text-primary);
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* ── Description ────────────────────────────────────────── */

    .product-tile__description {
      font-size: var(--io-font-size-sm);
      color: var(--io-text-secondary);
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* ── Price area ─────────────────────────────────────────── */

    .product-tile__prices {
      display: flex;
      align-items: baseline;
      gap: var(--io-space-2);
      flex-wrap: wrap;
      margin-top: var(--io-space-1);
    }

    .product-tile__price {
      font-size: var(--io-product-tile-price-size, var(--io-font-size-base));
      font-weight: var(--io-font-weight-bold);
      color: var(--io-product-tile-price-color, var(--io-text-primary));
    }

    .product-tile__price--sale {
      color: var(--io-product-tile-price-sale-color, var(--io-color-rouge));
    }

    .product-tile__price-original {
      font-size: var(--io-product-tile-price-original-size, var(--io-font-size-sm));
      font-weight: var(--io-font-weight-regular);
      color: var(--io-product-tile-price-original-color, var(--io-text-secondary));
      text-decoration: line-through;
    }

    /* ── Visually hidden helper (sr-only) ───────────────────── */

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }

    /* ── href link state ────────────────────────────────────── */

    a.product-tile:focus-visible {
      outline: none;
      box-shadow: var(--io-focus-ring-active);
      border-radius: var(--io-product-tile-media-radius, var(--io-border-radius-sm));
    }

    @media (hover: hover) and (pointer: fine) {
      a.product-tile:hover .product-tile__heading {
        text-decoration: underline;
      }
    }

    /* ── Reduced motion ─────────────────────────────────────── */

    @media (prefers-reduced-motion: reduce) {
      .product-tile__like {
        transition: none;
      }
    }
  `;
}
