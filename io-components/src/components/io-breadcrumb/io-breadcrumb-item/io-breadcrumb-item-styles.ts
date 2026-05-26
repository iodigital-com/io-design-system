export function getBreadcrumbItemStyles(): string {
  return `
    :host {
      display: contents;
    }

    li {
      display: inline-flex;
      align-items: center;
      list-style: none;
      padding: 0;
      margin: 0;
    }

    a {
      color: var(--io-color-primary);
      text-decoration: none;
      font-size: var(--io-font-size-sm, 14px);
      font-weight: var(--io-font-weight-regular, 400);
      font-family: var(--io-font-primary);
    }

    a:hover {
      text-decoration: underline;
    }

    a:focus-visible {
      outline: 2px solid var(--io-focus-inner);
      outline-offset: 2px;
      border-radius: var(--io-border-radius-2xs);
    }

    span {
      color: var(--io-text-secondary);
      font-size: var(--io-font-size-sm, 14px);
      font-family: var(--io-font-primary);
    }

    @media (prefers-reduced-motion: reduce) {
      a { transition: none; }
    }
  `;
}
