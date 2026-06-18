import { Component, Prop, Event, EventEmitter, Host, h } from '@stencil/core';

import type { IoTableSortDirection, IoTableSortDetail } from './types';

/**
 * io-table-head-cell
 * ====================
 * Renders a <th scope="col"> inside io-table-head-row.
 * When sortable, the header activates a sort cycle and emits a `sort` event.
 * Uses shadow: false so the table formatting context is preserved.
 *
 * @example
 * <io-table-head-cell sortable sort-direction="ascending" sort-key="name">Name</io-table-head-cell>
 */
@Component({
  tag: 'io-table-head-cell',
  shadow: false,
})
export class IoTableHeadCell {
  // ── Props ─────────────────────────────────────────────────────

  /** Enables click-to-sort on this column. */
  @Prop() sortable: boolean = false;

  /**
   * Current sort direction for this column.
   * Consumer-controlled — update in response to the `sort` event.
   */
  @Prop() sortDirection: IoTableSortDirection = 'none';

  /** Identifier passed back in the `sort` event detail. */
  @Prop() sortKey: string = '';

  // ── Events ────────────────────────────────────────────────────

  /** Emitted when a sortable column header is activated. */
  @Event() sort!: EventEmitter<IoTableSortDetail>;

  // ── Private helpers ───────────────────────────────────────────

  private nextDirection(): IoTableSortDirection {
    if (this.sortDirection === 'none') return 'ascending';
    if (this.sortDirection === 'ascending') return 'descending';
    return 'none';
  }

  private handleSort = (): void => {
    this.sort.emit({ key: this.sortKey, direction: this.nextDirection() });
  };

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { sortable, sortDirection } = this;

    // Only emit aria-sort when the column is actively sorted (not for unsorted sortable columns)
    // ARIA spec: aria-sort should be omitted entirely when sortDirection === 'none'
    const ariaSort: 'ascending' | 'descending' | undefined = sortable && sortDirection !== 'none'
      ? sortDirection
      : undefined;

    const thClass = sortable
      ? [
          'th--sortable',
          sortDirection !== 'none' ? 'th--sort-active' : '',
          sortDirection === 'descending' ? 'th--sort-desc' : '',
        ]
          .filter(Boolean)
          .join(' ')
      : undefined;

    const sortIcon = (
      <span class="sort-icon" aria-hidden="true">
        <svg viewBox="0 0 10 12" fill="currentColor">
          <path d="M5 0L9 4H1L5 0Z" />
          <path d="M5 12L1 8H9L5 12Z" opacity="0.4" />
        </svg>
      </span>
    );

    return (
      <Host>
        {/*
          ARIA APG sort-button pattern: aria-sort lives on the <th> (columnheader role),
          while a focusable <button> inside the <th> receives keyboard/click events.
          This satisfies SC 2.1.1 without making <th> itself a focus target.
        */}
        <th
          scope="col"
          class={thClass}
          aria-sort={ariaSort}
        >
          {sortable ? (
            <button
              type="button"
              class="th__sort-btn"
              onClick={this.handleSort}
            >
              <slot />
              {sortIcon}
            </button>
          ) : (
            <slot />
          )}
        </th>
      </Host>
    );
  }
}
