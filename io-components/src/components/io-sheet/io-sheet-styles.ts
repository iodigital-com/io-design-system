export function getSheetStyles(): string {
  return `
    :host {
      display: none;
    }

    :host([open]) {
      display: contents;
    }

    /* ── Backdrop ─────────────────────────────────────────────── */

    .sheet__backdrop {
      position: fixed;
      inset: 0;
      background: var(--io-color-overlay-bg);
      z-index: var(--io-z-overlay);
    }

    /* ── Panel ────────────────────────────────────────────────── */

    .sheet__panel {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      max-height: 80vh;
      overflow-y: auto;
      background: var(--io-bg-card);
      border-radius: var(--io-border-radius-sm) var(--io-border-radius-sm) 0 0;
      box-shadow: var(--io-shadow-lg);
      z-index: calc(var(--io-z-overlay) + 1);
      display: flex;
      flex-direction: column;
      color: var(--io-text-primary);
      font-family: var(--io-font-primary);
      animation: io-sheet-in var(--io-motion-overlay-enter, 0.25s) ease-out forwards;
    }

    /* ── Entry animation ──────────────────────────────────────── */

    @keyframes io-sheet-in {
      from {
        transform: translateY(100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    /* ── Drag handle ─────────────────────────────────────────── */

    .sheet__handle {
      width: var(--io-sheet-handle-width, 32px);
      height: var(--io-sheet-handle-height, 4px);
      background: var(--io-sheet-handle-color, var(--io-color-grey-3));
      border-radius: var(--io-border-radius-pill, 100px);
      margin: var(--io-space-3) auto var(--io-space-2);
      flex-shrink: 0;
    }

    /* ── Header ──────────────────────────────────────────────── */

    .sheet__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--io-space-4);
      padding: var(--io-space-5) var(--io-space-6);
      border-bottom: 1px solid var(--io-border);
      flex-shrink: 0;
    }

    .sheet__header-slot {
      flex: 1;
      min-width: 0;
    }

    .sheet__heading {
      margin: 0;
      font-size: var(--io-font-size-lg);
      font-weight: var(--io-font-weight-semibold);
      line-height: var(--io-line-height-tight);
      color: var(--io-text-primary);
    }

    /* ── Close button ────────────────────────────────────────── */

    .sheet__close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--io-touch-target-min, 44px);
      height: var(--io-touch-target-min, 44px);
      border: none;
      background: transparent;
      color: var(--io-text-secondary);
      border-radius: var(--io-border-radius-sm);
      cursor: pointer;
      flex-shrink: 0;
      transition: color var(--io-motion-fast), background-color var(--io-motion-fast);
    }

    .sheet__close:focus-visible {
      outline: none;
      box-shadow: var(--io-focus-ring-active);
    }

    /* ── Body ────────────────────────────────────────────────── */

    .sheet__body {
      padding: var(--io-space-6);
      flex: 1;
      overflow-y: auto;
    }

    /* ── Footer ──────────────────────────────────────────────── */

    .sheet__footer {
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
      .sheet__close:hover {
        color: var(--io-text-primary);
        background-color: var(--io-state-hover);
      }
    }

    /* ── Reduced motion ──────────────────────────────────────── */

    @media (prefers-reduced-motion: reduce) {
      .sheet__panel {
        animation: none;
      }
    }
  `;
}
