import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoInputPassword } from './io-input-password';

describe('io-input-password — click/change events', () => {
  let component: IoInputPassword;
  let changeMock: ReturnType<typeof vi.fn>;

  function makeChangeEvent(value: string): Event {
    const input = document.createElement('input');
    input.value = value;
    const ev = new Event('change');
    Object.defineProperty(ev, 'target', { value: input });
    return ev;
  }

  beforeEach(() => {
    component = new IoInputPassword();
    (component as any).el = document.createElement('io-input-password');
    changeMock = vi.fn();
    (component as any).change = { emit: changeMock };
    (component as any).input = { emit: vi.fn() };
    (component as any).focus = { emit: vi.fn() };
    (component as any).blur = { emit: vi.fn() };
    (component as any).internals = { setFormValue: vi.fn() };
    component.label = 'Password';
  });

  it('toggles showPassword on toggleVisibility', () => {
    expect((component as any).showPassword).toBe(false);
    (component as any).toggleVisibility();
    expect((component as any).showPassword).toBe(true);
  });

  it('toggles back on second call', () => {
    (component as any).toggleVisibility();
    (component as any).toggleVisibility();
    expect((component as any).showPassword).toBe(false);
  });

  it('emits change with value on handleChange', () => {
    const ev = makeChangeEvent('secret123');
    (component as any).handleChange(ev);
    expect(changeMock).toHaveBeenCalledOnce();
    expect(changeMock).toHaveBeenCalledWith('secret123');
  });

  it('does not emit change when disabled', () => {
    component.disabled = true;
    const ev = makeChangeEvent('secret123');
    (component as any).handleChange(ev);
    expect(changeMock).not.toHaveBeenCalled();
  });

  it('updates value prop on change', () => {
    const ev = makeChangeEvent('newpass');
    (component as any).handleChange(ev);
    expect(component.value).toBe('newpass');
  });
});
