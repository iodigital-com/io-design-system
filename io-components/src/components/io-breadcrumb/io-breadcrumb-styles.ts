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
    }

    @media (prefers-reduced-motion: reduce) {
      * { transition: none; }
    }

    /* Reverse the breadcrumb flow visually in RTL — inherit direction from host context */
    :host-context([dir="rtl"]) ol {
      direction: inherit;
    }
  `;
}
