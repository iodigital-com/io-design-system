import { describe, it, expect, beforeEach, vi } from 'vitest';
import { IoInput } from './io-input';

describe('io-input - event behavior', () => {
  let component: IoInput;

  beforeEach(() => {
    component = new IoInput();
    (component as any).el = document.createElement('io-input');
    (component as any).input = { emit: vi.fn() };
    (component as any).change = { emit: vi.fn() };
    (component as any).focus = { emit: vi.fn() };
    (component as any).blur = { emit: vi.fn() };
  });

  it('updates value and emits input event payload', () => {
    const ev = new Event('input') as InputEvent;
    Object.defineProperty(ev, 'target', {
      value: { value: 'new-value' },
    });

    (component as any).handleInput(ev);

    expect(component.value).toBe('new-value');
    expect((component as any).input.emit).toHaveBeenCalledOnce();
    expect((component as any).input.emit).toHaveBeenCalledWith(ev);
  });

  it('emits change with current string value', () => {
    const ev = new Event('change');
    Object.defineProperty(ev, 'target', {
      value: { value: 'changed-value' },
    });

    (component as any).handleChange(ev);

    expect((component as any).change.emit).toHaveBeenCalledOnce();
    expect((component as any).change.emit).toHaveBeenCalledWith('changed-value');
  });

  it('emits focus event as-is', () => {
    const ev = new FocusEvent('focus');
    (component as any).handleFocus(ev);

    expect((component as any).focus.emit).toHaveBeenCalledOnce();
    expect((component as any).focus.emit).toHaveBeenCalledWith(ev);
  });

  it('emits blur event as-is', () => {
    const ev = new FocusEvent('blur');
    (component as any).handleBlur(ev);

    expect((component as any).blur.emit).toHaveBeenCalledOnce();
    expect((component as any).blur.emit).toHaveBeenCalledWith(ev);
  });
});
