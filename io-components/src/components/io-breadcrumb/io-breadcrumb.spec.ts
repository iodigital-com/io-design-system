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

// ── maxItems / collapse (#836) ────────────────────────────────────────────────

describe('io-breadcrumb — maxItems collapse (#836)', () => {
  function makeItems(count: number): HTMLElement[] {
    return Array.from({ length: count }, (_, i) => {
      const el = document.createElement('io-breadcrumb-item');
      el.textContent = `Item ${i}`;
      return el;
    });
  }

  it('hides intermediate items when collapsed and itemCount > maxItems', () => {
    const c = new IoBreadcrumb();
    const hostEl = document.createElement('io-breadcrumb');
    (c as any).el = hostEl;
    c.maxItems = 3;
    (c as any).collapsed = true;

    const items = makeItems(5);
    items.forEach(item => hostEl.appendChild(item));

    (c as any).applyVisibility();

    // Items 1 and 2 (indices 1..2) should be visually hidden via class (5 items, maxItems=3, showLastCount=2, hideStart=1, hideEnd=3)
    expect(items[0].classList.contains('breadcrumb-item--hidden')).toBe(false);
    expect(items[1].classList.contains('breadcrumb-item--hidden')).toBe(true);
    expect(items[2].classList.contains('breadcrumb-item--hidden')).toBe(true);
    expect(items[3].classList.contains('breadcrumb-item--hidden')).toBe(false);
    expect(items[4].classList.contains('breadcrumb-item--hidden')).toBe(false);
  });

  it('shows all items when not collapsed', () => {
    const c = new IoBreadcrumb();
    const hostEl = document.createElement('io-breadcrumb');
    (c as any).el = hostEl;
    c.maxItems = 3;
    (c as any).collapsed = false;

    const items = makeItems(5);
    items.forEach(item => hostEl.appendChild(item));

    // Pre-hide some items
    items[1].classList.add('breadcrumb-item--hidden');
    items[2].classList.add('breadcrumb-item--hidden');

    (c as any).applyVisibility();

    items.forEach(item => expect(item.classList.contains('breadcrumb-item--hidden')).toBe(false));
  });

  it('shows all items when maxItems not set', () => {
    const c = new IoBreadcrumb();
    const hostEl = document.createElement('io-breadcrumb');
    (c as any).el = hostEl;
    (c as any).collapsed = true;

    const items = makeItems(5);
    items.forEach(item => hostEl.appendChild(item));

    (c as any).applyVisibility();

    items.forEach(item => expect(item.classList.contains('breadcrumb-item--hidden')).toBe(false));
  });

  it('handleExpand sets collapsed to false', () => {
    const c = new IoBreadcrumb();
    (c as any).el = document.createElement('io-breadcrumb');
    (c as any).collapsed = true;

    (c as any).handleExpand();

    expect((c as any).collapsed).toBe(false);
  });
});
