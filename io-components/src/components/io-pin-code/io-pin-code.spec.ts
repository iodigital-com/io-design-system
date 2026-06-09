/**
 * io-pin-code — default props and render tests
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { h, Host } from '@stencil/core';

import { IoPinCode } from './io-pin-code';

describe('io-pin-code — default props', () => {
  let component: IoPinCode;

  beforeEach(() => {
    component = new IoPinCode();
    (component as any).el = document.createElement('io-pin-code');
    (component as any).change = { emit: vi.fn() };
  });

  it('has default length of 4', () => {
    expect(component.length).toBe(4);
  });

  it('has default type of "number"', () => {
    expect(component.type).toBe('number');
  });

  it('has default value of empty string', () => {
    expect(component.value).toBe('');
  });

  it('is not disabled by default', () => {
    expect(component.disabled).toBe(false);
  });

  it('is not required by default', () => {
    expect(component.required).toBe(false);
  });

  it('has default state of "none"', () => {
    expect(component.state).toBe('none');
  });

  it('has no label by default', () => {
    expect(component.label).toBeUndefined();
  });

  it('has no message by default', () => {
    expect(component.message).toBeUndefined();
  });

  it('has no name by default', () => {
    expect(component.name).toBeUndefined();
  });

  it('faceInvalid is false by default', () => {
    expect((component as any).faceInvalid).toBe(false);
  });
});

describe('io-pin-code — componentWillLoad initialisation', () => {
  it('splits initial value into digits array', () => {
    const component = new IoPinCode();
    (component as any).el = document.createElement('io-pin-code');
    (component as any).change = { emit: vi.fn() };
    component.value = '12';
    (component as any).componentWillLoad();
    expect((component as any).digits).toEqual(['1', '2', '', '']);
  });

  it('pads empty value to full length with empty strings', () => {
    const component = new IoPinCode();
    (component as any).el = document.createElement('io-pin-code');
    (component as any).change = { emit: vi.fn() };
    component.value = '';
    (component as any).componentWillLoad();
    expect((component as any).digits).toHaveLength(4);
    expect((component as any).digits.every((d: string) => d === '')).toBe(true);
  });

  it('generates digit labels for each slot', () => {
    const component = new IoPinCode();
    (component as any).el = document.createElement('io-pin-code');
    (component as any).change = { emit: vi.fn() };
    component.length = 4;
    (component as any).componentWillLoad();
    expect((component as any).digitLabels).toEqual([
      'Digit 1 of 4',
      'Digit 2 of 4',
      'Digit 3 of 4',
      'Digit 4 of 4',
    ]);
  });

  it('generates correct labels for length=6', () => {
    const component = new IoPinCode();
    (component as any).el = document.createElement('io-pin-code');
    (component as any).change = { emit: vi.fn() };
    component.length = 6;
    (component as any).componentWillLoad();
    expect((component as any).digitLabels[0]).toBe('Digit 1 of 6');
    expect((component as any).digitLabels[5]).toBe('Digit 6 of 6');
  });
});

describe('io-pin-code — setFocus method', () => {
  it('focuses the first empty slot', async () => {
    const component = new IoPinCode();
    (component as any).el = document.createElement('io-pin-code');
    (component as any).change = { emit: vi.fn() };
    component.value = '12';
    (component as any).componentWillLoad();
    const focusMock = vi.fn();
    (component as any).inputRefs = [null, null, { focus: focusMock }, null];
    await component.setFocus();
    expect(focusMock).toHaveBeenCalled();
  });

  it('focuses the last slot when all digits are filled', async () => {
    const component = new IoPinCode();
    (component as any).el = document.createElement('io-pin-code');
    (component as any).change = { emit: vi.fn() };
    component.value = '1234';
    (component as any).componentWillLoad();
    const focusMock = vi.fn();
    (component as any).inputRefs = [null, null, null, { focus: focusMock }];
    await component.setFocus();
    expect(focusMock).toHaveBeenCalled();
  });
});

describe('io-pin-code — formDisabledCallback', () => {
  let component: IoPinCode;

  beforeEach(() => {
    component = new IoPinCode();
    (component as any).el = document.createElement('io-pin-code');
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

describe('io-pin-code — hideLabel prop', () => {
  let component: IoPinCode;

  beforeEach(() => {
    component = new IoPinCode();
    (component as any).el = document.createElement('io-pin-code');
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
    component.hideLabel = true;
    (component as any).componentWillLoad();
    expect(warnSpy).toHaveBeenCalledWith('[io-pin-code] hideLabel=true requires a non-empty label for accessibility.');
    warnSpy.mockRestore();
  });

  it('does not warn when hideLabel=true and label is provided', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    component.hideLabel = true;
    component.label = 'Enter PIN';
    (component as any).componentWillLoad();
    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('does not warn when hideLabel=true and label is empty but host has aria-label', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    (component as any).el.setAttribute('aria-label', 'External label');
    component.hideLabel = true;
    (component as any).componentWillLoad();
    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});

describe('io-pin-code — hideLabel render', () => {
  let component: IoPinCode;

  function makeRenderComp(overrides: Partial<IoPinCode> = {}): IoPinCode {
    const comp = new IoPinCode();
    (comp as any).el = document.createElement('io-pin-code');
    (comp as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    (comp as any).change = { emit: vi.fn() };
    Object.assign(comp, overrides);
    return comp;
  }

  beforeEach(() => {
    component = makeRenderComp();
  });

  it('does not render pin-code__label span when hideLabel=true', () => {
    component.label = 'Enter PIN';
    component.hideLabel = true;
    vi.mocked(h).mockClear();
    component.render();
    const labelSpan = vi.mocked(h).mock.calls
      .filter(args => args[0] === 'span')
      .find(args => (args[1] as any)?.class === 'pin-code__label');
    expect(labelSpan).toBeUndefined();
  });

  it('renders pin-code__label span when hideLabel=false and label is provided', () => {
    component.label = 'Enter PIN';
    component.hideLabel = false;
    vi.mocked(h).mockClear();
    component.render();
    const labelSpan = vi.mocked(h).mock.calls
      .filter(args => args[0] === 'span')
      .find(args => (args[1] as any)?.class === 'pin-code__label');
    expect(labelSpan).toBeDefined();
  });

  it('Host has aria-label and no aria-labelledby when hideLabel=true and label provided', () => {
    component.label = 'Enter PIN';
    component.hideLabel = true;
    vi.mocked(h).mockClear();
    component.render();
    const hostCall = vi.mocked(h).mock.calls.find(args => args[0] === Host);
    const hostProps = hostCall?.[1] as Record<string, unknown>;
    expect(hostProps?.['aria-label']).toBe('Enter PIN');
    expect(hostProps?.['aria-labelledby']).toBeUndefined();
  });
});
