/**
 * io-carousel CSS-in-JS style generator.
 *
 * Returns a <style> string for the carousel component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 *
 * The carousel is a generic scrollable container — it does NOT style slotted
 * content. Consumers own card/slide appearance via the light DOM.
 *
 * ⚠️  GOVERNANCE: Do not hardcode colors, spacing, or radii here.
 *     Add new tokens to src/global/app.css first, then reference them.
 */
export function getCarouselStyles(): string {
  return `
    :host {
      display: block;
      width: 100%;
      font-family: var(--io-font-primary);
    }

    /* ── Visually hidden live region ────────────────────── */

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    /* ── Outer wrap — provides space for nav buttons ─────── */

    .carousel-wrap {
      position: relative;
      width: 100%;
      padding: 0 var(--io-space-8);
    }

    /* ── Scrollable track ───────────────────────────────── */

    .carousel-track {
      display: flex;
      gap: var(--io-space-4);
      overflow-x: scroll;
      scroll-behavior: smooth;
      cursor: grab;
      padding-bottom: var(--io-space-5);
      -webkit-overflow-scrolling: touch;

      /* Custom scrollbar */
      scrollbar-width: thin;
      scrollbar-color: var(--io-color-primary) transparent;
    }

    .carousel-track::-webkit-scrollbar {
      height: var(--io-carousel-scrollbar-height);
    }

    .carousel-track::-webkit-scrollbar-track {
      border-bottom: 1px solid color-mix(in srgb, var(--io-color-primary) 30%, transparent);
      margin: 0 var(--io-space-4);
    }

    .carousel-track::-webkit-scrollbar-thumb {
      background-color: var(--io-color-primary);
      border-radius: var(--io-border-radius-pill);
    }

    .carousel-track::-webkit-scrollbar-thumb:hover {
      background-color: var(--io-color-primary-hover);
    }

    .carousel-track--dragging {
      cursor: grabbing;
      scroll-behavior: auto;
      user-select: none;
    }

    /* ── Slotted children — prevent shrink ──────────────── */

    ::slotted(*) {
      flex: 0 0 auto;
    }

    /* ── Navigation buttons ─────────────────────────────── */

    .carousel-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
      width: var(--io-space-16);
      height: var(--io-space-16);
      border-radius: var(--io-border-radius-pill);
      background: var(--io-bg-card);
      border: 1px solid var(--io-border);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--io-shadow-md);
      transition: box-shadow var(--io-motion-fast), transform var(--io-motion-fast);
      color: var(--io-text-primary);
    }

    @media (hover: hover) and (pointer: fine) {
      .carousel-btn:hover {
        box-shadow: var(--io-shadow-lg);
        transform: translateY(-50%) scale(1.06);
      }
    }

    .carousel-btn:focus-visible {
      outline: none;
      box-shadow: var(--io-focus-ring-active);
    }

    .carousel-btn--prev {
      left: 0;
    }

    .carousel-btn--next {
      right: 0;
    }

    .carousel-btn--prev svg {
      transform: rotate(180deg);
    }

    .carousel-btn:disabled {
      color: var(--io-text-disabled);
      border-color: var(--io-border);
      cursor: not-allowed;
      box-shadow: none;
      opacity: 0.5;
    }

    @media (hover: hover) and (pointer: fine) {
      .carousel-btn:disabled:hover {
        box-shadow: none;
        transform: translateY(-50%);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .carousel-track { scroll-behavior: auto; }
      .carousel-btn { transition: none; }
    }

    /* ── Heading and description slots / props ──────────── */

    .carousel-header {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: var(--io-space-4);
    }

    .carousel-header--hidden {
      display: none;
    }

    .carousel-header--center {
      align-items: center;
      text-align: center;
    }

    .carousel-heading {
      font-family: var(--io-font-primary);
      color: var(--io-text-primary);
    }

    .carousel-heading--hidden {
      display: none;
    }

    .carousel-heading-text {
      display: block;
      font-family: var(--io-font-primary);
      font-size: var(--io-font-size-xl, 1.25rem);
      font-weight: var(--io-font-weight-semibold, 600);
      line-height: var(--io-line-height-tight, 1.25);
      color: var(--io-text-primary);
    }

    .carousel-description {
      margin-top: var(--io-space-2);
      font-family: var(--io-font-primary);
      color: var(--io-text-secondary);
    }

    .carousel-description--hidden {
      display: none;
    }

    .carousel-description-text {
      display: block;
      font-family: var(--io-font-primary);
      font-size: var(--io-font-size-md, 1rem);
      line-height: var(--io-line-height-base, 1.5);
      color: var(--io-text-secondary);
    }

    /* ── Controls slot ──────────────────────────────────── */

    .carousel-controls {
      display: flex;
      justify-content: center;
      margin-top: var(--io-space-4);
    }

    .carousel-controls--hidden {
      display: none;
    }

    /* ── Pagination dots ────────────────────────────────── */

    .carousel-pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: var(--io-space-2);
      margin-top: var(--io-space-4);
    }

    .carousel-dot {
      appearance: none;
      border: none;
      padding: 0;
      cursor: pointer;
      width: var(--io-space-2);
      height: var(--io-space-2);
      border-radius: var(--io-border-radius-pill);
      background: color-mix(in srgb, var(--io-color-primary) 30%, transparent);
      transition: background var(--io-motion-fast), transform var(--io-motion-fast);
      min-width: var(--io-space-touch-target, 44px);
      min-height: var(--io-space-touch-target, 44px);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .carousel-dot::after {
      content: '';
      display: block;
      width: var(--io-space-2);
      height: var(--io-space-2);
      border-radius: var(--io-border-radius-pill);
      background: color-mix(in srgb, var(--io-color-primary) 30%, transparent);
      transition: background var(--io-motion-fast), transform var(--io-motion-fast);
    }

    .carousel-dot--active::after {
      background: var(--io-color-primary);
      transform: scale(1.25);
    }

    .carousel-dot:focus-visible {
      outline: none;
      box-shadow: var(--io-focus-ring-active);
    }

    @media (hover: hover) and (pointer: fine) {
      .carousel-dot:hover::after {
        background: var(--io-color-primary-hover);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .carousel-dot,
      .carousel-dot::after {
        transition: none;
      }
    }
  `;
}
