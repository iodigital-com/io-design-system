import { describe, it, expect, beforeEach } from 'vitest';

import { IoBreadcrumb } from './io-breadcrumb';

function makeComponent() {
  const c = new IoBreadcrumb();
  const ol = document.createElement('ol');
  const shadow = { querySelector: (sel: string) => (sel === 'ol' ? ol : null) };
  (c as any).el = { shadowRoot: shadow };
  return { c, ol };
}

describe('io-breadcrumb — render() direct call', () => {
  it('render() does not throw', () => {
    const c = new IoBreadcrumb();
    (c as any).el = document.createElement('io-breadcrumb');
    expect(() => (c as any).render()).not.toThrow();
  });
});

describe('io-breadcrumb — handleSlotChange via component', () => {
  let c: IoBreadcrumb;
  let ol: HTMLOListElement;

  beforeEach(() => {
    ({ c, ol } = makeComponent());
  });

  it('handleSlotChange inserts separators between items', () => {
    const item1 = document.createElement('io-breadcrumb-item') as HTMLElement & { current: boolean };
    const item2 = document.createElement('io-breadcrumb-item') as HTMLElement & { current: boolean };
    const item3 = document.createElement('io-breadcrumb-item') as HTMLElement & { current: boolean };
    item1.current = false;
    item2.current = false;
    item3.current = false;
    ol.appendChild(item1);
    ol.appendChild(item2);
    ol.appendChild(item3);

    (c as any).handleSlotChange();

    expect(ol.querySelectorAll('.breadcrumb__separator')).toHaveLength(2);
  });

  it('handleSlotChange inserts no separator for a single item', () => {
    const item = document.createElement('io-breadcrumb-item') as HTMLElement & { current: boolean };
    item.current = false;
    ol.appendChild(item);

    (c as any).handleSlotChange();

    expect(ol.querySelectorAll('.breadcrumb__separator')).toHaveLength(0);
  });

  it('handleSlotChange sets current=true on last item when none is current', () => {
    const item1 = document.createElement('io-breadcrumb-item') as HTMLElement & { current: boolean };
    const item2 = document.createElement('io-breadcrumb-item') as HTMLElement & { current: boolean };
    item1.current = false;
    item2.current = false;
    ol.appendChild(item1);
    ol.appendChild(item2);

    (c as any).handleSlotChange();

    expect(item2.current).toBe(true);
    expect(item1.current).toBe(false);
  });

  it('handleSlotChange does not override an explicitly current item', () => {
    const item1 = document.createElement('io-breadcrumb-item') as HTMLElement & { current: boolean };
    const item2 = document.createElement('io-breadcrumb-item') as HTMLElement & { current: boolean };
    item1.current = true;
    item2.current = false;
    ol.appendChild(item1);
    ol.appendChild(item2);

    (c as any).handleSlotChange();

    expect(item1.current).toBe(true);
    expect(item2.current).toBe(false);
  });

  it('handleSlotChange removes existing separators before re-inserting', () => {
    const item1 = document.createElement('io-breadcrumb-item') as HTMLElement & { current: boolean };
    const item2 = document.createElement('io-breadcrumb-item') as HTMLElement & { current: boolean };
    item1.current = false;
    item2.current = false;
    ol.appendChild(item1);
    ol.appendChild(item2);

    (c as any).handleSlotChange();
    (c as any).handleSlotChange();

    expect(ol.querySelectorAll('.breadcrumb__separator')).toHaveLength(1);
  });

  it('separators have aria-hidden="true"', () => {
    const item1 = document.createElement('io-breadcrumb-item') as HTMLElement & { current: boolean };
    const item2 = document.createElement('io-breadcrumb-item') as HTMLElement & { current: boolean };
    item1.current = false;
    item2.current = false;
    ol.appendChild(item1);
    ol.appendChild(item2);

    (c as any).handleSlotChange();

    const sep = ol.querySelector('.breadcrumb__separator');
    expect(sep?.getAttribute('aria-hidden')).toBe('true');
  });

  it('handleSlotChange is a no-op when shadowRoot has no ol', () => {
    const c2 = new IoBreadcrumb();
    (c2 as any).el = { shadowRoot: { querySelector: () => null } };
    expect(() => (c2 as any).handleSlotChange()).not.toThrow();
  });

  it('handleSlotChange handles zero items gracefully', () => {
    (c as any).handleSlotChange();
    expect(ol.querySelectorAll('.breadcrumb__separator')).toHaveLength(0);
  });
});
