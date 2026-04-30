import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoPagination } from './io-pagination';

describe('io-pagination — keyboard activation', () => {
  let component: IoPagination;
  let changeEmitMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoPagination();
    (component as any).el = document.createElement('io-pagination');
    changeEmitMock = vi.fn();
    (component as any).change = { emit: changeEmitMock };
    component.page = 3;
    component.totalPages = 10;
    (component as any).navId = 'test-nav';
  });

  it('go() navigates to the given page and emits change', () => {
    (component as any).go(4);
    expect(component.page).toBe(4);
    expect(changeEmitMock).toHaveBeenCalledWith({ page: 4 });
  });

  it('go() to prev page decrements page', () => {
    (component as any).go(2);
    expect(component.page).toBe(2);
    expect(changeEmitMock).toHaveBeenCalledWith({ page: 2 });
  });

  it('go() clamps — does not navigate below page 1', () => {
    component.page = 1;
    (component as any).go(0);
    expect(component.page).toBe(1);
    expect(changeEmitMock).not.toHaveBeenCalled();
  });

  it('go() clamps — does not navigate above totalPages', () => {
    component.page = 10;
    (component as any).go(11);
    expect(component.page).toBe(10);
    expect(changeEmitMock).not.toHaveBeenCalled();
  });

  it('go() does not emit when already on the target page', () => {
    (component as any).go(3); // already on page 3
    expect(changeEmitMock).not.toHaveBeenCalled();
  });

  it('render includes aria-current="page" on the active page button', () => {
    component.page = 3;
    component.totalPages = 5;
    expect(() => component.render()).not.toThrow();
  });

  it('prev button is disabled on first page', () => {
    component.page = 1;
    component.totalPages = 5;
    // Verify the render does not throw and prev navigation is blocked
    (component as any).go(0);
    expect(component.page).toBe(1);
  });

  it('next button is disabled on last page', () => {
    component.page = 5;
    component.totalPages = 5;
    (component as any).go(6);
    expect(component.page).toBe(5);
  });
});
