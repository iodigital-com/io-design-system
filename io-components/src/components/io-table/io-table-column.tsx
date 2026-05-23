import { Component, Prop, Host, h } from '@stencil/core';

/**
 * io-table-column
 * ================
 * Declarative column definition for io-table. Used as a slotted child
 * when authoring columns in HTML rather than via the `columns` prop.
 *
 * This is an internal helper component — it renders nothing visible itself.
 * io-table reads its `key`, `label`, and `sortable` props via DOM queries
 * in the slotchange handler to build the column configuration.
 *
 * @example
 * <io-table>
 *   <io-table-column key="name" label="Name"></io-table-column>
 *   <io-table-column key="email" label="Email" sortable></io-table-column>
 * </io-table>
 */
@Component({
  tag: 'io-table-column',
  shadow: false,
})
export class IoTableColumn {
  /** Data key to read from each row object. */
  @Prop() colKey!: string;

  /** Column header label text. */
  @Prop() label!: string;

  /** Enables sorting for this column. Overrides the parent's global `sortable` prop. */
  @Prop() sortable: boolean = false;

  render() {
    // This component is intentionally invisible — it acts as a metadata carrier.
    return <Host hidden />;
  }
}
