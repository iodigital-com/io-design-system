/**
 * io-button — aria prop tests
 *
 * Verifies that the `aria?: Record<string, string>` prop correctly injects
 * ARIA attributes onto the inner <button> or <a> trigger element.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { applyAriaProp } from '../../utils/aria-prop';

import { IoButton } from './io-button';

vi.mock('../../utils/aria-prop', () => ({
  applyAriaProp: vi.fn(),
}));

describe('io-button — aria prop', () => {
  let component: IoButton;

  beforeEach(() => {
    vi.clearAllMocks();
    component = new IoButton();
    (component as any).el = document.createElement('io-button');
    (component as any).click = { emit: vi.fn() };
  });

  it('aria prop is undefined by default', () => {
    expect(component.aria).toBeUndefined();
  });

  it('accepts a custom aria record', () => {
    component.aria = { controls: 'panel-id', haspopup: 'dialog' };
    expect(component.aria).toEqual({ controls: 'panel-id', haspopup: 'dialog' });
  });

  it('calls applyAriaProp when aria watch fires', () => {
    const mockEl = document.createElement('button');
    (component as any).btnEl = mockEl;
    component.aria = { expanded: 'true' };

    (component as any).onAriaChange();

    expect(applyAriaProp).toHaveBeenCalledWith(
      { expanded: 'true' },
      mockEl,
    );
  });

  it('calls applyAriaProp with null when btnEl is not set', () => {
    (component as any).btnEl = undefined;
    component.aria = { expanded: 'false' };

    (component as any).onAriaChange();

    expect(applyAriaProp).toHaveBeenCalledWith({ expanded: 'false' }, null);
  });
});
