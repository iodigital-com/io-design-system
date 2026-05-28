import { describe, it, expect } from 'vitest';

import { IoInlineNotification } from './io-inline-notification';

/**
 * io-inline-notification is a passive display component — no disabled state,
 * no open/close toggle. Consumer controls visibility by mounting/unmounting.
 */
describe('io-inline-notification — no disabled state', () => {
  it('has no disabled prop', () => {
    const c = new IoInlineNotification();
    expect((c as any).disabled).toBeUndefined();
  });

  it('has no open prop', () => {
    const c = new IoInlineNotification();
    expect((c as any).open).toBeUndefined();
  });
});
