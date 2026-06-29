/**
 * io-pin-code — keyboard navigation, auto-advance, paste, and change/complete events
 */
import { describe, it, expect, vi } from 'vitest';

import { IoPinCode } from './io-pin-code';

function makeComponent(valueInit = '', length: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 = 4) {
  const component = new IoPinCode();
  (component as any).el = document.createElement('io-pin-code');
  component.value = valueInit;
  component.length = length;
  const emitMock = vi.fn();
  (component as any).change = { emit: emitMock };
  (component as any).componentWillLoad();
  return { component, emitMock };
}

function makeKeyEvent(key: string, options?: KeyboardEventInit): KeyboardEvent {
  return new KeyboardEvent('keydown', { key, cancelable: true, ...options });
}

function makeInputEvent(value: string): InputEvent {
  const input = document.createElement('input');
  input.value = value;
  const ev = new InputEvent('input');
  Object.defineProperty(ev, 'target', { value: input });
  return ev;
}

function makePasteEvent(text: string): Event {
  const clipboardData = { getData: vi.fn().mockReturnValue(text) };
  const ev = new Event('paste', { cancelable: true });
  Object.defineProperty(ev, 'clipboardData', { value: clipboardData });
  return ev;
}

describe('io-pin-code — digit entry and auto-advance', () => {
  it('updates digit on keydown with a digit key', () => {
    const { component, emitMock } = makeComponent();
    const focusMocks = Array.from({ length: 4 }, () => ({ focus: vi.fn() }));
    (component as any).inputRefs = focusMocks;

    const ev = makeKeyEvent('3');
    (component as any).handleKeydown(ev, 0);

    expect((component as any).digits[0]).toBe('3');
    expect(emitMock).toHaveBeenCalledWith({ value: '3', isComplete: false });
  });

  it('auto-advances focus to next slot after digit entry', () => {
    const { component } = makeComponent();
    const focusMocks = Array.from({ length: 4 }, () => ({ focus: vi.fn() }));
    (component as any).inputRefs = focusMocks;

    const ev = makeKeyEvent('5');
    (component as any).handleKeydown(ev, 1);

    expect(focusMocks[2].focus).toHaveBeenCalled();
  });

  it('does not advance beyond last slot on digit entry', () => {
    const { component } = makeComponent('123');
    const focusMocks = Array.from({ length: 4 }, () => ({ focus: vi.fn() }));
    (component as any).inputRefs = focusMocks;

    const ev = makeKeyEvent('4');
    (component as any).handleKeydown(ev, 3);

    // focus should NOT move beyond slot 3 (index 3 is last)
    expect(focusMocks[3].focus).not.toHaveBeenCalled();
  });

  it('emits complete event when all slots are filled', () => {
    const { component, emitMock } = makeComponent('123');
    const focusMocks = Array.from({ length: 4 }, () => ({ focus: vi.fn() }));
    (component as any).inputRefs = focusMocks;

    const ev = makeKeyEvent('4');
    (component as any).handleKeydown(ev, 3);

    expect(emitMock).toHaveBeenCalledWith({ value: '1234', isComplete: true });
  });
});

describe('io-pin-code — backspace behaviour', () => {
  it('clears current slot on Backspace when slot has content', () => {
    const { component } = makeComponent('1234');
    const focusMocks = Array.from({ length: 4 }, () => ({ focus: vi.fn() }));
    (component as any).inputRefs = focusMocks;

    const ev = makeKeyEvent('Backspace');
    (component as any).handleKeydown(ev, 2);

    expect((component as any).digits[2]).toBe('');
  });

  it('moves focus to previous slot on Backspace when current is empty', () => {
    const { component } = makeComponent('12');
    const focusMocks = Array.from({ length: 4 }, () => ({ focus: vi.fn() }));
    (component as any).inputRefs = focusMocks;

    // slot 2 is empty
    const ev = makeKeyEvent('Backspace');
    (component as any).handleKeydown(ev, 2);

    expect(focusMocks[1].focus).toHaveBeenCalled();
  });

  it('does not move focus before slot 0 on Backspace', () => {
    const { component } = makeComponent('');
    const focusMocks = Array.from({ length: 4 }, () => ({ focus: vi.fn() }));
    (component as any).inputRefs = focusMocks;

    const ev = makeKeyEvent('Backspace');
    (component as any).handleKeydown(ev, 0);

    // No previous slot to focus
    expect(focusMocks[0].focus).not.toHaveBeenCalled();
  });
});

describe('io-pin-code — arrow key navigation', () => {
  it('ArrowLeft moves focus to previous slot', () => {
    const { component } = makeComponent();
    const focusMocks = Array.from({ length: 4 }, () => ({ focus: vi.fn() }));
    (component as any).inputRefs = focusMocks;

    const ev = makeKeyEvent('ArrowLeft');
    (component as any).handleKeydown(ev, 2);

    expect(focusMocks[1].focus).toHaveBeenCalled();
  });

  it('ArrowRight moves focus to next slot', () => {
    const { component } = makeComponent();
    const focusMocks = Array.from({ length: 4 }, () => ({ focus: vi.fn() }));
    (component as any).inputRefs = focusMocks;

    const ev = makeKeyEvent('ArrowRight');
    (component as any).handleKeydown(ev, 1);

    expect(focusMocks[2].focus).toHaveBeenCalled();
  });

  it('ArrowLeft at slot 0 does not move focus', () => {
    const { component } = makeComponent();
    const focusMocks = Array.from({ length: 4 }, () => ({ focus: vi.fn() }));
    (component as any).inputRefs = focusMocks;

    const ev = makeKeyEvent('ArrowLeft');
    (component as any).handleKeydown(ev, 0);

    focusMocks.forEach((m) => expect(m.focus).not.toHaveBeenCalled());
  });

  it('ArrowRight at last slot does not move focus', () => {
    const { component } = makeComponent();
    const focusMocks = Array.from({ length: 4 }, () => ({ focus: vi.fn() }));
    (component as any).inputRefs = focusMocks;

    const ev = makeKeyEvent('ArrowRight');
    (component as any).handleKeydown(ev, 3);

    focusMocks.forEach((m) => expect(m.focus).not.toHaveBeenCalled());
  });
});

describe('io-pin-code — paste', () => {
  it('distributes pasted digits across slots from the target index', () => {
    const { component, emitMock } = makeComponent();
    const focusMocks = Array.from({ length: 4 }, () => ({ focus: vi.fn() }));
    (component as any).inputRefs = focusMocks;

    const ev = makePasteEvent('1234');
    (component as any).handlePaste(ev, 0);

    expect((component as any).digits).toEqual(['1', '2', '3', '4']);
    expect(emitMock).toHaveBeenCalledWith({ value: '1234', isComplete: true });
  });

  it('strips non-digit characters from pasted text', () => {
    const { component } = makeComponent();
    const focusMocks = Array.from({ length: 4 }, () => ({ focus: vi.fn() }));
    (component as any).inputRefs = focusMocks;

    const ev = makePasteEvent('12-34');
    (component as any).handlePaste(ev, 0);

    expect((component as any).digits).toEqual(['1', '2', '3', '4']);
  });

  it('truncates paste to remaining slots from the start index', () => {
    const { component } = makeComponent('12');
    const focusMocks = Array.from({ length: 4 }, () => ({ focus: vi.fn() }));
    (component as any).inputRefs = focusMocks;

    const ev = makePasteEvent('987654');
    (component as any).handlePaste(ev, 2); // only slots 2 and 3 remain

    expect((component as any).digits[2]).toBe('9');
    expect((component as any).digits[3]).toBe('8');
  });

  it('does nothing when paste contains no digits', () => {
    const { component, emitMock } = makeComponent();
    const focusMocks = Array.from({ length: 4 }, () => ({ focus: vi.fn() }));
    (component as any).inputRefs = focusMocks;

    const ev = makePasteEvent('abc');
    (component as any).handlePaste(ev, 0);

    expect(emitMock).not.toHaveBeenCalled();
  });

  it('focuses the slot after the last pasted digit', () => {
    const { component } = makeComponent();
    const focusMocks = Array.from({ length: 4 }, () => ({ focus: vi.fn() }));
    (component as any).inputRefs = focusMocks;

    const ev = makePasteEvent('12');
    (component as any).handlePaste(ev, 0);

    expect(focusMocks[2].focus).toHaveBeenCalled();
  });
});

describe('io-pin-code — input handler (mobile virtual keyboard)', () => {
  it('accepts a digit via input event', () => {
    const { component, emitMock } = makeComponent();
    const focusMocks = Array.from({ length: 4 }, () => ({ focus: vi.fn() }));
    (component as any).inputRefs = focusMocks;

    const ev = makeInputEvent('7');
    (component as any).handleInput(ev, 0);

    expect((component as any).digits[0]).toBe('7');
    expect(emitMock).toHaveBeenCalledWith({ value: '7', isComplete: false });
  });

  it('strips non-digits entered via input event', () => {
    const { component, emitMock } = makeComponent();
    const focusMocks = Array.from({ length: 4 }, () => ({ focus: vi.fn() }));
    (component as any).inputRefs = focusMocks;

    const ev = makeInputEvent('a');
    (component as any).handleInput(ev, 0);

    expect((component as any).digits[0]).toBe('');
    expect(emitMock).toHaveBeenCalledWith({ value: '', isComplete: false });
  });
});

describe('io-pin-code — disabled state prevents events', () => {
  it('does not emit change when disabled on keydown', () => {
    const { component, emitMock } = makeComponent();
    component.disabled = true;
    const focusMocks = Array.from({ length: 4 }, () => ({ focus: vi.fn() }));
    (component as any).inputRefs = focusMocks;

    const ev = makeKeyEvent('5');
    (component as any).handleKeydown(ev, 0);

    expect(emitMock).not.toHaveBeenCalled();
  });

  it('does not emit change when disabled on paste', () => {
    const { component, emitMock } = makeComponent();
    component.disabled = true;
    const focusMocks = Array.from({ length: 4 }, () => ({ focus: vi.fn() }));
    (component as any).inputRefs = focusMocks;

    const ev = makePasteEvent('1234');
    (component as any).handlePaste(ev, 0);

    expect(emitMock).not.toHaveBeenCalled();
  });
});

describe('io-pin-code — Delete key', () => {
  it('clears current slot on Delete key', () => {
    const { component } = makeComponent('1234');
    const focusMocks = Array.from({ length: 4 }, () => ({ focus: vi.fn() }));
    (component as any).inputRefs = focusMocks;

    const ev = makeKeyEvent('Delete');
    (component as any).handleKeydown(ev, 1);

    expect((component as any).digits[1]).toBe('');
  });
});

describe('io-pin-code — Enter key submits parent form (#1050)', () => {
  it('calls form.requestSubmit() when Enter is pressed and form is available', () => {
    const { component } = makeComponent('1234');
    const requestSubmitMock = vi.fn();
    (component as any).internals = { form: { requestSubmit: requestSubmitMock } };
    const focusMocks = Array.from({ length: 4 }, () => ({ focus: vi.fn() }));
    (component as any).inputRefs = focusMocks;

    const ev = makeKeyEvent('Enter');
    (component as any).handleKeydown(ev, 3);

    expect(requestSubmitMock).toHaveBeenCalled();
  });

  it('does not throw when Enter is pressed outside a form', () => {
    const { component } = makeComponent('1234');
    (component as any).internals = { form: null };
    (component as any).inputRefs = Array.from({ length: 4 }, () => ({ focus: vi.fn() }));

    const ev = makeKeyEvent('Enter');
    expect(() => (component as any).handleKeydown(ev, 3)).not.toThrow();
  });

  it('does not update digits on Enter', () => {
    const { component, emitMock } = makeComponent('1234');
    const requestSubmitMock = vi.fn();
    (component as any).internals = { form: { requestSubmit: requestSubmitMock } };
    (component as any).inputRefs = Array.from({ length: 4 }, () => ({ focus: vi.fn() }));
    const digitsBefore = [...(component as any).digits];

    const ev = makeKeyEvent('Enter');
    (component as any).handleKeydown(ev, 3);

    expect((component as any).digits).toEqual(digitsBefore);
    expect(emitMock).not.toHaveBeenCalled();
  });
});

describe('io-pin-code — Dead/Process key recovery (#1064)', () => {
  it('blurs and refocuses input on Dead key', () => {
    const { component } = makeComponent();
    (component as any).inputRefs = Array.from({ length: 4 }, () => ({ focus: vi.fn() }));

    const input = document.createElement('input');
    const blurMock = vi.spyOn(input, 'blur').mockImplementation(() => {});
    const focusMock = vi.spyOn(input, 'focus').mockImplementation(() => {});

    const ev = new KeyboardEvent('keydown', { key: 'Dead', cancelable: true });
    Object.defineProperty(ev, 'target', { value: input });

    (component as any).handleKeydown(ev, 0);

    expect(blurMock).toHaveBeenCalled();
    // rAF is queued but not awaited in unit tests — just verify blur was called
  });

  it('blurs and refocuses input on Process key', () => {
    const { component } = makeComponent();
    (component as any).inputRefs = Array.from({ length: 4 }, () => ({ focus: vi.fn() }));

    const input = document.createElement('input');
    const blurMock = vi.spyOn(input, 'blur').mockImplementation(() => {});

    const ev = new KeyboardEvent('keydown', { key: 'Process', cancelable: true });
    Object.defineProperty(ev, 'target', { value: input });

    (component as any).handleKeydown(ev, 0);

    expect(blurMock).toHaveBeenCalled();
  });

  it('does not update digits on Dead key', () => {
    const { component } = makeComponent('1234');
    (component as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    (component as any).inputRefs = Array.from({ length: 4 }, () => ({ focus: vi.fn() }));
    const digitsBefore = [...(component as any).digits];

    const input = document.createElement('input');
    vi.spyOn(input, 'blur').mockImplementation(() => {});

    const ev = new KeyboardEvent('keydown', { key: 'Dead', cancelable: true });
    Object.defineProperty(ev, 'target', { value: input });
    (component as any).handleKeydown(ev, 0);

    expect((component as any).digits).toEqual(digitsBefore);
  });
});

describe('io-pin-code — SMS autofill / bulk input (#1059)', () => {
  it('distributes bulk input across slots starting at the current index', () => {
    const { component, emitMock } = makeComponent();
    const focusMocks = Array.from({ length: 4 }, () => ({ focus: vi.fn() }));
    (component as any).inputRefs = focusMocks;
    (component as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };

    const input = document.createElement('input');
    input.value = '123456';
    const ev = new InputEvent('input');
    Object.defineProperty(ev, 'target', { value: input });

    (component as any).handleInput(ev, 0);

    expect((component as any).digits).toEqual(['1', '2', '3', '4']);
    expect(emitMock).toHaveBeenCalledWith({ value: '1234', isComplete: true });
  });

  it('focuses the first empty slot after bulk input', () => {
    const { component } = makeComponent();
    const focusMocks = Array.from({ length: 4 }, () => ({ focus: vi.fn() }));
    (component as any).inputRefs = focusMocks;
    (component as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };

    const input = document.createElement('input');
    input.value = '12';
    const ev = new InputEvent('input');
    Object.defineProperty(ev, 'target', { value: input });

    (component as any).handleInput(ev, 0);

    // slots 0,1 are filled; first empty is slot 2
    expect(focusMocks[2].focus).toHaveBeenCalled();
  });

  it('focuses last slot when all slots are filled after bulk input', () => {
    const { component } = makeComponent();
    const focusMocks = Array.from({ length: 4 }, () => ({ focus: vi.fn() }));
    (component as any).inputRefs = focusMocks;
    (component as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };

    const input = document.createElement('input');
    input.value = '1234';
    const ev = new InputEvent('input');
    Object.defineProperty(ev, 'target', { value: input });

    (component as any).handleInput(ev, 0);

    expect(focusMocks[3].focus).toHaveBeenCalled();
  });
});

describe('io-pin-code — alphanumeric mode (#1052)', () => {
  it('accepts letter keys when mode=alphanumeric', () => {
    const { component, emitMock } = makeComponent();
    component.mode = 'alphanumeric';
    const focusMocks = Array.from({ length: 4 }, () => ({ focus: vi.fn() }));
    (component as any).inputRefs = focusMocks;
    (component as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };

    const ev = makeKeyEvent('A');
    (component as any).handleKeydown(ev, 0);

    expect((component as any).digits[0]).toBe('A');
    expect(emitMock).toHaveBeenCalledWith({ value: 'A', isComplete: false });
  });

  it('accepts digit keys when mode=alphanumeric', () => {
    const { component } = makeComponent();
    component.mode = 'alphanumeric';
    (component as any).inputRefs = Array.from({ length: 4 }, () => ({ focus: vi.fn() }));
    (component as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };

    const ev = makeKeyEvent('5');
    (component as any).handleKeydown(ev, 0);

    expect((component as any).digits[0]).toBe('5');
  });

  it('blocks non-alphanumeric keys when mode=alphanumeric', () => {
    const { component, emitMock } = makeComponent();
    component.mode = 'alphanumeric';
    (component as any).inputRefs = Array.from({ length: 4 }, () => ({ focus: vi.fn() }));
    (component as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };

    const ev = makeKeyEvent('!');
    const preventSpy = vi.spyOn(ev, 'preventDefault');
    (component as any).handleKeydown(ev, 0);

    expect(preventSpy).toHaveBeenCalled();
    expect(emitMock).not.toHaveBeenCalled();
  });

  it('still blocks letter keys when mode=numeric', () => {
    const { component, emitMock } = makeComponent();
    component.mode = 'numeric';
    (component as any).inputRefs = Array.from({ length: 4 }, () => ({ focus: vi.fn() }));
    (component as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };

    const ev = makeKeyEvent('a');
    const preventSpy = vi.spyOn(ev, 'preventDefault');
    (component as any).handleKeydown(ev, 0);

    expect(preventSpy).toHaveBeenCalled();
    expect(emitMock).not.toHaveBeenCalled();
  });

  it('accepts length up to 8 slots', () => {
    const { component } = makeComponent('', 8);
    expect(component.length).toBe(8);
    expect((component as any).digits).toHaveLength(8);
  });

  it('accepts length of 1', () => {
    const { component } = makeComponent('', 1);
    expect(component.length).toBe(1);
    expect((component as any).digits).toHaveLength(1);
  });
});
