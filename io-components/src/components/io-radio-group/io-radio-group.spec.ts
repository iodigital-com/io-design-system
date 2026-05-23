import { describe, it, expect, beforeEach, vi } from 'vitest';

import { IoRadioGroup } from './io-radio-group';

describe('io-radio-group — default props', () => {
  let component: IoRadioGroup;

  beforeEach(() => {
    component = new IoRadioGroup();
    (component as any).el = document.createElement('io-radio-group');
    (component as any).change = { emit: vi.fn() };
  });

  it('has empty value by default', () => {
    expect(component.value).toBe('');
  });

  it('is not required by default', () => {
    expect(component.required).toBe(false);
  });

  it('is not disabled by default', () => {
    expect(component.disabled).toBe(false);
  });

  it('is not invalid by default', () => {
    expect(component.invalid).toBe(false);
  });

  it('has empty helperText by default', () => {
    expect(component.helperText).toBe('');
  });
});

describe('io-radio-group — syncChildren', () => {
  it('sets name and checked on each io-radio child', () => {
    const component = new IoRadioGroup();
    const host = document.createElement('io-radio-group');
    const radio1 = Object.assign(document.createElement('io-radio'), { value: 'a', name: '', checked: false, disabled: false });
    const radio2 = Object.assign(document.createElement('io-radio'), { value: 'b', name: '', checked: false, disabled: false });
    host.appendChild(radio1);
    host.appendChild(radio2);
    (component as any).el = host;
    (component as any).change = { emit: vi.fn() };
    component.name = 'choice';
    component.value = 'b';
    component.disabled = false;

    (component as any).syncChildren();

    expect(radio1.name).toBe('choice');
    expect(radio2.name).toBe('choice');
    expect(radio1.checked).toBe(false);
    expect(radio2.checked).toBe(true);
  });

  it('disables all children when group is disabled', () => {
    const component = new IoRadioGroup();
    const host = document.createElement('io-radio-group');
    const radio = Object.assign(document.createElement('io-radio'), { value: 'x', name: '', checked: false, disabled: false });
    host.appendChild(radio);
    (component as any).el = host;
    (component as any).change = { emit: vi.fn() };
    component.name = 'g';
    component.value = '';
    component.disabled = true;

    (component as any).syncChildren();

    expect(radio.disabled).toBe(true);
  });

  it('does not throw when no children are present', () => {
    const component = new IoRadioGroup();
    const host = document.createElement('io-radio-group');
    (component as any).el = host;
    (component as any).change = { emit: vi.fn() };
    component.name = 'empty';
    component.value = '';
    component.disabled = false;

    expect(() => (component as any).syncChildren()).not.toThrow();
  });
});

describe('io-radio-group — handleRadioChange', () => {
  it('emits change with the selected value when a radio changes', () => {
    const component = new IoRadioGroup();
    const host = document.createElement('io-radio-group');
    (component as any).el = host;
    const emitFn = vi.fn();
    (component as any).change = { emit: emitFn };
    component.name = 'test';
    component.value = '';
    component.disabled = false;

    const radioEl = document.createElement('io-radio') as HTMLElement & { value: string };
    radioEl.value = 'selected-value';
    const ev = new Event('change');
    Object.defineProperty(ev, 'target', { value: radioEl });

    (component as any).handleRadioChange(ev);

    expect(component.value).toBe('selected-value');
    expect(emitFn).toHaveBeenCalledWith({ value: 'selected-value' });
  });

  it('does not emit change when event target is not io-radio', () => {
    const component = new IoRadioGroup();
    const host = document.createElement('io-radio-group');
    (component as any).el = host;
    const emitFn = vi.fn();
    (component as any).change = { emit: emitFn };
    component.name = 'test';
    component.value = '';
    component.disabled = false;

    const inputEl = document.createElement('input');
    const ev = new Event('change');
    Object.defineProperty(ev, 'target', { value: inputEl });

    (component as any).handleRadioChange(ev);

    expect(emitFn).not.toHaveBeenCalled();
  });
});
