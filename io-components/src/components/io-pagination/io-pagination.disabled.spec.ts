import { describe, it, expect, vi, beforeEach } from 'vitest';
import { IoPagination } from './io-pagination';

describe('io-pagination - boundary guard behavior', () => {
  let component: IoPagination;
  let emitMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoPagination();
    emitMock = vi.fn();
    (component as any).change = { emit: emitMock };
    component.totalPages = 5;
    component.page = 1;
  });

  it('does not navigate below first page', () => {
    (component as any).go(0);

    expect(component.page).toBe(1);
    expect(emitMock).not.toHaveBeenCalled();
  });

  it('does not navigate above last page', () => {
    component.page = 5;
    (component as any).go(6);

    expect(component.page).toBe(5);
    expect(emitMock).not.toHaveBeenCalled();
  });

  it('does not emit when target page equals current page', () => {
    component.page = 3;

    (component as any).go(3);

    expect(component.page).toBe(3);
    expect(emitMock).not.toHaveBeenCalled();
  });

  it('prevents previous navigation when already on first page', () => {
    component.page = 1;

    (component as any).go(component.page - 1);

    expect(component.page).toBe(1);
    expect(emitMock).not.toHaveBeenCalled();
  });

  it('prevents next navigation when already on last page', () => {
    component.page = component.totalPages;

    (component as any).go(component.page + 1);

    expect(component.page).toBe(component.totalPages);
    expect(emitMock).not.toHaveBeenCalled();
  });
});
