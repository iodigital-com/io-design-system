import { describe, it, expect } from 'vitest';

import { IoBanner } from './io-banner';

/**
 * io-banner is a passive display component — no disabled state.
 * Visibility is controlled by the open prop.
 */
describe('io-banner — no disabled state', () => {
  it('has no disabled prop', () => {
    const c = new IoBanner();
    expect((c as any).disabled).toBeUndefined();
  });

  it('can be shown and hidden via open prop', () => {
    const c = new IoBanner();
    c.open = false;
    expect(c.open).toBe(false);
    c.open = true;
    expect(c.open).toBe(true);
  });
});
