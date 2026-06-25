import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoSwitch } from './io-switch';

describe('io-switch — Space key toggle behavior', () => {
  let component: IoSwitch;
  let emitMock: ReturnType<typeof vi.fn>;

  function makeChangeEventFromSpace(checked: boolean): Event {
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.role = 'switch';
    input.checked = checked;
    const ev = new Event('change', { bubbles: true });
    Object.defineProperty(ev, 'target', { value: input, writable: false });
    return ev;
  }

  beforeEach(() => {
    component = new IoSwitch();
    (component as any).el = document.createElement('io-switch');
    emitMock = vi.fn();
    (component as any).change = { emit: emitMock };
    (component as any).blur = { emit: vi.fn() };
    component.value = 'on';
    component.label = 'Enable notifications';
  });

  it('Space key on enabled switch toggles checked from false to true', () => {
    component.checked = false;
    const ev = makeChangeEventFromSpace(true);
    (component as any).handleChange(ev);
    expect(component.checked).toBe(true);
  });

  it('Space key on enabled switch toggles checked from true to false', () => {
    component.checked = true;
    const ev = makeChangeEventFromSpace(false);
    (component as any).handleChange(ev);
    expect(component.checked).toBe(false);
  });

  it('Space key emits change event with correct payload when toggling on', () => {
    component.checked = false;
    component.value = 'on';
    const ev = makeChangeEventFromSpace(true);
    (component as any).handleChange(ev);
    expect(emitMock).toHaveBeenCalledOnce();
    expect(emitMock).toHaveBeenCalledWith({ checked: true, value: 'on' });
  });

  it('Space key emits change event with correct payload when toggling off', () => {
    component.checked = true;
    component.value = 'enabled';
    const ev = makeChangeEventFromSpace(false);
    (component as any).handleChange(ev);
    expect(emitMock).toHaveBeenCalledOnce();
    expect(emitMock).toHaveBeenCalledWith({ checked: false, value: 'enabled' });
  });

  it('Space key on disabled switch does not toggle checked', () => {
    component.disabled = true;
    component.checked = false;
    const ev = makeChangeEventFromSpace(true);
    (component as any).handleChange(ev);
    expect(component.checked).toBe(false);
  });

  it('Space key on disabled switch does not emit change event', () => {
    component.disabled = true;
    const ev = makeChangeEventFromSpace(true);
    (component as any).handleChange(ev);
    expect(emitMock).not.toHaveBeenCalled();
  });

  it('Space key on loading switch does not toggle checked', () => {
    component.loading = true;
    component.checked = false;
    const ev = makeChangeEventFromSpace(true);
    (component as any).handleChange(ev);
    expect(component.checked).toBe(false);
  });

  it('Space key on loading switch does not emit change event', () => {
    component.loading = true;
    const ev = makeChangeEventFromSpace(true);
    (component as any).handleChange(ev);
    expect(emitMock).not.toHaveBeenCalled();
  });
});
