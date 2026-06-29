/**
 * io-tabs-bar CSS-in-JS style generator.
 *
 * Returns a <style> string for the tabs-bar component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 *
 * GOVERNANCE: Do not hardcode colors, spacing, or radii here.
 * Add new tokens to src/global/app.css first, then reference them.
 */
export function getTabsBarStyles(): string {
  return `
    :host {
      display: block;
      font-family: var(--io-font-primary);
    }

    /* ── Tab list / nav wrapper ──────────────────────────── */

    .tablist {
      display: flex;
      align-items: stretch;
      border-bottom: 1px solid var(--io-tabs-track-color);
      overflow-x: auto;
      scrollbar-width: none;
      position: relative;
      /* Edge-fade mask tokens (issue #961) */
      --_fade-size: var(--io-tabs-bar-fade-size, 3rem);
      --_fade-color: var(--io-tabs-bar-fade-color, var(--io-surface-primary, #fff));
    }

    .tablist::-webkit-scrollbar {
      display: none;
    }

    /* ── Edge-fade mask (issue #961) ─────────────────────── */

    .tablist--fade-start:not(.tablist--fade-end) {
      -webkit-mask-image: linear-gradient(
        to right,
        transparent 0,
        var(--_fade-color) var(--_fade-size)
      );
      mask-image: linear-gradient(
        to right,
        transparent 0,
        var(--_fade-color) var(--_fade-size)
      );
    }

    .tablist--fade-end:not(.tablist--fade-start) {
      -webkit-mask-image: linear-gradient(
        to left,
        transparent 0,
        var(--_fade-color) var(--_fade-size)
      );
      mask-image: linear-gradient(
        to left,
        transparent 0,
        var(--_fade-color) var(--_fade-size)
      );
    }

    .tablist--fade-start.tablist--fade-end {
      -webkit-mask-image: linear-gradient(
        to right,
        transparent 0,
        var(--_fade-color) var(--_fade-size),
        var(--_fade-color) calc(100% - var(--_fade-size)),
        transparent 100%
      );
      mask-image: linear-gradient(
        to right,
        transparent 0,
        var(--_fade-color) var(--_fade-size),
        var(--_fade-color) calc(100% - var(--_fade-size)),
        transparent 100%
      );
    }

    /* ── Overflow sentinel elements (issue #961) ─────────── */

    .sentinel-start,
    .sentinel-end {
      display: block;
      flex-shrink: 0;
      width: 1px;
      height: 1px;
      pointer-events: none;
      align-self: center;
    }

    /* ── Slotted tab button / anchor (base) ─────────────── */

    ::slotted(button),
    ::slotted(a) {
      /* !important overrides are required here: Tailwind's preflight resets
         button {padding:0; color:inherit; font-*:inherit; cursor:default}
         in the outer document, and light-DOM author styles take cascade
         precedence over shadow-DOM ::slotted() at equal specificity.        */
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      gap: var(--io-tabs-icon-gap) !important;
      padding: var(--io-space-3) var(--io-space-4) !important;
      font-family: var(--io-font-primary) !important;
      font-size: var(--io-font-size-sm) !important;
      font-weight: var(--io-font-weight-medium) !important;
      line-height: var(--io-line-height-normal) !important;
      color: var(--io-text-secondary) !important;
      background: transparent !important;
      border: none !important;
      border-bottom: 2px solid transparent !important;
      margin: 0 0 -1px 0 !important;
      cursor: pointer !important;
      white-space: nowrap !important;
      flex-shrink: 0 !important;
      text-decoration: none !important;
      transition: color var(--io-motion-fast), background-color var(--io-motion-fast), border-bottom-color var(--io-motion-fast);
      -webkit-font-smoothing: antialiased;
    }

    /* ── Active tab ──────────────────────────────────────── */

    ::slotted(button[aria-selected="true"]),
    ::slotted(a[aria-selected="true"]) {
      color: var(--io-text-primary) !important;
    }

    /* ── Sliding indicator ───────────────────────────────── */

    .indicator {
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 0;
      height: var(--io-tabs-indicator-height, 2px);
      background: var(--io-tabs-indicator-color);
      pointer-events: none;
      will-change: left, width;
      /* --io-tabs-bar-indicator-duration and --io-tabs-bar-indicator-easing are read via
         JS getPropertyValue() on :host — they are public consumer override points defined in app.css */
      transition: none;
    }

    /* ── Hover ───────────────────────────────────────────── */

    @media (hover: hover) and (pointer: fine) {
      ::slotted(button:not([aria-selected="true"]):not(:disabled):hover),
      ::slotted(a:not([aria-selected="true"]):not([aria-disabled="true"]):hover) {
        color: var(--io-text-primary) !important;
        background: var(--io-state-hover) !important;
      }
    }

    /* ── Disabled ────────────────────────────────────────── */

    ::slotted(button:disabled),
    ::slotted(a[aria-disabled="true"]) {
      opacity: var(--io-state-disabled-opacity);
      cursor: not-allowed;
      pointer-events: none;
    }

    /* ── Focus visible ───────────────────────────────────── */

    ::slotted(button:focus-visible),
    ::slotted(a:focus-visible) {
      outline: none;
      box-shadow: var(--io-focus-ring-active);
      border-radius: var(--io-border-radius-xs);
    }

    /* ── Reduced motion ──────────────────────────────────── */

    @media (prefers-reduced-motion: reduce) {
      ::slotted(button),
      ::slotted(a) { transition: none; }
    }

    /* ── Compact layout ──────────────────────────────────── */

    :host([compact]) .tablist {
      padding: var(--io-space-1) var(--io-space-2);
    }

    :host([compact]) ::slotted(button),
    :host([compact]) ::slotted(a) {
      padding: var(--io-space-1) var(--io-space-2) !important;
    }

    /* ── Forced colors / Windows High Contrast Mode ──────── */

    @media (forced-colors: active) {
      .tablist {
        border-bottom: 2px solid ButtonText;
        forced-color-adjust: none;
      }

      ::slotted(button[aria-selected="true"]),
      ::slotted(a[aria-selected="true"]) {
        color: Highlight !important;
        border-bottom-color: Highlight !important;
        outline: 2px solid Highlight;
        forced-color-adjust: none;
      }

      ::slotted(button:disabled),
      ::slotted([aria-disabled="true"]) {
        color: GrayText !important;
        forced-color-adjust: none;
      }
    }
  `;
}
