export function getTextListStyles(): string {
  return `
    :host {
      display: block;
      font-family: var(--io-font-primary);
    }

    .text-list {
      margin: 0;
      padding-inline-start: var(--io-space-5, 20px);
      font-weight: var(--io-font-weight-regular);
      line-height: var(--io-line-height-base, 1.5);
    }

    ::slotted(li) {
      margin-block-end: var(--io-space-1);
    }

    ::slotted(li:last-child) {
      margin-block-end: 0;
    }

    @media (prefers-reduced-motion: reduce) {
      .text-list {
        transition: none;
      }
    }
  `;
}
