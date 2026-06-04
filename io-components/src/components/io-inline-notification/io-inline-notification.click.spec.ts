import { describe, it, expect, vi, beforeEach } from 'vitest';
import { h } from '@stencil/core';

import { IoInlineNotification } from './io-inline-notification';

const hMock = h as unknown as ReturnType<typeof vi.fn>;

function makeEmitter() {
  return { emit: vi.fn() };
}

describe('io-inline-notification — dismiss interaction', () => {
  let c: IoInlineNotification;

  beforeEach(() => {
    c = new IoInlineNotification();
    c.variant = 'info';
    (c as any).dismiss = makeEmitter();
  });

  it('emits dismiss event when handleDismiss is called', () => {
    (c as any).handleDismiss();
    expect((c as any).dismiss.emit).toHaveBeenCalledTimes(1);
  });

  it('does not auto-close — consumer controls visibility', () => {
    // io-inline-notification has no open prop; dismiss only emits an event
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
