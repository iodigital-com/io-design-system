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
    /*
     * Public CSS API tokens (documented here for governance — consumed in
     * src/global/app.css since sub-components use shadow: false):
     *
     *   --io-table-row-selected-bg    — selected body row background
     *   --io-table-empty-min-height   — min-height of empty-state region
     *   --io-table-loading-bg         — loading overlay background
     */

    :host {
      display: block;
      font-family: var(--io-font-primary);
    }

    .table-wrapper {
      overflow-x: auto;
      width: 100%;
      position: relative;
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

    /* ── Empty state ─────────────────────────────────────── */

    /* Rendered in place of the tbody when no io-table-body-row children exist.
       --io-table-empty-min-height is a public API token so consumers can
       control the minimum height of the empty state region. */

    .table-empty-state {
      min-height: var(--io-table-empty-min-height, 120px);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--io-text-secondary);
      font-size: var(--io-font-size-sm, 14px);
      padding: var(--io-space-6, 24px) var(--io-space-4, 16px);
    }

    /* ── Loading overlay ─────────────────────────────────── */

    /* Absolutely-positioned overlay so the table layout does not shift.
       --io-table-loading-bg is a public API token for overlay background.
       aria-busy="true" is applied to the table-wrapper for AT. */

    .table-loading-overlay {
      position: absolute;
      inset: 0;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--io-table-loading-bg, color-mix(in srgb, var(--io-bg-page) 80%, transparent));
    }
  `;
}
