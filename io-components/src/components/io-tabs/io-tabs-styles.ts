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
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: var(--io-space-3) var(--io-space-4);
      font-family: var(--io-font-primary);
      font-size: var(--io-font-size-sm);
      font-weight: var(--io-font-weight-medium);
      color: var(--io-text-secondary);
      background: transparent;
      border: none;
      border-bottom: 2px solid transparent;
      margin-bottom: -1px;
      cursor: pointer;
      white-space: nowrap;
      flex-shrink: 0;
      transition: color var(--io-motion-fast), background-color var(--io-motion-fast), border-bottom-color var(--io-motion-fast);
      -webkit-font-smoothing: antialiased;
    }

    /* ── Active tab ──────────────────────────────────────── */

    ::slotted(button[aria-selected="true"]) {
      color: var(--io-text-primary);
      border-bottom-color: var(--io-tabs-indicator-color);
    }

    /* ── Hover ───────────────────────────────────────────── */

    @media (hover: hover) and (pointer: fine) {
      ::slotted(button:not([aria-selected="true"]):not(:disabled):hover) {
        color: var(--io-text-primary);
        background: var(--io-state-hover);
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

    /* ── Reduced motion ──────────────────────────────────── */

    @media (prefers-reduced-motion: reduce) {
      ::slotted(button) { transition: none; }
    }
  `;
}
