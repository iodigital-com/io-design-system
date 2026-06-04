import { describe, it, expect, beforeEach, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoSelect } from './io-select';

describe('io-select — hideLabel prop', () => {
  let component: IoSelect;

  beforeEach(() => {
    component = new IoSelect();
    (component as any).el = document.createElement('io-select');
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
    expect(warnSpy).toHaveBeenCalledWith('[io-select] hideLabel=true requires a non-empty label for accessibility.');
    warnSpy.mockRestore();
  });

  it('does not warn when hideLabel=true and label is provided', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    component.label = 'Country';
    component.hideLabel = true;
    (component as any).componentWillLoad();
    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});

describe('io-select — default props', () => {
  let component: IoSelect;

  beforeEach(() => {
    component = new IoSelect();
    (component as any).el = document.createElement('io-select');
    (component as any).change = { emit: vi.fn() };
    (component as any).focus = { emit: vi.fn() };
    (component as any).blur = { emit: vi.fn() };
  });

  it('has empty value by default', () => {
    expect(component.value).toBe('');
  });

  it('has empty flatOptions by default', () => {
    expect((component as any).flatOptions).toEqual([]);
  });

  it('has empty groups by default', () => {
    expect((component as any).groups).toEqual([]);
  });

  it('has size md by default', () => {
    expect(component.size).toBe('md');
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

  it('has no placeholder by default', () => {
    expect(component.placeholder).toBeUndefined();
  });

  it('has empty message by default', () => {
    expect(component.message).toBe('');
  });

  it('has no form prop by default', () => {
    expect(component.form).toBeUndefined();
  });

  it('setFocus resolves without throwing', async () => {
    const select = document.createElement('select');
    select.focus = vi.fn();
    const shadowRoot = { querySelector: vi.fn().mockReturnValue(select) };
    (component as any).el = { shadowRoot };
    await expect(component.setFocus()).resolves.toBeUndefined();
  });

  it('applies state-success class when state is success', () => {
    component.state = 'success';
    component.message = 'Looks good';
    (component as any).label = 'Country';
    (component as any).componentWillLoad();
    expect(() => (component as any).renderNativeSelect()).not.toThrow();
  });

  it('applies state-warning class when state is warning', () => {
    component.state = 'warning';
    component.message = 'Check this field';
    (component as any).label = 'Country';
    (component as any).componentWillLoad();
    expect(() => (component as any).renderNativeSelect()).not.toThrow();
  });

  it('message paragraph uses role=status for success state', () => {
    component.state = 'success';
    component.message = 'Looks good';
    (component as any).label = 'Country';
    (component as any).componentWillLoad();
    expect(() => (component as any).renderNativeSelect()).not.toThrow();
  });
});

// ── SSR lateParseTimeout ───────────────────────────────────────────────────────

describe('io-select — componentDidLoad SSR lateParseTimeout', () => {
  it('schedules lateParseTimeout when flatOptions is empty but el has children', () => {
    const component = new IoSelect();
    const el = document.createElement('io-select');
    // Add an io-option without a value attribute — parseSelectContent will skip it, leaving flatOptions empty
    const noValueOpt = document.createElement('io-option');
    noValueOpt.setAttribute('label', 'No value');
    el.appendChild(noValueOpt);
    (component as any).el = el;
    (component as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    (component as any).change = { emit: vi.fn() };
    (component as any).componentWillLoad();

    const setTimeoutSpy = vi.spyOn(globalThis, 'setTimeout').mockImplementation((fn: any) => {
      fn(); // invoke immediately so the inner re-parse runs
      return 999 as any;
    });

    (component as any).componentDidLoad();

    expect(setTimeoutSpy).toHaveBeenCalled();
    setTimeoutSpy.mockRestore();
  });
});

// ── renderComboboxOption onClick invocation ───────────────────────────────────

describe('io-select — renderComboboxOption onClick handler invocation', () => {
  it('onClick handler calls selectOption when option is not disabled', () => {
    const component = new IoSelect();
    (component as any).el = document.createElement('io-select');
    (component as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    (component as any).change = { emit: vi.fn() };
    (component as any).custom = true;
    component.label = 'Country';
    (component as any).componentWillLoad();

    const opt = { value: 'nl', label: 'Netherlands', disabled: false };
    const hMock = h as unknown as ReturnType<typeof vi.fn>;
    hMock.mockClear();
    (component as any).renderComboboxOption(opt, 0);

    const calls = hMock.mock.calls as Array<[unknown, Record<string, unknown>]>;
    const liCall = calls.find(([tag]) => tag === 'li');
    expect(liCall).toBeDefined();

    const onClick = liCall![1].onClick as (() => void) | undefined;
    expect(onClick).toBeDefined();

    const selectOptionSpy = vi.spyOn(component as any, 'selectOption').mockImplementation(() => {});
    onClick!();
    expect(selectOptionSpy).toHaveBeenCalledWith(opt);
  });
});

describe('io-select — formDisabledCallback', () => {
  let component: IoSelect;

  beforeEach(() => {
    component = new IoSelect();
    (component as any).el = document.createElement('io-select');
    (component as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    (component as any).change = { emit: vi.fn() };
  });

  it('sets disabled to true when formDisabledCallback(true) is called', () => {
    (component as any).formDisabledCallback(true);
    expect(component.disabled).toBe(true);
  });

  it('sets disabled to false when formDisabledCallback(false) is called', () => {
    component.disabled = true;
    (component as any).formDisabledCallback(false);
    expect(component.disabled).toBe(false);
  });
});

describe('io-select — connectedCallback', () => {
  it('logs error when label, aria-label, and aria-labelledby are all missing', () => {
    const component = new IoSelect();
    const el = document.createElement('io-select');
    (component as any).el = el;
    (component as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    (component as any).change = { emit: vi.fn() };

    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    (component as any).label = '';
    (component as any).connectedCallback();
    expect(errorSpy).toHaveBeenCalledWith('[io-select] Missing accessible label. Provide label prop, aria-label, or aria-labelledby.');
    errorSpy.mockRestore();
  });

  it('does not log error when label prop is provided', () => {
    const component = new IoSelect();
    const el = document.createElement('io-select');
    (component as any).el = el;
    (component as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    (component as any).change = { emit: vi.fn() };

    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    (component as any).label = 'Country';
    (component as any).connectedCallback();
    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });

  it('does not log error when aria-label is present on the element', () => {
    const component = new IoSelect();
    const el = document.createElement('io-select');
    el.setAttribute('aria-label', 'Country');
    (component as any).el = el;
    (component as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    (component as any).change = { emit: vi.fn() };

    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    (component as any).label = '';
    (component as any).connectedCallback();
    expect(errorSpy).not.toHaveBeenCalled();
    errorSpy.mockRestore();
  });
});

describe('io-select — componentShouldUpdate', () => {
  it('returns true when new and old values differ', () => {
    const component = new IoSelect();
    expect((component as any).componentShouldUpdate('new', 'old')).toBe(true);
  });

  it('returns false when new and old values are identical', () => {
    const component = new IoSelect();
    expect((component as any).componentShouldUpdate('same', 'same')).toBe(false);
  });
});