/**
 * io-select — aria prop tests
 *
 * Verifies that the `aria?: Record<string, string>` prop correctly injects
 * ARIA attributes onto the native <select> or the combobox <button> trigger.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { applyAriaProp } from '../../utils/aria-prop';

import { IoSelect } from './io-select';

vi.mock('../../utils/aria-prop', () => ({
  applyAriaProp: vi.fn(),
}));

describe('io-select — aria prop', () => {
  let component: IoSelect;

  beforeEach(() => {
    vi.clearAllMocks();
    component = new IoSelect();
    (component as any).el = document.createElement('io-select');
    (component as any).internals = {
      setFormValue: vi.fn(),
      setValidity: vi.fn(),
    };
    (component as any).change = { emit: vi.fn() };
    (component as any).focus = { emit: vi.fn() };
    (component as any).blur = { emit: vi.fn() };
  });

  it('aria prop is undefined by default', () => {
    expect(component.aria).toBeUndefined();
  });

  it('accepts a custom aria record', () => {
    component.aria = { controls: 'description-panel' };
    expect(component.aria).toEqual({ controls: 'description-panel' });
  });

  it('calls applyAriaProp on native select when custom=false (default)', () => {
    const mockSelect = document.createElement('select');
    (component as any).nativeSelectEl = mockSelect;
    (component as any).triggerEl = undefined;
    component.custom = false;
    component.aria = { controls: 'description-panel' };

    (component as any).onAriaChange();

    expect(applyAriaProp).toHaveBeenCalledWith(
      { controls: 'description-panel' },
      mockSelect,
    );
  });

  it('calls applyAriaProp on combobox trigger when custom=true', () => {
    const mockButton = document.createElement('button');
    (component as any).triggerEl = mockButton;
    (component as any).nativeSelectEl = undefined;
    component.custom = true;
    component.aria = { haspopup: 'listbox' };

    (component as any).onAriaChange();

    expect(applyAriaProp).toHaveBeenCalledWith(
      { haspopup: 'listbox' },
      mockButton,
    );
  });

  it('calls applyAriaProp with null when neither trigger element is set', () => {
    (component as any).nativeSelectEl = undefined;
    (component as any).triggerEl = undefined;
    component.custom = false;
    component.aria = { controls: 'panel' };

    (component as any).onAriaChange();

    expect(applyAriaProp).toHaveBeenCalledWith({ controls: 'panel' }, null);
  });
});
