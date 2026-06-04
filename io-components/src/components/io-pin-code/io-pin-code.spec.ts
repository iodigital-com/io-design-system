/**
 * io-pin-code — default props and render tests
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

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
