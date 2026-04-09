export function getToastStyles(): string {
  return `
    :host {
      display: block;
      position: fixed;
      bottom: var(--io-space-6);
      right: var(--io-space-6);
      z-index: var(--io-z-toast);
      width: var(--io-toast-max-width);
      max-width: calc(100vw - 2 * var(--io-space-6));
    }

    @media (max-width: 480px) {
      :host {
        left: var(--io-space-4);
        right: var(--io-space-4);
        width: auto;
        bottom: var(--io-space-4);
      }
    }
  `;
}
