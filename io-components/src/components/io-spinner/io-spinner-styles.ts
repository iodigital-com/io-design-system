/**
 * io-spinner CSS-in-JS style generator.
 *
 * Returns a <style> string for the spinner component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
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

    /* ── Spinner ring ────────────────────────────────────── */

    .spinner {
      border-radius: 50%;
      border-style: solid;
      border-color: transparent;
      border-top-color: currentColor;
      animation: io-spin 0.7s linear infinite;
      flex-shrink: 0;
    }

    /* ── Sizes ──────────────────────────────────────────── */

    .spinner--sm      { width: 1rem;    height: 1rem;    border-width: var(--io-spinner-border-width-sm); }
    .spinner--md      { width: 1.5rem;  height: 1.5rem;  border-width: var(--io-spinner-border-width-md); }
    .spinner--lg      { width: 2.5rem;  height: 2.5rem;  border-width: var(--io-spinner-border-width-lg); }
    .spinner--inherit { width: 1em;     height: 1em;     border-width: 0.125em; }

    /* ── Colours ────────────────────────────────────────── */

    .spinner--primary { color: var(--io-color-primary); }
    .spinner--white   { color: var(--io-color-white); }
    .spinner--current { color: inherit; }

    /* ── Spin keyframe ───────────────────────────────────── */

    @keyframes io-spin {
      to { transform: rotate(360deg); }
    }

    /* ── Reduced motion — slow instead of stop ───────────── */

    @media (prefers-reduced-motion: reduce) {
      .spinner { animation-duration: 1500ms; }
    }

    /* ── Windows High Contrast Mode (forced-colors) ──────── */

    @media (forced-colors: active) {
      .spinner {
        border-color: Canvas;
        border-top-color: ButtonText;
        forced-color-adjust: none;
      }
    }
  `;
}
