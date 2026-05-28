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
      font-size: var(--io-font-size-sm);
      font-weight: var(--io-font-weight-regular, 400);
      font-family: var(--io-font-primary);
    }

    a:hover {
      text-decoration: underline;
    }

    a:focus-visible {
      outline: 2px solid var(--io-focus-inner);
      outline-offset: 2px;
      border-radius: var(--io-border-radius-2xs, 2px);
    }

    span {
      color: var(--io-text-secondary);
      font-size: var(--io-font-size-sm);
      font-family: var(--io-font-primary);
    }

    .breadcrumb__separator {
      display: inline-flex;
      align-items: center;
      padding: 0 var(--io-space-2);
      color: var(--io-color-grey-4);
      font-size: var(--io-font-size-sm);
      user-select: none;
    }

    .breadcrumb__separator::after {
      content: var(--io-breadcrumb-separator, '›');
    }

    :host-context([dir="rtl"]) .breadcrumb__separator {
      transform: scaleX(-1);
    }

    @media (prefers-reduced-motion: reduce) {
      a { transition: none; }
    }
  `;
}
