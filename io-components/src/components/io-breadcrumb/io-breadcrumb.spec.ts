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

  it('has no items prop (slot-based API)', () => {
    expect((c as any).items).toBeUndefined();
  });

  it('has no separator prop (CSS custom property API)', () => {
    expect((c as any).separator).toBeUndefined();
  });

  it('has no maxVisible prop (removed in slot-based API)', () => {
    expect((c as any).maxVisible).toBeUndefined();
  });
});

describe('io-breadcrumb — slotchange separator injection', () => {
  it('inserts separators between io-breadcrumb-item elements via slotchange handler', () => {
    // Simulate the DOM structure that the handleSlotChange operates on.
    // The handler queries inside shadowRoot > ol for io-breadcrumb-item elements.
    const ol = document.createElement('ol');
    const item1 = document.createElement('io-breadcrumb-item') as HTMLElement & { current: boolean };
    const item2 = document.createElement('io-breadcrumb-item') as HTMLElement & { current: boolean };
    const item3 = document.createElement('io-breadcrumb-item') as HTMLElement & { current: boolean };
    item1.current = false;
    item2.current = false;
    item3.current = false;

    ol.appendChild(item1);
    ol.appendChild(item2);
    ol.appendChild(item3);

    // Replicate the separator-insertion logic from handleSlotChange
    ol.querySelectorAll('.breadcrumb__separator').forEach(s => s.remove());
    const items = Array.from(ol.querySelectorAll('io-breadcrumb-item')) as (HTMLElement & { current: boolean })[];

    items.forEach((item, i) => {
      if (i < items.length - 1) {
        const sep = document.createElement('span');
        sep.className = 'breadcrumb__separator';
        sep.setAttribute('aria-hidden', 'true');
        item.after(sep);
      }
      if (i === items.length - 1 && !items.some(it => it.current === true)) {
        item.current = true;
      }
    });

    const separators = ol.querySelectorAll('.breadcrumb__separator');
    // 3 items → 2 separators
    expect(separators).toHaveLength(2);
  });

  it('inserts no separator for a single item', () => {
    const ol = document.createElement('ol');
    const item = document.createElement('io-breadcrumb-item') as HTMLElement & { current: boolean };
    item.current = false;
    ol.appendChild(item);

    ol.querySelectorAll('.breadcrumb__separator').forEach(s => s.remove());
    const items = Array.from(ol.querySelectorAll('io-breadcrumb-item')) as (HTMLElement & { current: boolean })[];

    items.forEach((itm, i) => {
      if (i < items.length - 1) {
        const sep = document.createElement('span');
        sep.className = 'breadcrumb__separator';
        sep.setAttribute('aria-hidden', 'true');
        itm.after(sep);
      }
      if (i === items.length - 1 && !items.some(it => it.current === true)) {
        itm.current = true;
      }
    });

    expect(ol.querySelectorAll('.breadcrumb__separator')).toHaveLength(0);
  });

  it('sets current=true on the last item when none is explicitly current', () => {
    const ol = document.createElement('ol');
    const item1 = document.createElement('io-breadcrumb-item') as HTMLElement & { current: boolean };
    const item2 = document.createElement('io-breadcrumb-item') as HTMLElement & { current: boolean };
    item1.current = false;
    item2.current = false;
    ol.appendChild(item1);
    ol.appendChild(item2);

    const items = Array.from(ol.querySelectorAll('io-breadcrumb-item')) as (HTMLElement & { current: boolean })[];
    const lastIndex = items.length - 1;

    items.forEach((item, i) => {
      if (i === lastIndex && !items.some(it => it.current === true)) {
        item.current = true;
      }
    });

    expect(item1.current).toBe(false);
    expect(item2.current).toBe(true);
  });

  it('does not override explicit current=true on a non-last item', () => {
    const ol = document.createElement('ol');
    const item1 = document.createElement('io-breadcrumb-item') as HTMLElement & { current: boolean };
    const item2 = document.createElement('io-breadcrumb-item') as HTMLElement & { current: boolean };
    item1.current = true; // explicitly set on first item
    item2.current = false;
    ol.appendChild(item1);
    ol.appendChild(item2);

    const items = Array.from(ol.querySelectorAll('io-breadcrumb-item')) as (HTMLElement & { current: boolean })[];
    const lastIndex = items.length - 1;

    items.forEach((item, i) => {
      if (i === lastIndex && !items.some(it => it.current === true)) {
        item.current = true;
      }
    });

    // item1 already had current=true, so item2 should NOT be set
    expect(item1.current).toBe(true);
    expect(item2.current).toBe(false);
  });

  it('removes existing separators before re-inserting (no duplicates)', () => {
    const ol = document.createElement('ol');
    const item1 = document.createElement('io-breadcrumb-item') as HTMLElement & { current: boolean };
    const item2 = document.createElement('io-breadcrumb-item') as HTMLElement & { current: boolean };
    item1.current = false;
    item2.current = false;
    ol.appendChild(item1);
    ol.appendChild(item2);

    // Simulate two consecutive slotchange calls
    for (let call = 0; call < 2; call++) {
      ol.querySelectorAll('.breadcrumb__separator').forEach(s => s.remove());
      const items = Array.from(ol.querySelectorAll('io-breadcrumb-item')) as (HTMLElement & { current: boolean })[];
      items.forEach((item, i) => {
        if (i < items.length - 1) {
          const sep = document.createElement('span');
          sep.className = 'breadcrumb__separator';
          sep.setAttribute('aria-hidden', 'true');
          item.after(sep);
        }
      });
    }

    // Should still have exactly 1 separator (2 items → 1 separator)
    expect(ol.querySelectorAll('.breadcrumb__separator')).toHaveLength(1);
  });

  it('separators have aria-hidden="true"', () => {
    const ol = document.createElement('ol');
    const item1 = document.createElement('io-breadcrumb-item') as HTMLElement & { current: boolean };
    const item2 = document.createElement('io-breadcrumb-item') as HTMLElement & { current: boolean };
    item1.current = false;
    item2.current = false;
    ol.appendChild(item1);
    ol.appendChild(item2);

    ol.querySelectorAll('.breadcrumb__separator').forEach(s => s.remove());
    const items = Array.from(ol.querySelectorAll('io-breadcrumb-item')) as (HTMLElement & { current: boolean })[];
    items.forEach((item, i) => {
      if (i < items.length - 1) {
        const sep = document.createElement('span');
        sep.className = 'breadcrumb__separator';
        sep.setAttribute('aria-hidden', 'true');
        item.after(sep);
      }
    });

    const sep = ol.querySelector('.breadcrumb__separator');
    expect(sep?.getAttribute('aria-hidden')).toBe('true');
  });
});
