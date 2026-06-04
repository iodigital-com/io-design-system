/**
 * io-input — aria prop tests
 *
 * Verifies that the `aria?: Record<string, string>` prop correctly injects
 * ARIA attributes onto the native <input> element.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { applyAriaProp } from '../../utils/aria-prop';

import { IoInput } from './io-input';

vi.mock('../../utils/aria-prop', () => ({
  applyAriaProp: vi.fn(),
}));

describe('io-input — aria prop', () => {
  let component: IoInput;

  beforeEach(() => {
    vi.clearAllMocks();
    component = new IoInput();
    (component as any).el = document.createElement('io-input');
    (component as any).internals = {
      setFormValue: vi.fn(),
      setValidity: vi.fn(),
    };
    (component as any).input = { emit: vi.fn() };
    (component as any).change = { emit: vi.fn() };
    (component as any).focus = { emit: vi.fn() };
    (component as any).blur = { emit: vi.fn() };
  });

  it('aria prop is undefined by default', () => {
    expect(component.aria).toBeUndefined();
  });

  it('accepts a custom aria record', () => {
    component.aria = { controls: 'suggestions', autocomplete: 'list' };
    expect(component.aria).toEqual({ controls: 'suggestions', autocomplete: 'list' });
  });

  it('calls applyAriaProp when aria watch fires', () => {
    const mockInput = document.createElement('input');
    (component as any).nativeInputEl = mockInput;
    component.aria = { controls: 'combobox-list' };

    (component as any).onAriaChange();

    expect(applyAriaProp).toHaveBeenCalledWith(
      { controls: 'combobox-list' },
      mockInput,
    );
  });

  it('calls applyAriaProp with null when nativeInputEl is not set', () => {
    (component as any).nativeInputEl = undefined;
    component.aria = { controls: 'combobox-list' };

    (component as any).onAriaChange();

    expect(applyAriaProp).toHaveBeenCalledWith({ controls: 'combobox-list' }, null);
  });
});
