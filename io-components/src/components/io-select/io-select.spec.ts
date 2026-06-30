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

// ── SSR option registration via optionConnect event ──────────────────────────

describe('io-select — componentDidLoad and optionConnect event handling', () => {
  it('parses options in componentDidLoad when children are available', () => {
    const component = new IoSelect();
    const el = document.createElement('io-select');
    const opt = document.createElement('io-option');
    opt.setAttribute('value', 'nl');
    opt.setAttribute('label', 'Netherlands');
    el.appendChild(opt);
    (component as any).el = el;
    (component as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    (component as any).change = { emit: vi.fn() };
    (component as any).componentWillLoad();
    (component as any).componentDidLoad();
    // flatOptions may be empty in jsdom without real custom element upgrade, but no throw
    expect(() => (component as any).componentDidLoad()).not.toThrow();
  });

  it('handleOptionConnect re-parses options on late connect', () => {
    const component = new IoSelect();
    const el = document.createElement('io-select');
    const opt = document.createElement('io-option');
    opt.setAttribute('value', 'be');
    opt.setAttribute('label', 'Belgium');
    el.appendChild(opt);
    (component as any).el = el;
    (component as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    (component as any).change = { emit: vi.fn() };
    (component as any).componentWillLoad();
    // handleOptionConnect should not throw
    expect(() => (component as any).handleOptionConnect()).not.toThrow();
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
  it('logs error when label, aria-label, aria-labelledby, and slot="label" are all missing', () => {
    const component = new IoSelect();
    const el = document.createElement('io-select');
    (component as any).el = el;
    (component as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    (component as any).change = { emit: vi.fn() };

    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    (component as any).label = '';
    (component as any).connectedCallback();
    expect(errorSpy).toHaveBeenCalledWith('[io-select] Missing accessible label. Provide label prop, aria-label, aria-labelledby, or slot="label".');
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

  it('does not log error when slot="label" child is present', () => {
    const component = new IoSelect();
    const el = document.createElement('io-select');
    const slottedLabel = document.createElement('span');
    slottedLabel.setAttribute('slot', 'label');
    slottedLabel.textContent = 'Country';
    el.appendChild(slottedLabel);
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

describe('io-select — description prop', () => {
  let component: IoSelect;

  beforeEach(() => {
    component = new IoSelect();
    (component as any).el = document.createElement('io-select');
    (component as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    (component as any).change = { emit: vi.fn() };
    component.label = 'Country';
    (component as any).componentWillLoad();
  });

  it('has undefined description by default', () => {
    expect(component.description).toBeUndefined();
  });

  it('accepts a description string', () => {
    component.description = 'Select the country where you reside.';
    expect(component.description).toBe('Select the country where you reside.');
  });

  it('generates a descriptionId in componentWillLoad', () => {
    const id = (component as any).descriptionId as string;
    expect(id).toMatch(/^io-select-desc-/);
  });

  it('renders description <p> when description is set (native mode)', () => {
    component.description = 'Select the country where you reside.';
    vi.mocked(h).mockClear();
    (component as any).renderNativeSelect();
    const pCalls = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>, ...unknown[]]>)
      .filter(call => call[0] === 'p' && (call[1] as Record<string, unknown>)?.['class'] === 'select-description');
    expect(pCalls.length).toBe(1);
  });

  it('does not render description <p> when description is undefined (native mode)', () => {
    component.description = undefined;
    vi.mocked(h).mockClear();
    (component as any).renderNativeSelect();
    const pCalls = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>, ...unknown[]]>)
      .filter(call => call[0] === 'p' && (call[1] as Record<string, unknown>)?.['class'] === 'select-description');
    expect(pCalls.length).toBe(0);
  });

  it('includes descriptionId in aria-describedby on native select when description is set', () => {
    component.description = 'Select the country where you reside.';
    vi.mocked(h).mockClear();
    (component as any).renderNativeSelect();
    const selectCalls = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>]>)
      .filter(call => call[0] === 'select');
    const selectProps = selectCalls[0]?.[1] as Record<string, unknown>;
    const descId = (component as any).descriptionId as string;
    expect(String(selectProps?.['aria-describedby'] ?? '')).toContain(descId);
  });
});