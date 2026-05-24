import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoTableHeadCell } from './io-table-head-cell';

describe('io-table-head-cell — default props', () => {
  let component: IoTableHeadCell;

  beforeEach(() => {
    component = new IoTableHeadCell();
    (component as any).sort = { emit: vi.fn() };
  });

  it('has sortable false by default', () => {
    expect(component.sortable).toBe(false);
  });

  it('has sortDirection none by default', () => {
    expect(component.sortDirection).toBe('none');
  });

  it('has empty sortKey by default', () => {
    expect(component.sortKey).toBe('');
  });
});

describe('io-table-head-cell — render', () => {
  let component: IoTableHeadCell;

  beforeEach(() => {
    component = new IoTableHeadCell();
    (component as any).sort = { emit: vi.fn() };
  });

  it('renders without throwing', () => {
    expect(() => component.render()).not.toThrow();
  });

  it('renders with sortable prop without throwing', () => {
    component.sortable = true;
    component.sortKey = 'name';
    expect(() => component.render()).not.toThrow();
  });

  it('renders with sortDirection ascending without throwing', () => {
    component.sortable = true;
    component.sortKey = 'name';
    component.sortDirection = 'ascending';
    expect(() => component.render()).not.toThrow();
  });

  it('renders with sortDirection descending without throwing', () => {
    component.sortable = true;
    component.sortKey = 'name';
    component.sortDirection = 'descending';
    expect(() => component.render()).not.toThrow();
  });
});

describe('io-table-head-cell — sort direction cycling', () => {
  let component: IoTableHeadCell;
  let emitMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoTableHeadCell();
    emitMock = vi.fn();
    (component as any).sort = { emit: emitMock };
    component.sortable = true;
    component.sortKey = 'name';
  });

  it('emits ascending direction when current is none', () => {
    component.sortDirection = 'none';
    (component as any).handleSort();
    expect(emitMock).toHaveBeenCalledWith({ key: 'name', direction: 'ascending' });
  });

  it('emits descending direction when current is ascending', () => {
    component.sortDirection = 'ascending';
    (component as any).handleSort();
    expect(emitMock).toHaveBeenCalledWith({ key: 'name', direction: 'descending' });
  });

  it('emits none direction when current is descending (3-way cycle)', () => {
    component.sortDirection = 'descending';
    (component as any).handleSort();
    expect(emitMock).toHaveBeenCalledWith({ key: 'name', direction: 'none' });
  });
});
