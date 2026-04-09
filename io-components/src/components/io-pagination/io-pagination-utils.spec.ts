import { describe, it, expect } from 'vitest';
import { canNavigateToPage, createPaginationNavId, getPaginationRange } from './io-pagination-utils';

describe('io-pagination-utils', () => {
  it('creates stable nav id prefix', () => {
    expect(createPaginationNavId('abc')).toBe('io-pagination-abc');
  });

  it('builds compact ranges around edges and middle', () => {
    expect(getPaginationRange(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(getPaginationRange(1, 12)).toEqual([1, 2, 3, 4, 5, '…', 12]);
    expect(getPaginationRange(6, 12)).toEqual([1, '…', 5, 6, 7, '…', 12]);
    expect(getPaginationRange(12, 12)).toEqual([1, '…', 8, 9, 10, 11, 12]);
  });

  it('guards page navigation boundaries and current page', () => {
    expect(canNavigateToPage(0, 5, 1)).toBe(false);
    expect(canNavigateToPage(6, 5, 1)).toBe(false);
    expect(canNavigateToPage(2, 5, 2)).toBe(false);
    expect(canNavigateToPage(3, 5, 2)).toBe(true);
  });
});
