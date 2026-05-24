import { Component, Host, h } from '@stencil/core';

/**
 * io-table-body
 * ==============
 * Renders a <tbody> element inside an io-table.
 * Uses shadow: false so the table formatting context is preserved.
 *
 * @example
 * <io-table-body>
 *   <io-table-body-row>...</io-table-body-row>
 * </io-table-body>
 */
@Component({
  tag: 'io-table-body',
  shadow: false,
})
export class IoTableBody {
  render() {
    return (
      <Host>
        <tbody>
          <slot />
        </tbody>
      </Host>
    );
  }
}
