import { describe, it, expect, beforeEach } from 'vitest';

import { IoBreadcrumb } from './io-breadcrumb';

describe('io-breadcrumb — default props', () => {
  let c: IoBreadcrumb;

  beforeEach(() => {
    c = new IoBreadcrumb();
  });

  it('items defaults to empty JSON array', () => {
    expect(c.items).toBe('[]');
  });

  it('separator defaults to chevron', () => {
    expect(c.separator).toBe('chevron');
  });

  it('maxVisible is undefined by default', () => {
    expect(c.maxVisible).toBeUndefined();
  });

  it('expanded is false by default', () => {
    expect((c as any).expanded).toBe(false);
  });
});
