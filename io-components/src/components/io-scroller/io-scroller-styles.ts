/**
 * io-scroller CSS-in-JS style generator.
 *
 * Returns a <style> string for the scroller component's Shadow DOM.
 * ALL values reference var(--io-*) CSS custom properties — never hardcoded.
 *
 * The fade gradient uses pseudo-elements on the scroller host with
 * pointer-events: none so the gradient overlay does not block interaction.
 *
 * Fade color: var(--io-scroller-fade-color) defaults to var(--io-bg-page)
 * so it naturally blends with the page background.
 *
 * ⚠️  GOVERNANCE: Do not hardcode colors, spacing, or radii here.
 *     Add new tokens to src/global/app.css first, then reference them.
 */
export function getScrollerStyles(): string {
  return `
    :host {
      display: block;
      position: relative;
      /* Expose the fade color as a public CSS API so consumers can override
         it when the scroller sits on a surface other than the page background. */
      --io-scroller-fade-size: var(--io-space-6, 24px);
    }

    /* ── Scroll container ─────────────────────────────────────── */

    .scroller {
      position: relative;
      overflow: auto;
    }

    /* ── Orientation ──────────────────────────────────────────── */

    .scroller--horizontal {
      overflow-x: auto;
      overflow-y: hidden;
      display: flex;
      align-items: flex-start;
      scroll-behavior: smooth;
    }

    .scroller--vertical {
      overflow-x: hidden;
      overflow-y: auto;
      scroll-behavior: smooth;
    }

    /* ── Scrollbar visibility ─────────────────────────────────── */

    .scroller--hide-scrollbar {
      /* Webkit */
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* IE 10+ */
    }

    .scroller--hide-scrollbar::-webkit-scrollbar {
      display: none;
    }

    .scroller--show-scrollbar {
      scrollbar-width: auto;
      -ms-overflow-style: auto;
    }

    /* ── Slot (content wrapper) ───────────────────────────────── */

    .scroller__slot-wrapper {
      display: contents;
    }

    /* ── Fade indicators ──────────────────────────────────────── */

    /* Shared fade overlay styles — applied via :host pseudo-elements
       so they sit above scroll content but have pointer-events: none. */

    /* start fade (left for horizontal, top for vertical) */
    :host(.has-fade-start)::before {
      content: '';
      position: absolute;
      pointer-events: none;
      z-index: 1;
    }

    /* end fade (right for horizontal, bottom for vertical) */
    :host(.has-fade-end)::after {
      content: '';
      position: absolute;
      pointer-events: none;
      z-index: 1;
    }

    /* ── Horizontal fade positions ────────────────────────────── */

    :host([orientation='horizontal'].has-fade-start)::before,
    :host(:not([orientation]).has-fade-start)::before {
      top: 0;
      left: 0;
      bottom: 0;
      width: var(--io-scroller-fade-size);
      background: linear-gradient(
        to right,
        var(--io-scroller-fade-color, var(--io-bg-page)),
        transparent
      );
    }

    :host([orientation='horizontal'].has-fade-end)::after,
    :host(:not([orientation]).has-fade-end)::after {
      top: 0;
      right: 0;
      bottom: 0;
      width: var(--io-scroller-fade-size);
      background: linear-gradient(
        to left,
        var(--io-scroller-fade-color, var(--io-bg-page)),
        transparent
      );
    }

    /* ── Vertical fade positions ──────────────────────────────── */

    :host([orientation='vertical'].has-fade-start)::before {
      top: 0;
      left: 0;
      right: 0;
      height: var(--io-scroller-fade-size);
      background: linear-gradient(
        to bottom,
        var(--io-scroller-fade-color, var(--io-bg-page)),
        transparent
      );
    }

    :host([orientation='vertical'].has-fade-end)::after {
      bottom: 0;
      left: 0;
      right: 0;
      height: var(--io-scroller-fade-size);
      background: linear-gradient(
        to top,
        var(--io-scroller-fade-color, var(--io-bg-page)),
        transparent
      );
    }

    /* ── Reduced motion ───────────────────────────────────────── */

    @media (prefers-reduced-motion: reduce) {
      .scroller {
        scroll-behavior: auto !important;
      }
    }
  `;
}
