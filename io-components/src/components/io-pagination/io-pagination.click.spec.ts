import { describe, it, expect, vi } from 'vitest';
import { IoPagination } from './io-pagination';

describe('io-pagination - click handling', () => {
  let component: IoPagination;
  let emitMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoPagination();
    emitMock = vi.fn();
    (component as any).pageChange = { emit: emitMock };
    component.totalPages = 5;
    component.page = 2;
  });

  it('emits pageChange when navigating to a different page', () => {
    (component as any).go(3);

    expect(component.page).toBe(3);
    expect(emitMock).toHaveBeenCalledOnce();
    expect(emitMock).toHaveBeenCalledWith({ page: 3 });
  });

  it('does not emit pageChange when clicking current page', () => {
    (component as any).go(2);

    expect(component.page).toBe(2);
    expect(emitMock).not.toHaveBeenCalled();
  });
});
