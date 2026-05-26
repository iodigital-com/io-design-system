/** Emitted when the user navigates to a new page */
export interface IoPaginationChangeDetail {
  /** 1-based page number */
  page: number;
}

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
