import { Component, Prop, Event, EventEmitter, Host, h } from '@stencil/core';

import type { IoTableBodyRowSelectDetail } from './types';

/**
 * io-table-body-row
 * ====================
 * Renders a <tr> inside io-table-body, with an optional row-selection checkbox.
 * Uses shadow: false so the table formatting context is preserved.
 *
 * @example
 * <io-table-body-row selectable selected>
 *   <io-table-body-cell>Alice</io-table-body-cell>
 * </io-table-body-row>
 */
@Component({
  tag: 'io-table-body-row',
  shadow: false,
})
export class IoTableBodyRow {
  /** Renders the row-selection checkbox cell. */
  @Prop({ reflect: true }) selectable: boolean = false;

  /** Controlled selection state of this row. */
  @Prop({ reflect: true }) selected: boolean = false;

  /** Accessible label for the row selection checkbox. Should describe the row (e.g. the row's primary identifier). */
  @Prop() rowLabel: string = 'row';

  /** Emitted when the row checkbox changes. */
  @Event() select!: EventEmitter<IoTableBodyRowSelectDetail>;

  private handleSelect = (ev: Event): void => {
    const checked = (ev.target as HTMLInputElement).checked;
    this.select.emit({ selected: checked });
  };

  render() {
    return (
      <Host>
        <tr aria-selected={this.selectable ? (this.selected ? 'true' : 'false') : undefined}>
          {this.selectable && (
            <td class="td--checkbox">
              <input
                type="checkbox"
                aria-label={`Select ${this.rowLabel}`}
                checked={this.selected}
                onChange={this.handleSelect}
              />
            </td>
          )}
          <slot />
        </tr>
      </Host>
    );
  }
}
