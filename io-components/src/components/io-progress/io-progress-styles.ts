/**
 * io-progress CSS-in-JS style generator.
 *
 * Returns a <style> string for the progress component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 *
 * ⚠️  GOVERNANCE: Do not hardcode colors, spacing, or radii here.
 *     Add new tokens to src/global/app.css first, then reference them.
 */
export function getProgressStyles(): string {
  return `
    :host {
      display: block;
      font-family: var(--io-font-primary);
    }

    /* ── Track ───────────────────────────────────────────────────── */

    .progress-wrapper {
      width: 100%;
      background: var(--io-progress-track-bg);
      border-radius: var(--io-border-radius-pill);
      overflow: hidden;
    }

    /* ── Size variants ───────────────────────────────────────────── */

    .progress-wrapper--sm { height: var(--io-progress-height-sm, 4px); }
    .progress-wrapper--md { height: var(--io-progress-height-md, 8px); }
    .progress-wrapper--lg { height: var(--io-progress-height-lg, 12px); }

    /* ── Fill ────────────────────────────────────────────────────── */

    .progress-fill {
      height: 100%;
      border-radius: var(--io-border-radius-pill);
      transition: width var(--io-motion-base, 300ms ease);
    }

    /* ── Color fills ─────────────────────────────────────────────── */

    .progress-fill--blue    { background: var(--io-progress-fill-blue); }
    .progress-fill--orange  { background: var(--io-progress-fill-orange); }
    .progress-fill--success { background: var(--io-progress-fill-success); }
    .progress-fill--warning { background: var(--io-progress-fill-warning); }
    .progress-fill--error   { background: var(--io-progress-fill-error); }

    /* ── Static (no animation) ───────────────────────────────────── */

    .progress-fill--static { transition: none; }

    /* ── Indeterminate animation ──────────────────────────────────– */

    @keyframes io-progress-indeterminate {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    .progress-fill--indeterminate {
      width: 30% !important;
      transform-origin: left;
      animation: io-progress-indeterminate 1200ms linear infinite;
    }

    /* ── Reduced motion ──────────────────────────────────────────── */

    @media (prefers-reduced-motion: reduce) {
      .progress-fill { transition: none; }
      .progress-fill--indeterminate { animation: none; }
    }

    /* ── Label ───────────────────────────────────────────────────── */

    .progress-label {
      margin: var(--io-space-1, 4px) 0 0;
      text-align: right;
      color: var(--io-text-secondary);
      font-size: var(--io-font-size-sm, 12px);
      line-height: var(--io-line-height-normal, 1.5);
    }
  `;
}
