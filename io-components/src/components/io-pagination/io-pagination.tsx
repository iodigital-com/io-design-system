import { Component, Prop, Event, EventEmitter, Element, Host, h, Watch, State } from '@stencil/core';

import { getPaginationStyles } from './io-pagination-styles';
import { canNavigateToPage, createPaginationNavId, getPaginationRange } from './io-pagination-utils';

import type { IoPaginationChangeDetail } from './types';

/**
 * io-pagination
 * ==============
 * Circular page controls — outlined page numbers, active page in brand blue,
 * beige prev/next arrow buttons. Automatically generates ellipsis for large
 * page counts.
 *
 * @example
 * <io-pagination page="1" total-pages="10" />
 * <io-pagination page="5" total-pages="12" />
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

  /** Total number of pages */
  @Prop({ mutable: true, reflect: true }) totalPages = 1;

  /** Visually label the prev button (used by aria-label) */
  @Prop() prevLabel = 'Previous page';

  /** Visually label the next button (used by aria-label) */
  @Prop() nextLabel = 'Next page';

  // ── Events ────────────────────────────────────────────────────

  /** Fires when the user navigates to a new page */
  @Event() change!: EventEmitter<IoPaginationChangeDetail>;

  // ── State ───────────────────────────────────────────────────

  /** Polite announcement for assistive technology when the page changes */
  @State() private liveMessage = '';

  // ── Lifecycle ─────────────────────────────────────────────────

  private navId!: string;

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
    const normalizedTotalPages = this.normalizeTotalPages(this.totalPages);
    this.totalPages = normalizedTotalPages;
    this.page = this.normalizePage(this.page, normalizedTotalPages);
  }

  @Watch('totalPages')
  onTotalPagesChange(newValue: number) {
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

  @Watch('page')
  onPageChange(newValue: number) {
    const normalizedPage = this.normalizePage(newValue, this.normalizeTotalPages(this.totalPages));
    if (normalizedPage !== newValue) {
      this.page = normalizedPage;
      return;
    }

    this.liveMessage = `Page ${normalizedPage} of ${this.totalPages}`;
  }

  // ── Private helpers ───────────────────────────────────────────

  /** Derives the visible page numbers / ellipsis markers to render */
  private pageRange(current: number, total: number): Array<number | '…'> {
    return getPaginationRange(current, total);
  }

  private go(page: number) {
    if (!canNavigateToPage(page, this.totalPages, this.page)) return;
    this.page = page;
    this.liveMessage = `Page ${page} of ${this.totalPages}`;
    this.change.emit({ page });
  }

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { page, totalPages, prevLabel, nextLabel, navId } = this;
    const pages = this.pageRange(page, totalPages);

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
        <nav aria-label="Pagination" id={navId}>
          <div class="pagination">
            <button
              class="page-btn page-btn--nav"
              aria-label={prevLabel}
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
                    class={`page-btn${p === page ? ' page-btn--active' : ' page-btn--number'}`}
                    aria-label={`Page ${p}`}
                    aria-current={p === page ? 'page' : undefined}
                    onClick={() => this.go(p as number)}
                  >
                    {p}
                  </button>
                )
            )}

            <button
              class="page-btn page-btn--nav"
              aria-label={nextLabel}
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
