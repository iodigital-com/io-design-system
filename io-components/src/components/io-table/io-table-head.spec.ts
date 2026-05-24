import { describe, it, expect, beforeEach } from 'vitest';

import { IoTableHead } from './io-table-head';

describe('io-table-head — render', () => {
  let component: IoTableHead;

  beforeEach(() => {
    component = new IoTableHead();
  });

  it('renders without throwing', () => {
    expect(() => component.render()).not.toThrow();
  });
});
