import { describe, it, expect, vi, beforeEach } from 'vitest';
import { h } from '@stencil/core';

import { IoBanner } from './io-banner';

const hMock = h as unknown as ReturnType<typeof vi.fn>;

function makeEmitter() {
  return { emit: vi.fn() };
}

describe('io-banner — dismiss interaction', () => {
  let c: IoBanner;

  beforeEach(() => {
    c = new IoBanner();
    c.variant = 'info';
    c.open = true;
    (c as any).dismiss = makeEmitter();
  });

  it('emits dismiss event when handleDismiss is called', () => {
    (c as any).handleDismiss();
    expect((c as any).dismiss.emit).toHaveBeenCalledTimes(1);
  });

  it('sets open to false when handleDismiss is called', () => {
    (c as any).handleDismiss();
    expect(c.open).toBe(false);
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
