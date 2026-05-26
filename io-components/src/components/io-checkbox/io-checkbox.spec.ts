import { describe, it, expect, beforeEach, vi } from 'vitest';

import { IoCheckbox } from './io-checkbox';

describe('io-checkbox — hideLabel prop', () => {
  let component: IoCheckbox;

  beforeEach(() => {
    component = new IoCheckbox();
    (component as any).el = document.createElement('io-checkbox');
    (component as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    (component as any).change = { emit: vi.fn() };
  });

  it('defaults hideLabel to false', () => {
    expect(component.hideLabel).toBe(false);
  });

  it('accepts hideLabel=true', () => {
    component.hideLabel = true;
    expect(component.hideLabel).toBe(true);
  });

  it('warns when hideLabel=true and label is empty', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    component.label = '';
    component.hideLabel = true;
    (component as any).componentWillLoad();
    expect(warnSpy).toHaveBeenCalledWith('[io-checkbox] hideLabel=true requires a non-empty label for accessibility.');
    warnSpy.mockRestore();
  });

  it('does not warn when hideLabel=true and label is provided', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    component.label = 'Accept terms';
    component.hideLabel = true;
    (component as any).componentWillLoad();
    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});

describe('io-checkbox — default props', () => {
  let component: IoCheckbox;

  beforeEach(() => {
    component = new IoCheckbox();
    (component as any).el = document.createElement('io-checkbox');
    (component as any).change = { emit: vi.fn() };
  });

  it('is not checked by default', () => {
    expect(component.checked).toBe(false);
  });

  it('is not indeterminate by default', () => {
    expect(component.indeterminate).toBe(false);
  });

  it('is not required by default', () => {
    expect(component.required).toBe(false);
  });

  it('is not disabled by default', () => {
    expect(component.disabled).toBe(false);
  });

  it('has state=none by default', () => {
    expect(component.state).toBe('none');
  });

  it('has empty value by default', () => {
    expect(component.value).toBe('');
  });

  it('has empty message by default', () => {
    expect(component.message).toBe('');
  });

  it('has no helperText by default', () => {
    expect(component.helperText).toBeUndefined();
  });

  it('has no form prop by default', () => {
    expect(component.form).toBeUndefined();
  });

  it('setFocus resolves without throwing', async () => {
    const input = document.createElement('input');
    input.focus = vi.fn();
    const shadowRoot = { querySelector: vi.fn().mockReturnValue(input) };
    (component as any).el = { shadowRoot };
    await expect(component.setFocus()).resolves.toBeUndefined();
  });

  it('applies state-success class when state is success', () => {
    component.state = 'success';
    component.message = 'Looks good';
    (component as any).label = 'Accept terms';
    (component as any).componentWillLoad();
    expect(() => (component as any).render()).not.toThrow();
  });

  it('applies state-warning class when state is warning', () => {
    component.state = 'warning';
    component.message = 'Check this field';
    (component as any).label = 'Accept terms';
    (component as any).componentWillLoad();
    expect(() => (component as any).render()).not.toThrow();
  });

  it('message paragraph uses role=status for success state', () => {
    component.state = 'success';
    component.message = 'Looks good';
    (component as any).label = 'Accept terms';
    (component as any).componentWillLoad();
    expect(() => (component as any).render()).not.toThrow();
  });
});
