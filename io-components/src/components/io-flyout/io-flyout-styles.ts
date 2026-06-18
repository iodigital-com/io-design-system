export function getFlyoutStyles(): string {
  return `
    :host {
      display: contents;
    }

    /* ── Backdrop ─────────────────────────────────────────────── */

    .flyout__backdrop {
      position: fixed;
      inset: 0;
      background: var(--io-drawer-backdrop);
      z-index: calc(var(--io-z-modal, 1000) - 1);
    }

    /* ── Panel ────────────────────────────────────────────────── */

    .flyout__panel {
      position: fixed;
      top: 0;
      bottom: 0;
      width: 480px;
      background: var(--io-bg-card);
      box-shadow: var(--io-shadow-lg);
      z-index: var(--io-z-modal, 1000);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      color: var(--io-text-primary);
      font-family: var(--io-font-primary);
      border: 1px solid var(--io-border);
      transition: transform var(--io-motion-overlay-enter, 0.25s ease);
    }

    /* ── Position variants ────────────────────────────────────── */

    .flyout__panel--right {
      right: 0;
      left: auto;
      border-right: none;
      border-radius: var(--io-border-radius-md) 0 0 var(--io-border-radius-md);
      transform: translateX(100%);
    }

    .flyout__panel--left {
      left: 0;
      right: auto;
      border-left: none;
      border-radius: 0 var(--io-border-radius-md) var(--io-border-radius-md) 0;
      transform: translateX(-100%);
    }

    /* ── Open state ───────────────────────────────────────────── */

    .flyout__panel--open.flyout__panel--right,
    .flyout__panel--open.flyout__panel--left {
      transform: translateX(0);
    }

    /* ── Hidden state ─────────────────────────────────────────── */
    /*
     * Do NOT use visibility:hidden here — that would instantly hide the panel
     * and prevent the close animation from playing.
     * Instead we use pointer-events:none + the inert attribute (set in JS)
     * so the panel slides off-screen before becoming unreachable.
     */

    .flyout__panel[aria-hidden='true'] {
      pointer-events: none;
    }

    /* ── Header ──────────────────────────────────────────────── */

    .flyout__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--io-space-4);
      padding: var(--io-space-5) var(--io-space-6);
      border-bottom: 1px solid var(--io-border);
      flex-shrink: 0;
    }

    .flyout__heading {
      margin: 0;
      font-size: var(--io-font-size-lg);
      font-weight: var(--io-font-weight-semibold);
      line-height: var(--io-line-height-tight);
      color: var(--io-text-primary);
    }

    .flyout__close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--io-touch-target-min);
      height: var(--io-touch-target-min);
      border: none;
      background: transparent;
      color: var(--io-text-secondary);
      border-radius: var(--io-border-radius-sm);
      cursor: pointer;
      flex-shrink: 0;
      transition: color var(--io-motion-fast), background-color var(--io-motion-fast);
    }

    .flyout__close:focus-visible {
      outline: none;
      box-shadow: var(--io-focus-ring-active);
    }

    /* ── Header slot area ─────────────────────────────────────── */

    .flyout__header-slot {
      flex: 1;
      min-width: 0;
    }

    /* ── Body ────────────────────────────────────────────────── */

    .flyout__body {
      padding: var(--io-space-6);
      flex: 1;
      overflow-y: auto;
    }

    /* ── Footer ──────────────────────────────────────────────── */

    .flyout__footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--io-space-3);
      padding: var(--io-space-4) var(--io-space-6);
      border-top: 1px solid var(--io-border);
      flex-shrink: 0;
    }

    /* ── Hover (pointer devices only) ────────────────────────── */

    @media (hover: hover) and (pointer: fine) {
      .flyout__close:hover {
        color: var(--io-text-primary);
        background-color: var(--io-state-hover);
      }
    }

    /* ── Mobile: full-width on narrow viewports ──────────────── */

    @media (max-width: 480px) {
      .flyout__panel {
        width: 100vw;
      }
    }

    /* ── Reduced motion ──────────────────────────────────────── */

    @media (prefers-reduced-motion: reduce) {
      .flyout__panel {
        transition: none;
      }
    }
  `;
}
