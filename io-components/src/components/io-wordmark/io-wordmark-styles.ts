export function getWordmarkStyles(): string {
  return `
    :host {
      display: inline-flex;
      font-family: var(--io-font-primary, 'Manrope', sans-serif);
    }

    .wordmark {
      display: inline-flex;
      align-items: baseline;
      font-family: var(--io-font-primary, 'Manrope', sans-serif);
      font-weight: 700;
      line-height: 1;
      white-space: nowrap;
      letter-spacing: -0.01em;
    }

    /* Size scale */
    .wordmark--sm {
      font-size: var(--io-wordmark-font-size-sm);
    }

    .wordmark--md {
      font-size: var(--io-wordmark-font-size-md);
    }

    .wordmark--lg {
      font-size: var(--io-wordmark-font-size-lg);
    }

    .wordmark--xl {
      font-size: var(--io-wordmark-font-size-xl);
    }

    /* Colour parts */
    .wordmark__io {
      color: var(--io-color-primary, #0000D2);
    }

    .wordmark__digital {
      color: currentColor;
    }

    /* Mono mode — both parts use current text colour */
    :host([mono]) .wordmark__io {
      color: currentColor;
    }

    @media (prefers-reduced-motion: reduce) {
      .wordmark { transition: none; }
    }
  `;
}
