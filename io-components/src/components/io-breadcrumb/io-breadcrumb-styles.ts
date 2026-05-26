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
      gap: var(--io-space-1);
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
      content: var(--io-breadcrumb-separator, '/');
    }

    @media (prefers-reduced-motion: reduce) {
      * { transition: none; }
    }

    /* ── RTL support ─────────────────────────────────────────── */

    /* Flip directional separators (e.g. › chevron) in RTL context.
       Uses :host-context([dir="rtl"]) to traverse the Shadow DOM boundary. */
    :host-context([dir="rtl"]) .breadcrumb__separator {
      transform: scaleX(-1);
    }

    /* Reverse the breadcrumb flow visually in RTL — inherit direction from host context */
    :host-context([dir="rtl"]) ol {
      direction: inherit;
    }
  `;
}
