export function getOptgroupStyles(): string {
  return `
    :host {
      display: block;
      font-family: var(--io-font-primary);
    }

    :host([disabled]) {
      opacity: var(--io-state-disabled-opacity);
      pointer-events: none;
    }

    .optgroup__label {
      display: block;
      padding: var(--io-space-2) var(--io-space-3) var(--io-space-1);
      font-size: var(--io-font-size-xs);
      font-weight: var(--io-font-weight-semibold);
      color: var(--io-text-secondary);
      text-transform: uppercase;
      letter-spacing: var(--io-letter-spacing-widest);
    }
  `;
}
