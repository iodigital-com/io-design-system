import { describe, it, expect, vi } from 'vitest';
import { IoPagination } from './io-pagination';

describe('io-pagination - disabled behavior (boundary guarded)', () => {
  let component: IoPagination;
  let emitMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoPagination();
    emitMock = vi.fn();
    (component as any).pageChange = { emit: emitMock };
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
});
