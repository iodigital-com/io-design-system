import { Component, Element, Event, EventEmitter, Listen, Prop, State, Host, h } from '@stencil/core';

import { getTableStyles } from './io-table-styles';

import type { IoTableLayout, IoTableSize, IoTableSortDetail } from './types';

/**
 * io-table
 * =========
 * Accessible data table with a declarative slot-based API.
 *
 * Compose with io-table-head, io-table-head-row, io-table-head-cell,
 * io-table-body, io-table-body-row, and io-table-body-cell.
 *
 * Supports an `empty` named slot rendered when no body rows are present,
 * and a `loading` named slot overlaid via the `loading` prop.
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
 *   <div slot="empty">No results found.</div>
 * </io-table>
 */
@Component({
  tag: 'io-table',
  shadow: true,
})
export class IoTable {
  @Element() el!: HTMLIoTableElement;

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

  /** CSS table-layout algorithm — 'auto' sizes columns by content, 'fixed' distributes width equally. */
  @Prop({ reflect: true }) layout: IoTableLayout = 'auto';

  /**
   * When `true`, overlays the table body with the `loading` slot content
   * and applies `aria-busy="true"` to the table wrapper for assistive technology.
   * The table layout does not shift — the loading overlay is absolutely positioned.
   */
  @Prop({ reflect: true }) loading: boolean = false;

  // ── State ─────────────────────────────────────────────────────

  /**
   * True when the table body has no io-table-body-row children.
   * Drives the empty-state slot visibility.
   */
  @State() isEmpty: boolean = false;

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

  componentDidLoad() {
    this.updateEmptyState();
  }

  // ── Private helpers ───────────────────────────────────────────

  /**
   * Updates isEmpty by counting io-table-body-row children inside any
   * io-table-body in the default slot.
   * Called on initial mount and on each `slotchange` event.
   */
  private updateEmptyState(): void {
    const body = this.el.querySelector('io-table-body');
    const rowCount = body ? body.querySelectorAll('io-table-body-row').length : 0;
    this.isEmpty = rowCount === 0;
  }

  private handleSlotChange = (): void => {
    this.updateEmptyState();
  };

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { caption, captionHidden, loading, isEmpty } = this;
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
          aria-busy={loading ? 'true' : undefined}
          tabIndex={0}
        >
          {loading && (
            <div class="table-loading-overlay" aria-hidden="true">
              <slot name="loading" />
            </div>
          )}
          <table>
            <caption class={captionClass}>{caption}</caption>
            <slot onSlotchange={this.handleSlotChange} />
          </table>
          {isEmpty && !loading && (
            <div class="table-empty-state">
              <slot name="empty" />
            </div>
          )}
        </div>
      </Host>
    );
  }
}
