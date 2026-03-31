/**
 * io-pagination CSS-in-JS style generator.
 *
 * Returns a <style> string for the pagination component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 *
 * ⚠️  GOVERNANCE: Do not hardcode colors, spacing, or radii here.
 *     Add new tokens to src/global/app.css first, then reference them.
 */
export function getPaginationStyles(): string {
  return `
    :host {
      display: block;
      font-family: var(--io-font-primary);
    }

    /* ── Container ──────────────────────────────────────── */

    .pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--io-space-4);
      flex-wrap: wrap;
    }

    /* ── Shared button base ─────────────────────────────── */

    .page-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--io-space-12);
      height: var(--io-space-12);
      border-radius: var(--io-border-radius-pill);
      font-family: var(--io-font-primary);
      font-size: var(--io-font-size-sm);
      font-weight: var(--io-font-weight-medium);
      cursor: pointer;
      transition:
        border-color var(--io-motion-fast),
        color var(--io-motion-fast),
        background-color var(--io-motion-fast);
      -webkit-font-smoothing: antialiased;
    }

    /* ── Number buttons ─────────────────────────────────── */

    .page-btn--number {
      border: 1px solid var(--io-color-grey-4);
      background: transparent;
      color: var(--io-color-grey-4);
    }

    @media (hover: hover) and (pointer: fine) {
      .page-btn--number:hover:not(:disabled) {
        border: 2px solid var(--io-color-primary);
        color: var(--io-color-primary);
      }
    }

    /* ── Active page ────────────────────────────────────── */

    .page-btn--active {
      border: none;
      color: var(--io-color-white);
      font-weight: var(--io-font-weight-bold);
      background: var(--io-color-beige);
      cursor: default;
    }

    /* ── Nav arrow buttons ──────────────────────────────── */

    .page-btn--nav {
      border: none;
      background: var(--io-color-beige);
      color: var(--io-color-white);
    }

    @media (hover: hover) and (pointer: fine) {
      .page-btn--nav:hover:not(:disabled) {
        background: var(--io-color-beige);
        border: none;
        color: var(--io-color-white);
      }
    }

    .page-btn--nav:disabled {
      opacity: var(--io-state-disabled-opacity);
      cursor: not-allowed;
    }

    /* ── Ellipsis ───────────────────────────────────────── */

    .page-dots {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--io-space-12);
      height: var(--io-space-12);
      font-size: var(--io-font-size-sm);
      color: var(--io-text-secondary);
      font-weight: var(--io-font-weight-bold);
    }

    /* ── Focus visible ──────────────────────────────────── */

    .page-btn:focus-visible {
      outline: none;
      box-shadow: var(--io-focus-ring-active);
    }

    @media (prefers-reduced-motion: reduce) {
      .page-btn { transition: none; }
    }
  `;
}
