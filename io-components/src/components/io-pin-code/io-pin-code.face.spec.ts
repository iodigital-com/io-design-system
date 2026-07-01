/**
 * io-pin-code — FACE (Form-Associated Custom Elements) unit tests
 *
 * Covers: syncFormValue, formResetCallback, checkValidity, reportValidity
 */
import { describe, it, expect, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoPinCode } from './io-pin-code';

function makeInternals() {
  return {
    setFormValue: vi.fn(),
    setValidity: vi.fn(),
    checkValidity: vi.fn().mockReturnValue(true),
    reportValidity: vi.fn().mockReturnValue(true),
  };
}

function makeComponent(value = '', required = false) {
  const component = new IoPinCode();
  (component as any).el = document.createElement('io-pin-code');
  (component as any).change = { emit: vi.fn() };
  component.value = value;
  component.required = required;
  (component as any).componentWillLoad();
  return component;
}

describe('io-pin-code — FACE: syncFormValue', () => {
  it('calls setFormValue with empty PIN value initially', () => {
    const component = makeComponent();
    const internals = makeInternals();
    (component as any).internals = internals;
    (component as any).syncFormValue();
    expect(internals.setFormValue).toHaveBeenCalledWith(null);
  });

  it('calls setFormValue with complete PIN value', () => {
    const component = makeComponent('1234');
    const internals = makeInternals();
    (component as any).internals = internals;
    (component as any).syncFormValue();
    expect(internals.setFormValue).toHaveBeenCalledWith('1234');
  });

  it('sets valueMissing when required and PIN is incomplete', () => {
    const component = makeComponent('', true);
    const internals = makeInternals();
    (component as any).internals = internals;
    (component as any).syncFormValue();
    expect(internals.setValidity).toHaveBeenCalledWith(
      { valueMissing: true },
      'Please complete the PIN',
    );
  });

  it('clears validity when required and PIN is complete', () => {
    const component = makeComponent('1234', true);
    const internals = makeInternals();
    (component as any).internals = internals;
    (component as any).syncFormValue();
    expect(internals.setValidity).toHaveBeenCalledWith({});
  });

  it('clears validity when not required and PIN is empty', () => {
    const component = makeComponent('', false);
    const internals = makeInternals();
    (component as any).internals = internals;
    (component as any).syncFormValue();
    expect(internals.setValidity).toHaveBeenCalledWith({});
  });

  it('sets faceInvalid=true when required, incomplete, and touched', () => {
    const component = makeComponent('12', true);
    (component as any).internals = makeInternals();
    (component as any).touched = true;
    (component as any).syncFormValue();
    expect((component as any).faceInvalid).toBe(true);
  });

  it('keeps faceInvalid=false when required and incomplete but not yet touched', () => {
    const component = makeComponent('12', true);
    (component as any).internals = makeInternals();
    (component as any).syncFormValue();
    expect((component as any).faceInvalid).toBe(false);
  });

  it('sets faceInvalid=false when required and complete', () => {
    const component = makeComponent('1234', true);
    (component as any).internals = makeInternals();
    (component as any).syncFormValue();
    expect((component as any).faceInvalid).toBe(false);
  });

  it('sets faceInvalid=false when not required', () => {
    const component = makeComponent('', false);
    (component as any).internals = makeInternals();
    (component as any).syncFormValue();
    expect((component as any).faceInvalid).toBe(false);
  });
});

describe('io-pin-code — FACE: formResetCallback', () => {
  it('resets value to defaultValue', () => {
    const component = makeComponent('12');
    const internals = makeInternals();
    (component as any).internals = internals;

    // Simulate user filling all slots
    component.value = '1234';
    (component as any).digits = ['1', '2', '3', '4'];

    (component as any).formResetCallback();
    expect(component.value).toBe('12');
  });

  it('resets digits array to initial value', () => {
    const component = makeComponent('');
    (component as any).internals = makeInternals();

    (component as any).digits = ['9', '8', '7', '6'];
    (component as any).formResetCallback();

    expect((component as any).digits).toEqual(['', '', '', '']);
  });

  it('clears faceInvalid on reset', () => {
    const component = makeComponent('', true);
    (component as any).internals = makeInternals();
    (component as any).faceInvalid = true;

    (component as any).formResetCallback();
    expect((component as any).faceInvalid).toBe(false);
  });

  it('resets touched to false on reset', () => {
    const component = makeComponent('', true);
    (component as any).internals = makeInternals();
    (component as any).touched = true;

    (component as any).formResetCallback();
    expect((component as any).touched).toBe(false);
  });

  it('calls setFormValue with null when reset to empty', () => {
    const component = makeComponent('');
    const internals = makeInternals();
    (component as any).internals = internals;

    (component as any).formResetCallback();
    expect(internals.setFormValue).toHaveBeenCalledWith(null);
  });
});

describe('io-pin-code — FACE: handleBlur touched gate', () => {
  it('does not set touched when focus moves to another slot input', () => {
    const component = makeComponent('', true);
    const slotInput = document.createElement('input');
    (component as any).inputRefs = [slotInput, null, null, null];

    const ev = new FocusEvent('blur', { relatedTarget: slotInput });
    (component as any).handleBlur(ev);

    expect((component as any).touched).toBe(false);
  });

  it('sets touched when focus leaves component entirely (relatedTarget not in inputRefs)', () => {
    const component = makeComponent('', true);
    (component as any).internals = makeInternals();
    (component as any).inputRefs = [null, null, null, null];

    const outsideEl = document.createElement('button');
    const ev = new FocusEvent('blur', { relatedTarget: outsideEl });
    (component as any).handleBlur(ev);

    expect((component as any).touched).toBe(true);
  });
});

describe('io-pin-code — FACE: blur event emission', () => {
  it('does not emit blur when focus moves between slots', () => {
    const component = makeComponent('', true);
    (component as any).internals = makeInternals();
    const slotInput = document.createElement('input');
    (component as any).inputRefs = [slotInput, null, null, null];
    const blurEmit = vi.fn();
    (component as any).blur = { emit: blurEmit };

    const ev = new FocusEvent('blur', { relatedTarget: slotInput });
    (component as any).handleBlur(ev);

    expect(blurEmit).not.toHaveBeenCalled();
  });

  it('emits blur with FocusEvent when focus leaves component entirely', () => {
    const component = makeComponent('', true);
    (component as any).internals = makeInternals();
    (component as any).inputRefs = [null, null, null, null];
    const blurEmit = vi.fn();
    (component as any).blur = { emit: blurEmit };

    const outsideEl = document.createElement('button');
    const ev = new FocusEvent('blur', { relatedTarget: outsideEl });
    (component as any).handleBlur(ev);

    expect(blurEmit).toHaveBeenCalledOnce();
    expect(blurEmit).toHaveBeenCalledWith(ev);
  });
});

describe('io-pin-code — FACE: faceError render (#814)', () => {
  it('renders FACE error paragraph with role="alert" when faceInvalid=true and message absent', () => {
    const component = makeComponent('', true);
    (component as any).internals = makeInternals();
    (component as any).faceInvalid = true;
    component.message = undefined;
    (h as ReturnType<typeof vi.fn>).mockClear();
    (component as any).render();
    const calls = (h as ReturnType<typeof vi.fn>).mock.calls as Array<[unknown, Record<string, unknown> | null, ...unknown[]]>;
    const errorP = calls.find(([tag, attrs]) => tag === 'p' && attrs?.['role'] === 'alert');
    expect(errorP).toBeDefined();
  });

  it('aria-describedby on pin-code slots references faceErrorId when showFaceError', () => {
    const component = makeComponent('', true);
    (component as any).internals = makeInternals();
    (component as any).faceInvalid = true;
    component.message = undefined;
    (h as ReturnType<typeof vi.fn>).mockClear();
    (component as any).render();
    const calls = (h as ReturnType<typeof vi.fn>).mock.calls as Array<[unknown, Record<string, unknown> | null, ...unknown[]]>;
    const slotsDiv = calls.find(([tag, attrs]) => tag === 'div' && typeof attrs?.['aria-describedby'] === 'string' && (attrs['aria-describedby'] as string).includes('face-error'));
    expect(slotsDiv).toBeDefined();
  });

  it('does not render FACE error paragraph when faceInvalid=false', () => {
    const component = makeComponent('', true);
    (component as any).internals = makeInternals();
    (component as any).faceInvalid = false;
    component.message = undefined;
    (h as ReturnType<typeof vi.fn>).mockClear();
    (component as any).render();
    const calls = (h as ReturnType<typeof vi.fn>).mock.calls as Array<[unknown, Record<string, unknown> | null, ...unknown[]]>;
    const errorP = calls.find(([tag, attrs]) => tag === 'p' && attrs?.['role'] === 'alert');
    expect(errorP).toBeUndefined();
  });

  it('does not render FACE error paragraph when message is set (prop error shows instead)', () => {
    const component = makeComponent('', true);
    (component as any).internals = makeInternals();
    (component as any).faceInvalid = true;
    component.message = 'Custom error';
    (h as ReturnType<typeof vi.fn>).mockClear();
    (component as any).render();
    const calls = (h as ReturnType<typeof vi.fn>).mock.calls as Array<[unknown, Record<string, unknown> | null, ...unknown[]]>;
    // When message is set, faceError paragraph is suppressed; message paragraph renders instead
    const faceErrorPs = calls.filter(([tag, attrs]) => tag === 'p' && attrs?.['role'] === 'alert' && typeof attrs?.['id'] === 'string' && (attrs['id'] as string).includes('face-error'));
    expect(faceErrorPs).toHaveLength(0);
  });
});

describe('io-pin-code — FACE: checkValidity and reportValidity', () => {
  it('checkValidity delegates to internals', async () => {
    const component = makeComponent();
    const internals = makeInternals();
    internals.checkValidity.mockReturnValue(false);
    (component as any).internals = internals;
    expect(await component.checkValidity()).toBe(false);
  });

  it('checkValidity returns true when internals unavailable', async () => {
    const component = makeComponent();
    (component as any).internals = undefined;
    expect(await component.checkValidity()).toBe(true);
  });

  it('reportValidity delegates to internals', async () => {
    const component = makeComponent();
    const internals = makeInternals();
    internals.reportValidity.mockReturnValue(false);
    (component as any).internals = internals;
    expect(await component.reportValidity()).toBe(false);
  });

  it('reportValidity returns true when internals unavailable', async () => {
    const component = makeComponent();
    (component as any).internals = undefined;
    expect(await component.reportValidity()).toBe(true);
  });
});

describe('io-pin-code — FACE: validationMessage prop override (#1079)', () => {
  it('uses default message when validationMessage is not set', () => {
    const component = makeComponent('', true);
    const internals = makeInternals();
    (component as any).internals = internals;
    (component as any).syncFormValue();
    expect(internals.setValidity).toHaveBeenCalledWith(
      { valueMissing: true },
      'Please complete the PIN',
    );
  });

  it('uses validationMessage when set', () => {
    const component = makeComponent('', true);
    component.validationMessage = 'Please fill in all fields';
    const internals = makeInternals();
    (component as any).internals = internals;
    (component as any).syncFormValue();
    expect(internals.setValidity).toHaveBeenCalledWith(
      { valueMissing: true },
      'Please fill in all fields',
    );
  });

  it('uses default message when validationMessage is undefined', () => {
    const component = makeComponent('', true);
    component.validationMessage = undefined;
    const internals = makeInternals();
    (component as any).internals = internals;
    (component as any).syncFormValue();
    expect(internals.setValidity).toHaveBeenCalledWith(
      { valueMissing: true },
      'Please complete the PIN',
    );
  });
});
