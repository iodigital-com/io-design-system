import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoTableHeadRow } from './io-table-head-row';

describe('io-table-head-row — default props', () => {
  let component: IoTableHeadRow;

  beforeEach(() => {
    component = new IoTableHeadRow();
    (component as any).selectAll = { emit: vi.fn() };
  });

  it('has selectable false by default', () => {
    expect(component.selectable).toBe(false);
  });

  it('has selectionState undefined by default', () => {
    expect(component.selectionState).toBeUndefined();
  });
});

describe('io-table-head-row — selectionState prop', () => {
  let component: IoTableHeadRow;

  beforeEach(() => {
    component = new IoTableHeadRow();
    (component as any).selectAll = { emit: vi.fn() };
  });

  it('isChecked returns true when selectionState is all', () => {
    component.selectionState = 'all';
    expect((component as any).isChecked).toBe(true);
  });

  it('isChecked returns false when selectionState is some', () => {
    component.selectionState = 'some';
    expect((component as any).isChecked).toBe(false);
  });

  it('isChecked returns false when selectionState is none', () => {
    component.selectionState = 'none';
    expect((component as any).isChecked).toBe(false);
  });

  it('isIndeterminate returns true when selectionState is some', () => {
    component.selectionState = 'some';
    expect((component as any).isIndeterminate).toBe(true);
  });

  it('isIndeterminate returns false when selectionState is all', () => {
    component.selectionState = 'all';
    expect((component as any).isIndeterminate).toBe(false);
  });

  it('isIndeterminate returns false when selectionState is none', () => {
    component.selectionState = 'none';
    expect((component as any).isIndeterminate).toBe(false);
  });

  it('renders with selectionState=some without throwing', () => {
    component.selectable = true;
    component.selectionState = 'some';
    expect(() => component.render()).not.toThrow();
  });

  it('renders with selectionState=all without throwing', () => {
    component.selectable = true;
    component.selectionState = 'all';
    expect(() => component.render()).not.toThrow();
  });
});

describe('io-table-head-row — render', () => {
  let component: IoTableHeadRow;

  beforeEach(() => {
    component = new IoTableHeadRow();
    (component as any).selectAll = { emit: vi.fn() };
  });

  it('renders without throwing', () => {
    expect(() => component.render()).not.toThrow();
  });

  it('renders with selectable prop without throwing', () => {
    component.selectable = true;
    expect(() => component.render()).not.toThrow();
  });

});

describe('io-table-head-row — componentDidRender', () => {
  it('does not throw when selectable is false', () => {
    const component = new IoTableHeadRow();
    (component as any).selectAll = { emit: vi.fn() };
    (component as any).el = document.createElement('tr');
    expect(() => component.componentDidRender()).not.toThrow();
  });

  it('is a no-op when selectable is true but no matching checkbox in DOM', () => {
    const component = new IoTableHeadRow();
    (component as any).selectAll = { emit: vi.fn() };
    component.selectable = true;
    // el has no .th--checkbox input[type="checkbox"] descendant
    (component as any).el = document.createElement('tr');
    expect(() => component.componentDidRender()).not.toThrow();
  });
});
