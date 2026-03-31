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

    @media (prefers-reduced-motion: reduce) {
      .carousel-track { scroll-behavior: auto; }
      .carousel-btn { transition: none; }
    }
  `;
}
