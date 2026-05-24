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
