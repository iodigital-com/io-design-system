import type { IoSegmentedControlColumns } from './types';

interface SegmentedControlStyleOptions {
  columns: IoSegmentedControlColumns;
}

/**
 * io-segmented-control CSS-in-JS style generator.
 *
 * Returns a <style> string for the segmented-control component's Shadow DOM.
 * ALL values reference var(--io-*) custom properties — never hardcoded.
 *
 * GOVERNANCE: Do not hardcode colors, spacing, or radii here.
 *     Add new tokens to src/global/app.css first, then reference them.
 *
 * #1080 — added fieldset/legend reset styles to match io-radio-group structure.
 * #1074 — added error state styles and required asterisk.
 * #1072 — added noWrap/scroller styles.
 * #1063 — added grid columns layout when columns !== 'auto'.
 */
export function getSegmentedControlStyles({ columns }: SegmentedControlStyleOptions): string {
  // #1063 — derive bar layout based on columns prop
  const barLayout =
    columns === 'auto'
      ? `
    display: inline-flex;
    align-items: stretch;`
      : `
    display: grid;
    grid-template-columns: repeat(${columns}, 1fr);
    align-items: stretch;`;

  return `
    :host {
      display: inline-flex;
      flex-direction: column;
      gap: var(--io-space-1);
      font-family: var(--io-font-primary);
    }

    /* ── Fieldset reset (#1080) ──────────────────────────────── */

    .segmented-control {
      border: none;
      margin: 0;
      padding: 0;
      display: inline-flex;
      flex-direction: column;
      gap: var(--io-space-1);
    }

    /* ── Legend (#1080) ──────────────────────────────────────── */

    .segmented-control__legend {
      display: block;
      font-size: var(--io-font-size-sm);
      font-weight: var(--io-font-weight-medium);
      color: var(--io-text-primary);
      line-height: var(--io-line-height-normal);
      margin-bottom: var(--io-space-1);
      padding: 0;
    }

    .segmented-control__legend--hidden {
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      height: 1px;
      overflow: hidden;
      position: absolute;
      white-space: nowrap;
      width: 1px;
    }

    /* ── Required asterisk (#1074) ───────────────────────────── */

    .segmented-control__required {
      color: var(--io-color-error);
    }

    /* ── Bar container ──────────────────────────────────────── */

    .segmented-control__bar {
      ${barLayout}
      border: 1px solid var(--io-border-interactive);
      border-radius: var(--io-border-radius-sm);
      background: var(--io-bg-surface);
      overflow: hidden;
      gap: 0;
    }

    /* ── noWrap scroller slot (#1072) ─────────────────────────── */

    .segmented-control__scroller {
      display: contents;
    }

    /* ── Disabled state ─────────────────────────────────────── */

    .segmented-control:disabled .segmented-control__bar,
    :host([disabled]) .segmented-control__bar {
      opacity: var(--io-state-disabled-opacity);
      pointer-events: none;
    }

    /* ── Error state (#1074) ──────────────────────────────────── */

    .segmented-control--error .segmented-control__legend {
      color: var(--io-color-error);
    }

    .segmented-control--error .segmented-control__bar {
      border-color: var(--io-border-error);
      border-width: var(--io-segmented-control-border-error-width);
    }

    /* ── Error message (#1074) ────────────────────────────────── */

    .segmented-control__error {
      display: block;
      font-size: var(--io-font-size-xs);
      color: var(--io-color-error);
      line-height: var(--io-line-height-normal);
      margin-top: var(--io-space-1);
    }
  `;
}
