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
