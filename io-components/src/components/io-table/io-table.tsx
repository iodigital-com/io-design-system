import { Component, Event, EventEmitter, Listen, Prop, Host, h } from '@stencil/core';

import { getTableStyles } from './io-table-styles';

import type { IoTableSize, IoTableSortDetail } from './types';

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

  /** Adds alternating row background colours for improved row scanning. */
  @Prop({ reflect: true }) striped: boolean = false;

  /** Adds visible borders between cells and rows. */
  @Prop({ reflect: true }) bordered: boolean = false;

  /** Reduces row padding to display more rows in the same vertical space. */
  @Prop({ reflect: true }) compact: boolean = false;

  // ── Events ────────────────────────────────────────────────────

  /**
   * Emitted when a sortable column header is activated.
   * Aggregates the bubbling `sort` event from io-table-head-cell so consumers
   * can attach a single listener on io-table instead of one per column.
   * Non-bubbling — stops at the io-table boundary.
   */
  @Event({ bubbles: false }) sortChange!: EventEmitter<IoTableSortDetail>;

  // ── Listeners ────────────────────────────────────────────────

  /** Intercept the bubbling `sort` event from io-table-head-cell and re-emit as sortChange. */
  @Listen('sort')
  handleSortBubble(ev: CustomEvent<IoTableSortDetail>): void {
    ev.stopPropagation();
    this.sortChange.emit(ev.detail);
  }

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    if (!this.caption) {
      console.warn('[io-table] caption prop is required for accessibility. Provide a descriptive caption.');
    }
  }

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { caption, captionHidden } = this;
    // Label the scroll region whenever a caption is provided so the role="region"
    // landmark has an accessible name — required by ARIA for landmarks to be
    // distinguishable by AT users (WCAG 1.3.1 / ARIA spec §5.3.7).
    const regionLabel = caption || 'Table';
    const captionClass = !caption || captionHidden ? 'sr-only' : undefined;

    return (
      <Host>
        <style>{getTableStyles()}</style>
        <div
          class="table-wrapper"
          role="region"
          aria-label={regionLabel}
          tabIndex={0}
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
