/**
 * io-table CSS-in-JS style generator.
 *
 * Returns a <style> string for the table component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 *
 * ⚠️  GOVERNANCE: Do not hardcode colors, spacing, or radii here.
 *     Add new tokens to src/global/app.css first, then reference them.
 */

interface TableStyleOptions {
  sticky: boolean;
}

export function getTableStyles({ sticky }: TableStyleOptions): string {
  return `
    :host {
      display: block;
      font-family: var(--io-font-primary);
    }

    .table-wrapper {
      overflow-x: auto;
      width: 100%;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: var(--io-font-size-sm, 14px);
      color: var(--io-text-primary);
    }

    caption {
      caption-side: top;
      text-align: left;
      font-size: var(--io-font-size-base, 16px);
      font-weight: var(--io-font-weight-semibold);
      color: var(--io-text-primary);
      padding-bottom: var(--io-space-3, 12px);
    }

    th,
    td {
      padding: var(--io-space-3, 12px) var(--io-space-4, 16px);
      text-align: left;
      border-bottom: 1px solid var(--io-border);
      vertical-align: middle;
    }

    /* ── Table head ─────────────────────────────────────── */

    thead th {
      background: var(--io-bg-surface, #fff);
      font-weight: var(--io-font-weight-semibold);
      color: var(--io-text-secondary);
      white-space: nowrap;
      ${sticky ? 'position: sticky; top: 0; z-index: 1;' : ''}
    }

    thead th.th--sortable {
      cursor: pointer;
      user-select: none;
    }

    thead th.th--sortable:hover {
      color: var(--io-text-primary);
    }

    thead th.th--sortable:focus-visible {
      outline: none;
      box-shadow: var(--io-focus-ring-active);
    }

    .th__inner {
      display: inline-flex;
      align-items: center;
      gap: var(--io-space-2, 8px);
    }

    /* ── Sort icon ─────────────────────────────────────── */

    .sort-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 0.875rem;
      height: 0.875rem;
      flex-shrink: 0;
      opacity: 0.35;
      transition: opacity 200ms ease, transform 200ms ease;
    }

    .th--sortable:hover .sort-icon,
    .th--sort-active .sort-icon {
      opacity: 1;
    }

    .th--sort-desc .sort-icon {
      transform: rotate(180deg);
    }

    /* ── Table body ─────────────────────────────────────── */

    tbody tr {
      transition: background-color 150ms ease;
    }

    tbody tr:hover {
      background: var(--io-bg-raised, #f8f8f8);
    }

    tbody tr[aria-selected="true"] {
      background: var(--io-color-primary-light, #e8e8ff);
    }

    /* ── Checkbox cells ─────────────────────────────────── */

    .td--checkbox,
    .th--checkbox {
      width: 2.5rem;
      padding-right: 0;
    }

    .td--checkbox input[type="checkbox"],
    .th--checkbox input[type="checkbox"] {
      width: 1rem;
      height: 1rem;
      cursor: pointer;
      accent-color: var(--io-color-primary);
    }

    /* ── Size density ───────────────────────────────────── */

    :host([size="sm"]) th,
    :host([size="sm"]) td {
      padding: var(--io-space-2, 8px) var(--io-space-3, 12px);
      font-size: var(--io-font-size-xs, 12px);
    }

    :host([size="lg"]) th,
    :host([size="lg"]) td {
      padding: var(--io-space-4, 16px) var(--io-space-6, 24px);
    }

    /* ── Screen-reader only utility ─────────────────────── */

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    /* ── Reduced motion ─────────────────────────────────── */

    @media (prefers-reduced-motion: reduce) {
      tbody tr,
      .sort-icon {
        transition: none;
      }
    }
  `;
}
