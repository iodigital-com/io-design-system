import { describe, it, expect, beforeEach, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoCheckboxGroup } from './io-checkbox-group';

function makeComponent(overrides: Partial<IoCheckboxGroup> = {}) {
  const c = new IoCheckboxGroup();
  (c as any).el = document.createElement('io-checkbox-group');
  (c as any).change = { emit: vi.fn() };
  Object.assign(c, overrides);
  (c as any).componentWillLoad();
  return c;
}

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

  it('has undefined aria prop by default', () => {
    expect(component.aria).toBeUndefined();
  });
});

describe('io-checkbox-group — required prop (render checks)', () => {
  it('renders asterisk span when required=true', () => {
    const c = makeComponent({ label: 'Options', required: true });
    vi.mocked(h).mockClear();
    c.render();

    const spanCalls = vi.mocked(h).mock.calls.filter(
      (call) => call[0] === 'span' && (call[1] as Record<string, unknown>)?.class === 'checkbox-group__required',
    );
    expect(spanCalls.length).toBeGreaterThan(0);
    // aria-hidden="true" so screen readers skip the visual indicator
    expect((spanCalls[0]![1] as Record<string, unknown>)?.['aria-hidden']).toBe('true');
  });

  it('does not render asterisk span when required=false', () => {
    const c = makeComponent({ label: 'Options', required: false });
    vi.mocked(h).mockClear();
    c.render();

    const spanCalls = vi.mocked(h).mock.calls.filter(
      (call) => call[0] === 'span' && (call[1] as Record<string, unknown>)?.class === 'checkbox-group__required',
    );
    expect(spanCalls.length).toBe(0);
  });

  it('fieldset does not carry aria-required (not a valid ARIA attr for fieldset)', () => {
    // aria-required is not permitted on <fieldset> per WAI-ARIA — required is
    // conveyed via the visual indicator (*) in the legend and the helperText.
    const c = makeComponent({ label: 'Options', required: true });
    vi.mocked(h).mockClear();
    c.render();

    const fieldsetCalls = vi.mocked(h).mock.calls.filter(
      (call) => call[0] === 'fieldset',
    );
    expect(fieldsetCalls.length).toBeGreaterThan(0);
    expect((fieldsetCalls[0]![1] as Record<string, unknown>)?.['aria-required']).toBeUndefined();
  });
});

describe('io-checkbox-group — error role=alert (render checks)', () => {
  it('renders error paragraph with role="alert" when error=true and errorMessage is set', () => {
    const c = makeComponent({
      label: 'Options',
      error: true,
      errorMessage: 'Please select at least one option',
    });
    vi.mocked(h).mockClear();
    c.render();

    const pCalls = vi.mocked(h).mock.calls.filter(
      (call) => call[0] === 'p' && (call[1] as Record<string, unknown>)?.class === 'checkbox-group__error',
    );
    expect(pCalls.length).toBeGreaterThan(0);
    const attrs = pCalls[0]![1] as Record<string, unknown>;
    expect(attrs.role).toBe('alert');
    expect(attrs['aria-atomic']).toBe('true');
    expect(attrs['aria-live']).toBeUndefined();
  });

  it('does not render error paragraph when error=false', () => {
    const c = makeComponent({ label: 'Options', error: false, errorMessage: 'Some error' });
    vi.mocked(h).mockClear();
    c.render();

    const pCalls = vi.mocked(h).mock.calls.filter(
      (call) => call[0] === 'p' && (call[1] as Record<string, unknown>)?.class === 'checkbox-group__error',
    );
    expect(pCalls.length).toBe(0);
  });
});

describe('io-checkbox-group — syncChildren', () => {
  it('sets name on all io-checkbox children', () => {
    const component = new IoCheckboxGroup();
    const host = document.createElement('io-checkbox-group');
    const cb1 = Object.assign(document.createElement('io-checkbox'), { value: 'a', name: '', checked: false, disabled: false, state: 'none' });
    const cb2 = Object.assign(document.createElement('io-checkbox'), { value: 'b', name: '', checked: true, disabled: false, state: 'none' });
    host.appendChild(cb1);
    host.appendChild(cb2);
    (component as any).el = host;
    (component as any).change = { emit: vi.fn() };
    component.name = 'opts';
    component.disabled = false;
    component.error = false;

    (component as any).syncChildren();

    expect(cb1.name).toBe('opts');
    expect(cb2.name).toBe('opts');
  });

  it('disables all children when group is disabled', () => {
    const component = new IoCheckboxGroup();
    const host = document.createElement('io-checkbox-group');
    const cb = Object.assign(document.createElement('io-checkbox'), { value: 'x', name: '', checked: false, disabled: false, state: 'none' });
    host.appendChild(cb);
    (component as any).el = host;
    (component as any).change = { emit: vi.fn() };
    component.name = 'g';
    component.disabled = true;
    component.error = false;

    (component as any).syncChildren();

    expect(cb.disabled).toBe(true);
  });

  it('re-enables children when group disabled is set back to false', () => {
    const component = new IoCheckboxGroup();
    const host = document.createElement('io-checkbox-group');
    // Child starts disabled
    const cb = Object.assign(document.createElement('io-checkbox'), { value: 'x', name: '', checked: false, disabled: true, state: 'none' });
    host.appendChild(cb);
    (component as any).el = host;
    (component as any).change = { emit: vi.fn() };
    component.name = 'g';
    // group is now re-enabled
    component.disabled = false;
    component.error = false;

    (component as any).syncChildren();

    expect(cb.disabled).toBe(false);
  });

  it('propagates error state to children when error=true', () => {
    const component = new IoCheckboxGroup();
    const host = document.createElement('io-checkbox-group');
    const cb = Object.assign(document.createElement('io-checkbox'), { value: 'x', name: '', checked: false, disabled: false, state: 'none' });
    host.appendChild(cb);
    (component as any).el = host;
    (component as any).change = { emit: vi.fn() };
    component.name = 'g';
    component.disabled = false;
    component.error = true;

    (component as any).syncChildren();

    expect(cb.state).toBe('error');
  });

  it('clears error state on children when error=false', () => {
    const component = new IoCheckboxGroup();
    const host = document.createElement('io-checkbox-group');
    const cb = Object.assign(document.createElement('io-checkbox'), { value: 'x', name: '', checked: false, disabled: false, state: 'error' });
    host.appendChild(cb);
    (component as any).el = host;
    (component as any).change = { emit: vi.fn() };
    component.name = 'g';
    component.disabled = false;
    component.error = false;

    (component as any).syncChildren();

    expect(cb.state).toBe('none');
  });

  it('does not throw when no children are present', () => {
    const component = new IoCheckboxGroup();
    const host = document.createElement('io-checkbox-group');
    (component as any).el = host;
    (component as any).change = { emit: vi.fn() };
    component.name = 'empty';
    component.disabled = false;
    component.error = false;

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
