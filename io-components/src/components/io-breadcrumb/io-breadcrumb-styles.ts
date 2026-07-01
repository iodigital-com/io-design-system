import { getSrOnlyStyles } from '../../utils/sr-only';

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

    /* ── Visually-hidden collapsed items — remain in AT tree for screen readers ── */

    ::slotted(io-breadcrumb-item.breadcrumb-item--hidden) {
      ${getSrOnlyStyles()}
    }

    /* ── Expand button (injected into light DOM, styled via ::slotted) ── */

    ::slotted(.breadcrumb__expand-item) {
      display: inline-flex;
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
