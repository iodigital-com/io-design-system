import { Component, Prop, Host, h } from '@stencil/core';

import { getTableStyles } from './io-table-styles';

import type { IoTableSize } from './types';

/**
 * io-table
 * =========
 * Accessible data table with a declarative slot-based API.
 *
 * Compose with io-table-head, io-table-head-row, io-table-head-cell,
 * io-table-body, io-table-body-row, and io-table-body-cell.
 *
 * @example
 * <io-table caption="Users" sticky size="md">
 *   <io-table-head>
 *     <io-table-head-row>
 *       <io-table-head-cell sortable sort-direction="ascending" sort-key="name">Name</io-table-head-cell>
 *       <io-table-head-cell>Role</io-table-head-cell>
 *     </io-table-head-row>
 *   </io-table-head>
 *   <io-table-body>
 *     <io-table-body-row>
 *       <io-table-body-cell>Alice</io-table-body-cell>
 *       <io-table-body-cell>Admin</io-table-body-cell>
 *     </io-table-body-row>
 *   </io-table-body>
 * </io-table>
 */
@Component({
  tag: 'io-table',
  shadow: true,
})
export class IoTable {
  // ── Props ─────────────────────────────────────────────────────

  /** Visible table caption — required for accessibility. */
  @Prop() caption: string = '';

  /** Visually hides the caption while keeping it accessible to screen readers. */
  @Prop() captionHidden: boolean = false;

  /** Makes the header row sticky (position: sticky; top: 0). */
  @Prop({ reflect: true }) sticky: boolean = false;

  /** Size preset — controls row/cell padding density. */
  @Prop({ reflect: true }) size: IoTableSize = 'md';

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    if (!this.caption) {
      console.warn('[io-table] caption prop is required for accessibility. Provide a descriptive caption.');
    }
  }

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { caption, captionHidden } = this;
    // Only label the scroll region when the caption is visually hidden — otherwise the
    // caption already names the table and labelling the region too would be redundant.
    const regionLabel = (captionHidden || !caption) ? (caption || undefined) : undefined;
    const captionClass = !caption || captionHidden ? 'sr-only' : undefined;

    return (
      <Host>
        <style>{getTableStyles()}</style>
        <div
          class="table-wrapper"
          role="region"
          aria-label={regionLabel}
        >
          <table>
            <caption class={captionClass}>{caption}</caption>
            <slot />
          </table>
        </div>
      </Host>
    );
  }
}
