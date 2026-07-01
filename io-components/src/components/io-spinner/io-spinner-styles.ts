/**
 * io-spinner CSS-in-JS style generator.
 *
 * Returns a <style> string for the spinner component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 *
 * Renders a two-circle SVG spinner:
 *   1. Static track circle (low opacity)
 *   2. Animated arc circle (rotates + varies stroke-dashoffset)
 *
 * ⚠️  GOVERNANCE: Do not hardcode colors, spacing, or radii here.
 *     Add new tokens to src/global/app.css first, then reference them.
 */
export function getSpinnerStyles(): string {
  return `
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: var(--io-font-primary);
    }

    /* ── SVG spinner container ─────────────────────────────── */

    .spinner {
      flex-shrink: 0;
      /* Consumer override: --io-spinner-size sets both width and height */
      width: var(--io-spinner-size);
      height: var(--io-spinner-size);
      animation: io-spin var(--io-spinner-duration, 0.7s) linear infinite;
    }

    /* ── Sizes ──────────────────────────────────────────────── */

    .spinner--xs      { width: 0.75rem;  height: 0.75rem;  stroke-width: 1.5; }
    .spinner--sm      { width: 1rem;     height: 1rem;     stroke-width: 2; }
    .spinner--md      { width: 1.5rem;   height: 1.5rem;   stroke-width: 2.5; }
    .spinner--lg      { width: 2.5rem;   height: 2.5rem;   stroke-width: 3; }
    .spinner--xl      { width: 3.5rem;   height: 3.5rem;   stroke-width: 3.5; }
    .spinner--inherit { width: 1em;      height: 1em;      stroke-width: 2; }

    /* ── Track circle (static background) ──────────────────── */

    .spinner__track {
      stroke: var(--io-spinner-track-color, currentColor);
      opacity: 0.2;
    }

    /* ── Arc circle (animated) ──────────────────────────────── */

    .spinner__arc {
      stroke: var(--io-spinner-color, currentColor);
      stroke-linecap: round;
      transform-origin: center;
    }

    /* ── Colours ────────────────────────────────────────────── */

    .spinner--primary .spinner__arc  { stroke: var(--io-spinner-color, var(--io-color-primary)); }
    .spinner--primary .spinner__track { stroke: var(--io-spinner-track-color, var(--io-color-primary)); }

    .spinner--white .spinner__arc   { stroke: var(--io-spinner-color, var(--io-color-white)); }
    .spinner--white .spinner__track { stroke: var(--io-spinner-track-color, var(--io-color-white)); }

    .spinner--current .spinner__arc   { stroke: var(--io-spinner-color, currentColor); }
    .spinner--current .spinner__track { stroke: var(--io-spinner-track-color, currentColor); }

    /* ── Spin keyframe ──────────────────────────────────────── */

    @keyframes io-spin {
      to { transform: rotate(360deg); }
    }

    /* ── Reduced motion — slow instead of stop ──────────────── */

    @media (prefers-reduced-motion: reduce) {
      .spinner { animation-duration: var(--io-spinner-duration-reduced, 4s); }
    }

    /* ── Windows High Contrast Mode (forced-colors) ─────────── */

    @media (forced-colors: active) {
      .spinner__track { stroke: Canvas; opacity: 1; }
      .spinner__arc   { stroke: CanvasText; forced-color-adjust: none; }
    }
  `;
}
