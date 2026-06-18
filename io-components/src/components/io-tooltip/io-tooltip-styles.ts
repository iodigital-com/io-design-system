export function getTooltipStyles(): string {
  return `
    :host {
      display: inline-block;
    }

    .tooltip {
      position: fixed;
      z-index: var(--io-z-tooltip);
      background: var(--io-bg-card);
      border: 1px solid var(--io-border);
      border-radius: var(--io-border-radius-sm);
      box-shadow: var(--io-shadow-md);
      color: var(--io-text-primary);
      font-family: var(--io-font-primary);
      font-size: var(--io-font-size-xs);
      line-height: var(--io-line-height-normal);
      padding: var(--io-space-2) var(--io-space-3);
      width: max-content;
      max-width: 240px;
      white-space: normal;
      word-break: break-word;
      /* pointer-events intentionally omitted — tooltip must be hoverable (WCAG 1.4.13) */
      opacity: 0;
      visibility: hidden;
      transition:
        opacity var(--io-motion-overlay-fade),
        visibility var(--io-motion-overlay-fade);
    }

    .tooltip--visible {
      opacity: 1;
      visibility: visible;
    }

    @media (prefers-reduced-motion: reduce) {
      .tooltip {
        transition: none;
      }
    }
  `;
}
