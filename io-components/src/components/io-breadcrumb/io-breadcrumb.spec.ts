import { describe, it, expect, beforeEach } from 'vitest';

import { IoBreadcrumb } from './io-breadcrumb';

describe('io-breadcrumb — default props and structure', () => {
  let c: IoBreadcrumb;

  beforeEach(() => {
    c = new IoBreadcrumb();
  });

  it('can be instantiated', () => {
    expect(c).toBeInstanceOf(IoBreadcrumb);
  });

  it('has no items prop', () => {
    expect((c as any).items).toBeUndefined();
  });

  it('has no separator prop', () => {
    expect((c as any).separator).toBeUndefined();
  });

  it('has no maxVisible prop', () => {
    expect((c as any).maxVisible).toBeUndefined();
  });
});

describe('io-breadcrumb — label prop', () => {
  let c: IoBreadcrumb;

  beforeEach(() => {
    c = new IoBreadcrumb();
  });

  it('defaults label to "Breadcrumb"', () => {
    expect(c.label).toBe('Breadcrumb');
  });

  it('accepts a custom label', () => {
    c.label = 'Navigatie';
    expect(c.label).toBe('Navigatie');
  });

  it('render does not throw with default label', () => {
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render does not throw with custom label', () => {
    c.label = 'Breadcrumb navigation';
    expect(() => (c as any).render()).not.toThrow();
  });
});
