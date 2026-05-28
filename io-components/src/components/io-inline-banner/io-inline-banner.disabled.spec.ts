import { describe, it, expect } from 'vitest';

import { IoInlineBanner } from './io-inline-banner';

/**
 * io-inline-banner is a passive display component — no disabled state,
 * no open/close toggle. Consumer controls visibility by mounting/unmounting.
 */
describe('io-inline-banner — no disabled state', () => {
  it('has no disabled prop', () => {
    const c = new IoInlineBanner();
    expect((c as any).disabled).toBeUndefined();
  });

  it('has no open prop', () => {
    const c = new IoInlineBanner();
    expect((c as any).open).toBeUndefined();
  });
});
