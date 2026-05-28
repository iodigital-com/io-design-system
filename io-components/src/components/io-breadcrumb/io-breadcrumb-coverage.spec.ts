import { describe, it, expect } from 'vitest';

import { IoBreadcrumb } from './io-breadcrumb';

type BreadcrumbItemEl = HTMLElement & { current: boolean };

function makeComponent(items: BreadcrumbItemEl[] = []) {
  const c = new IoBreadcrumb();
  const hostEl = document.createElement('io-breadcrumb');
  items.forEach(item => hostEl.appendChild(item));
  (c as any).el = hostEl;
  return { c, hostEl };
}

describe('io-breadcrumb — render() direct call', () => {
  it('render() does not throw', () => {
    const c = new IoBreadcrumb();
    (c as any).el = document.createElement('io-breadcrumb');
    expect(() => (c as any).render()).not.toThrow();
  });
});

describe('io-breadcrumb — handleSlotChange: auto-current', () => {
  it('sets current=true on last item when none is current', () => {
    const item1 = document.createElement('io-breadcrumb-item') as BreadcrumbItemEl;
    const item2 = document.createElement('io-breadcrumb-item') as BreadcrumbItemEl;
    item1.current = false;
    item2.current = false;
    const { c } = makeComponent([item1, item2]);

    (c as any).handleSlotChange();

    expect(item2.current).toBe(true);
    expect(item1.current).toBe(false);
  });

  it('sets current=true on a single item', () => {
    const item = document.createElement('io-breadcrumb-item') as BreadcrumbItemEl;
    item.current = false;
    const { c } = makeComponent([item]);

    (c as any).handleSlotChange();

    expect(item.current).toBe(true);
  });

  it('does not override an explicitly current item', () => {
    const item1 = document.createElement('io-breadcrumb-item') as BreadcrumbItemEl;
    const item2 = document.createElement('io-breadcrumb-item') as BreadcrumbItemEl;
    item1.current = true;
    item2.current = false;
    const { c } = makeComponent([item1, item2]);

    (c as any).handleSlotChange();

    expect(item1.current).toBe(true);
    expect(item2.current).toBe(false);
  });

  it('is a no-op when there are no items', () => {
    const { c, hostEl } = makeComponent();
    expect(() => (c as any).handleSlotChange()).not.toThrow();
    expect(hostEl.children).toHaveLength(0);
  });

  it('calling handleSlotChange twice does not change final current state', () => {
    const item1 = document.createElement('io-breadcrumb-item') as BreadcrumbItemEl;
    const item2 = document.createElement('io-breadcrumb-item') as BreadcrumbItemEl;
    item1.current = false;
    item2.current = false;
    const { c } = makeComponent([item1, item2]);

    (c as any).handleSlotChange();
    (c as any).handleSlotChange();

    expect(item2.current).toBe(true);
    expect(item1.current).toBe(false);
  });
});
