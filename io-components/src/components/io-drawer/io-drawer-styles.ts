export function getDrawerStyles(): string {
  return `
    :host {
      display: contents;
    }

    dialog {
      border: 1px solid var(--io-border);
      background: var(--io-bg-base);
      box-shadow: var(--io-shadow-xl);
      padding: 0;
      margin: 0;
      max-width: none;
      max-height: none;
      overflow-y: auto;
      color: var(--io-text-primary);
      font-family: var(--io-font-primary);
      position: fixed;
    }

    dialog:not([open]) {
      display: none;
    }

    dialog[open] {
      display: flex;
      flex-direction: column;
    }

    dialog::backdrop {
      background: var(--io-backdrop, var(--io-drawer-backdrop));
    }

    /* ── Placement: right (default) ──────────────────────────── */

    dialog.drawer--right {
      top: 0;
      right: 0;
      bottom: 0;
      left: auto;
      border-right: none;
      border-radius: var(--io-border-radius-md) 0 0 var(--io-border-radius-md);
      animation: drawer-in-right var(--io-motion-base) both;
    }

    dialog.drawer--right.drawer--sm { width: var(--io-drawer-width-sm); height: 100%; }
    dialog.drawer--right.drawer--md { width: var(--io-drawer-width-md); height: 100%; }
    dialog.drawer--right.drawer--lg { width: var(--io-drawer-width-lg); height: 100%; }
    dialog.drawer--right.drawer--full { width: 100vw; height: 100vh; }

    /* ── Placement: left ─────────────────────────────────────── */

    dialog.drawer--left {
      top: 0;
      left: 0;
      bottom: 0;
      right: auto;
      border-left: none;
      border-radius: 0 var(--io-border-radius-md) var(--io-border-radius-md) 0;
      animation: drawer-in-left var(--io-motion-base) both;
    }

    dialog.drawer--left.drawer--sm { width: var(--io-drawer-width-sm); height: 100%; }
    dialog.drawer--left.drawer--md { width: var(--io-drawer-width-md); height: 100%; }
    dialog.drawer--left.drawer--lg { width: var(--io-drawer-width-lg); height: 100%; }
    dialog.drawer--left.drawer--full { width: 100vw; height: 100vh; }

    /* ── Placement: bottom ───────────────────────────────────── */

    dialog.drawer--bottom {
      bottom: 0;
      left: 0;
      right: 0;
      top: auto;
      border-bottom: none;
      border-radius: var(--io-border-radius-md) var(--io-border-radius-md) 0 0;
      width: 100%;
      animation: drawer-in-bottom var(--io-motion-base) both;
    }

    dialog.drawer--bottom.drawer--sm { height: 40vh; }
    dialog.drawer--bottom.drawer--md { height: 50vh; }
    dialog.drawer--bottom.drawer--lg { height: 66vh; }
    dialog.drawer--bottom.drawer--full { height: 100vh; width: 100vw; }

    /* ── Header ──────────────────────────────────────────────── */

    .drawer__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--io-space-4);
      padding: var(--io-space-5) var(--io-space-6);
      border-bottom: 1px solid var(--io-border);
      flex-shrink: 0;
    }

    .drawer__heading {
      margin: 0;
      font-size: var(--io-font-size-lg);
      font-weight: var(--io-font-weight-semibold);
      line-height: var(--io-line-height-tight);
      color: var(--io-text-primary);
    }

    .drawer__close {
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

    .drawer__close:focus-visible {
      outline: none;
      box-shadow: var(--io-focus-ring-active);
    }

    /* ── Body ────────────────────────────────────────────────── */

    .drawer__body {
      padding: var(--io-space-6);
      flex: 1;
      overflow-y: auto;
    }

    /* ── Footer ──────────────────────────────────────────────── */

    .drawer__footer {
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
      .drawer__close:hover {
        color: var(--io-text-primary);
        background-color: var(--io-state-hover);
      }
    }

    /* ── Animations ─────────────────────────────────────────── */

    @keyframes drawer-in-right {
      from { transform: translateX(100%); }
      to   { transform: translateX(0); }
    }

    @keyframes drawer-in-left {
      from { transform: translateX(-100%); }
      to   { transform: translateX(0); }
    }

    @keyframes drawer-in-bottom {
      from { transform: translateY(100%); }
      to   { transform: translateY(0); }
    }

    @media (prefers-reduced-motion: reduce) {
      dialog {
        animation: none;
      }
    }
  `;
}
