import { describe, it, expect, vi } from 'vitest';

import { IoPagination } from './io-pagination';

describe('io-pagination — default props', () => {
  let component: IoPagination;

  beforeEach(() => {
    component = new IoPagination();
    (component as any).change = { emit: vi.fn() };
  });

  it('defaults to page 1', () => {
    expect(component.page).toBe(1);
  });

  it('defaults to totalPages 1', () => {
    expect(component.totalPages).toBe(1);
  });

  it('defaults prevLabel to "Previous page"', () => {
    expect(component.prevLabel).toBe('Previous page');
  });

  it('defaults nextLabel to "Next page"', () => {
    expect(component.nextLabel).toBe('Next page');
  });
});

describe('io-pagination — pageRange', () => {
  let component: IoPagination;

  beforeEach(() => {
    component = new IoPagination();
    (component as any).change = { emit: vi.fn() };
  });

  it('returns all pages when total <= 7', () => {
    const range = (component as any).pageRange(1, 5);
    expect(range).toEqual([1, 2, 3, 4, 5]);
  });

  it('includes ellipsis before active range when current > 3', () => {
    const range = (component as any).pageRange(6, 10);
    expect(range).toContain('…');
    expect(range[0]).toBe(1);
    expect(range[range.length - 1]).toBe(10);
  });

  it('shows a fuller range near the start', () => {
    const range = (component as any).pageRange(1, 12);
    expect(range).toEqual([1, 2, 3, 4, 5, '…', 12]);
  });

  it('shows a fuller range near the end', () => {
    const range = (component as any).pageRange(12, 12);
    expect(range).toEqual([1, '…', 8, 9, 10, 11, 12]);
  });

  it('keeps token count stable across edge and middle ranges', () => {
    const startRange = (component as any).pageRange(1, 12);
    const middleRange = (component as any).pageRange(6, 12);
    const endRange = (component as any).pageRange(12, 12);

    expect(startRange).toHaveLength(7);
    expect(middleRange).toHaveLength(7);
    expect(endRange).toHaveLength(7);
  });
});

describe('io-pagination — navigation', () => {
  let component: IoPagination;
  let emitSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoPagination();
    emitSpy = vi.fn();
    (component as any).change = { emit: emitSpy };
    component.totalPages = 5;
    component.page = 3;
  });

  it('emits change with next page when navigating forward', () => {
    (component as any).go(4);
    expect(emitSpy).toHaveBeenCalledWith({ page: 4 });
    expect(component.page).toBe(4);
  });

  it('does not emit when page is already active', () => {
    (component as any).go(3);
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('does not emit when page is out of range', () => {
    (component as any).go(0);
    expect(emitSpy).not.toHaveBeenCalled();
    (component as any).go(6);
    expect(emitSpy).not.toHaveBeenCalled();
  });
});

describe('io-pagination — accessibility rendering', () => {
  it('keeps active page state and semantic labels normalized for accessible rendering', () => {
    const component = new IoPagination();
    (component as any).change = { emit: vi.fn() };
    component.page = 2;
    component.totalPages = 5;
    component.componentWillLoad();

    const pages = (component as any).pageRange(component.page, component.totalPages);

    expect(component.prevLabel).toBe('Previous page');
    expect(component.nextLabel).toBe('Next page');
    expect(component.page).toBe(2);
    expect(pages).toContain(2);
  });

  it('preserves configurable previous and next button labels', () => {
    const component = new IoPagination();
    (component as any).change = { emit: vi.fn() };
    component.prevLabel = 'Go to previous page';
    component.nextLabel = 'Go to next page';
    component.componentWillLoad();

    expect(component.prevLabel).toBe('Go to previous page');
    expect(component.nextLabel).toBe('Go to next page');
  });
});

describe('io-pagination — invalid prop guards', () => {
  it('normalizes invalid totalPages and page values on load', () => {
    const component = new IoPagination();
    (component as any).change = { emit: vi.fn() };
    component.totalPages = 0;
    component.page = -3;

    component.componentWillLoad();

    expect(component.totalPages).toBe(1);
    expect(component.page).toBe(1);
  });

  it('clamps page when totalPages shrinks below current page', () => {
    const component = new IoPagination();
    (component as any).change = { emit: vi.fn() };
    component.totalPages = 10;
    component.page = 8;
    component.componentWillLoad();

    component.totalPages = 3;
    (component as any).onTotalPagesChange(3);

    expect(component.page).toBe(3);
  });

  it('updates live message for external page changes', () => {
    const component = new IoPagination();
    (component as any).change = { emit: vi.fn() };
    component.totalPages = 8;

    (component as any).onPageChange(4);

    expect((component as any).liveMessage).toBe('Page 4 of 8');
  });
});

describe('io-pagination — totalItems and perPage props', () => {
  let component: IoPagination;

  beforeEach(() => {
    component = new IoPagination();
    (component as any).change = { emit: vi.fn() };
  });

  it('computes totalPages from totalItems and perPage', () => {
    component.totalItems = 95;
    component.perPage = 10;

    expect(component.computedTotalPages).toBe(10);
  });

  it('uses exact division without rounding up when evenly divisible', () => {
    component.totalItems = 100;
    component.perPage = 10;

    expect(component.computedTotalPages).toBe(10);
  });

  it('rounds up when items do not divide evenly', () => {
    component.totalItems = 101;
    component.perPage = 10;

    expect(component.computedTotalPages).toBe(11);
  });

  it('falls back to totalPages when totalItems and perPage are not provided', () => {
    component.totalPages = 7;

    expect(component.computedTotalPages).toBe(7);
  });

  it('falls back to totalPages when only totalItems is provided (incomplete Pattern B)', () => {
    component.totalPages = 5;
    component.totalItems = 50;
    // perPage not set — incomplete Pattern B, should fall through to totalPages

    expect(component.computedTotalPages).toBe(5);
  });

  it('falls back to totalPages when only perPage is provided (incomplete Pattern B)', () => {
    component.totalPages = 5;
    component.perPage = 10;
    // totalItems not set — incomplete Pattern B, should fall through to totalPages

    expect(component.computedTotalPages).toBe(5);
  });

  it('totalItems + perPage takes precedence over explicit totalPages', () => {
    component.totalPages = 3;
    component.totalItems = 50;
    component.perPage = 5;

    expect(component.computedTotalPages).toBe(10);
  });

  it('handles totalItems = 0 by returning 1 page', () => {
    component.totalItems = 0;
    component.perPage = 10;

    expect(component.computedTotalPages).toBe(1);
  });

  it('treats perPage = 0 as 1 to avoid division by zero', () => {
    component.totalItems = 50;
    component.perPage = 0;

    expect(component.computedTotalPages).toBe(50);
  });

  it('treats negative perPage as 1 to avoid division by zero', () => {
    component.totalItems = 50;
    component.perPage = -5;

    expect(component.computedTotalPages).toBe(50);
  });

  it('handles perPage = 1 edge case (each item on its own page)', () => {
    component.totalItems = 50;
    component.perPage = 1;

    expect(component.computedTotalPages).toBe(50);
  });

  it('normalises page correctly during componentWillLoad with data-driven props', () => {
    component.totalItems = 30;
    component.perPage = 10;
    component.page = 5;

    component.componentWillLoad();

    // computed total = 3, page 5 > 3 → clamped to 3
    expect(component.page).toBe(3);
  });

  it('does not mutate totalPages when data-driven props are active', () => {
    component.totalItems = 30;
    component.perPage = 10;
    component.totalPages = 99;

    component.componentWillLoad();

    // explicit totalPages should be untouched — data-driven governs the effective total
    expect(component.totalPages).toBe(99);
    expect(component.computedTotalPages).toBe(3);
  });

  it('clamps page when totalItems changes and computed total shrinks', () => {
    component.totalItems = 100;
    component.perPage = 10;
    component.page = 10;
    component.componentWillLoad();

    // Dataset shrinks
    component.totalItems = 20;
    (component as any).onTotalItemsChange();

    expect(component.page).toBe(2);
  });

  it('clamps page when perPage changes and computed total shrinks', () => {
    component.totalItems = 50;
    component.perPage = 5;
    component.page = 10;
    component.componentWillLoad();

    // Larger page size means fewer pages
    component.perPage = 25;
    (component as any).onPerPageChange();

    expect(component.page).toBe(2);
  });

  it('live message uses computedTotalPages after page navigation', () => {
    component.totalItems = 50;
    component.perPage = 10;
    component.totalPages = 99; // should be ignored

    (component as any).onPageChange(3);

    expect((component as any).liveMessage).toBe('Page 3 of 5');
  });

  it('onTotalPagesChange returns early when totalItems and perPage are both set', () => {
    component.totalItems = 50;
    component.perPage = 10;
    component.page = 5;
    component.totalPages = 5;
    component.componentWillLoad();

    // Call onTotalPagesChange with a new value — should be a no-op due to early return
    (component as any).onTotalPagesChange(3);

    // page should NOT be clamped because data-driven props govern the total
    expect(component.page).toBe(5);
  });

  it('onTotalItemsChange is a no-op when normalizedPage equals current page', () => {
    component.totalItems = 50;
    component.perPage = 10;
    component.page = 2;
    component.componentWillLoad();

    // Change totalItems such that computedTotalPages (4) still fits current page (2)
    component.totalItems = 40;
    (component as any).onTotalItemsChange();

    expect(component.page).toBe(2);
  });

  it('onPerPageChange is a no-op when normalizedPage equals current page', () => {
    component.totalItems = 50;
    component.perPage = 10;
    component.page = 2;
    component.componentWillLoad();

    // Change perPage such that computedTotalPages (5) still fits current page (2)
    component.perPage = 25;
    // Reset page back to 2 (componentWillLoad may have changed it)
    component.page = 2;
    (component as any).onPerPageChange();

    expect(component.page).toBe(2);
  });
});
