export function getPopoverStyles(): string {
  return `
    :host {
      display: inline-block;
      position: relative;
    }

    /* ── Trigger slot wrapper ─────────────────────────────────── */

    .popover__trigger {
      display: contents;
    }

    /* ── Panel (shared between native Popover API and fallback) ─ */

    .popover__panel {
      position: absolute;
      z-index: var(--io-z-dropdown);
      background: var(--io-bg-surface);
      border: 1px solid var(--io-border);
      border-radius: var(--io-border-radius-md);
      box-shadow: var(--io-shadow-md);
      padding: var(--io-space-4);
      color: var(--io-text-primary);
      font-family: var(--io-font-primary);
      font-size: var(--io-font-size-base);
      line-height: var(--io-line-height-base);
      min-width: max-content;
    }

    /* Hidden state (fallback — before native popover) */
    .popover__panel[aria-hidden="true"] {
      display: none;
    }

    /* When native Popover API is in use, the browser controls visibility.
       We still use the class for non-native fallback consumers. */
    .popover__panel[popover] {
      /* Reset browser default popover styles */
      position: fixed;
      border: 1px solid var(--io-border);
      border-radius: var(--io-border-radius-md);
      background: var(--io-bg-surface);
      box-shadow: var(--io-shadow-md);
      padding: var(--io-space-4);
      color: var(--io-text-primary);
      font-family: var(--io-font-primary);
      margin: 0;
      inset: unset;
    }

    /* ── Label ────────────────────────────────────────────────── */

    .popover__label {
      display: block;
      font-size: var(--io-font-size-sm);
      font-weight: var(--io-font-weight-semibold);
      color: var(--io-text-primary);
      margin-bottom: var(--io-space-2);
    }

    /* ── Description ─────────────────────────────────────────── */

    .popover__description {
      font-size: var(--io-font-size-xs);
      color: var(--io-text-secondary);
      margin: var(--io-space-1) 0 0;
    }

    /* ── Reduced motion ──────────────────────────────────────── */

    @media (prefers-reduced-motion: reduce) {
      .popover__panel {
        transition: none;
      }
    }
  `;
}
