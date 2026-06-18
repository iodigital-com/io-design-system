/**
 * io-tabs CSS-in-JS style generator.
 *
 * Returns a <style> string for the tabs component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 *
 * ⚠️  GOVERNANCE: Do not hardcode colors, spacing, or radii here.
 *     Add new tokens to src/global/app.css first, then reference them.
 */
export function getTabsStyles(): string {
  return `
    :host {
      display: block;
      font-family: var(--io-font-primary);
    }

    /* ── Tab list ────────────────────────────────────────── */

    .tablist {
      display: flex;
      align-items: stretch;
      border-bottom: 1px solid var(--io-tabs-track-color);
      overflow-x: auto;
      scrollbar-width: none;
    }

    .tablist::-webkit-scrollbar {
      display: none;
    }

    /* ── Slotted tab button (base) ──────────────────────── */

    ::slotted(button) {
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
      transition: color var(--io-motion-fast), background-color var(--io-motion-fast), border-bottom-color var(--io-motion-fast);
      -webkit-font-smoothing: antialiased;
    }

    /* ── Active tab ──────────────────────────────────────── */

    ::slotted(button[aria-selected="true"]) {
      color: var(--io-text-primary) !important;
      border-bottom-color: var(--io-tabs-indicator-color) !important;
    }

    /* ── Hover ───────────────────────────────────────────── */

    @media (hover: hover) and (pointer: fine) {
      ::slotted(button:not([aria-selected="true"]):not(:disabled):hover) {
        color: var(--io-text-primary) !important;
        background: var(--io-state-hover) !important;
      }
    }

    /* ── Disabled ────────────────────────────────────────── */

    ::slotted(button:disabled) {
      opacity: var(--io-state-disabled-opacity);
      cursor: not-allowed;
      pointer-events: none;
    }

    /* ── Focus visible ───────────────────────────────────── */

    ::slotted(button:focus-visible) {
      outline: none;
      box-shadow: var(--io-focus-ring-active);
      border-radius: var(--io-border-radius-xs);
    }

    /* ── Size variants ───────────────────────────────────── */

    .tabs--size-small ::slotted(button) {
      font-size: var(--io-font-size-sm) !important;
    }

    .tabs--size-medium ::slotted(button) {
      font-size: var(--io-font-size-base) !important;
    }

    /* ── Compact ─────────────────────────────────────────── */

    :host([compact]) .tablist ::slotted(button) {
      padding: var(--io-space-2) var(--io-space-3) !important;
    }

    /* ── Reduced motion ──────────────────────────────────── */

    @media (prefers-reduced-motion: reduce) {
      ::slotted(button) { transition: none; }
    }
  `;
}
