export function getFlyoutStyles(): string {
  return `
    :host {
      display: contents;
    }

    /* ── Backdrop ─────────────────────────────────────────────── */

    .flyout__backdrop {
      position: fixed;
      inset: 0;
      background: var(--io-flyout-backdrop);
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
      /* Two-phase transition: exit uses shorter duration + ease-out */
      transition:
        transform var(--io-duration-overlay-exit, 200ms) var(--io-ease-overlay-exit, cubic-bezier(0.4, 0, 1, 1)),
        opacity var(--io-duration-overlay-exit, 200ms) var(--io-ease-overlay-exit, cubic-bezier(0.4, 0, 1, 1));
      opacity: 0;
    }

    /* ── Position variants ────────────────────────────────────── */

    /* end / right — inline-end edge (right in LTR, left in RTL) */
    .flyout__panel--end {
      inset-inline-end: 0;
      inset-inline-start: auto;
      border-inline-end: none;
      border-start-start-radius: var(--io-border-radius-md);
      border-end-start-radius: var(--io-border-radius-md);
      border-start-end-radius: 0;
      border-end-end-radius: 0;
      transform: translateX(100%);
    }

    /* In RTL the panel slides in from the physical left, so invert the translation */
    :host-context([dir="rtl"]) .flyout__panel--end,
    :dir(rtl) .flyout__panel--end {
      transform: translateX(-100%);
    }

    /* start / left — inline-start edge (left in LTR, right in RTL) */
    .flyout__panel--start {
      inset-inline-start: 0;
      inset-inline-end: auto;
      border-inline-start: none;
      border-start-end-radius: var(--io-border-radius-md);
      border-end-end-radius: var(--io-border-radius-md);
      border-start-start-radius: 0;
      border-end-start-radius: 0;
      transform: translateX(-100%);
    }

    /* In RTL the start panel slides in from the physical right */
    :host-context([dir="rtl"]) .flyout__panel--start,
    :dir(rtl) .flyout__panel--start {
      transform: translateX(100%);
    }

    /* ── Open state ───────────────────────────────────────────── */

    .flyout__panel--open.flyout__panel--end,
    .flyout__panel--open.flyout__panel--start {
      transform: translateX(0);
    }

    /* ── Legacy aliases (deprecated) ─────────────────────────── */
    /* 'left' and 'right' are mapped to 'start'/'end' in JS but the CSS
       classes are kept as aliases pointing to the logical variants so
       any consumer that passes class names directly keeps working. */
    .flyout__panel--right {
      inset-inline-end: 0;
      inset-inline-start: auto;
      border-inline-end: none;
      border-start-start-radius: var(--io-border-radius-md);
      border-end-start-radius: var(--io-border-radius-md);
      border-start-end-radius: 0;
      border-end-end-radius: 0;
      transform: translateX(100%);
    }

    :host-context([dir="rtl"]) .flyout__panel--right,
    :dir(rtl) .flyout__panel--right {
      transform: translateX(-100%);
    }

    .flyout__panel--left {
      inset-inline-start: 0;
      inset-inline-end: auto;
      border-inline-start: none;
      border-start-end-radius: var(--io-border-radius-md);
      border-end-end-radius: var(--io-border-radius-md);
      border-start-start-radius: 0;
      border-end-start-radius: 0;
      transform: translateX(-100%);
    }

    :host-context([dir="rtl"]) .flyout__panel--left,
    :dir(rtl) .flyout__panel--left {
      transform: translateX(100%);
    }

    .flyout__panel--open.flyout__panel--right,
    .flyout__panel--open.flyout__panel--left {
      transform: translateX(0);
      opacity: 1;
      /* Enter: longer duration + ease-in (decelerate into resting position) */
      transition:
        transform var(--io-duration-overlay-enter, 300ms) var(--io-ease-overlay-enter, cubic-bezier(0, 0, 0.2, 1)),
        opacity var(--io-duration-overlay-enter, 300ms) var(--io-ease-overlay-enter, cubic-bezier(0, 0, 0.2, 1));
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

    /* ── Sticky footer layout ────────────────────────────────── */

    /*
     * When footerBehavior=sticky (default), the panel uses a flex column
     * layout where the header is sticky at top, body scrolls, and footer
     * is sticky at bottom. The panel itself does NOT scroll — only the body.
     */

    .flyout__panel--footer-sticky {
      overflow: hidden;
    }

    .flyout__panel--footer-sticky .flyout__header {
      position: sticky;
      top: var(--io-flyout-sticky-top, 0);
      background: inherit;
      z-index: 1;
    }

    .flyout__panel--footer-sticky .flyout__body {
      overflow-y: auto;
      flex: 1;
    }

    .flyout__panel--footer-sticky .flyout__footer {
      position: sticky;
      bottom: 0;
      background: inherit;
      z-index: 1;
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

    /* Scroll shadow when footer is pinned (content still scrollable) */

    .flyout__footer--pinned {
      box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.08);
    }

    /* ── Sub-footer ──────────────────────────────────────────── */

    .flyout__sub-footer {
      padding: var(--io-space-4) var(--io-space-6);
      border-top: 1px solid var(--io-border);
      flex-shrink: 0;
      font-size: var(--io-font-size-sm);
      color: var(--io-text-secondary);
    }

    .flyout__sub-footer--hidden {
      display: none;
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
      .flyout__panel,
      .flyout__panel--open.flyout__panel--right,
      .flyout__panel--open.flyout__panel--left,
      .flyout__panel--open.flyout__panel--end,
      .flyout__panel--open.flyout__panel--start {
        transition: none;
        transition-duration: 0ms;
      }
    }
  `;
}
