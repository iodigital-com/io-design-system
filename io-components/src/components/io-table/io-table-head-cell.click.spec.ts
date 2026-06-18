import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoTableHeadCell } from './io-table-head-cell';

describe('io-table-head-cell — click / sort interaction', () => {
  let component: IoTableHeadCell;
  let emitMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoTableHeadCell();
    emitMock = vi.fn();
    (component as any).sort = { emit: emitMock };
    component.sortable = true;
    component.sortKey = 'email';
  });

  it('emits sort when handleSort is called', () => {
    (component as any).handleSort();
    expect(emitMock).toHaveBeenCalledOnce();
  });

  it('emits sort with correct key', () => {
    component.sortKey = 'email';
    component.sortDirection = 'none';
    (component as any).handleSort();
    expect(emitMock).toHaveBeenCalledWith({ key: 'email', direction: 'ascending' });
  });

  it('handleKeyDown is no longer used — keyboard handled natively by <button>', () => {
    // The sort button pattern uses a native <button> inside <th>.
    // The browser natively fires click on Enter/Space for <button>,
    // so a custom handleKeyDown is not needed or present.
    expect((component as any).handleKeyDown).toBeUndefined();
  });
});
