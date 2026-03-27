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
      animation: io-modal-in var(--io-motion-base) var(--io-motion-easing-ease-out) both;
    }

    dialog[open] {
      display: flex;
      flex-direction: column;
    }

    dialog::backdrop {
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      animation: io-backdrop-in var(--io-motion-base) var(--io-motion-easing-ease-out) both;
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
