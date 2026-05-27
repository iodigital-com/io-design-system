/**
 * io-modal — render() ref callback and branch coverage
 *
 * The dialog ref at lines 329-332 is never invoked by existing tests because
 * h is mocked and refs are just props on the vnode. This spec extracts the ref
 * from h.mock.calls and invokes it to drive coverage.
 */
import { describe, it, expect, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoModal } from './io-modal';

function makeModal(overrides: Partial<IoModal> = {}): IoModal {
  const c = new IoModal();
  (c as any).el = document.createElement('io-modal');
  (c as any).dismissEvent = { emit: vi.fn() };
  (c as any).motionVisibleEndEvent = { emit: vi.fn() };
  (c as any).motionHiddenEndEvent = { emit: vi.fn() };
  Object.assign(c, overrides);
  (c as any).componentWillLoad();
  return c;
}

function renderCalls(c: IoModal) {
  const hMock = h as unknown as ReturnType<typeof vi.fn>;
  hMock.mockClear();
  c.render();
  return hMock.mock.calls as Array<[unknown, Record<string, unknown>, ...unknown[]]>;
}

// ── dialog ref callback ───────────────────────────────────────────────────────

describe('io-modal render() — dialog ref callback', () => {
  it('assigns element to dialogEl when ref is called with an element', () => {
    const c = makeModal();
    const calls = renderCalls(c);

    const dialogCall = calls.find(([tag]) => tag === 'dialog');
    expect(dialogCall).toBeDefined();

    const refFn = dialogCall![1].ref as (el: HTMLDialogElement | undefined) => void;
    const mockEl = document.createElement('dialog') as HTMLDialogElement;
    refFn(mockEl);
    expect((c as any).dialogEl).toBe(mockEl);
  });

  it('assigns undefined to dialogEl when ref is called with undefined', () => {
    const c = makeModal();
    (c as any).dialogEl = document.createElement('dialog') as HTMLDialogElement;
    const calls = renderCalls(c);

    const dialogCall = calls.find(([tag]) => tag === 'dialog');
    expect(dialogCall).toBeDefined();

    const refFn = dialogCall![1].ref as (el: HTMLDialogElement | undefined) => void;
    refFn(undefined);
    expect((c as any).dialogEl).toBeUndefined();
  });
});

// ── render branch coverage ────────────────────────────────────────────────────

describe('io-modal render() — branch coverage', () => {
  it('does not throw with default props', () => {
    const c = makeModal();
    expect(() => c.render()).not.toThrow();
  });

  it('renders heading h2 when heading is provided', () => {
    const c = makeModal({ heading: 'My Modal' });
    const calls = renderCalls(c);

    const h2Call = calls.find(([tag]) => tag === 'h2');
    expect(h2Call).toBeDefined();
  });

  it('does not render heading h2 when heading is not provided', () => {
    const c = makeModal();
    const calls = renderCalls(c);

    const h2Call = calls.find(([tag]) => tag === 'h2');
    expect(h2Call).toBeUndefined();
  });

  it('sets aria-labelledby when heading is provided', () => {
    const c = makeModal({ heading: 'Dialog Title' });
    const calls = renderCalls(c);

    const dialogCall = calls.find(([tag]) => tag === 'dialog');
    expect(dialogCall).toBeDefined();
    expect(dialogCall![1]['aria-labelledby']).toBeDefined();
  });

  it('does not set aria-labelledby when heading is absent', () => {
    const c = makeModal();
    const calls = renderCalls(c);

    const dialogCall = calls.find(([tag]) => tag === 'dialog');
    expect(dialogCall).toBeDefined();
    expect(dialogCall![1]['aria-labelledby']).toBeUndefined();
  });

  it('sets aria-describedby when description is provided', () => {
    const c = makeModal({ description: 'Some description' });
    const calls = renderCalls(c);

    const dialogCall = calls.find(([tag]) => tag === 'dialog');
    expect(dialogCall).toBeDefined();
    expect(dialogCall![1]['aria-describedby']).toBeDefined();
  });

  it('does not set aria-describedby when description is absent', () => {
    const c = makeModal();
    const calls = renderCalls(c);

    const dialogCall = calls.find(([tag]) => tag === 'dialog');
    expect(dialogCall).toBeDefined();
    expect(dialogCall![1]['aria-describedby']).toBeUndefined();
  });
});
