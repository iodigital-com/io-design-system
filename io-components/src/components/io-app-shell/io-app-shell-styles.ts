/**
 * io-app-shell CSS generator.
 *
 * Returns a <style> string injected into the Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 */
export function getAppShellStyles(): string {
  return `
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      position: relative;
      background-color: var(--io-bg-base);
      --io-app-shell-header-height: var(--io-header-height, 72px);
      --io-app-shell-sidebar-start-width: 320px;
      --io-app-shell-sidebar-end-width: 320px;
    }

    /* ── Header ─────────────────────────────────────────────── */
    .shell__header {
      position: sticky;
      top: 0;
      z-index: var(--io-z-header, 100);
      height: var(--io-app-shell-header-height);
      display: flex;
      align-items: center;
      gap: var(--io-space-4);
      padding: 0 var(--io-space-5);
      background-color: var(--io-bg-surface);
      border-bottom: 1px solid var(--io-border);
      box-sizing: border-box;
      flex-shrink: 0;
    }

    .shell__header-start {
      display: flex;
      align-items: center;
      gap: var(--io-space-3);
      flex-shrink: 0;
    }

    .shell__header-title {
      flex: 1;
      min-width: 0;
      display: flex;
      align-items: center;
    }

    .shell__header-end {
      display: flex;
      align-items: center;
      gap: var(--io-space-3);
      flex-shrink: 0;
      margin-left: auto;
    }

    /* ── Body layout (sidebar + main + sidebar-end) ──────────── */
    .shell__body {
      display: flex;
      flex: 1;
      min-height: 0;
      overflow: hidden;
      position: relative;
    }

    /* ── Sidebar start ──────────────────────────────────────── */
    .shell__sidebar-start {
      position: sticky;
      top: var(--io-app-shell-header-height);
      height: calc(100vh - var(--io-app-shell-header-height));
      width: var(--io-app-shell-sidebar-start-width);
      flex-shrink: 0;
      overflow-y: auto;
      background-color: var(--io-bg-surface);
      border-right: 1px solid var(--io-border);
      transition: transform var(--io-motion-duration-md) var(--io-motion-easing-standard),
                  visibility var(--io-motion-duration-md);
      box-sizing: border-box;
      z-index: var(--io-z-overlay, 200);
    }

    :host([sidebar-start-open="false"]) .shell__sidebar-start,
    .shell__sidebar-start--closed {
      transform: translateX(-100%);
      visibility: hidden;
    }

    /* ── Main content ────────────────────────────────────────── */
    .shell__main {
      flex: 1;
      min-width: 0;
      overflow-y: auto;
      position: relative;
    }

    /* ── Sidebar end ─────────────────────────────────────────── */
    .shell__sidebar-end {
      position: sticky;
      top: var(--io-app-shell-header-height);
      height: calc(100vh - var(--io-app-shell-header-height));
      width: var(--io-app-shell-sidebar-end-width);
      flex-shrink: 0;
      overflow-y: auto;
      background-color: var(--io-bg-surface);
      border-left: 1px solid var(--io-border);
      transition: transform var(--io-motion-duration-md) var(--io-motion-easing-standard),
                  visibility var(--io-motion-duration-md);
      box-sizing: border-box;
    }

    :host([sidebar-end-open="false"]) .shell__sidebar-end,
    .shell__sidebar-end--closed {
      transform: translateX(100%);
      visibility: hidden;
    }

    /* ── Footer ─────────────────────────────────────────────── */
    .shell__footer {
      flex-shrink: 0;
      background-color: var(--io-bg-surface);
      border-top: 1px solid var(--io-border);
    }

    /* ── Background (hero media) ─────────────────────────────── */
    .shell__background {
      position: fixed;
      inset: 0;
      z-index: -1;
      pointer-events: none;
    }

    /* ── Mobile backdrop ─────────────────────────────────────── */
    .shell__backdrop {
      display: none;
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: calc(var(--io-z-overlay, 200) - 1);
      cursor: pointer;
    }

    .shell__backdrop--visible {
      display: block;
    }

    /* ── Skip link ───────────────────────────────────────────── */
    .shell__skip-link {
      position: absolute;
      top: var(--io-space-2);
      left: var(--io-space-2);
      z-index: calc(var(--io-z-header, 100) + 10);
      background-color: var(--io-bg-surface);
      color: var(--io-text-primary);
      padding: var(--io-space-2) var(--io-space-4);
      border-radius: var(--io-border-radius-sm);
      font-family: var(--io-font-primary);
      font-size: var(--io-text-sm);
      font-weight: var(--io-font-weight-semibold);
      text-decoration: none;
      transform: translateY(-200%);
      transition: transform var(--io-motion-duration-sm) var(--io-motion-easing-standard);
    }

    .shell__skip-link:focus {
      transform: translateY(0);
      box-shadow: var(--io-focus-ring-active);
      outline: none;
    }

    /* ── Mobile overlay mode ─────────────────────────────────── */
    @media (max-width: 1023px) {
      .shell__sidebar-start {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
      }

      :host([sidebar-start-open]) .shell__sidebar-start:not(.shell__sidebar-start--closed) {
        visibility: visible;
        transform: translateX(0);
      }
    }
  `;
}
