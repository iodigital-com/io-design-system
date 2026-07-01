/** Emitted when the user navigates to a new page */
export interface IoPaginationChangeDetail {
  /** 1-based page number */
  page: number;
  /** 1-based page number before the navigation occurred */
  previousPage: number;
  /** New per-page value when the user changed the per-page selector. Absent on regular page nav. */
  perPage?: number;
}

/**
 * Localisation strings for io-pagination.
 * Override any key to internationalise the navigation labels.
 */
export type IoPaginationIntl = {
  /** aria-label for the `<nav>` element. Defaults to `'Pagination'`. */
  root?: string;
  /** aria-label for the previous button. Falls back to the `prevLabel` prop, then `'Previous page'`. */
  prev?: string;
  /** aria-label for the next button. Falls back to the `nextLabel` prop, then `'Next page'`. */
  next?: string;
  /** Prefix prepended to the page number for page button aria-labels. Defaults to `'Page'`. */
  page?: string;
  /** Label for the per-page selector. Defaults to `'Per page'`. */
  perPageLabel?: string;
  /** Label for the go-to-page input. Defaults to `'Go to page'`. */
  goToPageLabel?: string;
  /** Prefix text for the range display. Defaults to `'Showing'`. */
  range?: string;
  /** Connector text between range and total. Defaults to `'of'`. */
  of?: string;
};

/**
 * Page count input model for io-pagination.
 *
 * **Pattern A — explicit page count (original API):**
 * ```html
 * <io-pagination page="1" total-pages="10"></io-pagination>
 * ```
 *
 * **Pattern B — data-driven (new API):**
 * ```html
 * <io-pagination page="1" total-items="95" per-page="10"></io-pagination>
 * ```
 * When both `totalItems` and `perPage` are supplied the component derives
 * `totalPages` via `Math.ceil(totalItems / perPage)`.  The derived value takes
 * precedence over any explicit `totalPages` prop.
 */
export type IoPaginationPageCountInput =
  | { totalPages: number; totalItems?: never; perPage?: never }
  | { totalItems: number; perPage: number; totalPages?: never };
