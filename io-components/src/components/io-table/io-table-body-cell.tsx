import { Component, Prop, Host, h } from '@stencil/core';

/**
 * io-table-body-cell
 * ====================
 * Renders a <td> element inside an io-table-body-row.
 * Uses shadow: false so the table formatting context is preserved.
 *
 * @example
 * <io-table-body-cell colspan="2">Alice</io-table-body-cell>
 */
@Component({
  tag: 'io-table-body-cell',
  shadow: false,
})
export class IoTableBodyCell {
  @Prop() colspan: number | undefined;
  @Prop() rowspan: number | undefined;

  render() {
    return (
      <Host>
        <td colSpan={this.colspan} rowSpan={this.rowspan}>
          <slot />
        </td>
      </Host>
    );
  }
}
