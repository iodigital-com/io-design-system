/**
 * io-textarea — render() ref callback coverage
 *
 * The textarea ref at lines 334-337 is never invoked by existing tests because
 * h is mocked and refs are just props on the vnode. This spec extracts the ref
 * from h.mock.calls and invokes it to drive coverage.
 */
import { describe, it, expect, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoTextarea } from './io-textarea';

function makeInternals() {
  return {
    setFormValue: vi.fn(),
    setValidity: vi.fn(),
    checkValidity: vi.fn().mockReturnValue(true),
    reportValidity: vi.fn().mockReturnValue(true),
  };
}

function makeTextarea(overrides: Partial<IoTextarea> = {}): IoTextarea {
  const c = new IoTextarea();
  (c as any).el = document.createElement('io-textarea');
  (c as any).input = { emit: vi.fn() };
  (c as any).change = { emit: vi.fn() };
  (c as any).focus = { emit: vi.fn() };
  (c as any).blur = { emit: vi.fn() };
  (c as any).internals = makeInternals();
  Object.assign(c, overrides);
  (c as any).componentWillLoad();
  return c;
}

function renderCalls(c: IoTextarea) {
  const hMock = h as unknown as ReturnType<typeof vi.fn>;
  hMock.mockClear();
  c.render();
  return hMock.mock.calls as Array<[unknown, Record<string, unknown>, ...unknown[]]>;
}

// ── textarea ref callback ─────────────────────────────────────────────────────

describe('io-textarea render() — nativeTextareaEl ref callback', () => {
  it('assigns element to nativeTextareaEl when ref is called with an element', () => {
    const c = makeTextarea({ label: 'Comments' });
    const calls = renderCalls(c);

    const textareaCall = calls.find(([tag]) => tag === 'textarea');
    expect(textareaCall).toBeDefined();

    const refFn = textareaCall![1].ref as (el: HTMLTextAreaElement | undefined) => void;
    const mockEl = document.createElement('textarea') as HTMLTextAreaElement;
    refFn(mockEl);
    expect((c as any).nativeTextareaEl).toBe(mockEl);
  });

  it('assigns undefined to nativeTextareaEl when ref is called with undefined', () => {
    const c = makeTextarea({ label: 'Comments' });
    (c as any).nativeTextareaEl = document.createElement('textarea') as HTMLTextAreaElement;
    const calls = renderCalls(c);

    const textareaCall = calls.find(([tag]) => tag === 'textarea');
    expect(textareaCall).toBeDefined();

    const refFn = textareaCall![1].ref as (el: HTMLTextAreaElement | undefined) => void;
    refFn(undefined);
    expect((c as any).nativeTextareaEl).toBeUndefined();
  });
});

// ── render branch coverage ────────────────────────────────────────────────────

describe('io-textarea render() — branch coverage', () => {
  it('does not throw with default props', () => {
    const c = makeTextarea();
    expect(() => c.render()).not.toThrow();
  });

  it('does not throw with loading=true', () => {
    const c = makeTextarea({ loading: true });
    expect(() => c.render()).not.toThrow();
  });

  it('does not throw with counter=true and maxLength set', () => {
    const c = makeTextarea({ counter: true, maxLength: 200, label: 'Text' });
    expect(() => c.render()).not.toThrow();
  });

  it('does not throw with readOnly=true', () => {
    const c = makeTextarea({ readOnly: true, label: 'Text' });
    expect(() => c.render()).not.toThrow();
  });
});
