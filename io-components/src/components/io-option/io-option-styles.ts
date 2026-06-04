export function getOptionStyles(): string {
  return `
    :host {
      display: block;
      font-family: var(--io-font-primary);
    }

    .option {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--io-space-2);
      min-height: var(--io-combobox-option-height);
      padding: var(--io-space-2) var(--io-space-3);
      cursor: pointer;
      color: var(--io-text-primary);
      font-size: var(--io-font-size-sm);
      transition: background-color var(--io-motion-fast), color var(--io-motion-fast);
    }

    .option--focused,
    .option:hover {
      background-color: var(--io-option-hover-bg);
    }

    .option--selected {
      color: var(--io-color-primary);
      font-weight: var(--io-font-weight-semibold);
    }

    .option--disabled {
      opacity: var(--io-state-disabled-opacity);
      pointer-events: none;
      cursor: default;
    }

    .option--multiple {
      justify-content: flex-start;
      gap: var(--io-space-3);
    }

    .option__label {
      flex: 1;
    }

    .option__check {
      flex-shrink: 0;
      display: flex;
      color: var(--io-color-primary);
    }

    .option__checkbox {
      flex-shrink: 0;
      width: var(--io-icon-size-md);
      height: var(--io-icon-size-md);
      border: var(--io-checkbox-border-width) solid var(--io-border-interactive);
      border-radius: var(--io-border-radius-xs);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color var(--io-motion-fast), border-color var(--io-motion-fast);
    }

    .option--selected .option__checkbox {
      background-color: var(--io-color-primary);
      border-color: var(--io-color-primary);
    }

    @media (prefers-reduced-motion: reduce) {
      .option,
      .option__checkbox { transition: none; }
    }
  `;
}
