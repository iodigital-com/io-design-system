import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoTable } from './io-table';

const SAMPLE_COLUMNS = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role', sortable: true },
];

const SAMPLE_ROWS = [
  { name: 'Alice', role: 'Admin' },
  { name: 'Bob', role: 'Editor' },
  { name: 'Charlie', role: 'Viewer' },
];

describe('io-table — default props', () => {
  let component: IoTable;

  beforeEach(() => {
    component = new IoTable();
    (component as any).sort = { emit: vi.fn() };
    (component as any).rowSelect = { emit: vi.fn() };
  });

  it('has empty caption by default', () => {
    expect(component.caption).toBe('');
  });

  it('has captionHidden false by default', () => {
    expect(component.captionHidden).toBe(false);
  });

  it('has sortable false by default', () => {
    expect(component.sortable).toBe(false);
  });

  it('has selectable false by default', () => {
    expect(component.selectable).toBe(false);
  });

  it('has sticky false by default', () => {
    expect(component.sticky).toBe(false);
  });

  it('has empty rows by default', () => {
    expect(component.rows).toEqual([]);
  });

  it('has empty columns by default', () => {
    expect(component.columns).toEqual([]);
  });

  it('has empty sortKey by default', () => {
    expect(component.sortKey).toBe('');
  });

  it('has sortDirection none by default', () => {
    expect(component.sortDirection).toBe('none');
  });

  it('has size md by default', () => {
    expect(component.size).toBe('md');
  });
});

describe('io-table — render', () => {
  let component: IoTable;

  beforeEach(() => {
    component = new IoTable();
    (component as any).sort = { emit: vi.fn() };
    (component as any).rowSelect = { emit: vi.fn() };
  });

  it('renders without throwing', () => {
    expect(() => component.render()).not.toThrow();
  });

  it('renders with caption without throwing', () => {
    component.caption = 'Test Table';
    expect(() => component.render()).not.toThrow();
  });

  it('renders with columns and rows without throwing', () => {
    component.columns = SAMPLE_COLUMNS;
    component.rows = SAMPLE_ROWS;
    expect(() => component.render()).not.toThrow();
  });

  it('renders with sortable prop without throwing', () => {
    component.sortable = true;
    component.columns = SAMPLE_COLUMNS;
    component.rows = SAMPLE_ROWS;
    expect(() => component.render()).not.toThrow();
  });

  it('renders with selectable prop without throwing', () => {
    component.selectable = true;
    component.columns = SAMPLE_COLUMNS;
    component.rows = SAMPLE_ROWS;
    expect(() => component.render()).not.toThrow();
  });

  it('renders with captionHidden prop without throwing', () => {
    component.caption = 'Hidden Caption';
    component.captionHidden = true;
    expect(() => component.render()).not.toThrow();
  });
});

describe('io-table — sort handling', () => {
  let component: IoTable;
  let emitMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoTable();
    emitMock = vi.fn();
    (component as any).sort = { emit: emitMock };
    (component as any).rowSelect = { emit: vi.fn() };
    component.sortable = true;
    component.columns = SAMPLE_COLUMNS;
    component.rows = SAMPLE_ROWS;
  });

  it('emits sort with ascending direction on first click', () => {
    (component as any).handleSort('role');
    expect(emitMock).toHaveBeenCalledOnce();
    expect(emitMock).toHaveBeenCalledWith({ key: 'role', direction: 'ascending' });
  });

  it('toggles to descending when same column is sorted again', () => {
    component.sortKey = 'role';
    component.sortDirection = 'ascending';
    (component as any).handleSort('role');
    expect(emitMock).toHaveBeenCalledWith({ key: 'role', direction: 'descending' });
  });

  it('toggles back to ascending on third click', () => {
    component.sortKey = 'role';
    component.sortDirection = 'descending';
    (component as any).handleSort('role');
    expect(emitMock).toHaveBeenCalledWith({ key: 'role', direction: 'ascending' });
  });

  it('starts ascending when switching to a different column', () => {
    component.sortKey = 'name';
    component.sortDirection = 'descending';
    (component as any).handleSort('role');
    expect(emitMock).toHaveBeenCalledWith({ key: 'role', direction: 'ascending' });
  });

  it('handles Enter key to trigger sort', () => {
    const ev = new KeyboardEvent('keydown', { key: 'Enter' });
    const preventDefaultSpy = vi.spyOn(ev, 'preventDefault');
    (component as any).handleSortKeyDown('role', ev);
    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(emitMock).toHaveBeenCalledOnce();
  });

  it('handles Space key to trigger sort', () => {
    const ev = new KeyboardEvent('keydown', { key: ' ' });
    const preventDefaultSpy = vi.spyOn(ev, 'preventDefault');
    (component as any).handleSortKeyDown('role', ev);
    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(emitMock).toHaveBeenCalledOnce();
  });

  it('does not trigger sort on other key presses', () => {
    const ev = new KeyboardEvent('keydown', { key: 'Tab' });
    (component as any).handleSortKeyDown('role', ev);
    expect(emitMock).not.toHaveBeenCalled();
  });
});

describe('io-table — row selection', () => {
  let component: IoTable;
  let emitMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoTable();
    emitMock = vi.fn();
    (component as any).sort = { emit: vi.fn() };
    (component as any).rowSelect = { emit: emitMock };
    component.selectable = true;
    component.columns = SAMPLE_COLUMNS;
    component.rows = SAMPLE_ROWS;
  });

  it('emits rowSelect with selected row on individual row check', () => {
    const ev = { target: { checked: true } } as unknown as Event;
    (component as any).handleSelectRow(0, ev);
    expect(emitMock).toHaveBeenCalledOnce();
    expect(emitMock).toHaveBeenCalledWith({ selectedRows: [SAMPLE_ROWS[0]] });
  });

  it('emits rowSelect with empty array when row is unchecked', () => {
    // First select row 0
    (component as any).selectedRows = new Set([0]);
    const ev = { target: { checked: false } } as unknown as Event;
    (component as any).handleSelectRow(0, ev);
    expect(emitMock).toHaveBeenCalledWith({ selectedRows: [] });
  });

  it('selects all rows when select-all is checked', () => {
    const ev = { target: { checked: true } } as unknown as Event;
    (component as any).handleSelectAll(ev);
    expect(emitMock).toHaveBeenCalledWith({ selectedRows: SAMPLE_ROWS });
  });

  it('deselects all rows when select-all is unchecked', () => {
    (component as any).selectedRows = new Set([0, 1, 2]);
    const ev = { target: { checked: false } } as unknown as Event;
    (component as any).handleSelectAll(ev);
    expect(emitMock).toHaveBeenCalledWith({ selectedRows: [] });
  });

  it('resets selected rows when rows prop changes', () => {
    (component as any).selectedRows = new Set([0, 1]);
    (component as any).onRowsChange();
    expect((component as any).selectedRows.size).toBe(0);
  });
});
