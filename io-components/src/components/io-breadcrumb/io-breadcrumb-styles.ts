export function getBreadcrumbStyles(): string {
  return `
    :host {
      display: block;
      font-family: var(--io-font-primary);
    }

    nav {
      display: block;
    }

    ol {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0;
    }

    .breadcrumb__separator {
      display: inline-flex;
      align-items: center;
      padding: 0 var(--io-space-1, 4px);
      color: var(--io-color-grey-4, #767676);
      font-size: var(--io-font-size-sm, 14px);
      user-select: none;
    }

    .breadcrumb__separator::after {
      content: var(--io-breadcrumb-separator, '/');
    }

    @media (prefers-reduced-motion: reduce) {
      * { transition: none; }
    }
  `;
}
