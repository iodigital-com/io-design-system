import { describe, it, expect, beforeEach } from 'vitest';

import { IoBreadcrumb } from './io-breadcrumb';
import { getBreadcrumbStyles } from './io-breadcrumb-styles';
import { getBreadcrumbItemStyles } from './io-breadcrumb-item/io-breadcrumb-item-styles';

// ── Style string tests ────────────────────────────────────────────────────────

describe('io-breadcrumb — RTL styles', () => {
  it('includes :host-context([dir="rtl"]) selector', () => {
    const styles = getBreadcrumbStyles();
    expect(styles).toContain(':host-context([dir="rtl"])');
  });

  it('sets direction: inherit on the ol element in RTL context', () => {
    const styles = getBreadcrumbStyles();
    expect(styles).toContain(':host-context([dir="rtl"]) ol');
    const olRule = styles.split(':host-context([dir="rtl"]) ol')[1];
    expect(olRule).toContain('direction: inherit');
  });

  it('separator flip (scaleX(-1)) lives in io-breadcrumb-item styles, not io-breadcrumb styles', () => {
    const breadcrumbStyles = getBreadcrumbStyles();
    const itemStyles = getBreadcrumbItemStyles();
    expect(breadcrumbStyles).not.toContain('scaleX(-1)');
    expect(itemStyles).toContain('scaleX(-1)');
  });

  it('io-breadcrumb-item styles include :host-context([dir="rtl"]) separator rule', () => {
    const styles = getBreadcrumbItemStyles();
    expect(styles).toContain(':host-context([dir="rtl"]) .breadcrumb__separator');
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

  it('handleSlotChange sets current on last item in RTL', () => {
    const hostEl = document.createElement('io-breadcrumb');
    (c as any).el = hostEl;
    const item1 = document.createElement('io-breadcrumb-item') as HTMLElement & { current: boolean };
    const item2 = document.createElement('io-breadcrumb-item') as HTMLElement & { current: boolean };
    item1.current = false;
    item2.current = false;
    hostEl.appendChild(item1);
    hostEl.appendChild(item2);

    (c as any).handleSlotChange();

    expect(item2.current).toBe(true);
    expect(item1.current).toBe(false);
  });
});
