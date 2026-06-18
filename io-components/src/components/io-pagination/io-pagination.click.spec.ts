import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoPagination } from './io-pagination';

describe('io-pagination - click handling', () => {
  let component: IoPagination;
  let emitMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoPagination();
    emitMock = vi.fn();
    (component as any).change = { emit: emitMock };
    component.totalPages = 5;
    component.page = 2;
  });

  it('emits change when navigating to a different page', () => {
    (component as any).go(3);

    expect(component.page).toBe(3);
    expect(emitMock).toHaveBeenCalledOnce();
    expect(emitMock).toHaveBeenCalledWith({ page: 3, previousPage: 2 });
  });

  it('does not emit change when clicking current page', () => {
    (component as any).go(2);

    expect(component.page).toBe(2);
    expect(emitMock).not.toHaveBeenCalled();
  });

  it('does not emit when target page is outside valid range', () => {
    (component as any).go(0);
    (component as any).go(99);

    expect(component.page).toBe(2);
    expect(emitMock).not.toHaveBeenCalled();
  });
});

describe('io-pagination - click handling with computed pages (totalItems + perPage)', () => {
  let component: IoPagination;
  let emitMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoPagination();
    emitMock = vi.fn();
    (component as any).change = { emit: emitMock };
    // 45 items, 10 per page → 5 computed pages
    component.totalItems = 45;
    component.perPage = 10;
    component.page = 2;
  });

  it('emits change when navigating within computed page range', () => {
    (component as any).go(3);

    expect(component.page).toBe(3);
    expect(emitMock).toHaveBeenCalledOnce();
    expect(emitMock).toHaveBeenCalledWith({ page: 3, previousPage: 2 });
  });

  it('does not emit when target page exceeds computed total', () => {
    // computedTotalPages = 5, so page 6 is out of range
    (component as any).go(6);

    expect(component.page).toBe(2);
    expect(emitMock).not.toHaveBeenCalled();
  });

  it('emits change for last computed page', () => {
    // computedTotalPages = 5
    (component as any).go(5);

    expect(component.page).toBe(5);
    expect(emitMock).toHaveBeenCalledWith({ page: 5, previousPage: 2 });
  });

  it('does not emit when navigating to current page', () => {
    (component as any).go(2);

    expect(component.page).toBe(2);
    expect(emitMock).not.toHaveBeenCalled();
  });

  it('uses computedTotalPages not explicit totalPages for boundary checks', () => {
    // Set a misleading totalPages — computed should win
    component.totalPages = 100;

    // computedTotalPages = 5 (45 items / 10 per page), so page 6 is still out of range
    (component as any).go(6);

    expect(component.page).toBe(2);
    expect(emitMock).not.toHaveBeenCalled();
  });
});
