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

  it('has selectAllChecked false by default', () => {
    expect(component.selectAllChecked).toBe(false);
  });

  it('has selectAllIndeterminate false by default', () => {
    expect(component.selectAllIndeterminate).toBe(false);
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

  it('renders with selectAllChecked without throwing', () => {
    component.selectable = true;
    component.selectAllChecked = true;
    expect(() => component.render()).not.toThrow();
  });

  it('renders with selectAllIndeterminate without throwing', () => {
    component.selectable = true;
    component.selectAllIndeterminate = true;
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

  it('sets indeterminate on checkbox when selectable and indeterminate', () => {
    const component = new IoTableHeadRow();
    (component as any).selectAll = { emit: vi.fn() };
    component.selectable = true;
    component.selectAllIndeterminate = true;
    component.selectAllChecked = false;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'th--checkbox-input';

    const thCheckbox = document.createElement('th');
    thCheckbox.className = 'th--checkbox';
    thCheckbox.appendChild(checkbox);

    const tr = document.createElement('tr');
    tr.appendChild(thCheckbox);

    const el = document.createElement('io-table-head-row');
    el.appendChild(tr);

    (component as any).el = el;
    component.componentDidRender();
    expect(checkbox.indeterminate).toBe(true);
  });

  it('clears indeterminate when selectAllChecked is true', () => {
    const component = new IoTableHeadRow();
    (component as any).selectAll = { emit: vi.fn() };
    component.selectable = true;
    component.selectAllIndeterminate = true;
    component.selectAllChecked = true;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.indeterminate = true;

    const thCheckbox = document.createElement('th');
    thCheckbox.className = 'th--checkbox';
    thCheckbox.appendChild(checkbox);

    const tr = document.createElement('tr');
    tr.appendChild(thCheckbox);

    const el = document.createElement('io-table-head-row');
    el.appendChild(tr);

    (component as any).el = el;
    component.componentDidRender();
    expect(checkbox.indeterminate).toBe(false);
  });
});
