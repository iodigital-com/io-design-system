export function createPaginationNavId(randomId: string): string {
  return `io-pagination-${randomId}`;
}

export function getPaginationRange(current: number, total: number, showLastPage = true): Array<number | '…'> {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  // Keep the number of rendered tokens stable for large sets to avoid layout shifts.
  if (current <= 4) {
    const base: Array<number | '…'> = [1, 2, 3, 4, 5, '…'];
    return showLastPage ? [...base, total] : base;
  }

  if (current >= total - 3) {
    return [1, '…', total - 4, total - 3, total - 2, total - 1, total];
  }

  const base: Array<number | '…'> = [1, '…', current - 1, current, current + 1, '…'];
  return showLastPage ? [...base, total] : base;
}

export function canNavigateToPage(page: number, totalPages: number, currentPage: number): boolean {
  return !(page < 1 || page > totalPages || page === currentPage);
}
