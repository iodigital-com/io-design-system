import { describe, it, expect, vi } from 'vitest';

import { IoButton } from './io-button';

function makeInternals(formOverride?: HTMLFormElement | null) {
  return {
    setFormValue: vi.fn(),
    form: formOverride !== undefined ? formOverride : { requestSubmit: vi.fn(), reset: vi.fn() },
  };
}

function makeButton() {
  const c = new IoButton();
  (c as any).el = document.createElement('io-button');
  (c as any).click = { emit: vi.fn() };
  (c as any).internals = makeInternals();
  return c;
}

describe('io-button — FACE: props', () => {
  it('name prop is undefined by default', () => {
    const c = makeButton();
    expect(c.name).toBeUndefined();
  });

  it('form prop is undefined by default', () => {
    const c = makeButton();
    expect(c.form).toBeUndefined();
  });

  it('can set name', () => {
    const c = makeButton();
    c.name = 'action';
    expect(c.name).toBe('action');
  });

  it('can set form', () => {
    const c = makeButton();
    c.form = 'my-form';
    expect(c.form).toBe('my-form');
  });
});

describe('io-button — FACE: componentWillLoad', () => {
  it('calls setFormValue when form and name are set', () => {
    const c = makeButton();
    c.form = 'my-form';
    c.name = 'action';
    c.value = 'submit';
    c.componentWillLoad();
    expect((c as any).internals.setFormValue).toHaveBeenCalledWith('submit');
  });

  it('does not call setFormValue when name is missing', () => {
    const c = makeButton();
    c.form = 'my-form';
    c.componentWillLoad();
    expect((c as any).internals.setFormValue).not.toHaveBeenCalled();
  });

  it('calls setFormValue when name is set without form attribute (ancestor-form association)', () => {
    const c = makeButton();
    c.name = 'action';
    c.value = 'submit';
    c.componentWillLoad();
    expect((c as any).internals.setFormValue).toHaveBeenCalledWith('submit');
  });

  it('uses empty string when value is undefined', () => {
    const c = makeButton();
    c.name = 'action';
    c.componentWillLoad();
    expect((c as any).internals.setFormValue).toHaveBeenCalledWith('');
  });
});

describe('io-button — FACE: onValueChange', () => {
  it('syncs new value when name is set', () => {
    const c = makeButton();
    c.name = 'action';
    (c as any).onValueChange('new-value');
    expect((c as any).internals.setFormValue).toHaveBeenCalledWith('new-value');
  });

  it('does not sync when name is missing', () => {
    const c = makeButton();
    (c as any).onValueChange('new-value');
    expect((c as any).internals.setFormValue).not.toHaveBeenCalled();
  });
});

describe('io-button — FACE: click → requestSubmit / reset', () => {
  it('calls requestSubmit when type=submit and form is associated', () => {
    const c = makeButton();
    c.type = 'submit';
    const ev = new MouseEvent('click');
    Object.defineProperty(ev, 'stopPropagation', { value: vi.fn() });
    (c as any).handleClick(ev);
    expect((c as any).internals.form.requestSubmit).toHaveBeenCalled();
  });

  it('calls reset when type=reset and form is associated', () => {
    const c = makeButton();
    c.type = 'reset';
    const ev = new MouseEvent('click');
    Object.defineProperty(ev, 'stopPropagation', { value: vi.fn() });
    (c as any).handleClick(ev);
    expect((c as any).internals.form.reset).toHaveBeenCalled();
  });

  it('does not call requestSubmit when type=button', () => {
    const c = makeButton();
    c.type = 'button';
    const ev = new MouseEvent('click');
    Object.defineProperty(ev, 'stopPropagation', { value: vi.fn() });
    (c as any).handleClick(ev);
    expect((c as any).internals.form.requestSubmit).not.toHaveBeenCalled();
  });

  it('does not call form methods when href is set (anchor mode)', () => {
    const c = makeButton();
    c.type = 'submit';
    c.href = '/page';
    const ev = new MouseEvent('click');
    Object.defineProperty(ev, 'stopPropagation', { value: vi.fn() });
    (c as any).handleClick(ev);
    expect((c as any).internals.form.requestSubmit).not.toHaveBeenCalled();
  });

  it('does not call form methods when disabled', () => {
    const c = makeButton();
    c.type = 'submit';
    c.disabled = true;
    const ev = new MouseEvent('click');
    Object.defineProperty(ev, 'stopPropagation', { value: vi.fn() });
    Object.defineProperty(ev, 'preventDefault', { value: vi.fn() });
    (c as any).handleClick(ev);
    expect((c as any).internals.form.requestSubmit).not.toHaveBeenCalled();
  });

  it('does not throw when internals.form is null', () => {
    const c = makeButton();
    (c as any).internals = makeInternals(null);
    c.type = 'submit';
    const ev = new MouseEvent('click');
    Object.defineProperty(ev, 'stopPropagation', { value: vi.fn() });
    expect(() => (c as any).handleClick(ev)).not.toThrow();
  });
});

describe('io-button — FACE: formResetCallback', () => {
  it('formResetCallback exists and does not throw', () => {
    const c = makeButton();
    expect(() => c.formResetCallback()).not.toThrow();
  });
});
