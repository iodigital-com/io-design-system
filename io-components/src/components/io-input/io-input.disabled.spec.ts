import { describe, it, expect, beforeEach, vi } from 'vitest';
import { IoInput } from './io-input';

describe('io-input - disabled behavior', () => {
  let component: IoInput;

  beforeEach(() => {
    component = new IoInput();
    (component as any).el = document.createElement('io-input');
    (component as any).input = { emit: vi.fn() };
    (component as any).change = { emit: vi.fn() };
    (component as any).focus = { emit: vi.fn() };
    (component as any).blur = { emit: vi.fn() };
  });

  it('is not disabled by default', () => {
    expect(component.disabled).toBe(false);
  });

  it('reflects disabled prop when set to true', () => {
    component.disabled = true;
    expect(component.disabled).toBe(true);
  });

  it('does not emit input/change/focus/blur events when disabled handlers are invoked', () => {
    component.disabled = true;

    const inputEv = new Event('input') as InputEvent;
    Object.defineProperty(inputEv, 'target', {
      value: { value: 'ignored' },
    });
    const changeEv = new Event('change');
    Object.defineProperty(changeEv, 'target', {
      value: { value: 'ignored' },
    });
    const focusEv = new FocusEvent('focus');
    const blurEv = new FocusEvent('blur');

    (component as any).handleInput(inputEv);
    (component as any).handleChange(changeEv);
    (component as any).handleFocus(focusEv);
    (component as any).handleBlur(blurEv);

    expect(component.value).toBe('');
    expect((component as any).input.emit).not.toHaveBeenCalled();
    expect((component as any).change.emit).not.toHaveBeenCalled();
    expect((component as any).focus.emit).not.toHaveBeenCalled();
    expect((component as any).blur.emit).not.toHaveBeenCalled();
  });

  it('setFocus resolves safely when input is missing', async () => {
    (component as any).el = { shadowRoot: { querySelector: vi.fn().mockReturnValue(null) } };

    await expect(component.setFocus()).resolves.toBeUndefined();
  });

  it('setFocus forwards to internal input when available', async () => {
    const focus = vi.fn();
    const input = { focus };
    (component as any).el = { shadowRoot: { querySelector: vi.fn().mockReturnValue(input) } };

    await component.setFocus({ preventScroll: true });

    expect(focus).toHaveBeenCalledOnce();
    expect(focus).toHaveBeenCalledWith({ preventScroll: true });
  });
});
