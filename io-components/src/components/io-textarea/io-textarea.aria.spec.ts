/**
 * io-textarea — aria prop tests
 *
 * Verifies that the `aria?: Record<string, string>` prop correctly injects
 * ARIA attributes onto the native <textarea> element.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { applyAriaProp } from '../../utils/aria-prop';

import { IoTextarea } from './io-textarea';

vi.mock('../../utils/aria-prop', () => ({
  applyAriaProp: vi.fn(),
}));

describe('io-textarea — aria prop', () => {
  let component: IoTextarea;

  beforeEach(() => {
    vi.clearAllMocks();
    component = new IoTextarea();
    (component as any).el = document.createElement('io-textarea');
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
    component.aria = { errormessage: 'external-error-id' };
    expect(component.aria).toEqual({ errormessage: 'external-error-id' });
  });

  it('calls applyAriaProp when aria watch fires', () => {
    const mockTextarea = document.createElement('textarea');
    (component as any).nativeTextareaEl = mockTextarea;
    component.aria = { errormessage: 'hint-id' };

    (component as any).onAriaChange();

    expect(applyAriaProp).toHaveBeenCalledWith(
      { errormessage: 'hint-id' },
      mockTextarea,
    );
  });

  it('calls applyAriaProp with null when nativeTextareaEl is not set', () => {
    (component as any).nativeTextareaEl = undefined;
    component.aria = { errormessage: 'hint-id' };

    (component as any).onAriaChange();

    expect(applyAriaProp).toHaveBeenCalledWith({ errormessage: 'hint-id' }, null);
  });
});
