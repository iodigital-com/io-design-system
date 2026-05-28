import { describe, it, expect, vi, beforeEach } from 'vitest';
import { h } from '@stencil/core';

import { IoInlineBanner } from './io-inline-banner';

const hMock = h as unknown as ReturnType<typeof vi.fn>;

function makeEmitter() {
  return { emit: vi.fn() };
}

describe('io-inline-banner — dismiss interaction', () => {
  let c: IoInlineBanner;

  beforeEach(() => {
    c = new IoInlineBanner();
    c.variant = 'info';
    (c as any).dismiss = makeEmitter();
  });

  it('emits dismiss event when handleDismiss is called', () => {
    (c as any).handleDismiss();
    expect((c as any).dismiss.emit).toHaveBeenCalledTimes(1);
  });

  it('does not auto-close — consumer controls visibility', () => {
    // io-inline-banner has no open prop; dismiss only emits an event
    (c as any).handleDismiss();
    expect((c as any).open).toBeUndefined();
  });

  it('renders dismiss button when dismissible=true', () => {
    c.dismissible = true;
    expect(() => (c as any).render()).not.toThrow();
  });

  it('does not render dismiss button when dismissible=false', () => {
    c.dismissible = false;
    hMock.mockClear();
    (c as any).render();
    const buttonCall = hMock.mock.calls.find(([tag]: [unknown]) => tag === 'button');
    expect(buttonCall).toBeUndefined();
  });
});
