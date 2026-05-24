import { describe, it, expect, beforeEach } from 'vitest';

import { IoTableBodyCell } from './io-table-body-cell';

describe('io-table-body-cell — default props', () => {
  let component: IoTableBodyCell;

  beforeEach(() => {
    component = new IoTableBodyCell();
  });

  it('has no colspan by default', () => {
    expect(component.colspan).toBeUndefined();
  });

  it('has no rowspan by default', () => {
    expect(component.rowspan).toBeUndefined();
  });
});

describe('io-table-body-cell — render', () => {
  let component: IoTableBodyCell;

  beforeEach(() => {
    component = new IoTableBodyCell();
  });

  it('renders without throwing', () => {
    expect(() => component.render()).not.toThrow();
  });

  it('renders with colspan without throwing', () => {
    component.colspan = 2;
    expect(() => component.render()).not.toThrow();
  });

  it('renders with rowspan without throwing', () => {
    component.rowspan = 3;
    expect(() => component.render()).not.toThrow();
  });
});
