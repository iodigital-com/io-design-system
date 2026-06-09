/**
 * io-pin-code — lifecycle, @Watch handlers, handleFocus, slot/message class
 * variants, checkValidity/reportValidity methods, and style coverage.
 *
 * Fills the gaps not covered by the existing spec files:
 *   - onValueChange / onRequiredChange / onLengthChange (@Watch)
 *   - formResetCallback (lifecycle — faceInvalid branch only covered here
 *     for the required+incomplete path)
 *   - handleKeydown Tab key (no preventDefault) and non-digit printable key
 *   - handleInput auto-advance focus, no-advance at last slot
 *   - handleFocus (input.select())
 *   - getSlotClass success / warning variants
 *   - getMessageClass success / warning variants
 *   - checkValidity / reportValidity public methods
 *   - syncFormValue required+incomplete → faceInvalid=true
 *   - syncFormValue required+complete → faceInvalid=false
 *   - getPinCodeStyles coverage (0% → 100%)
 */
import { describe, it, expect, vi } from 'vitest';

import { IoPinCode } from './io-pin-code';
import { getPinCodeStyles } from './io-pin-code-styles';

// ── Shared factory ─────────────────────────────────────────────────────────

function makeInternals() {
  return {
    setFormValue: vi.fn(),
    setValidity: vi.fn(),
    checkValidity: vi.fn().mockReturnValue(true),
    reportValidity: vi.fn().mockReturnValue(true),
  };
}

function makeComponent(
  opts: {
    value?: string;
    length?: 3 | 4 | 5 | 6;
    required?: boolean;
    disabled?: boolean;
  } = {},
) {
  const c = new IoPinCode();
  (c as any).el = document.createElement('io-pin-code');
  (c as any).change = { emit: vi.fn() };
  (c as any).internals = makeInternals();
  Object.assign(c, opts);
  (c as any).componentWillLoad();
  return c;
}

function makeFocusRefs(length: number) {
  return Array.from({ length }, () => ({ focus: vi.fn() }));
}

// ── @Watch('value') ────────────────────────────────────────────────────────

describe('io-pin-code — onValueChange (@Watch value)', () => {
  it('re-splits digits when value prop changes', () => {
    const c = makeComponent({ value: '' });

    (c as any).onValueChange('567');

    expect((c as any).digits).toEqual(['5', '6', '7', '']);
  });

  it('pads a shorter value with empty strings to match length', () => {
    const c = makeComponent({ value: '1234' });

    (c as any).onValueChange('9');

    expect((c as any).digits).toEqual(['9', '', '', '']);
  });

  it('treats null/undefined new value as empty string', () => {
    const c = makeComponent({ value: '1234' });

    (c as any).onValueChange(undefined as unknown as string);

    expect((c as any).digits).toEqual(['', '', '', '']);
  });

  it('calls setFormValue after value change', () => {
    const c = makeComponent({ value: '' });
    const internals = makeInternals();
    (c as any).internals = internals;

    (c as any).onValueChange('1234');

    expect(internals.setFormValue).toHaveBeenCalledWith('1234');
  });
});

// ── @Watch('required') ────────────────────────────────────────────────────

describe('io-pin-code — onRequiredChange (@Watch required)', () => {
  it('calls setValidity with valueMissing when required=true and PIN is incomplete', () => {
    const c = makeComponent({ value: '', required: false });
    const internals = makeInternals();
    (c as any).internals = internals;

    // Simulate prop flip to true then trigger watch
    c.required = true;
    (c as any).onRequiredChange();

    expect(internals.setValidity).toHaveBeenCalledWith(
      { valueMissing: true },
      'Please complete the PIN',
    );
  });

  it('sets faceInvalid=true when required+incomplete on onRequiredChange (touched)', () => {
    const c = makeComponent({ value: '12', required: true });
    (c as any).internals = makeInternals();
    (c as any).touched = true;

    (c as any).onRequiredChange();

    expect((c as any).faceInvalid).toBe(true);
  });

  it('clears setValidity when required becomes false', () => {
    const c = makeComponent({ value: '', required: true });
    const internals = makeInternals();
    (c as any).internals = internals;

    c.required = false;
    (c as any).onRequiredChange();

    expect(internals.setValidity).toHaveBeenCalledWith({});
  });
});

// ── @Watch('length') ──────────────────────────────────────────────────────

describe('io-pin-code — onLengthChange (@Watch length)', () => {
  it('re-splits digits to match new length', () => {
    const c = makeComponent({ value: '123456', length: 6 });

    c.length = 3;
    (c as any).onLengthChange();

    expect((c as any).digits).toHaveLength(3);
    expect((c as any).digits).toEqual(['1', '2', '3']);
  });

  it('regenerates digitLabels for new length', () => {
    const c = makeComponent({ length: 4 });

    c.length = 3;
    (c as any).onLengthChange();

    expect((c as any).digitLabels).toEqual([
      'Digit 1 of 3',
      'Digit 2 of 3',
      'Digit 3 of 3',
    ]);
  });

  it('resets inputRefs array to new length filled with null', () => {
    const c = makeComponent({ length: 4 });
    // Assign refs as if inputs are mounted
    (c as any).inputRefs = [{ focus: vi.fn() }, { focus: vi.fn() }, { focus: vi.fn() }, { focus: vi.fn() }];

    c.length = 3;
    (c as any).onLengthChange();

    expect((c as any).inputRefs).toHaveLength(3);
    expect((c as any).inputRefs.every((r: unknown) => r === null)).toBe(true);
  });

  it('calls setFormValue after length change', () => {
    const c = makeComponent({ value: '123456', length: 6 });
    const internals = makeInternals();
    (c as any).internals = internals;

    c.length = 4;
    (c as any).onLengthChange();

    expect(internals.setFormValue).toHaveBeenCalled();
  });
});

// ── formResetCallback ─────────────────────────────────────────────────────

describe('io-pin-code — formResetCallback (additional branch)', () => {
  it('restores defaultValue when reset after user edits', () => {
    const c = makeComponent({ value: '9' });
    (c as any).internals = makeInternals();

    // Simulate user filling all slots
    c.value = '1234';
    (c as any).digits = ['1', '2', '3', '4'];

    (c as any).formResetCallback();

    expect(c.value).toBe('9');
    expect((c as any).digits).toEqual(['9', '', '', '']);
  });

  it('clears faceInvalid even when required and reset value is incomplete', () => {
    const c = makeComponent({ value: '', required: true });
    (c as any).internals = makeInternals();
    (c as any).faceInvalid = true;

    (c as any).formResetCallback();

    // faceInvalid must be false after reset regardless of required state
    expect((c as any).faceInvalid).toBe(false);
  });
});

// ── handleKeydown: Tab key ────────────────────────────────────────────────

describe('io-pin-code — handleKeydown: Tab key', () => {
  it('does not call preventDefault for Tab — allows natural tab behaviour', () => {
    const c = makeComponent();
    (c as any).inputRefs = makeFocusRefs(4);

    const ev = new KeyboardEvent('keydown', { key: 'Tab', cancelable: true });
    const preventDefaultSpy = vi.spyOn(ev, 'preventDefault');

    (c as any).handleKeydown(ev, 1);

    expect(preventDefaultSpy).not.toHaveBeenCalled();
  });

  it('does not update any digit on Tab', () => {
    const c = makeComponent({ value: '1234' });
    (c as any).inputRefs = makeFocusRefs(4);

    const digitsBefore = [...(c as any).digits];
    const ev = new KeyboardEvent('keydown', { key: 'Tab', cancelable: true });
    (c as any).handleKeydown(ev, 0);

    expect((c as any).digits).toEqual(digitsBefore);
  });
});

// ── handleKeydown: non-digit printable key ─────────────────────────────────

describe('io-pin-code — handleKeydown: non-digit printable key', () => {
  it('calls preventDefault for a letter key', () => {
    const c = makeComponent();
    (c as any).inputRefs = makeFocusRefs(4);

    const ev = new KeyboardEvent('keydown', { key: 'a', cancelable: true });
    const preventDefaultSpy = vi.spyOn(ev, 'preventDefault');

    (c as any).handleKeydown(ev, 0);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('calls preventDefault for a symbol key', () => {
    const c = makeComponent();
    (c as any).inputRefs = makeFocusRefs(4);

    const ev = new KeyboardEvent('keydown', { key: '!', cancelable: true });
    const preventDefaultSpy = vi.spyOn(ev, 'preventDefault');

    (c as any).handleKeydown(ev, 0);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('does not update any digit when a letter key is pressed', () => {
    const c = makeComponent({ value: '1234' });
    (c as any).inputRefs = makeFocusRefs(4);

    const digitsBefore = [...(c as any).digits];
    const ev = new KeyboardEvent('keydown', { key: 'e', cancelable: true });
    (c as any).handleKeydown(ev, 2);

    expect((c as any).digits).toEqual(digitsBefore);
  });

  it('returns early without action when disabled — non-digit printable', () => {
    const c = makeComponent({ disabled: true });
    const emitMock = (c as any).change.emit as ReturnType<typeof vi.fn>;
    (c as any).inputRefs = makeFocusRefs(4);

    const ev = new KeyboardEvent('keydown', { key: 'a', cancelable: true });
    const preventDefaultSpy = vi.spyOn(ev, 'preventDefault');
    (c as any).handleKeydown(ev, 0);

    expect(preventDefaultSpy).not.toHaveBeenCalled();
    expect(emitMock).not.toHaveBeenCalled();
  });

  it('returns early without action when disabled — ArrowLeft', () => {
    const c = makeComponent({ disabled: true });
    const focusMocks = makeFocusRefs(4);
    (c as any).inputRefs = focusMocks;

    const ev = new KeyboardEvent('keydown', { key: 'ArrowLeft', cancelable: true });
    (c as any).handleKeydown(ev, 2);

    focusMocks.forEach((m) => expect(m.focus).not.toHaveBeenCalled());
  });

  it('returns early without action when disabled — ArrowRight', () => {
    const c = makeComponent({ disabled: true });
    const focusMocks = makeFocusRefs(4);
    (c as any).inputRefs = focusMocks;

    const ev = new KeyboardEvent('keydown', { key: 'ArrowRight', cancelable: true });
    (c as any).handleKeydown(ev, 1);

    focusMocks.forEach((m) => expect(m.focus).not.toHaveBeenCalled());
  });
});

// ── handleInput: auto-advance focus ───────────────────────────────────────

describe('io-pin-code — handleInput: auto-advance focus', () => {
  it('focuses next slot after a valid digit is entered via input event', () => {
    const c = makeComponent();
    const focusMocks = makeFocusRefs(4);
    (c as any).inputRefs = focusMocks;

    const input = document.createElement('input');
    input.value = '3';
    const ev = new InputEvent('input');
    Object.defineProperty(ev, 'target', { value: input });

    (c as any).handleInput(ev, 1);

    expect(focusMocks[2].focus).toHaveBeenCalled();
  });

  it('does not focus beyond last slot when at last index', () => {
    const c = makeComponent();
    const focusMocks = makeFocusRefs(4);
    (c as any).inputRefs = focusMocks;

    const input = document.createElement('input');
    input.value = '9';
    const ev = new InputEvent('input');
    Object.defineProperty(ev, 'target', { value: input });

    (c as any).handleInput(ev, 3); // last slot (index === length - 1)

    // slot 3 focus should NOT have been called for auto-advance
    // (digit is updated but no forward focus move occurs)
    expect(focusMocks[3].focus).not.toHaveBeenCalled();
  });

  it('updates the digit even at the last slot', () => {
    const c = makeComponent();
    (c as any).inputRefs = makeFocusRefs(4);

    const input = document.createElement('input');
    input.value = '7';
    const ev = new InputEvent('input');
    Object.defineProperty(ev, 'target', { value: input });

    (c as any).handleInput(ev, 3);

    expect((c as any).digits[3]).toBe('7');
  });
});

// ── handleFocus ───────────────────────────────────────────────────────────

describe('io-pin-code — handleFocus', () => {
  it('calls input.select() when the slot receives focus', () => {
    const c = makeComponent();

    const selectMock = vi.fn();
    const input = document.createElement('input');
    input.select = selectMock;

    const ev = new FocusEvent('focus');
    Object.defineProperty(ev, 'target', { value: input });

    (c as any).handleFocus(ev);

    expect(selectMock).toHaveBeenCalled();
  });
});

// ── getSlotClass variants ─────────────────────────────────────────────────

describe('io-pin-code — getSlotClass', () => {
  it('includes "pin-code__slot--success" for success state', () => {
    const c = makeComponent();
    c.state = 'success';

    const cls = (c as any).getSlotClass(0);

    expect(cls).toContain('pin-code__slot--success');
  });

  it('includes "pin-code__slot--warning" for warning state', () => {
    const c = makeComponent();
    c.state = 'warning';

    const cls = (c as any).getSlotClass(0);

    expect(cls).toContain('pin-code__slot--warning');
  });

  it('includes "pin-code__slot--error" for error state', () => {
    const c = makeComponent();
    c.state = 'error';

    const cls = (c as any).getSlotClass(0);

    expect(cls).toContain('pin-code__slot--error');
  });

  it('does not include success or warning when faceInvalid is true', () => {
    const c = makeComponent({ value: '', required: true });
    (c as any).faceInvalid = true;
    c.state = 'success';

    const cls = (c as any).getSlotClass(0);

    // faceInvalid overrides success — error class should win
    expect(cls).toContain('pin-code__slot--error');
    expect(cls).not.toContain('pin-code__slot--success');
  });

  it('includes "pin-code__slot--filled" for a non-empty slot', () => {
    const c = makeComponent({ value: '5' });

    const cls = (c as any).getSlotClass(0);

    expect(cls).toContain('pin-code__slot--filled');
  });

  it('does not include "pin-code__slot--filled" for an empty slot', () => {
    const c = makeComponent({ value: '' });

    const cls = (c as any).getSlotClass(0);

    expect(cls).not.toContain('pin-code__slot--filled');
  });
});

// ── getMessageClass variants ──────────────────────────────────────────────

describe('io-pin-code — getMessageClass', () => {
  it('includes "pin-code__message--success" for success state', () => {
    const c = makeComponent();
    c.state = 'success';

    const cls = (c as any).getMessageClass();

    expect(cls).toContain('pin-code__message--success');
  });

  it('includes "pin-code__message--warning" for warning state', () => {
    const c = makeComponent();
    c.state = 'warning';

    const cls = (c as any).getMessageClass();

    expect(cls).toContain('pin-code__message--warning');
  });

  it('includes "pin-code__message--error" for error state', () => {
    const c = makeComponent();
    c.state = 'error';

    const cls = (c as any).getMessageClass();

    expect(cls).toContain('pin-code__message--error');
  });

  it('does not include success or warning when faceInvalid is true', () => {
    const c = makeComponent({ value: '', required: true });
    (c as any).faceInvalid = true;
    c.state = 'success';

    const cls = (c as any).getMessageClass();

    expect(cls).toContain('pin-code__message--error');
    expect(cls).not.toContain('pin-code__message--success');
  });

  it('only includes base class when state is "none" and not invalid', () => {
    const c = makeComponent();
    c.state = 'none';

    const cls = (c as any).getMessageClass();

    expect(cls).toBe('pin-code__message');
  });
});

// ── checkValidity / reportValidity ────────────────────────────────────────

describe('io-pin-code — checkValidity', () => {
  it('returns true when internals.checkValidity returns true', async () => {
    const c = makeComponent();
    const internals = makeInternals();
    internals.checkValidity.mockReturnValue(true);
    (c as any).internals = internals;

    expect(await c.checkValidity()).toBe(true);
  });

  it('returns false when internals.checkValidity returns false', async () => {
    const c = makeComponent();
    const internals = makeInternals();
    internals.checkValidity.mockReturnValue(false);
    (c as any).internals = internals;

    expect(await c.checkValidity()).toBe(false);
  });

  it('returns true when internals is unavailable (fallback)', async () => {
    const c = makeComponent();
    (c as any).internals = undefined;

    expect(await c.checkValidity()).toBe(true);
  });
});

describe('io-pin-code — reportValidity', () => {
  it('returns true when internals.reportValidity returns true', async () => {
    const c = makeComponent();
    const internals = makeInternals();
    internals.reportValidity.mockReturnValue(true);
    (c as any).internals = internals;

    expect(await c.reportValidity()).toBe(true);
  });

  it('returns false when internals.reportValidity returns false', async () => {
    const c = makeComponent();
    const internals = makeInternals();
    internals.reportValidity.mockReturnValue(false);
    (c as any).internals = internals;

    expect(await c.reportValidity()).toBe(false);
  });

  it('returns true when internals is unavailable (fallback)', async () => {
    const c = makeComponent();
    (c as any).internals = undefined;

    expect(await c.reportValidity()).toBe(true);
  });
});

// ── syncFormValue branches ─────────────────────────────────────────────────

describe('io-pin-code — syncFormValue: required+incomplete → faceInvalid', () => {
  it('sets faceInvalid=true when required and PIN is incomplete (touched)', () => {
    const c = makeComponent({ value: '12', required: true });
    const internals = makeInternals();
    (c as any).internals = internals;
    (c as any).touched = true;

    (c as any).syncFormValue();

    expect((c as any).faceInvalid).toBe(true);
    expect(internals.setValidity).toHaveBeenCalledWith(
      { valueMissing: true },
      'Please complete the PIN',
    );
  });

  it('sets faceInvalid=false when required and PIN is complete', () => {
    const c = makeComponent({ value: '1234', required: true });
    const internals = makeInternals();
    (c as any).internals = internals;

    (c as any).syncFormValue();

    expect((c as any).faceInvalid).toBe(false);
    expect(internals.setValidity).toHaveBeenCalledWith({});
  });

  it('sets faceInvalid=false when not required (even with empty PIN)', () => {
    const c = makeComponent({ value: '', required: false });
    const internals = makeInternals();
    (c as any).internals = internals;

    (c as any).syncFormValue();

    expect((c as any).faceInvalid).toBe(false);
    expect(internals.setValidity).toHaveBeenCalledWith({});
  });
});

// ── getPinCodeStyles coverage ─────────────────────────────────────────────

describe('getPinCodeStyles', () => {
  it('returns a non-empty CSS string', () => {
    const styles = getPinCodeStyles();

    expect(typeof styles).toBe('string');
    expect(styles.length).toBeGreaterThan(0);
  });

  it('contains expected CSS class selectors', () => {
    const styles = getPinCodeStyles();

    expect(styles).toContain('pin-code__slot');
    expect(styles).toContain('pin-code__message');
    expect(styles).toContain('pin-code__label');
  });
});
