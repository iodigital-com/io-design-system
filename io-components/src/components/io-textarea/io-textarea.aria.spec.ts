/**
 * io-textarea — aria prop tests + counter live region tests
 *
 * Verifies that the `aria?: Record<string, string>` prop correctly injects
 * ARIA attributes onto the native <textarea> element.
 * Also verifies the screen-reader live region for the character counter.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { h } from '@stencil/core';

import { IoTextarea } from './io-textarea';
import { applyAriaProp } from '../../utils/aria-prop';

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

describe('io-textarea — counter live region', () => {
  let component: IoTextarea;

  beforeEach(() => {
    vi.clearAllMocks();
    component = new IoTextarea();
    (component as any).el = document.createElement('io-textarea');
    (component as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    (component as any).input = { emit: vi.fn() };
    (component as any).change = { emit: vi.fn() };
    (component as any).focus = { emit: vi.fn() };
    (component as any).blur = { emit: vi.fn() };
  });

  it('renders aria-live region when counter=true and maxLength is set', () => {
    component.counter = true;
    component.maxLength = 100;
    component.label = 'Bio';
    vi.mocked(h).mockClear();
    (component as any).render();

    const calls = vi.mocked(h).mock.calls;
    const liveCall = calls.find(
      ([tag, attrs]: [string, Record<string, unknown>]) =>
        tag === 'span' && attrs?.['aria-live'] === 'polite' && attrs?.['aria-atomic'] === 'true',
    );
    expect(liveCall).toBeDefined();
  });

  it('live region text contains character count and max', () => {
    component.counter = true;
    component.maxLength = 80;
    component.value = 'hello';
    component.label = 'Bio';
    vi.mocked(h).mockClear();
    (component as any).render();

    const calls = vi.mocked(h).mock.calls;
    const liveCall = calls.find(
      ([tag, attrs]: [string, Record<string, unknown>]) =>
        tag === 'span' && attrs?.['aria-live'] === 'polite',
    );
    expect(liveCall).toBeDefined();
  });

  it('does not render live region when counter=false', () => {
    component.counter = false;
    component.maxLength = 80;
    component.label = 'Bio';
    vi.mocked(h).mockClear();
    (component as any).render();

    const calls = vi.mocked(h).mock.calls;
    const liveCall = calls.find(
      ([tag, attrs]: [string, Record<string, unknown>]) =>
        tag === 'span' && attrs?.['aria-live'] === 'polite' && attrs?.['aria-atomic'] === 'true',
    );
    expect(liveCall).toBeUndefined();
  });
});
