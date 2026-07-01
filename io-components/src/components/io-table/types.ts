/**
 * Sort direction for sortable table column headers.
 *
 * io-table uses tri-state cycling (`none` → `ascending` → `descending` → `none`)
 * and full-word values (`'ascending'` / `'descending'`) intentionally:
 *
 * - **Tri-state** lets users return to the unsorted (natural) row order by
 *   clicking a third time, instead of being locked into ascending/descending.
 *   This is a deliberate improvement over bi-state (Porsche: `'asc'|'desc'|undefined`).
 *
 * - **Full-word values** map directly to the `aria-sort` attribute values defined
 *   in the WAI-ARIA specification (`"ascending"` / `"descending"` / `"none"`),
 *   eliminating translation between the sort event and the ARIA attribute.
 *   Porsche uses short-form `'asc'`/`'desc'` which must be mapped manually.
 *
 * The `key` field in {@link IoTableSortDetail} uses `sortKey` (a more explicit
 * column identifier) where Porsche uses `id` — this avoids confusion with DOM
 * element `id` attributes and makes multi-table pages easier to reason about.
 */
export type IoTableSortDirection = 'ascending' | 'descending' | 'none';

/** Table layout algorithm. */
export type IoTableLayout = 'auto' | 'fixed';

/** Size preset for the table — controls row density. */
export type IoTableSize = 'sm' | 'md' | 'lg';

/**
 * Detail emitted by io-table-head-cell's `sort` event and re-emitted as
 * `sortChange` by io-table.
 *
 * **Tri-state direction** — `direction` cycles `none → ascending → descending → none`.
 * The `'none'` state lets users return to the unsorted row order.
 *
 * **Full-word values** — `direction` uses ARIA-aligned full words
 * (`'ascending'` / `'descending'`) that map directly to the `aria-sort` attribute,
 * so no translation is needed between the event handler and the ARIA attribute.
 *
 * **`key` vs `id`** — io-table uses `sortKey` (explicit column identifier) rather
 * than `id` to avoid collision with DOM element `id` attributes.
 */
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

/**
 * Tri-state selection state for the select-all checkbox in io-table-head-row.
 * - `'none'` — no rows selected (checkbox unchecked)
 * - `'some'` — some rows selected (checkbox indeterminate)
 * - `'all'`  — all rows selected (checkbox checked)
 */
export type IoTableSelectionState = 'none' | 'some' | 'all';
