import { h } from '@stencil/core';
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

  it('is not in error state by default', () => {
    expect(component.error).toBe(false);
  });

  it('has undefined errorMessage by default', () => {
    expect(component.errorMessage).toBeUndefined();
  });

  it('has empty helperText by default', () => {
    expect(component.helperText).toBe('');
  });

  it('has vertical orientation by default', () => {
    expect(component.orientation).toBe('vertical');
  });

  it('is not loading by default', () => {
    expect(component.loading).toBe(false);
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

  it('propagates required prop to all io-radio children', () => {
    const component = new IoRadioGroup();
    const host = document.createElement('io-radio-group');
    const radio1 = Object.assign(document.createElement('io-radio'), { value: 'a', name: '', checked: false, disabled: false, required: false });
    const radio2 = Object.assign(document.createElement('io-radio'), { value: 'b', name: '', checked: false, disabled: false, required: false });
    host.appendChild(radio1);
    host.appendChild(radio2);
    (component as any).el = host;
    (component as any).change = { emit: vi.fn() };
    component.name = 'choice';
    component.value = 'a';
    component.required = true;

    (component as any).syncChildren();

    expect(radio1.required).toBe(true);
    expect(radio2.required).toBe(true);
  });

  it('updates required on children when group required prop changes', () => {
    const component = new IoRadioGroup();
    const host = document.createElement('io-radio-group');
    const radio = Object.assign(document.createElement('io-radio'), { value: 'x', name: '', checked: false, disabled: false, required: false });
    host.appendChild(radio);
    (component as any).el = host;
    (component as any).change = { emit: vi.fn() };
    component.name = 'g';
    component.value = '';
    component.required = false;

    (component as any).syncChildren();
    expect(radio.required).toBe(false);

    component.required = true;
    (component as any).onRequiredChange();

    expect(radio.required).toBe(true);
  });

  it('re-enables children when group disabled changes from true to false (fix: no if-guard)', () => {
    const component = new IoRadioGroup();
    const host = document.createElement('io-radio-group');
    const radio = Object.assign(document.createElement('io-radio'), { value: 'x', name: '', checked: false, disabled: true });
    host.appendChild(radio);
    (component as any).el = host;
    (component as any).change = { emit: vi.fn() };
    component.name = 'g';
    component.value = '';

    // Group starts disabled — radio should be disabled
    component.disabled = true;
    (component as any).syncChildren();
    expect(radio.disabled).toBe(true);

    // Re-enable the group — radio should be re-enabled
    component.disabled = false;
    (component as any).syncChildren();
    expect(radio.disabled).toBe(false);
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

describe('io-radio-group — render() role and aria-orientation', () => {
  beforeEach(() => {
    vi.mocked(h).mockClear();
  });

  it('renders fieldset with role="radiogroup" for valid aria-orientation', () => {
    const component = new IoRadioGroup();
    (component as any).el = document.createElement('io-radio-group');
    (component as any).change = { emit: vi.fn() };
    (component as any).errorId = 'io-rg-error-test';
    component.label = 'Choose an option';
    component.name = 'choice';
    component.orientation = 'vertical';

    component.render();

    const fieldsetProps = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>]>)
      .filter(args => args[0] === 'fieldset')
      .map(args => args[1]);

    expect(fieldsetProps.length).toBeGreaterThanOrEqual(1);
    expect(fieldsetProps[0]?.['role']).toBe('radiogroup');
  });

  it('passes aria-orientation to the fieldset with role="radiogroup"', () => {
    const component = new IoRadioGroup();
    (component as any).el = document.createElement('io-radio-group');
    (component as any).change = { emit: vi.fn() };
    (component as any).errorId = 'io-rg-error-test';
    component.label = 'Choose an option';
    component.name = 'choice';
    component.orientation = 'horizontal';

    component.render();

    const fieldsetProps = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>]>)
      .filter(args => args[0] === 'fieldset')
      .map(args => args[1]);

    expect(fieldsetProps[0]?.['aria-orientation']).toBe('horizontal');
  });

  it('sets aria-required="true" on fieldset when required=true', () => {
    const component = new IoRadioGroup();
    (component as any).el = document.createElement('io-radio-group');
    (component as any).change = { emit: vi.fn() };
    (component as any).errorId = 'io-rg-error-test';
    component.label = 'Choose an option';
    component.name = 'choice';
    component.required = true;

    component.render();

    const fieldsetProps = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>]>)
      .filter(args => args[0] === 'fieldset')
      .map(args => args[1]);

    expect(fieldsetProps[0]?.['aria-required']).toBe('true');
  });

  it('omits aria-required when required=false', () => {
    const component = new IoRadioGroup();
    (component as any).el = document.createElement('io-radio-group');
    (component as any).change = { emit: vi.fn() };
    (component as any).errorId = 'io-rg-error-test';
    component.label = 'Choose an option';
    component.name = 'choice';
    component.required = false;

    component.render();

    const fieldsetProps = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>]>)
      .filter(args => args[0] === 'fieldset')
      .map(args => args[1]);

    expect(fieldsetProps[0]?.['aria-required']).toBeUndefined();
  });
});

describe('io-radio-group — loading prop', () => {
  beforeEach(() => {
    vi.mocked(h).mockClear();
  });

  it('sets aria-busy="true" on Host when loading=true', () => {
    const component = new IoRadioGroup();
    (component as any).el = document.createElement('io-radio-group');
    (component as any).change = { emit: vi.fn() };
    (component as any).errorId = 'io-rg-error-test';
    component.label = 'Choose an option';
    component.name = 'choice';
    component.loading = true;

    component.render();

    // In the Stencil unit-test mock, Host resolves to undefined,
    // so the h() call for <Host> has undefined as its first argument.
    const hostCall = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>]>).find(
      call => call[0] == null && call[1]?.['aria-busy'] !== undefined,
    );
    expect(hostCall?.[1]?.['aria-busy']).toBe('true');
  });

  it('omits aria-busy when loading=false', () => {
    const component = new IoRadioGroup();
    (component as any).el = document.createElement('io-radio-group');
    (component as any).change = { emit: vi.fn() };
    (component as any).errorId = 'io-rg-error-test';
    component.label = 'Choose an option';
    component.name = 'choice';
    component.loading = false;

    component.render();

    const hostCall = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>]>).find(
      call => call[0] == null && call[1]?.['aria-busy'] !== undefined,
    );
    expect(hostCall).toBeUndefined();
  });

  it('renders io-spinner when loading=true', () => {
    const component = new IoRadioGroup();
    (component as any).el = document.createElement('io-radio-group');
    (component as any).change = { emit: vi.fn() };
    (component as any).errorId = 'io-rg-error-test';
    component.label = 'Choose an option';
    component.name = 'choice';
    component.loading = true;

    component.render();

    const spinnerCall = vi.mocked(h).mock.calls.find(call => call[0] === 'io-spinner');
    expect(spinnerCall).toBeDefined();
  });

  it('does not render io-spinner when loading=false', () => {
    const component = new IoRadioGroup();
    (component as any).el = document.createElement('io-radio-group');
    (component as any).change = { emit: vi.fn() };
    (component as any).errorId = 'io-rg-error-test';
    component.label = 'Choose an option';
    component.name = 'choice';
    component.loading = false;

    component.render();

    const spinnerCall = vi.mocked(h).mock.calls.find(call => call[0] === 'io-spinner');
    expect(spinnerCall).toBeUndefined();
  });
});

describe('io-radio-group — description prop', () => {
  beforeEach(() => {
    vi.mocked(h).mockClear();
  });

  it('has undefined description by default', () => {
    const component = new IoRadioGroup();
    expect(component.description).toBeUndefined();
  });

  it('accepts a description string', () => {
    const component = new IoRadioGroup();
    component.description = 'Choose how you prefer to be contacted.';
    expect(component.description).toBe('Choose how you prefer to be contacted.');
  });

  it('generates a descriptionId in componentWillLoad', () => {
    const component = new IoRadioGroup();
    (component as any).el = document.createElement('io-radio-group');
    (component as any).change = { emit: vi.fn() };
    (component as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    component.label = 'Contact';
    component.name = 'contact';
    (component as any).componentWillLoad();
    const id = (component as any).descriptionId as string;
    expect(id).toMatch(/^io-rg-desc-/);
  });

  it('renders description <p> when description is set', () => {
    const component = new IoRadioGroup();
    (component as any).el = document.createElement('io-radio-group');
    (component as any).change = { emit: vi.fn() };
    (component as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    (component as any).errorId = 'io-rg-error-test';
    (component as any).descriptionId = 'io-rg-desc-test';
    component.label = 'Contact';
    component.name = 'contact';
    component.description = 'Choose how you prefer to be contacted.';

    vi.mocked(h).mockClear();
    component.render();

    const pCalls = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>, ...unknown[]]>)
      .filter(call => call[0] === 'p' && (call[1] as Record<string, unknown>)?.['class'] === 'radio-group__description');
    expect(pCalls.length).toBe(1);
  });

  it('does not render description <p> when description is undefined', () => {
    const component = new IoRadioGroup();
    (component as any).el = document.createElement('io-radio-group');
    (component as any).change = { emit: vi.fn() };
    (component as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    (component as any).errorId = 'io-rg-error-test';
    (component as any).descriptionId = 'io-rg-desc-test';
    component.label = 'Contact';
    component.name = 'contact';
    component.description = undefined;

    vi.mocked(h).mockClear();
    component.render();

    const pCalls = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>, ...unknown[]]>)
      .filter(call => call[0] === 'p' && (call[1] as Record<string, unknown>)?.['class'] === 'radio-group__description');
    expect(pCalls.length).toBe(0);
  });

  it('includes descriptionId in aria-describedby on fieldset when description is set', () => {
    const component = new IoRadioGroup();
    (component as any).el = document.createElement('io-radio-group');
    (component as any).change = { emit: vi.fn() };
    (component as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    (component as any).errorId = 'io-rg-error-test';
    (component as any).descriptionId = 'io-rg-desc-test';
    component.label = 'Contact';
    component.name = 'contact';
    component.description = 'Choose how you prefer to be contacted.';

    vi.mocked(h).mockClear();
    component.render();

    const fieldsetCalls = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>]>)
      .filter(call => call[0] === 'fieldset');
    const fieldsetProps = fieldsetCalls[0]?.[1] as Record<string, unknown>;
    expect(String(fieldsetProps?.['aria-describedby'] ?? '')).toContain('io-rg-desc-test');
  });
});

describe('io-radio-group — error paragraph semantics (#856)', () => {
  it('error paragraph uses role="alert" and aria-atomic="true", not aria-live', () => {
    const component = new IoRadioGroup();
    (component as any).el = document.createElement('io-radio-group');
    (component as any).change = { emit: vi.fn() };
    (component as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    (component as any).errorId = 'io-rg-error-test';
    (component as any).descriptionId = 'io-rg-desc-test';
    (component as any).legendId = 'io-rg-legend-test';
    component.label = 'Contact';
    component.name = 'contact';
    component.error = true;
    component.errorMessage = 'Please select an option';

    vi.mocked(h).mockClear();
    component.render();

    const pCalls = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>, ...unknown[]]>)
      .filter(([tag, attrs]) => tag === 'p' && (attrs?.class as string)?.includes('radio-group__error'));
    expect(pCalls.length).toBe(1);
    const errorProps = pCalls[0][1];
    expect(errorProps?.['role']).toBe('alert');
    expect(errorProps?.['aria-atomic']).toBe('true');
    expect(errorProps?.['aria-live']).toBeUndefined();
  });
});

describe('io-radio-group — aria-labelledby on fieldset (#1154)', () => {
  beforeEach(() => {
    vi.mocked(h).mockClear();
  });

  it('generates a legendId in componentWillLoad', () => {
    const component = new IoRadioGroup();
    (component as any).el = document.createElement('io-radio-group');
    (component as any).change = { emit: vi.fn() };
    (component as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    component.label = 'Contact';
    component.name = 'contact';
    (component as any).componentWillLoad();
    const id = (component as any).legendId as string;
    expect(id).toMatch(/^io-rg-legend-/);
  });

  it('fieldset has aria-labelledby pointing to legendId', () => {
    const component = new IoRadioGroup();
    (component as any).el = document.createElement('io-radio-group');
    (component as any).change = { emit: vi.fn() };
    (component as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    (component as any).errorId = 'io-rg-error-test';
    (component as any).descriptionId = 'io-rg-desc-test';
    (component as any).legendId = 'io-rg-legend-test';
    component.label = 'Contact';
    component.name = 'contact';

    vi.mocked(h).mockClear();
    component.render();

    const fieldsetCalls = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>]>)
      .filter(call => call[0] === 'fieldset');
    const fieldsetProps = fieldsetCalls[0]?.[1] as Record<string, unknown>;
    expect(fieldsetProps?.['aria-labelledby']).toBe('io-rg-legend-test');
  });

  it('legend element has id matching legendId', () => {
    const component = new IoRadioGroup();
    (component as any).el = document.createElement('io-radio-group');
    (component as any).change = { emit: vi.fn() };
    (component as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    (component as any).errorId = 'io-rg-error-test';
    (component as any).descriptionId = 'io-rg-desc-test';
    (component as any).legendId = 'io-rg-legend-test';
    component.label = 'Contact';
    component.name = 'contact';

    vi.mocked(h).mockClear();
    component.render();

    const legendCalls = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>]>)
      .filter(call => call[0] === 'legend');
    const legendProps = legendCalls[0]?.[1] as Record<string, unknown>;
    expect(legendProps?.['id']).toBe('io-rg-legend-test');
  });
});

describe('io-radio-group — state/message API (#1152)', () => {
  beforeEach(() => {
    vi.mocked(h).mockClear();
  });

  it('state defaults to "none"', () => {
    const component = new IoRadioGroup();
    expect(component.state).toBe('none');
  });

  it('message defaults to empty string', () => {
    const component = new IoRadioGroup();
    expect(component.message).toBe('');
  });

  it('propagates state="error" to child radios via syncChildren', () => {
    const component = new IoRadioGroup();
    const host = document.createElement('io-radio-group');
    const radio = Object.assign(document.createElement('io-radio'), {
      value: 'a', name: '', checked: false, disabled: false, required: false, state: 'none',
    });
    host.appendChild(radio);
    (component as any).el = host;
    (component as any).change = { emit: vi.fn() };
    component.name = 'choice';
    component.state = 'error';

    (component as any).syncChildren();

    expect((radio as any).state).toBe('error');
  });

  it('propagates state="success" to child radios via syncChildren', () => {
    const component = new IoRadioGroup();
    const host = document.createElement('io-radio-group');
    const radio = Object.assign(document.createElement('io-radio'), {
      value: 'a', name: '', checked: false, disabled: false, required: false, state: 'none',
    });
    host.appendChild(radio);
    (component as any).el = host;
    (component as any).change = { emit: vi.fn() };
    component.name = 'choice';
    component.state = 'success';

    (component as any).syncChildren();

    expect((radio as any).state).toBe('success');
  });

  it('legacy error=true maps to state="error" for children', () => {
    const component = new IoRadioGroup();
    const host = document.createElement('io-radio-group');
    const radio = Object.assign(document.createElement('io-radio'), {
      value: 'a', name: '', checked: false, disabled: false, required: false, state: 'none',
    });
    host.appendChild(radio);
    (component as any).el = host;
    (component as any).change = { emit: vi.fn() };
    component.name = 'choice';
    component.error = true;

    (component as any).syncChildren();

    expect((radio as any).state).toBe('error');
  });

  it('explicit state prop takes precedence over legacy error prop', () => {
    const component = new IoRadioGroup();
    const host = document.createElement('io-radio-group');
    const radio = Object.assign(document.createElement('io-radio'), {
      value: 'a', name: '', checked: false, disabled: false, required: false, state: 'none',
    });
    host.appendChild(radio);
    (component as any).el = host;
    (component as any).change = { emit: vi.fn() };
    component.name = 'choice';
    component.state = 'warning';
    component.error = true;

    (component as any).syncChildren();

    // state="warning" takes precedence over error=true
    expect((radio as any).state).toBe('warning');
  });

  it('renders message paragraph with role="status" when state="success"', () => {
    const component = new IoRadioGroup();
    (component as any).el = document.createElement('io-radio-group');
    (component as any).change = { emit: vi.fn() };
    (component as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    (component as any).errorId = 'io-rg-error-test';
    (component as any).descriptionId = 'io-rg-desc-test';
    (component as any).legendId = 'io-rg-legend-test';
    component.label = 'Contact';
    component.name = 'contact';
    component.state = 'success';
    component.message = 'Looks good!';

    vi.mocked(h).mockClear();
    component.render();

    const pCalls = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>, ...unknown[]]>)
      .filter(([tag, attrs]) => tag === 'p' && (attrs?.class as string)?.includes('radio-group__error'));
    expect(pCalls.length).toBe(1);
    expect(pCalls[0][1]?.['role']).toBe('status');
  });
});
