export function createPaginationNavId(randomId: string): string {
  return `io-pagination-${randomId}`;
}

export function getPaginationRange(current: number, total: number): Array<number | '…'> {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  // Keep the number of rendered tokens stable for large sets to avoid layout shifts.
  if (current <= 4) {
    return [1, 2, 3, 4, 5, '…', total];
  }

  if (current >= total - 3) {
    return [1, '…', total - 4, total - 3, total - 2, total - 1, total];
  }

  return [1, '…', current - 1, current, current + 1, '…', total];
}

export function canNavigateToPage(page: number, totalPages: number, currentPage: number): boolean {
  return !(page < 1 || page > totalPages || page === currentPage);
}
