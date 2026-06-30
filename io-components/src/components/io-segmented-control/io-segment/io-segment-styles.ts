/**
 * io-segment CSS-in-JS style generator.
 *
 * Returns a <style> string for the segment component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 *
 * GOVERNANCE: Do not hardcode colors, spacing, or radii here.
 *     Add new tokens to src/global/app.css first, then reference them.
 */
export function getSegmentStyles(): string {
  return `
    :host {
      display: inline-flex;
      align-items: stretch;
      flex: 1;
      font-family: var(--io-font-primary);
    }

    /* ── Segment button ─────────────────────────────────────── */

    .segment {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--io-space-2);
      padding: var(--io-space-2) var(--io-space-4);
      width: 100%;
      background: transparent;
      border: none;
      border-left: 1px solid var(--io-border-interactive);
      border-radius: 0;
      color: var(--io-text-primary);
      font-family: var(--io-font-primary);
      font-size: var(--io-font-size-sm);
      font-weight: var(--io-font-weight-medium);
      line-height: var(--io-line-height-normal);
      white-space: nowrap;
      cursor: pointer;
      min-height: var(--io-touch-target-min);
      transition:
        background-color var(--io-motion-fast),
        color var(--io-motion-fast);
      -webkit-font-smoothing: antialiased;
    }

    /* First segment has no left border (outer border is on the container) */
    :host(:first-of-type) .segment,
    :host(:first-child) .segment {
      border-left: none;
    }

    /* ── Selected state ─────────────────────────────────────── */

    .segment--selected {
      background: var(--io-color-primary);
      color: var(--io-color-white);
    }

    /* ── Hover state ────────────────────────────────────────── */

    @media (hover: hover) and (pointer: fine) {
      .segment:not(.segment--selected):not(.segment--disabled):hover {
        background: var(--io-state-hover);
      }
    }

    /* ── Disabled state ─────────────────────────────────────── */

    .segment--disabled {
      opacity: var(--io-state-disabled-opacity);
      cursor: not-allowed;
      pointer-events: none;
    }

    /* ── Focus visible ──────────────────────────────────────── */

    .segment:focus-visible {
      outline: none;
      box-shadow: var(--io-focus-ring-active);
      position: relative;
      z-index: 1;
    }

    /* ── Icon ───────────────────────────────────────────────── */

    .segment__icon {
      display: inline-flex;
      align-items: center;
      flex-shrink: 0;
    }

    /* Custom icon source image — matches built-in io-icon sizing */
    .segment__icon-source {
      display: block;
      width: var(--io-segment-icon-source-size);
      height: var(--io-segment-icon-source-size);
      object-fit: contain;
    }

    /* ── Icon-only (hideLabel) ──────────────────────────────── */

    .segment--icon-only {
      /* Ensure square touch target when no label is rendered */
      min-width: var(--io-touch-target-min);
      padding-left: var(--io-space-2);
      padding-right: var(--io-space-2);
    }

    /* ── Badge slot ─────────────────────────────────────────── */

    .segment__badge {
      display: inline-flex;
      align-items: center;
      color: var(--io-segment-badge-color);
    }

    /* Hide the named slot element from layout — it is exposed via .segment__badge */
    slot[name="badge"] {
      display: none;
    }

    /* ── Reduced motion ─────────────────────────────────────── */

    @media (prefers-reduced-motion: reduce) {
      .segment {
        transition: none;
      }
    }
  `;
}
