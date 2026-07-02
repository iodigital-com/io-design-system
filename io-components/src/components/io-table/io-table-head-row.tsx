import { Component, Prop, Event, EventEmitter, Element, Host, h } from '@stencil/core';

import type { IoTableHeadRowSelectAllDetail, IoTableSelectionState } from './types';

/**
 * io-table-head-row
 * ==================
 * Renders a <tr> inside io-table-head, with an optional select-all checkbox.
 * Uses shadow: false so the table formatting context is preserved.
 *
 * @example
 * <io-table-head-row selectable selection-state="some">
 *   <io-table-head-cell>Name</io-table-head-cell>
 * </io-table-head-row>
 */
@Component({
  tag: 'io-table-head-row',
  shadow: false,
})
export class IoTableHeadRow {
  @Element() el!: HTMLElement;

  /** Renders the select-all checkbox header cell. */
  @Prop() selectable: boolean = false;

  /**
   * Tri-state selection state of the select-all checkbox.
   * `'none'` — no rows selected (unchecked).
   * `'some'` — some rows selected (indeterminate).
   * `'all'`  — all rows selected (checked).
   */
  @Prop() selectionState: IoTableSelectionState | undefined;

  /** Emitted when the select-all checkbox changes. */
  @Event() selectAll!: EventEmitter<IoTableHeadRowSelectAllDetail>;

  private get isChecked(): boolean {
    return this.selectionState === 'all';
  }

  private get isIndeterminate(): boolean {
    return this.selectionState === 'some';
  }

  componentDidRender() {
    if (!this.selectable) return;
    const cb = this.el.querySelector<HTMLInputElement>('.th--checkbox input[type="checkbox"]');
    if (cb) {
      cb.indeterminate = this.isIndeterminate;
    }
  }

  private handleSelectAll = (ev: Event): void => {
    const checked = (ev.target as HTMLInputElement).checked;
    this.selectAll.emit({ checked });
  };

  render() {
    const { selectable } = this;

    return (
      <Host>
        <tr>
          {selectable && (
            <th scope="col" class="th--checkbox">
              <input
                type="checkbox"
                aria-label="Select all rows"
                checked={this.isChecked}
                onChange={this.handleSelectAll}
              />
            </th>
          )}
          <slot />
        </tr>
      </Host>
    );
  }
}
