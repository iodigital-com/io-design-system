/**
 * io-progress CSS-in-JS style generator.
 *
 * Returns a <style> string for the progress component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 *
 * Indeterminate animation uses two-stage primary/secondary bars to produce
 * continuous motion without a visible gap between cycles (issue #1016).
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
      position: relative;
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

    /* ── Indeterminate — two-stage animation to eliminate gap (#1016) ── */

    /*
     * Primary bar: grows from 0 to 60% width while translating across the track.
     * Secondary bar: follows with a 0.5s delay to fill the visual gap.
     * Both share --io-progress-indeterminate-duration for WCAG 2.2.2 compliance.
     */

    @keyframes io-progress-primary {
      0% {
        width: 0%;
        transform: translateX(-100%);
      }
      30% {
        width: 60%;
      }
      100% {
        width: 60%;
        transform: translateX(200%);
      }
    }

    @keyframes io-progress-secondary {
      0% {
        width: 0%;
        transform: translateX(-100%);
      }
      60% {
        width: 30%;
      }
      100% {
        width: 30%;
        transform: translateX(400%);
      }
    }

    .progress-fill--indeterminate {
      position: absolute;
      left: 0;
      top: 0;
      width: 0% !important;
      transform-origin: left;
      animation: io-progress-primary var(--io-progress-indeterminate-duration, 1s) linear infinite;
    }

    .progress-fill--indeterminate-secondary {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      border-radius: var(--io-border-radius-pill);
      transform-origin: left;
      animation: io-progress-secondary var(--io-progress-indeterminate-duration, 1s) linear infinite;
      animation-delay: calc(var(--io-progress-indeterminate-duration, 1s) * 0.5);
    }

    /* ── Reduced motion ──────────────────────────────────────────── */

    @media (prefers-reduced-motion: reduce) {
      .progress-fill { transition: none; }
      .progress-fill--indeterminate,
      .progress-fill--indeterminate-secondary {
        animation: none;
        /* Show static half-filled bar as reduced-motion affordance */
        width: 50% !important;
        transform: none;
      }
    }

    /* ── Screen-reader only ──────────────────────────────────────── */

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
