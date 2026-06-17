import { describe, it, expect, beforeEach, vi } from 'vitest';

import { IoBreadcrumb } from './io-breadcrumb';
import { h } from '@stencil/core';

describe('io-breadcrumb — default props and structure', () => {
  let c: IoBreadcrumb;

  beforeEach(() => {
    c = new IoBreadcrumb();
  });

  it('can be instantiated', () => {
    expect(c).toBeInstanceOf(IoBreadcrumb);
  });

  it('label defaults to "Breadcrumb"', () => {
    expect(c.label).toBe('Breadcrumb');
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
  it('accepts a custom label string', () => {
    const c = new IoBreadcrumb();
    (c as any).label = 'Brotkrümel';
    expect(c.label).toBe('Brotkrümel');
  });

  it('render() does not throw with custom label', () => {
    const c = new IoBreadcrumb();
    (c as any).el = document.createElement('io-breadcrumb');
    (c as any).label = 'Fil d\'Ariane';
    expect(() => (c as any).render()).not.toThrow();
  });

  it('label prop is bound to nav aria-label in vnode (default)', () => {
    const hMock = h as unknown as { mock: { calls: unknown[][] } };
    vi.clearAllMocks();
    const c = new IoBreadcrumb();
    (c as any).el = document.createElement('io-breadcrumb');
    (c as any).render();
    const navCall = hMock.mock.calls.find(([tag]) => tag === 'nav');
    expect(navCall).toBeDefined();
    const attrs = navCall![1] as Record<string, unknown>;
    expect(attrs['aria-label']).toBe('Breadcrumb');
  });

  it('label prop is bound to nav aria-label in vnode (custom)', () => {
    const hMock = h as unknown as { mock: { calls: unknown[][] } };
    vi.clearAllMocks();
    const c = new IoBreadcrumb();
    (c as any).el = document.createElement('io-breadcrumb');
    c.label = 'Navigatie';
    (c as any).render();
    const navCall = hMock.mock.calls.find(([tag]) => tag === 'nav');
    expect(navCall).toBeDefined();
    const attrs = navCall![1] as Record<string, unknown>;
    expect(attrs['aria-label']).toBe('Navigatie');
  });
});
