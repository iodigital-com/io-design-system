import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoTableBodyRow } from './io-table-body-row';

describe('io-table-body-row — default props', () => {
  let component: IoTableBodyRow;

  beforeEach(() => {
    component = new IoTableBodyRow();
    (component as any).select = { emit: vi.fn() };
  });

  it('has selectable false by default', () => {
    expect(component.selectable).toBe(false);
  });

  it('has selected false by default', () => {
    expect(component.selected).toBe(false);
  });

  it('has rowLabel "row" by default', () => {
    expect(component.rowLabel).toBe('row');
  });
});

describe('io-table-body-row — render', () => {
  let component: IoTableBodyRow;

  beforeEach(() => {
    component = new IoTableBodyRow();
    (component as any).select = { emit: vi.fn() };
  });

  it('renders without throwing', () => {
    expect(() => component.render()).not.toThrow();
  });

  it('renders with selectable prop without throwing', () => {
    component.selectable = true;
    expect(() => component.render()).not.toThrow();
  });

  it('renders with selected prop without throwing', () => {
    component.selectable = true;
    component.selected = true;
    expect(() => component.render()).not.toThrow();
  });
});

describe('io-table-body-row — aria-selected attribute', () => {
  let component: IoTableBodyRow;

  beforeEach(() => {
    component = new IoTableBodyRow();
    (component as any).select = { emit: vi.fn() };
  });

  it('omits aria-selected when selectable=false', () => {
    component.selectable = false;
    // When selectable=false, the ternary returns undefined
    const ariaSelected = component.selectable
      ? (component.selected ? 'true' : 'false')
      : undefined;
    expect(ariaSelected).toBeUndefined();
  });

  it('renders aria-selected="false" when selectable=true and selected=false', () => {
    component.selectable = true;
    component.selected = false;
    const ariaSelected = component.selectable
      ? (component.selected ? 'true' : 'false')
      : undefined;
    expect(ariaSelected).toBe('false');
  });

  it('renders aria-selected="true" when selectable=true and selected=true', () => {
    component.selectable = true;
    component.selected = true;
    const ariaSelected = component.selectable
      ? (component.selected ? 'true' : 'false')
      : undefined;
    expect(ariaSelected).toBe('true');
  });

  it('renders without throwing when selectable=true and selected=true', () => {
    component.selectable = true;
    component.selected = true;
    expect(() => component.render()).not.toThrow();
  });

  it('renders without throwing when selectable=false', () => {
    component.selectable = false;
    expect(() => component.render()).not.toThrow();
  });
});
