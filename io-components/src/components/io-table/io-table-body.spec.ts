import { describe, it, expect, beforeEach } from 'vitest';

import { IoTableBody } from './io-table-body';

describe('io-table-body — render', () => {
  let component: IoTableBody;

  beforeEach(() => {
    component = new IoTableBody();
  });

  it('renders without throwing', () => {
    expect(() => component.render()).not.toThrow();
  });
});
