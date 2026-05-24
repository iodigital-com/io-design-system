/** Sort direction for sortable table column headers. */
export type IoTableSortDirection = 'ascending' | 'descending' | 'none';

/** Size preset for the table — controls row density. */
export type IoTableSize = 'sm' | 'md' | 'lg';

/** Detail emitted by io-table-head-cell's `sort` event. */
export interface IoTableSortDetail {
  key: string;
  direction: IoTableSortDirection;
}

/** Detail emitted by io-table-body-row's `select` event. */
export interface IoTableBodyRowSelectDetail {
  selected: boolean;
}

/** Detail emitted by io-table-head-row's `selectAll` event. */
export interface IoTableHeadRowSelectAllDetail {
  checked: boolean;
}
