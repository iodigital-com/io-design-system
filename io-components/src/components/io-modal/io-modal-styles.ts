import { getTransition } from '../../utils/motion';

export function getModalStyles(): string {
  return `
    :host {
      display: contents;
    }

    dialog {
      border: 1px solid var(--io-border);
      border-radius: var(--io-border-radius-md);
      background: var(--io-bg-card);
      box-shadow: var(--io-shadow-xl);
      padding: 0;
      max-height: var(--io-modal-max-height);
      overflow-y: auto;
      color: var(--io-text-primary);
      font-family: var(--io-font-primary);
      /* Two-phase transition: exit uses shorter duration + ease-out (accelerate out) */
      opacity: 0;
      transform: translateY(var(--io-motion-entrance-offset-down, 12px));
      transition:
        opacity var(--io-duration-overlay-exit, 200ms) var(--io-ease-overlay-exit, cubic-bezier(0.4, 0, 1, 1)),
        transform var(--io-duration-overlay-exit, 200ms) var(--io-ease-overlay-exit, cubic-bezier(0.4, 0, 1, 1));
    }

    dialog[open] {
      /* Enter: longer duration + ease-in (decelerate into resting position) */
      display: flex;
      flex-direction: column;
      opacity: 1;
      transform: translateY(0);
      transition:
        opacity var(--io-duration-overlay-enter, 300ms) var(--io-ease-overlay-enter, cubic-bezier(0, 0, 0.2, 1)),
        transform var(--io-duration-overlay-enter, 300ms) var(--io-ease-overlay-enter, cubic-bezier(0, 0, 0.2, 1));
    }

    /* ── Background variants ─────────────────────────────────── */

    dialog.modal--bg-canvas {
      background: var(--io-bg-page);
    }

    dialog.modal--bg-surface {
      background: var(--io-bg-surface);
    }

    dialog.modal--bg-elevated {
      background: var(--io-bg-raised);
      box-shadow: var(--io-shadow-xl);
    }

    dialog::backdrop {
      background: var(--io-bg-overlay);
      backdrop-filter: blur(var(--io-backdrop-blur));
      opacity: 0;
      transition: opacity var(--io-duration-overlay-exit, 200ms) var(--io-ease-overlay-exit, cubic-bezier(0.4, 0, 1, 1));
    }

    dialog[open]::backdrop {
      opacity: 1;
      transition: opacity var(--io-duration-overlay-enter, 300ms) var(--io-ease-overlay-enter, cubic-bezier(0, 0, 0.2, 1));
    }

    /* ── Backdrop: shading variant — solid overlay, no backdrop-filter ──────── */

    :host([backdrop="shading"]) dialog::backdrop {
      backdrop-filter: none;
    }

    /* ── preventTopLayer: backdrop is a flex-centering container in shadow DOM ──
       The host stays as display:contents so it never intercepts pointer events
       on slotted light-DOM children (e.g. IoButton slot="footer").

       CRITICAL: The <dialog> must NOT have position:fixed + explicit z-index in
       preventTopLayer mode. If it did, the browser's hit-test would land on the
       higher-z-index shadow DOM element instead of the slotted light-DOM IoButton.
       React's event delegation then retargets to <io-modal> and never reaches the
       onClick handlers on <IoButton slot="footer">.

       Fix: dialog is rendered INSIDE the backdrop div (child, not sibling).
       The backdrop div is the fixed full-screen flex container; the dialog is
       just a regular block element centered by the flex parent. No explicit
       z-index on dialog → no hit-test interception → light-DOM clicks propagate
       correctly through React's fiber tree.

       Using [open=""] avoids matching React 18's reflected open="false" string. */
    .modal__backdrop {
      display: none;
      opacity: 0;
      transition: opacity var(--io-duration-overlay-exit, 200ms) var(--io-ease-overlay-exit, cubic-bezier(0.4, 0, 1, 1));
    }

    :host([prevent-top-layer][open=""]) .modal__backdrop {
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      inset: 0;
      z-index: var(--io-z-modal);
      background: var(--io-bg-overlay);
      backdrop-filter: blur(var(--io-backdrop-blur));
      opacity: 1;
      transition: opacity var(--io-duration-overlay-enter, 300ms) var(--io-ease-overlay-enter, cubic-bezier(0, 0, 0.2, 1));
    }

    :host([prevent-top-layer][open=""][backdrop="shading"]) .modal__backdrop {
      backdrop-filter: none;
    }

    dialog.modal--sm { width: var(--io-modal-width-sm); }
    dialog.modal--md { width: var(--io-modal-width-md); }
    dialog.modal--lg { width: var(--io-modal-width-lg); }

    .modal__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--io-space-4);
      padding: var(--io-space-5) var(--io-space-6);
      border-bottom: 1px solid var(--io-border);
      flex-shrink: 0;
    }

    .modal__heading {
      margin: 0;
      font-size: var(--io-font-size-lg);
      font-weight: var(--io-font-weight-semibold);
      line-height: var(--io-line-height-tight);
      color: var(--io-text-primary);
    }

    .modal__close {
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
      transition: ${getTransition('color', 'sm', 'out')}, ${getTransition('background-color', 'sm', 'out')};
    }

    .modal__close:focus-visible {
      outline: none;
      box-shadow: var(--io-focus-ring-active);
    }

    .modal__body {
      padding: var(--io-space-6);
      flex: 1;
    }

    .modal__footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--io-space-3);
      padding: var(--io-space-4) var(--io-space-6);
      border-top: 1px solid var(--io-border);
      flex-shrink: 0;
    }

    .modal__footer--hidden {
      display: none;
    }

    /* ── Fullscreen breakpoint variant (#976) ────────────────── */

    :host([fullscreen]) dialog {
      border-radius: var(--io-border-radius-md);
    }

    @media (max-width: var(--io-modal-fullscreen-breakpoint, 640px)) {
      :host([fullscreen]) dialog {
        position: fixed;
        inset: 0;
        width: 100% !important;
        max-width: 100%;
        max-height: 100%;
        border-radius: 0;
        margin: 0;
      }

      :host([fullscreen]) dialog[open] {
        display: flex;
        flex-direction: column;
      }
    }

    @media (hover: hover) and (pointer: fine) {
      .modal__close:hover {
        color: var(--io-text-primary);
        background-color: var(--io-state-hover);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      dialog,
      dialog[open],
      dialog::backdrop,
      dialog[open]::backdrop,
      .modal__backdrop,
      :host([prevent-top-layer][open=""]) .modal__backdrop {
        transition-duration: 0ms;
      }
    }
  `;
}
