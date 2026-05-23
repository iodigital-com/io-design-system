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
      --io-wordmark-font-size: var(--io-font-size-sm, 14px);
      font-size: var(--io-wordmark-font-size);
    }

    .wordmark--md {
      --io-wordmark-font-size: 20px;
      font-size: var(--io-wordmark-font-size);
    }

    .wordmark--lg {
      --io-wordmark-font-size: 28px;
      font-size: var(--io-wordmark-font-size);
    }

    .wordmark--xl {
      --io-wordmark-font-size: 40px;
      font-size: var(--io-wordmark-font-size);
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
