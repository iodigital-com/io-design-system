import { Component, Prop, Host, h } from '@stencil/core';

/**
 * io-table-row
 * =============
 * Optional explicit row element for io-table. Can be used to pass
 * structured row data declaratively in HTML.
 *
 * This is an internal helper component — it renders nothing visible itself.
 * io-table reads its `data` prop via DOM queries in the slotchange handler.
 *
 * @example
 * <io-table>
 *   <io-table-row data='{"name":"Alice","role":"Admin"}'></io-table-row>
 * </io-table>
 */
@Component({
  tag: 'io-table-row',
  shadow: false,
})
export class IoTableRow {
  /**
   * Row data as a JSON string (for HTML attribute use) or a plain object
   * (for JavaScript property assignment).
   */
  @Prop() data: Record<string, unknown> | string = {};

  render() {
    // This component is intentionally invisible — it acts as a metadata carrier.
    return <Host hidden />;
  }
}
