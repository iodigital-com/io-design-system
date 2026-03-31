import { describe, it, expect, vi } from 'vitest';
import { IoPagination } from './io-pagination';

describe('io-pagination — default props', () => {
  let component: IoPagination;

  beforeEach(() => {
    component = new IoPagination();
    (component as any).pageChange = { emit: vi.fn() };
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
    (component as any).pageChange = { emit: vi.fn() };
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
    (component as any).pageChange = { emit: emitSpy };
    component.totalPages = 5;
    component.page = 3;
  });

  it('emits pageChange with next page when navigating forward', () => {
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
