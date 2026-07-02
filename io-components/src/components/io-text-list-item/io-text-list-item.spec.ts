import { describe, it, expect, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoTextListItem } from './io-text-list-item';

describe('io-text-list-item — render', () => {
  it('renders without throwing', () => {
    const component = new IoTextListItem();
    expect(() => component.render()).not.toThrow();
  });

  it('Host call carries role="listitem"', () => {
    const hMock = vi.mocked(h);
    hMock.mockClear();
    const component = new IoTextListItem();
    component.render();
    // Host is not a string — find the non-string tag call that has role="listitem"
    const hostCall = hMock.mock.calls.find(
      ([tag, attrs]: [unknown, unknown]) =>
        typeof tag !== 'string' &&
        attrs &&
        typeof attrs === 'object' &&
        (attrs as Record<string, unknown>)['role'] === 'listitem',
    );
    expect(hostCall).toBeDefined();
  });

  it('renders a slot element', () => {
    const hMock = vi.mocked(h);
    hMock.mockClear();
    const component = new IoTextListItem();
    component.render();
    const slotCall = hMock.mock.calls.find(([tag]: [unknown]) => tag === 'slot');
    expect(slotCall).toBeDefined();
  });
});
