import { Component, Host, h, Prop, Event, EventEmitter, State, Watch } from '@stencil/core';

import { getTableStyles } from './io-table-styles';

import type { IoTableSortDirection, IoTableSize } from './types';

/**
 * io-table
 * =========
 * Accessible data table with optional sortable columns and row selection.
 *
 * Supports a JavaScript data API (rows prop) for programmatic use, and
 * emits sort / select events for consumer-controlled updates.
 *
 * @example
 * <io-table caption="Users" sortable selectable></io-table>
 */
@Component({
  tag: 'io-table',
  shadow: true,
})
export class IoTable {
  // ── Props ─────────────────────────────────────────────────────

  /** Visible table caption — shown above the table and announced by screen readers. */
  @Prop() caption: string = '';

  /** Visually hides the caption while keeping it accessible to screen readers. */
  @Prop() captionHidden: boolean = false;

  /** Enables sortable columns globally. Individual columns can also override. */
  @Prop() sortable: boolean = false;

  /** Adds a checkbox column for row selection. */
  @Prop() selectable: boolean = false;

  /** Makes the header row sticky (position: sticky; top: 0). */
  @Prop({ reflect: true }) sticky: boolean = false;

  /** Row data objects. Each key maps to a column's `key` prop. */
  @Prop() rows: Record<string, unknown>[] = [];

  /**
   * Column definitions. Each item has a `key` (data key), `label` (header text),
   * and an optional `sortable` boolean to allow per-column sort control.
   */
  @Prop() columns: Array<{ key: string; label: string; sortable?: boolean }> = [];

  /** Currently sorted column key. Controlled from outside via sort event handler. */
  @Prop() sortKey: string = '';

  /** Current sort direction. Controlled from outside via sort event handler. */
  @Prop({ mutable: true }) sortDirection: IoTableSortDirection = 'none';

  /** Size preset — controls row/cell padding density. */
  @Prop({ reflect: true }) size: IoTableSize = 'md';

  // ── State ─────────────────────────────────────────────────────

  @State() private selectedRows: Set<number> = new Set<number>();

  // ── Events ────────────────────────────────────────────────────

  /**
   * Emitted when a sortable column header is clicked or activated via keyboard.
   * The consumer is responsible for updating `sortKey` and `sortDirection` props.
   */
  @Event() sort!: EventEmitter<{ key: string; direction: IoTableSortDirection }>;

  /**
   * Emitted when rows are selected or deselected via the checkbox column.
   * Detail contains all currently selected row objects.
   */
  @Event() rowSelect!: EventEmitter<{ selectedRows: Record<string, unknown>[] }>;

  // ── Watchers ──────────────────────────────────────────────────

  @Watch('rows')
  onRowsChange() {
    this.selectedRows = new Set<number>();
  }

  // ── Handlers ─────────────────────────────────────────────────

  private handleSort(key: string): void {
    let direction: IoTableSortDirection = 'ascending';

    if (this.sortKey === key) {
      direction = this.sortDirection === 'ascending' ? 'descending' : 'ascending';
    }

    this.sortDirection = direction;
    this.sort.emit({ key, direction });
  }

  private handleSortKeyDown = (key: string, ev: KeyboardEvent): void => {
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      this.handleSort(key);
    }
  };

  private handleSelectAll = (ev: Event): void => {
    const checked = (ev.target as HTMLInputElement).checked;

    if (checked) {
      this.selectedRows = new Set(this.rows.map((_, i) => i));
    } else {
      this.selectedRows = new Set<number>();
    }

    this.emitSelect();
  };

  private handleSelectRow = (index: number, ev: Event): void => {
    const checked = (ev.target as HTMLInputElement).checked;
    const next = new Set(this.selectedRows);

    if (checked) {
      next.add(index);
    } else {
      next.delete(index);
    }

    this.selectedRows = next;
    this.emitSelect();
  };

  private emitSelect(): void {
    const selectedRowData = Array.from(this.selectedRows).map((i) => this.rows[i]);
    this.rowSelect.emit({ selectedRows: selectedRowData });
  }

  // ── Render helpers ────────────────────────────────────────────

  private renderSortIcon(key: string) {
    const isActive = this.sortKey === key;
    const isDesc = isActive && this.sortDirection === 'descending';

    return (
      <span
        class={`sort-icon${isActive ? ' sort-icon--active' : ''}${isDesc ? ' sort-icon--desc' : ''}`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 10 12" fill="currentColor">
          <path d="M5 0L9 4H1L5 0Z" />
          <path d="M5 12L1 8H9L5 12Z" opacity="0.4" />
        </svg>
      </span>
    );
  }

  private renderHead() {
    const allSelected = this.rows.length > 0 && this.selectedRows.size === this.rows.length;
    const someSelected = this.selectedRows.size > 0 && !allSelected;

    return (
      <thead>
        <tr>
          {this.selectable && (
            <th scope="col" class="th--checkbox">
              <input
                type="checkbox"
                aria-label="Select all rows"
                checked={allSelected}
                indeterminate={someSelected}
                onChange={this.handleSelectAll}
              />
            </th>
          )}
          {this.columns.map((col) => {
            const isColSortable = this.sortable || col.sortable;
            const isActive = this.sortKey === col.key;
            const ariaSort = isActive
              ? (this.sortDirection as 'ascending' | 'descending')
              : undefined;

            const thClass = [
              isColSortable ? 'th--sortable' : '',
              isActive ? 'th--sort-active' : '',
              isActive && this.sortDirection === 'descending' ? 'th--sort-desc' : '',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <th
                key={col.key}
                scope="col"
                class={thClass || undefined}
                aria-sort={ariaSort}
                tabIndex={isColSortable ? 0 : undefined}
                onClick={isColSortable ? () => this.handleSort(col.key) : undefined}
                onKeyDown={isColSortable ? (ev) => this.handleSortKeyDown(col.key, ev) : undefined}
              >
                <span class="th__inner">
                  {col.label}
                  {isColSortable && this.renderSortIcon(col.key)}
                </span>
              </th>
            );
          })}
        </tr>
      </thead>
    );
  }

  private renderBody() {
    return (
      <tbody>
        {this.rows.map((row, rowIndex) => {
          const isSelected = this.selectedRows.has(rowIndex);

          return (
            <tr
              key={rowIndex}
              aria-selected={this.selectable ? String(isSelected) : undefined}
            >
              {this.selectable && (
                <td class="td--checkbox">
                  <input
                    type="checkbox"
                    aria-label={`Select row ${rowIndex + 1}`}
                    checked={isSelected}
                    onChange={(ev) => this.handleSelectRow(rowIndex, ev)}
                  />
                </td>
              )}
              {this.columns.map((col) => (
                <td key={col.key}>{String(row[col.key] ?? '')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    );
  }

  // ── Render ───────────────────────────────────────────────────

  render() {
    return (
      <Host>
        <style>{getTableStyles({ sticky: this.sticky })}</style>
        <div
          class="table-wrapper"
          role="region"
          aria-label={this.caption || undefined}
        >
          <table>
            {this.caption && (
              <caption class={this.captionHidden ? 'sr-only' : undefined}>
                {this.caption}
              </caption>
            )}
            {this.renderHead()}
            {this.renderBody()}
          </table>
        </div>
      </Host>
    );
  }
}
