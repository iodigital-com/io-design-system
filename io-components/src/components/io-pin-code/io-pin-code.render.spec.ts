/**
 * io-pin-code — render() branch coverage
 *
 * Exercises the render() function body (lines 312-355) with multiple
 * prop combinations so that all JSX branches get visited.
 * h is mocked in this test environment — we use h.mock.calls to inspect
 * the virtual tree without a real DOM.
 */
import { h } from '@stencil/core';
import { describe, it, expect, vi } from 'vitest';

import { IoPinCode } from './io-pin-code';

function makeInternals() {
  return {
    setFormValue: vi.fn(),
    setValidity: vi.fn(),
    checkValidity: vi.fn().mockReturnValue(true),
    reportValidity: vi.fn().mockReturnValue(true),
  };
}

function makeComponent(overrides: Partial<IoPinCode> = {}) {
  const c = new IoPinCode();
  (c as any).el = document.createElement('io-pin-code');
  (c as any).change = { emit: vi.fn() };
  (c as any).internals = makeInternals();
  Object.assign(c, overrides);
  (c as any).componentWillLoad();
  return c;
}

function renderCalls(c: IoPinCode) {
  const hMock = h as unknown as ReturnType<typeof vi.fn>;
  hMock.mockClear();
  c.render();
  return hMock.mock.calls as Array<[string, Record<string, unknown>, ...unknown[]]>;
}

// ── label conditional ─────────────────────────────────────────────────────────

describe('io-pin-code render() — label', () => {
  it('renders label span when label is provided', () => {
    const c = makeComponent({ label: 'Enter PIN' });
    const calls = renderCalls(c);

    const labelSpan = calls.find(([tag, attrs]) => tag === 'span' && String(attrs?.class).includes('pin-code__label'));
    expect(labelSpan).toBeDefined();
  });

  it('does not render label span when label is not provided', () => {
    const c = makeComponent();
    // no label set — label is undefined
    const calls = renderCalls(c);

    const labelSpan = calls.find(([tag, attrs]) => tag === 'span' && String(attrs?.class).includes('pin-code__label'));
    expect(labelSpan).toBeUndefined();
  });
});

// ── required asterisk ─────────────────────────────────────────────────────────

describe('io-pin-code render() — required asterisk', () => {
  it('renders required asterisk span when label and required are set', () => {
    const c = makeComponent({ label: 'PIN', required: true });
    const calls = renderCalls(c);

    const reqSpan = calls.find(([tag, attrs]) => tag === 'span' && String(attrs?.class).includes('pin-code__required'));
    expect(reqSpan).toBeDefined();
  });

  it('does not render required asterisk when required is false', () => {
    const c = makeComponent({ label: 'PIN', required: false });
    const calls = renderCalls(c);

    const reqSpan = calls.find(([tag, attrs]) => tag === 'span' && String(attrs?.class).includes('pin-code__required'));
    expect(reqSpan).toBeUndefined();
  });
});

// ── aria-disabled ─────────────────────────────────────────────────────────────

describe('io-pin-code render() — aria-disabled on Host', () => {
  it('sets aria-disabled="true" when disabled=true', () => {
    const c = makeComponent({ disabled: true });
    const calls = renderCalls(c);

    // Host is undefined in mock env; identify it by role="group"
    const hostCall = calls.find(([_tag, attrs]) => (attrs as Record<string, unknown>)?.role === 'group');
    expect(hostCall).toBeDefined();
    expect(hostCall![1]['aria-disabled']).toBe('true');
  });

  it('does not set aria-disabled when disabled=false', () => {
    const c = makeComponent({ disabled: false });
    const calls = renderCalls(c);

    const hostCall = calls.find(([_tag, attrs]) => (attrs as Record<string, unknown>)?.role === 'group');
    expect(hostCall).toBeDefined();
    expect(hostCall![1]['aria-disabled']).toBeUndefined();
  });
});

// ── aria-labelledby / aria-describedby ────────────────────────────────────────

describe('io-pin-code render() — aria-labelledby on Host', () => {
  it('sets aria-labelledby when label is provided', () => {
    const c = makeComponent({ label: 'Enter PIN' });
    const calls = renderCalls(c);

    const hostCall = calls.find(([_tag, attrs]) => (attrs as Record<string, unknown>)?.role === 'group');
    expect(hostCall).toBeDefined();
    expect(hostCall![1]['aria-labelledby']).toBeDefined();
  });

  it('does not set aria-labelledby when label is absent', () => {
    const c = makeComponent();
    const calls = renderCalls(c);

    const hostCall = calls.find(([_tag, attrs]) => (attrs as Record<string, unknown>)?.role === 'group');
    expect(hostCall).toBeDefined();
    expect(hostCall![1]['aria-labelledby']).toBeUndefined();
  });
});

describe('io-pin-code render() — aria-describedby on slot container', () => {
  it('sets aria-describedby on slot div when message is provided', () => {
    const c = makeComponent({ message: 'Enter 4-digit code' });
    const calls = renderCalls(c);

    const slotDiv = calls.find(([tag, attrs]) => tag === 'div' && String(attrs?.class).includes('pin-code__slots'));
    expect(slotDiv).toBeDefined();
    expect(slotDiv![1]['aria-describedby']).toBeDefined();
  });

  it('does not set aria-describedby when message is absent', () => {
    const c = makeComponent();
    const calls = renderCalls(c);

    const slotDiv = calls.find(([tag, attrs]) => tag === 'div' && String(attrs?.class).includes('pin-code__slots'));
    expect(slotDiv).toBeDefined();
    expect(slotDiv![1]['aria-describedby']).toBeUndefined();
  });
});

// ── type=password ─────────────────────────────────────────────────────────────

describe('io-pin-code render() — input type', () => {
  it('renders inputs as type="password" when type prop is "password"', () => {
    const c = makeComponent({ type: 'password' });
    const calls = renderCalls(c);

    const inputCalls = calls.filter(([tag, attrs]) => tag === 'input' && (attrs as Record<string, unknown>)?.inputMode === 'numeric');
    expect(inputCalls.length).toBeGreaterThan(0);
    inputCalls.forEach((call) => {
      expect(call[1].type).toBe('password');
    });
  });

  it('renders inputs as type="text" when type prop is "numeric"', () => {
    const c = makeComponent({ type: 'numeric' });
    const calls = renderCalls(c);

    const inputCalls = calls.filter(([tag, attrs]) => tag === 'input' && (attrs as Record<string, unknown>)?.inputMode === 'numeric');
    expect(inputCalls.length).toBeGreaterThan(0);
    inputCalls.forEach((call) => {
      expect(call[1].type).toBe('text');
    });
  });
});

// ── aria-invalid on inputs ────────────────────────────────────────────────────

describe('io-pin-code render() — aria-invalid on inputs', () => {
  it('sets aria-invalid="true" on all inputs when state=error', () => {
    const c = makeComponent({ state: 'error' });
    const calls = renderCalls(c);

    const inputCalls = calls.filter(([tag, attrs]) => tag === 'input' && (attrs as Record<string, unknown>)?.inputMode === 'numeric');
    expect(inputCalls.length).toBeGreaterThan(0);
    inputCalls.forEach((call) => {
      expect(call[1]['aria-invalid']).toBe('true');
    });
  });

  it('does not set aria-invalid when state is neutral', () => {
    const c = makeComponent({ state: 'none' });
    const calls = renderCalls(c);

    const inputCalls = calls.filter(([tag, attrs]) => tag === 'input' && (attrs as Record<string, unknown>)?.inputMode === 'numeric');
    expect(inputCalls.length).toBeGreaterThan(0);
    inputCalls.forEach((call) => {
      expect(call[1]['aria-invalid']).toBeUndefined();
    });
  });
});

// ── ref callbacks ─────────────────────────────────────────────────────────────

describe('io-pin-code render() — input ref callbacks', () => {
  it('ref callback assigns the input element to inputRefs[i]', () => {
    const c = makeComponent();
    const calls = renderCalls(c);

    const inputCalls = calls.filter(([tag, attrs]) => tag === 'input' && (attrs as Record<string, unknown>)?.inputMode === 'numeric');
    expect(inputCalls.length).toBe(4);

    const mockEl = document.createElement('input');
    const refFn = inputCalls[0][1].ref as (el: HTMLInputElement | null) => void;
    refFn(mockEl);

    expect((c as any).inputRefs[0]).toBe(mockEl);
  });

  it('ref callback clears inputRefs[i] when called with null', () => {
    const c = makeComponent();
    (c as any).inputRefs = [document.createElement('input'), null, null, null];

    const calls = renderCalls(c);
    const inputCalls = calls.filter(([tag, attrs]) => tag === 'input' && (attrs as Record<string, unknown>)?.inputMode === 'numeric');

    const refFn = inputCalls[0][1].ref as (el: null) => void;
    refFn(null);

    expect((c as any).inputRefs[0]).toBeNull();
  });
});

// ── inline event handlers ─────────────────────────────────────────────────────

describe('io-pin-code render() — inline event handlers', () => {
  it('onKeyDown handler calls handleKeydown', () => {
    const c = makeComponent();
    const calls = renderCalls(c);

    const inputCalls = calls.filter(
      ([tag, attrs]) => tag === 'input' && (attrs as Record<string, unknown>)?.inputMode === 'numeric',
    );
    expect(inputCalls.length).toBe(4);

    const spy = vi.spyOn(c as any, 'handleKeydown').mockImplementation(() => {});
    const onKeyDown = inputCalls[0][1].onKeyDown as (e: KeyboardEvent) => void;
    const fakeEvent = new KeyboardEvent('keydown', { key: 'Backspace' });
    onKeyDown(fakeEvent);
    expect(spy).toHaveBeenCalledWith(fakeEvent, 0);
  });

  it('onInput handler calls handleInput', () => {
    const c = makeComponent();
    const calls = renderCalls(c);

    const inputCalls = calls.filter(
      ([tag, attrs]) => tag === 'input' && (attrs as Record<string, unknown>)?.inputMode === 'numeric',
    );

    const spy = vi.spyOn(c as any, 'handleInput').mockImplementation(() => {});
    const onInput = inputCalls[1][1].onInput as (e: InputEvent) => void;
    const fakeEvent = new InputEvent('input', { data: '5' });
    onInput(fakeEvent);
    expect(spy).toHaveBeenCalledWith(fakeEvent, 1);
  });

  it('onPaste handler calls handlePaste', () => {
    const c = makeComponent();
    const calls = renderCalls(c);

    const inputCalls = calls.filter(
      ([tag, attrs]) => tag === 'input' && (attrs as Record<string, unknown>)?.inputMode === 'numeric',
    );

    const spy = vi.spyOn(c as any, 'handlePaste').mockImplementation(() => {});
    const onPaste = inputCalls[2][1].onPaste as (e: Event) => void;
    const fakeEvent = { type: 'paste' } as unknown as Event;
    onPaste(fakeEvent);
    expect(spy).toHaveBeenCalledWith(fakeEvent, 2);
  });
});

// ── message paragraph — non-error state ───────────────────────────────────────

describe('io-pin-code render() — message paragraph role/aria when state is not error', () => {
  it('renders message paragraph with role=status and aria-live=polite when state is none', () => {
    const c = makeComponent({ message: 'Enter your PIN', state: 'none' });
    const calls = renderCalls(c);

    const pCall = calls.find(([tag, attrs]) => tag === 'p' && (attrs as Record<string, unknown>)?.role === 'status');
    expect(pCall).toBeDefined();
    expect(pCall![1]['aria-live']).toBe('polite');
    expect(pCall![1]['aria-atomic']).toBe('true');
  });

  it('renders message paragraph with role=status when state is success', () => {
    const c = makeComponent({ message: 'Code accepted', state: 'success' });
    const calls = renderCalls(c);

    const pCall = calls.find(([tag, attrs]) => tag === 'p' && (attrs as Record<string, unknown>)?.role === 'status');
    expect(pCall).toBeDefined();
  });
});

// ── input value fallback — digits[i] ?? '' ────────────────────────────────────

describe('io-pin-code render() — input value falls back to empty string when digit is undefined', () => {
  it('renders empty string value when digits array is shorter than length', () => {
    const c = makeComponent();
    // Force digits to be shorter than length so digits[i] is undefined for some slots
    (c as any).digits = [];
    const calls = renderCalls(c);

    const inputCalls = calls.filter(
      ([tag, attrs]) => tag === 'input' && (attrs as Record<string, unknown>)?.inputMode === 'numeric',
    );
    // All 4 inputs should render with value='' (from the ?? '' fallback)
    for (const inputCall of inputCalls) {
      expect(inputCall[1].value).toBe('');
    }
  });
});
