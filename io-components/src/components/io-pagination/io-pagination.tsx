import { Component, Prop, Event, EventEmitter, Element, Host, h } from '@stencil/core';
import type { IoPaginationChangeDetail } from './types';
import { getPaginationStyles } from './io-pagination-styles';

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
  @Prop({ reflect: true }) totalPages = 1;

  /** Visually label the prev button (used by aria-label) */
  @Prop() prevLabel = 'Previous page';

  /** Visually label the next button (used by aria-label) */
  @Prop() nextLabel = 'Next page';

  // ── Events ────────────────────────────────────────────────────

  /** Fires when the user navigates to a new page */
  @Event() pageChange!: EventEmitter<IoPaginationChangeDetail>;

  // ── Lifecycle ─────────────────────────────────────────────────

  private navId!: string;

  componentWillLoad() {
    this.navId = `io-pagination-${Math.random().toString(36).slice(2)}`;
  }

  // ── Private helpers ───────────────────────────────────────────

  /** Derives the visible page numbers / ellipsis markers to render */
  private pageRange(current: number, total: number): Array<number | '…'> {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    // Keep edge windows fuller so first/last pages don't collapse to too few numbers.
    if (current <= 3) {
      return [1, 2, 3, '…', total];
    }

    if (current >= total - 2) {
      return [1, '…', total - 2, total - 1, total];
    }

    return [1, '…', current - 1, current, current + 1, '…', total];
  }

  private go(page: number) {
    if (page < 1 || page > this.totalPages || page === this.page) return;
    this.page = page;
    this.pageChange.emit({ page });
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
