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
      animation: io-modal-in var(--io-motion-overlay-enter) var(--io-motion-overlay-easing) both;
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

    dialog[open] {
      display: flex;
      flex-direction: column;
    }

    dialog::backdrop {
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      animation: io-backdrop-in var(--io-motion-overlay-enter) var(--io-motion-overlay-easing) both;
    }

    /* ── preventTopLayer: dedicated backdrop element in shadow DOM ──
       The host stays as display:contents so it never intercepts pointer events
       on slotted light-DOM children (e.g. IoButton slot="footer"). Following
       the Porsche Design System pattern: backdrop is a sibling div rendered
       before the dialog in the shadow root, not the host itself.
       This ensures React 18 event delegation reaches slotted footer buttons.

       The backdrop div is always in the shadow DOM but hidden by default —
       only shown via [open=""] selector when the modal is truly open.
       Using [open=""] (empty string) matches Stencil's reflection of open=true,
       and avoids matching React 18's open="false" string attribute. */
    .modal__backdrop {
      display: none;
      pointer-events: none;
    }

    :host([prevent-top-layer][open=""]) .modal__backdrop {
      display: block;
      pointer-events: auto;
      position: fixed;
      inset: 0;
      z-index: var(--io-z-modal);
      background: var(--io-bg-overlay);
      backdrop-filter: blur(4px);
      animation: io-backdrop-in var(--io-motion-overlay-enter) var(--io-motion-overlay-easing) both;
    }

    dialog.modal--sm { width: var(--io-modal-width-sm); }
    dialog.modal--md { width: var(--io-modal-width-md); }
    dialog.modal--lg { width: var(--io-modal-width-lg); }

    /* When preventTopLayer=true and open, the dialog sits above the backdrop div.
       Scoped to [open=""] so closed modals are not affected. */
    :host([prevent-top-layer][open=""]) dialog {
      position: fixed;
      z-index: calc(var(--io-z-modal) + 1);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

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
      transition: color var(--io-motion-fast), background-color var(--io-motion-fast);
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

    @keyframes io-modal-in {
      from {
        opacity: 0;
        transform: translateY(12px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes io-backdrop-in {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    @media (hover: hover) and (pointer: fine) {
      .modal__close:hover {
        color: var(--io-text-primary);
        background-color: var(--io-state-hover);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      dialog,
      dialog::backdrop {
        animation: none;
      }
    }
  `;
}
