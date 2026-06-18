import { Component, Prop, Event, EventEmitter, Element, Host, h, Watch, State } from '@stencil/core';

import { getPaginationStyles } from './io-pagination-styles';
import { canNavigateToPage, createPaginationNavId, getPaginationRange } from './io-pagination-utils';

import type { IoPaginationChangeDetail, IoPaginationIntl } from './types';

/**
 * io-pagination
 * ==============
 * Circular page controls — outlined page numbers, active page in brand blue,
 * beige prev/next arrow buttons. Automatically generates ellipsis for large
 * page counts.
 *
 * **Pattern A — explicit page count:**
 * ```html
 * <io-pagination page="1" total-pages="10" />
 * ```
 *
 * **Pattern B — data-driven (preferred for API integrations):**
 * ```html
 * <io-pagination page="1" total-items="95" per-page="10" />
 * ```
 * When `totalItems` and `perPage` are both provided, the component derives
 * `totalPages` internally via `Math.ceil(totalItems / perPage)`, taking
 * precedence over any explicit `totalPages` prop.
 */
@Component({
  tag: 'io-pagination',
  shadow: { delegatesFocus: true },
})
export class IoPagination {
  @Element() el!: HTMLElement;

  // ── Props ─────────────────────────────────────────────────────

  /** Current 1-based active page number */
  @Prop({ mutable: true, reflect: true }) page = 1;

  /**
   * Total number of pages (Pattern A).
   * Ignored when both `totalItems` and `perPage` are supplied.
   */
  @Prop({ mutable: true, reflect: true }) totalPages = 1;

  /**
   * Total number of items in the dataset (Pattern B).
   * Provide together with `perPage` to let the component compute `totalPages`.
   * Takes precedence over an explicit `totalPages` prop when both are set.
   */
  @Prop() totalItems?: number;

  /**
   * Items shown per page (Pattern B).
   * Provide together with `totalItems` to let the component compute `totalPages`.
   * Values <= 0 are treated as 1 to avoid division by zero.
   */
  @Prop() perPage?: number;

  /** Reduces button size to ~32px height for dense UI contexts (toolbars, sidebars) */
  @Prop({ reflect: true }) compact = false;

  /** Visually label the prev button (used by aria-label) */
  @Prop() prevLabel = 'Previous page';

  /** Visually label the next button (used by aria-label) */
  @Prop() nextLabel = 'Next page';

  /** Localisation strings. Override to internationalise navigation labels. */
  @Prop() intl?: IoPaginationIntl;

  // ── Events ────────────────────────────────────────────────────

  /** Fires when the user navigates to a new page */
  @Event() change!: EventEmitter<IoPaginationChangeDetail>;

  // ── State ───────────────────────────────────────────────────

  /** Polite announcement for assistive technology when the page changes */
  @State() private liveMessage = '';

  // ── Lifecycle ─────────────────────────────────────────────────

  private navId!: string;

  /**
   * Resolves the effective total page count.
   *
   * Precedence: `totalItems + perPage` (Pattern B) > explicit `totalPages` (Pattern A).
   * Falls back to the `totalPages` prop when Pattern B props are absent.
   */
  get computedTotalPages(): number {
    if (this.totalItems != null && this.perPage != null) {
      const safePerPage = this.perPage > 0 ? this.perPage : 1;
      return this.totalItems === 0 ? 1 : Math.ceil(this.totalItems / safePerPage);
    }
    return this.totalPages;
  }

  private normalizeTotalPages(totalPages: number): number {
    const parsed = Number(totalPages);
    if (!Number.isFinite(parsed)) return 1;
    return Math.max(1, Math.floor(parsed));
  }

  private normalizePage(page: number, totalPages: number): number {
    const parsed = Number(page);
    if (!Number.isFinite(parsed)) return 1;
    return Math.max(1, Math.min(Math.floor(parsed), totalPages));
  }

  componentWillLoad() {
    this.navId = createPaginationNavId(Math.random().toString(36).slice(2));

    const hasDataDrivenProps = this.totalItems != null && this.perPage != null;
    const hasOnlyOneDataProp = (this.totalItems != null) !== (this.perPage != null);

    if (hasOnlyOneDataProp) {
      console.warn('[io-pagination] Provide either totalPages OR both totalItems and perPage. Falling back to totalPages.');
    }

    const effectiveTotal = this.computedTotalPages;

    if (!hasDataDrivenProps) {
      this.totalPages = this.normalizeTotalPages(effectiveTotal);
    }

    this.page = this.normalizePage(this.page, hasDataDrivenProps ? effectiveTotal : this.totalPages);
  }

  @Watch('totalPages')
  onTotalPagesChange(newValue: number) {
    // Skip normalization when data-driven props govern the total page count
    if (this.totalItems != null && this.perPage != null) return;

    const normalizedTotalPages = this.normalizeTotalPages(newValue);

    if (normalizedTotalPages !== newValue) {
      this.totalPages = normalizedTotalPages;
      return;
    }

    const normalizedPage = this.normalizePage(this.page, normalizedTotalPages);
    if (normalizedPage !== this.page) {
      this.page = normalizedPage;
    }
  }

  @Watch('totalItems')
  onTotalItemsChange() {
    const normalizedPage = this.normalizePage(this.page, this.computedTotalPages);
    if (normalizedPage !== this.page) {
      this.page = normalizedPage;
    }
  }

  @Watch('perPage')
  onPerPageChange() {
    const normalizedPage = this.normalizePage(this.page, this.computedTotalPages);
    if (normalizedPage !== this.page) {
      this.page = normalizedPage;
    }
  }

  @Watch('page')
  onPageChange(newValue: number) {
    const normalizedPage = this.normalizePage(newValue, this.normalizeTotalPages(this.computedTotalPages));
    if (normalizedPage !== newValue) {
      this.page = normalizedPage;
      return;
    }

    this.liveMessage = `Page ${normalizedPage} of ${this.computedTotalPages}`;
  }

  // ── Private helpers ───────────────────────────────────────────

  /** Derives the visible page numbers / ellipsis markers to render */
  private pageRange(current: number, total: number): Array<number | '…'> {
    return getPaginationRange(current, total);
  }

  private go(page: number) {
    const totalPages = this.computedTotalPages;
    if (!canNavigateToPage(page, totalPages, this.page)) return;
    const previousPage = this.page;
    this.page = page;
    this.liveMessage = `Page ${page} of ${totalPages}`;
    this.change.emit({ page, previousPage });
  }

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { page, prevLabel, nextLabel, navId, intl } = this;
    const totalPages = this.computedTotalPages;
    const pages = this.pageRange(page, totalPages);

    const resolvedNavLabel = intl?.root ?? 'Pagination';
    const resolvedPrevLabel = intl?.prev ?? prevLabel;
    const resolvedNextLabel = intl?.next ?? nextLabel;
    const resolvedPagePrefix = intl?.page ?? 'Page';

    const arrowLeft = (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" aria-hidden="true">
        <path d="m15 18-6-6 6-6" />
      </svg>
    );

    const arrowRight = (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18" aria-hidden="true">
        <path d="m9 18 6-6-6-6" />
      </svg>
    );

    return (
      <Host>
        <style>{getPaginationStyles()}</style>
        <span aria-live="polite" aria-atomic="true" class="sr-only">{this.liveMessage}</span>
        <nav aria-label={resolvedNavLabel} id={navId}>
          <div class="pagination">
            <button
              type="button"
              class="page-btn page-btn--nav"
              aria-label={resolvedPrevLabel}
              disabled={page === 1}
              onClick={() => this.go(page - 1)}
            >
              {arrowLeft}
            </button>

            {pages.map(p =>
              p === '…'
                ? <span class="page-dots" aria-hidden="true">…</span>
                : (
                  <button
                    type="button"
                    class={`page-btn${p === page ? ' page-btn--active' : ' page-btn--number'}`}
                    aria-label={`${resolvedPagePrefix} ${p}`}
                    aria-current={p === page ? 'page' : undefined}
                    onClick={() => this.go(p as number)}
                  >
                    {p}
                  </button>
                )
            )}

            <button
              type="button"
              class="page-btn page-btn--nav"
              aria-label={resolvedNextLabel}
              disabled={page === totalPages}
              onClick={() => this.go(page + 1)}
            >
              {arrowRight}
            </button>
          </div>
        </nav>
      </Host>
    );
  }
}
