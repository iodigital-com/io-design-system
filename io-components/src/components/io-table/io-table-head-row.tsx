import { Component, Prop, Event, EventEmitter, Element, Host, h } from '@stencil/core';

import type { IoTableHeadRowSelectAllDetail } from './types';

/**
 * io-table-head-row
 * ==================
 * Renders a <tr> inside io-table-head, with an optional select-all checkbox.
 * Uses shadow: false so the table formatting context is preserved.
 *
 * @example
 * <io-table-head-row selectable select-all-checked={allChecked} select-all-indeterminate={someChecked}>
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

  /** Controlled checked state of the select-all checkbox. */
  @Prop() selectAllChecked: boolean = false;

  /** Renders the checkbox in an indeterminate state when true and selectAllChecked is false. */
  @Prop() selectAllIndeterminate: boolean = false;

  /** Emitted when the select-all checkbox changes. */
  @Event() selectAll!: EventEmitter<IoTableHeadRowSelectAllDetail>;

  componentDidRender() {
    if (!this.selectable) return;
    const cb = this.el.querySelector<HTMLInputElement>('.th--checkbox input[type="checkbox"]');
    if (cb) {
      cb.indeterminate = this.selectAllIndeterminate && !this.selectAllChecked;
    }
  }

  private handleSelectAll = (ev: Event): void => {
    const checked = (ev.target as HTMLInputElement).checked;
    this.selectAll.emit({ checked });
  };

  render() {
    const { selectable, selectAllChecked } = this;

    return (
      <Host>
        <tr>
          {selectable && (
            <th scope="col" class="th--checkbox">
              <input
                type="checkbox"
                aria-label="Select all rows"
                checked={selectAllChecked}
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
