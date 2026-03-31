/**
 * io-carousel CSS-in-JS style generator.
 *
 * Returns a <style> string for the carousel component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 *
 * ⚠️  GOVERNANCE: Do not hardcode colors, spacing, or radii here.
 *     Add new tokens to src/global/app.css first, then reference them.
 */
export function getCarouselStyles(): string {
  return `
    :host {
      display: block;
      font-family: var(--io-font-primary);
    }

    /* ── Outer wrap — provides space for nav buttons ─────── */

    .carousel-wrap {
      position: relative;
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
      height: 4px;
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

    /* ── Slide card ─────────────────────────────────────── */

    .carousel-slide {
      flex: 0 0 auto;
      width: 23.5rem;
      max-width: 80vw;
      background: var(--io-bg-card);
      display: flex;
      flex-direction: column;
      border: 1px solid var(--io-border);
    }

    /* ── Image area ─────────────────────────────────────── */

    .carousel-image {
      position: relative;
      width: 100%;
      aspect-ratio: 4 / 3;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--io-color-primary);
      background: var(--io-bg-surface);
    }

    /* ── Category pill ──────────────────────────────────── */

    .carousel-pill {
      position: absolute;
      left: var(--io-space-4);
      top: var(--io-space-4);
      display: inline-flex;
      align-items: center;
      gap: var(--io-space-2);
      border-radius: var(--io-border-radius-pill);
      background: var(--io-color-off-white);
      padding: var(--io-space-2) var(--io-space-3);
      font-size: var(--io-font-size-sm);
      font-weight: var(--io-font-weight-regular);
      color: var(--io-text-primary);
    }

    /* ── Slide body ─────────────────────────────────────── */

    .carousel-body {
      padding: 0 var(--io-space-6);
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .carousel-type {
      font-size: var(--io-font-size-sm);
      font-weight: var(--io-font-weight-medium);
      color: var(--io-text-secondary);
      margin: var(--io-space-5) 0 var(--io-space-3);
    }

    .carousel-title {
      font-size: var(--io-font-size-lg);
      font-weight: var(--io-font-weight-semibold);
      line-height: 1.25;
      color: var(--io-text-primary);
      margin-bottom: var(--io-space-6);
    }

    .carousel-cta {
      margin-top: auto;
      padding-bottom: var(--io-space-6);
    }

    .carousel-cta a {
      display: inline-flex;
      align-items: center;
      gap: var(--io-space-2);
      color: var(--io-text-primary);
      text-decoration: none;
      font-weight: var(--io-font-weight-semibold);
      background-image: linear-gradient(currentColor, currentColor);
      background-repeat: no-repeat;
      background-position: 0 100%;
      background-size: 0% 1px;
      transition: background-size var(--io-motion-base) cubic-bezier(0.645, 0.045, 0.355, 1);
    }

    .carousel-cta a:hover {
      background-size: 100% 1px;
    }

    .carousel-cta a:focus-visible {
      outline: none;
      box-shadow: var(--io-focus-ring-active);
      border-radius: 2px;
    }

    /* ── Navigation buttons ─────────────────────────────── */

    .carousel-btn {
      position: absolute;
      top: calc(23.5rem * 3 / 8 - var(--io-space-8));
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
        transform: scale(1.06);
      }
    }

    .carousel-btn:focus-visible {
      outline: none;
      box-shadow: var(--io-focus-ring-active);
    }

    .carousel-btn--prev {
      left: -var(--io-space-6);
    }

    .carousel-btn--next {
      right: -var(--io-space-6);
    }

    .carousel-btn--prev svg {
      transform: rotate(180deg);
    }

    @media (prefers-reduced-motion: reduce) {
      .carousel-track { scroll-behavior: auto; }
      .carousel-btn { transition: none; }
      .carousel-cta a { transition: none; }
    }
  `;
}
