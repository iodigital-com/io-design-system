import { describe, it, expect, beforeEach } from 'vitest';

import { IoBreadcrumb } from './io-breadcrumb';
import { getBreadcrumbStyles } from './io-breadcrumb-styles';

// ── Style string tests ────────────────────────────────────────────────────────

describe('io-breadcrumb — RTL styles', () => {
  it('includes :host-context([dir="rtl"]) selector', () => {
    const styles = getBreadcrumbStyles();
    expect(styles).toContain(':host-context([dir="rtl"])');
  });

  it('flips separator via scaleX(-1) in RTL context', () => {
    const styles = getBreadcrumbStyles();
    const separatorRule = styles
      .split(':host-context([dir="rtl"]) .breadcrumb__separator')[1];
    expect(separatorRule).toBeDefined();
    expect(separatorRule).toContain('transform: scaleX(-1)');
  });

  it('sets direction: inherit on the ol element in RTL context — avoids breaking nested LTR resets', () => {
    const styles = getBreadcrumbStyles();
    expect(styles).toContain(':host-context([dir="rtl"]) ol');
    const olRule = styles.split(':host-context([dir="rtl"]) ol')[1];
    // direction: inherit propagates from the :host-context ancestor; hardcoding rtl would break nested LTR resets
    expect(olRule).toContain('direction: inherit');
  });
});

// ── Component render tests ────────────────────────────────────────────────────

describe('io-breadcrumb — RTL render', () => {
  let c: IoBreadcrumb;

  beforeEach(() => {
    c = new IoBreadcrumb();
    (c as any).el = document.createElement('io-breadcrumb');
  });

  it('renders without throwing in RTL context', () => {
    (c as any).el.setAttribute('dir', 'rtl');
    expect(() => (c as any).render()).not.toThrow();
  });

  it('handleSlotChange works correctly in RTL — sets current on last item', () => {
    const ol = document.createElement('ol');
    const shadow = { querySelector: (sel: string) => (sel === 'ol' ? ol : null) };
    (c as any).el = { shadowRoot: shadow };

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

  it('handleSlotChange inserts correct number of separators in RTL', () => {
    const ol = document.createElement('ol');
    const shadow = { querySelector: (sel: string) => (sel === 'ol' ? ol : null) };
    (c as any).el = { shadowRoot: shadow };

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

    // Always 2 separators between 3 items regardless of direction
    expect(ol.querySelectorAll('.breadcrumb__separator')).toHaveLength(2);
  });
});
