import { describe, it, expect, beforeEach, vi } from 'vitest';

import { IoCheckboxGroup } from './io-checkbox-group';

describe('io-checkbox-group — default props', () => {
  let component: IoCheckboxGroup;

  beforeEach(() => {
    component = new IoCheckboxGroup();
    (component as any).el = document.createElement('io-checkbox-group');
    (component as any).change = { emit: vi.fn() };
  });

  it('is not required by default', () => {
    expect(component.required).toBe(false);
  });

  it('is not disabled by default', () => {
    expect(component.disabled).toBe(false);
  });

  it('is not in error state by default', () => {
    expect(component.error).toBe(false);
  });

  it('has undefined errorMessage by default', () => {
    expect(component.errorMessage).toBeUndefined();
  });

  it('has empty helperText by default', () => {
    expect(component.helperText).toBe('');
  });
});

describe('io-checkbox-group — syncChildren', () => {
  it('sets name on all io-checkbox children', () => {
    const component = new IoCheckboxGroup();
    const host = document.createElement('io-checkbox-group');
    const cb1 = Object.assign(document.createElement('io-checkbox'), { value: 'a', name: '', checked: false, disabled: false });
    const cb2 = Object.assign(document.createElement('io-checkbox'), { value: 'b', name: '', checked: true, disabled: false });
    host.appendChild(cb1);
    host.appendChild(cb2);
    (component as any).el = host;
    (component as any).change = { emit: vi.fn() };
    component.name = 'opts';
    component.disabled = false;

    (component as any).syncChildren();

    expect(cb1.name).toBe('opts');
    expect(cb2.name).toBe('opts');
  });

  it('disables all children when group is disabled', () => {
    const component = new IoCheckboxGroup();
    const host = document.createElement('io-checkbox-group');
    const cb = Object.assign(document.createElement('io-checkbox'), { value: 'x', name: '', checked: false, disabled: false });
    host.appendChild(cb);
    (component as any).el = host;
    (component as any).change = { emit: vi.fn() };
    component.name = 'g';
    component.disabled = true;

    (component as any).syncChildren();

    expect(cb.disabled).toBe(true);
  });

  it('does not throw when no children are present', () => {
    const component = new IoCheckboxGroup();
    const host = document.createElement('io-checkbox-group');
    (component as any).el = host;
    (component as any).change = { emit: vi.fn() };
    component.name = 'empty';
    component.disabled = false;

    expect(() => (component as any).syncChildren()).not.toThrow();
  });
});

describe('io-checkbox-group — getCheckedValues', () => {
  it('returns values of all checked checkboxes', () => {
    const component = new IoCheckboxGroup();
    const host = document.createElement('io-checkbox-group');
    const cb1 = Object.assign(document.createElement('io-checkbox'), { value: 'a', checked: true, name: '', disabled: false });
    const cb2 = Object.assign(document.createElement('io-checkbox'), { value: 'b', checked: false, name: '', disabled: false });
    const cb3 = Object.assign(document.createElement('io-checkbox'), { value: 'c', checked: true, name: '', disabled: false });
    host.appendChild(cb1);
    host.appendChild(cb2);
    host.appendChild(cb3);
    (component as any).el = host;
    (component as any).change = { emit: vi.fn() };
    component.name = 'multi';
    component.disabled = false;

    const result = (component as any).getCheckedValues();

    expect(result).toEqual(['a', 'c']);
  });

  it('returns empty array when no checkboxes are checked', () => {
    const component = new IoCheckboxGroup();
    const host = document.createElement('io-checkbox-group');
    const cb = Object.assign(document.createElement('io-checkbox'), { value: 'x', checked: false, name: '', disabled: false });
    host.appendChild(cb);
    (component as any).el = host;
    (component as any).change = { emit: vi.fn() };
    component.name = 'none';
    component.disabled = false;

    const result = (component as any).getCheckedValues();

    expect(result).toEqual([]);
  });
});

describe('io-checkbox-group — handleCheckboxChange', () => {
  it('emits change with checked values when an io-checkbox changes', () => {
    const component = new IoCheckboxGroup();
    const host = document.createElement('io-checkbox-group');
    const cb1 = Object.assign(document.createElement('io-checkbox'), { value: 'email', checked: true, name: '', disabled: false });
    const cb2 = Object.assign(document.createElement('io-checkbox'), { value: 'sms', checked: false, name: '', disabled: false });
    host.appendChild(cb1);
    host.appendChild(cb2);
    (component as any).el = host;
    const emitFn = vi.fn();
    (component as any).change = { emit: emitFn };
    component.name = 'notif';
    component.disabled = false;

    const checkboxEl = document.createElement('io-checkbox');
    const ev = new Event('change');
    Object.defineProperty(ev, 'target', { value: checkboxEl });

    (component as any).handleCheckboxChange(ev);

    expect(emitFn).toHaveBeenCalledWith({ checkedValues: ['email'] });
  });

  it('does not emit change when event target is not io-checkbox', () => {
    const component = new IoCheckboxGroup();
    const host = document.createElement('io-checkbox-group');
    (component as any).el = host;
    const emitFn = vi.fn();
    (component as any).change = { emit: emitFn };
    component.name = 'test';
    component.disabled = false;

    const inputEl = document.createElement('input');
    const ev = new Event('change');
    Object.defineProperty(ev, 'target', { value: inputEl });

    (component as any).handleCheckboxChange(ev);

    expect(emitFn).not.toHaveBeenCalled();
  });
});
