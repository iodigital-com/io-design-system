/**
 * io-segmented-control CSS-in-JS style generator.
 *
 * Returns a <style> string for the segmented-control component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 *
 * GOVERNANCE: Do not hardcode colors, spacing, or radii here.
 *     Add new tokens to src/global/app.css first, then reference them.
 */
export function getSegmentedControlStyles(): string {
  return `
    :host {
      display: inline-flex;
      flex-direction: column;
      gap: var(--io-space-1);
      font-family: var(--io-font-primary);
    }

    /* ── Label ──────────────────────────────────────────────── */

    .segmented-control__label {
      font-size: var(--io-font-size-sm);
      color: var(--io-text-default);
    }

    /* ── Bar container ──────────────────────────────────────── */

    .segmented-control {
      display: inline-flex;
      align-items: stretch;
      border: 1px solid var(--io-border-interactive);
      border-radius: var(--io-border-radius-sm);
      background: var(--io-bg-surface);
      overflow: hidden;
      gap: 0;
    }

    /* ── Disabled state ─────────────────────────────────────── */

    :host([disabled]) .segmented-control {
      opacity: var(--io-state-disabled-opacity);
      pointer-events: none;
    }
  `;
}
