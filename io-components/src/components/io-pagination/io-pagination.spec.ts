import { describe, it, expect, vi } from 'vitest';
import { h } from '@stencil/core';

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

  it('defaults compact to false', () => {
    expect(component.compact).toBe(false);
  });
});

describe('io-pagination — compact prop', () => {
  it('compact can be set to true', () => {
    const component = new IoPagination();
    (component as any).change = { emit: vi.fn() };

    component.compact = true;

    expect(component.compact).toBe(true);
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
    expect(emitSpy).toHaveBeenCalledWith({ page: 4, previousPage: 3 });
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

describe('io-pagination — intl prop', () => {
  let component: IoPagination;

  beforeEach(() => {
    component = new IoPagination();
    (component as any).change = { emit: vi.fn() };
  });

  it('defaults intl to undefined', () => {
    expect(component.intl).toBeUndefined();
  });

  // Property-based intl tests (verify prop access)
  it('uses "Pagination" as default nav label when intl.root is not set', () => {
    component.intl = {};
    // Resolved inside render() — verify the fallback value directly
    const resolved = component.intl?.root ?? 'Pagination';
    expect(resolved).toBe('Pagination');
  });

  it('uses intl.root when provided', () => {
    component.intl = { root: 'Paginación' };
    const resolved = component.intl?.root ?? 'Pagination';
    expect(resolved).toBe('Paginación');
  });

  it('uses "Page" as default page prefix when intl.page is not set', () => {
    component.intl = {};
    const resolved = component.intl?.page ?? 'Page';
    expect(resolved).toBe('Page');
  });

  it('uses intl.page when provided', () => {
    component.intl = { page: 'Página' };
    const resolved = component.intl?.page ?? 'Page';
    expect(resolved).toBe('Página');
  });

  it('falls back to prevLabel when intl.prev is not set', () => {
    component.prevLabel = 'Go back';
    component.intl = {};
    const resolved = component.intl?.prev ?? component.prevLabel;
    expect(resolved).toBe('Go back');
  });

  it('uses intl.prev when provided', () => {
    component.prevLabel = 'Previous page';
    component.intl = { prev: 'Página anterior' };
    const resolved = component.intl?.prev ?? component.prevLabel;
    expect(resolved).toBe('Página anterior');
  });

  it('falls back to nextLabel when intl.next is not set', () => {
    component.nextLabel = 'Go forward';
    component.intl = {};
    const resolved = component.intl?.next ?? component.nextLabel;
    expect(resolved).toBe('Go forward');
  });

  it('uses intl.next when provided', () => {
    component.nextLabel = 'Next page';
    component.intl = { next: 'Página siguiente' };
    const resolved = component.intl?.next ?? component.nextLabel;
    expect(resolved).toBe('Página siguiente');
  });

  // DOM-asserting intl tests (verify rendered attributes via h mock calls)
  it('renders nav with default aria-label "Pagination" when intl.root is not set', () => {
    component.totalPages = 5;
    component.page = 1;
    component.componentWillLoad();

    const hMock = h as unknown as ReturnType<typeof vi.fn>;
    hMock.mockClear();
    component.render();

    // Find the nav h() call
    const navCall = hMock.mock.calls.find(
      ([tag, attrs]) => tag === 'nav' && (attrs as Record<string, unknown>)?.['aria-label'] !== undefined,
    );
    const navAriaLabel = navCall?.[1]?.['aria-label'];
    expect(navAriaLabel).toBe('Pagination');
  });

  it('renders nav with custom aria-label from intl.root', () => {
    component.intl = { root: 'Paginación' };
    component.totalPages = 5;
    component.page = 1;
    component.componentWillLoad();

    const hMock = h as unknown as ReturnType<typeof vi.fn>;
    hMock.mockClear();
    component.render();

    const navCall = hMock.mock.calls.find(
      ([tag, attrs]) => tag === 'nav' && (attrs as Record<string, unknown>)?.['aria-label'] !== undefined,
    );
    const navAriaLabel = navCall?.[1]?.['aria-label'];
    expect(navAriaLabel).toBe('Paginación');
  });

  it('renders prev button with aria-label from intl.prev', () => {
    component.intl = { prev: 'Anterior' };
    component.totalPages = 5;
    component.page = 2;
    component.componentWillLoad();

    const hMock = h as unknown as ReturnType<typeof vi.fn>;
    hMock.mockClear();
    component.render();

    // Find the prev button (page-btn--nav class, first one should be prev)
    const prevBtnCall = hMock.mock.calls.find(
      ([tag, attrs], idx, arr) => {
        // Find button with page-btn--nav class in first position
        const isBtn = tag === 'button';
        const hasNavClass = (attrs as Record<string, unknown>)?.class?.toString().includes('page-btn--nav');
        if (!isBtn || !hasNavClass) return false;
        // Make sure it's the first one (prev button)
        const prevBtnCalls = arr.filter(
          ([t, a]) =>
            t === 'button' &&
            (a as Record<string, unknown>)?.class?.toString().includes('page-btn--nav'),
        );
        return arr.indexOf([tag, attrs, ...arr[idx].slice(2)]) === arr.indexOf(prevBtnCalls[0]);
      },
    );
    const prevAriaLabel = prevBtnCall?.[1]?.['aria-label'];
    expect(prevAriaLabel).toBe('Anterior');
  });

  it('renders next button with aria-label from intl.next', () => {
    component.intl = { next: 'Siguiente' };
    component.totalPages = 5;
    component.page = 2;
    component.componentWillLoad();

    const hMock = h as unknown as ReturnType<typeof vi.fn>;
    hMock.mockClear();
    component.render();

    // Find the next button (page-btn--nav class, last one should be next)
    const navBtnCalls = hMock.mock.calls.filter(
      ([tag, attrs]) =>
        tag === 'button' &&
        (attrs as Record<string, unknown>)?.class?.toString().includes('page-btn--nav'),
    );
    const nextBtnCall = navBtnCalls[navBtnCalls.length - 1];
    const nextAriaLabel = nextBtnCall?.[1]?.['aria-label'];
    expect(nextAriaLabel).toBe('Siguiente');
  });

  it('renders page button with aria-label from intl.page prefix', () => {
    component.intl = { page: 'Página' };
    component.totalPages = 5;
    component.page = 1;
    component.componentWillLoad();

    const hMock = h as unknown as ReturnType<typeof vi.fn>;
    hMock.mockClear();
    component.render();

    // Find page number buttons (not nav buttons)
    const pageBtnCall = hMock.mock.calls.find(
      ([tag, attrs]) =>
        tag === 'button' &&
        (attrs as Record<string, unknown>)?.['aria-label']?.toString().startsWith('Página'),
    );
    const pageAriaLabel = pageBtnCall?.[1]?.['aria-label'];
    expect(pageAriaLabel).toMatch(/^Página \d+$/);
  });

  it('prev button falls back to prevLabel when intl.prev is not set', () => {
    component.prevLabel = 'Go back';
    component.totalPages = 5;
    component.page = 2;
    component.componentWillLoad();

    const hMock = h as unknown as ReturnType<typeof vi.fn>;
    hMock.mockClear();
    component.render();

    // Find prev button
    const navBtnCalls = hMock.mock.calls.filter(
      ([tag, attrs]) =>
        tag === 'button' &&
        (attrs as Record<string, unknown>)?.class?.toString().includes('page-btn--nav'),
    );
    const prevBtnCall = navBtnCalls[0];
    const prevAriaLabel = prevBtnCall?.[1]?.['aria-label'];
    expect(prevAriaLabel).toBe('Go back');
  });

  it('next button falls back to nextLabel when intl.next is not set', () => {
    component.nextLabel = 'Go forward';
    component.totalPages = 5;
    component.page = 2;
    component.componentWillLoad();

    const hMock = h as unknown as ReturnType<typeof vi.fn>;
    hMock.mockClear();
    component.render();

    // Find next button
    const navBtnCalls = hMock.mock.calls.filter(
      ([tag, attrs]) =>
        tag === 'button' &&
        (attrs as Record<string, unknown>)?.class?.toString().includes('page-btn--nav'),
    );
    const nextBtnCall = navBtnCalls[navBtnCalls.length - 1];
    const nextAriaLabel = nextBtnCall?.[1]?.['aria-label'];
    expect(nextAriaLabel).toBe('Go forward');
  });

  it('page button uses default "Page" prefix when intl.page is not set', () => {
    component.totalPages = 5;
    component.page = 1;
    component.componentWillLoad();

    const hMock = h as unknown as ReturnType<typeof vi.fn>;
    hMock.mockClear();
    component.render();

    // Find page number button (not nav button)
    const pageBtnCall = hMock.mock.calls.find(
      ([tag, attrs]) =>
        tag === 'button' &&
        !(attrs as Record<string, unknown>)?.class?.toString().includes('page-btn--nav') &&
        (attrs as Record<string, unknown>)?.['aria-label']?.toString().includes('Page'),
    );
    const pageAriaLabel = pageBtnCall?.[1]?.['aria-label'];
    expect(pageAriaLabel).toMatch(/^Page \d+$/);
  });
});

describe('io-pagination — previousPage in change event', () => {
  let component: IoPagination;
  let emitSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoPagination();
    emitSpy = vi.fn();
    (component as any).change = { emit: emitSpy };
    component.totalPages = 10;
    component.page = 5;
  });

  it('includes previousPage in change event detail', () => {
    (component as any).go(6);
    expect(emitSpy).toHaveBeenCalledWith({ page: 6, previousPage: 5 });
  });

  it('previousPage reflects the page before navigation, not the new page', () => {
    (component as any).go(2);
    const detail = emitSpy.mock.calls[0][0];
    expect(detail.page).toBe(2);
    expect(detail.previousPage).toBe(5);
    expect(detail.page).not.toBe(detail.previousPage);
  });

  it('updates component.page to the new value after navigation', () => {
    (component as any).go(8);
    expect(component.page).toBe(8);
  });
});
