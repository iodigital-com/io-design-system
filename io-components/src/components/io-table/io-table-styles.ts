/**
 * io-table CSS-in-JS style generator.
 *
 * Only styles for elements inside io-table's shadow root live here:
 * the wrapper, <table>, <caption>, and the .sr-only utility.
 *
 * Visual styles for sub-components (th, td, sort icon, checkboxes, etc.)
 * are in src/global/app.css because those components use shadow: false
 * and their elements live in the light DOM.
 *
 * ⚠️  GOVERNANCE: Do not hardcode colors, spacing, or radii here.
 *     Add new tokens to src/global/app.css first, then reference them.
 */
import { getSrOnlyStyles } from '../../utils/sr-only';

export function getTableStyles(): string {
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

    :host([layout='fixed']) table {
      table-layout: fixed;
    }

    caption {
      caption-side: top;
      text-align: left;
      font-size: var(--io-font-size-base, 16px);
      font-weight: var(--io-font-weight-semibold);
      color: var(--io-text-primary);
      padding-bottom: var(--io-space-3, 12px);
    }

    /* ── Screen-reader only utility ─────────────────────── */

    .sr-only {
      ${getSrOnlyStyles()}
    }
  `;
}
