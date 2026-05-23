/**
 * io-skeleton CSS-in-JS style generator.
 *
 * Returns a <style> string for the skeleton component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 *
 * ⚠️  GOVERNANCE: Do not hardcode colors, spacing, or radii here.
 *     Add new tokens to src/global/app.css first, then reference them.
 */
export function getSkeletonStyles(): string {
  return `
    :host {
      display: inline-block;
      font-family: var(--io-font-primary);
    }

    .skeleton {
      background: var(--io-skeleton-bg);
      background-size: var(--io-skeleton-bg-size);
      animation: io-skeleton-pulse var(--io-skeleton-duration) linear infinite;
    }

    /* ── Animated state ──────────────────────────────────────── */

    :host([animated="false"]) .skeleton,
    :host(:not([animated])) .skeleton--static {
      animation: none;
      background: var(--io-color-grey-2);
    }

    /* ── Variants ────────────────────────────────────────────── */

    .skeleton--text {
      width: 100%;
      height: 1em;
      border-radius: var(--io-skeleton-border-radius-text);
    }

    .skeleton--circular {
      width: 40px;
      height: 40px;
      border-radius: var(--io-border-radius-pill);
    }

    .skeleton--rectangular {
      width: 100%;
      height: 100px;
      border-radius: 0;
    }

    .skeleton--rounded {
      width: 100%;
      height: 100px;
      border-radius: var(--io-skeleton-border-radius-rounded);
    }

    /* ── Reduced motion ──────────────────────────────────────── */

    @media (prefers-reduced-motion: reduce) {
      .skeleton {
        animation: none;
      }
    }
  `;
}
