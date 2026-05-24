import { Component, Host, h } from '@stencil/core';

/**
 * io-table-head
 * ==============
 * Renders a <thead> element inside an io-table.
 * Uses shadow: false so the table formatting context is preserved.
 *
 * @example
 * <io-table-head>
 *   <io-table-head-row>...</io-table-head-row>
 * </io-table-head>
 */
@Component({
  tag: 'io-table-head',
  shadow: false,
})
export class IoTableHead {
  render() {
    return (
      <Host>
        <thead>
          <slot />
        </thead>
      </Host>
    );
  }
}
