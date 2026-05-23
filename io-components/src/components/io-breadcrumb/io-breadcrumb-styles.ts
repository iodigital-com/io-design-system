export function getBreadcrumbStyles(): string {
  return `
    :host {
      display: block;
      font-family: var(--io-font-primary);
    }

    ol {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--io-space-1, 4px);
    }

    li {
      display: flex;
      align-items: center;
      gap: var(--io-space-1, 4px);
    }

    a {
      color: var(--io-color-primary);
      text-decoration: none;
      font-size: var(--io-font-size-sm, 14px);
      font-weight: 400;
    }

    a:hover {
      text-decoration: underline;
    }

    a:focus-visible {
      outline: 2px solid var(--io-focus-inner);
      outline-offset: 2px;
      border-radius: 2px;
    }

    .breadcrumb-current {
      color: var(--io-text-secondary);
      font-size: var(--io-font-size-sm, 14px);
    }

    .breadcrumb-separator {
      color: var(--io-text-secondary);
      display: flex;
      align-items: center;
    }

    .breadcrumb-expand {
      border: none;
      background: transparent;
      cursor: pointer;
      color: var(--io-color-primary);
      font-size: var(--io-font-size-sm, 14px);
      padding: 0;
      margin: 0;
      line-height: 1;
    }

    .breadcrumb-expand:focus-visible {
      outline: 2px solid var(--io-focus-inner);
      outline-offset: 2px;
      border-radius: 2px;
    }

    @media (prefers-reduced-motion: reduce) {
      a, .breadcrumb-expand { transition: none; }
    }
  `;
}
