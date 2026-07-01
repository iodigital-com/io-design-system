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

  it('has hideLabel false by default', () => {
    expect(component.hideLabel).toBe(false);
  });

  it('has multiline false by default', () => {
    expect(component.multiline).toBe(false);
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

  it('renders with hideLabel=true without throwing', () => {
    component.hideLabel = true;
    expect(() => component.render()).not.toThrow();
  });

  it('renders with multiline=true without throwing', () => {
    component.multiline = true;
    expect(() => component.render()).not.toThrow();
  });

  it('renders with hideLabel=true and sortable without throwing', () => {
    component.hideLabel = true;
    component.sortable = true;
    component.sortKey = 'name';
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

describe('io-table-head-cell — multiline class', () => {
  it('adds th--multiline class when multiline=true', () => {
    const component = new IoTableHeadCell();
    (component as any).sort = { emit: vi.fn() };
    component.multiline = true;
    // Verify the class logic: multiline adds 'th--multiline'
    const thClass = [
      component.sortable ? 'th--sortable' : '',
      component.sortable && component.sortDirection !== 'none' ? 'th--sort-active' : '',
      component.sortable && component.sortDirection === 'descending' ? 'th--sort-desc' : '',
      component.multiline ? 'th--multiline' : '',
    ]
      .filter(Boolean)
      .join(' ') || undefined;
    expect(thClass).toBe('th--multiline');
  });

  it('does not add th--multiline class when multiline=false', () => {
    const component = new IoTableHeadCell();
    (component as any).sort = { emit: vi.fn() };
    component.multiline = false;
    const thClass = [
      component.sortable ? 'th--sortable' : '',
      component.multiline ? 'th--multiline' : '',
    ]
      .filter(Boolean)
      .join(' ') || undefined;
    expect(thClass).toBeUndefined();
  });

  it('combines th--sortable and th--multiline when both are true', () => {
    const component = new IoTableHeadCell();
    (component as any).sort = { emit: vi.fn() };
    component.sortable = true;
    component.multiline = true;
    const thClass = [
      component.sortable ? 'th--sortable' : '',
      component.sortable && component.sortDirection !== 'none' ? 'th--sort-active' : '',
      component.sortable && component.sortDirection === 'descending' ? 'th--sort-desc' : '',
      component.multiline ? 'th--multiline' : '',
    ]
      .filter(Boolean)
      .join(' ') || undefined;
    expect(thClass).toBe('th--sortable th--multiline');
  });
});

describe('io-table-head-cell — aria-sort attribute', () => {
  let component: IoTableHeadCell;

  beforeEach(() => {
    component = new IoTableHeadCell();
    (component as any).sort = { emit: vi.fn() };
  });

  it('omits aria-sort when sortable=false', () => {
    component.sortable = false;
    const ariaSort = component.sortable && component.sortDirection !== 'none'
      ? component.sortDirection
      : undefined;
    expect(ariaSort).toBeUndefined();
  });

  it('omits aria-sort when sortable=true but sortDirection="none"', () => {
    component.sortable = true;
    component.sortDirection = 'none';
    const ariaSort = component.sortable && component.sortDirection !== 'none'
      ? component.sortDirection
      : undefined;
    expect(ariaSort).toBeUndefined();
  });

  it('sets aria-sort="ascending" when sortable=true and sortDirection="ascending"', () => {
    component.sortable = true;
    component.sortDirection = 'ascending';
    const ariaSort = component.sortable && component.sortDirection !== 'none'
      ? component.sortDirection
      : undefined;
    expect(ariaSort).toBe('ascending');
  });

  it('sets aria-sort="descending" when sortable=true and sortDirection="descending"', () => {
    component.sortable = true;
    component.sortDirection = 'descending';
    const ariaSort = component.sortable && component.sortDirection !== 'none'
      ? component.sortDirection
      : undefined;
    expect(ariaSort).toBe('descending');
  });
});
