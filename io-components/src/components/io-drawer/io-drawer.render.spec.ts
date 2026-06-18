/**
 * io-drawer — render() ref callback and branch coverage
 *
 * The dialog ref at lines 294-297 is never invoked by existing tests because
 * h is mocked and refs are just props on the vnode. This spec extracts the ref
 * from h.mock.calls and invokes it to drive coverage.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { h } from '@stencil/core';

import { IoDrawer } from './io-drawer';

function makeDrawer(overrides: Partial<IoDrawer> = {}): IoDrawer {
  const c = new IoDrawer();
  (c as any).el = document.createElement('io-drawer');
  (c as any).dismissEvent = { emit: vi.fn() };
  (c as any).motionVisibleEndEvent = { emit: vi.fn() };
  (c as any).motionHiddenEndEvent = { emit: vi.fn() };
  Object.assign(c, overrides);
  (c as any).componentWillLoad();
  return c;
}

// Suppress console.error fired by componentWillLoad when no heading/aria-label
beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
});
afterEach(() => {
  vi.restoreAllMocks();
});

function renderCalls(c: IoDrawer) {
  const hMock = h as unknown as ReturnType<typeof vi.fn>;
  hMock.mockClear();
  c.render();
  return hMock.mock.calls as Array<[unknown, Record<string, unknown>, ...unknown[]]>;
}

// ── dialog ref callback ───────────────────────────────────────────────────────

describe('io-drawer render() — dialog ref callback', () => {
  it('assigns element to dialogEl when ref is called with an element', () => {
    const c = makeDrawer();
    const calls = renderCalls(c);

    const dialogCall = calls.find(([tag]) => tag === 'dialog');
    expect(dialogCall).toBeDefined();

    const refFn = dialogCall![1].ref as (el: HTMLDialogElement | undefined) => void;
    const mockEl = document.createElement('dialog') as HTMLDialogElement;
    refFn(mockEl);
    expect((c as any).dialogEl).toBe(mockEl);
  });

  it('assigns undefined to dialogEl when ref is called with undefined', () => {
    const c = makeDrawer();
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

describe('io-drawer render() — branch coverage', () => {
  it('does not throw with default props', () => {
    const c = makeDrawer();
    expect(() => c.render()).not.toThrow();
  });

  it('renders bottom-sheet handle when placement is bottom', () => {
    const c = makeDrawer({ placement: 'bottom' });
    const calls = renderCalls(c);

    const handleDiv = calls.find(
      ([tag, attrs]) => tag === 'div' && String(attrs?.class).includes('drawer__handle'),
    );
    expect(handleDiv).toBeDefined();
  });

  it('does not render bottom-sheet handle when placement is not bottom', () => {
    const c = makeDrawer({ placement: 'right' });
    const calls = renderCalls(c);

    const handleDiv = calls.find(
      ([tag, attrs]) => tag === 'div' && String(attrs?.class).includes('drawer__handle'),
    );
    expect(handleDiv).toBeUndefined();
  });

  it('renders heading h2 when heading is provided', () => {
    const c = makeDrawer({ heading: 'Drawer Title' });
    const calls = renderCalls(c);

    const h2Call = calls.find(([tag]) => tag === 'h2');
    expect(h2Call).toBeDefined();
  });

  it('does not render heading h2 when heading is not provided', () => {
    const c = makeDrawer();
    const calls = renderCalls(c);

    const h2Call = calls.find(([tag]) => tag === 'h2');
    expect(h2Call).toBeUndefined();
  });

  it('sets aria-labelledby when heading is provided', () => {
    const c = makeDrawer({ heading: 'Drawer Title' });
    const calls = renderCalls(c);

    const dialogCall = calls.find(([tag]) => tag === 'dialog');
    expect(dialogCall).toBeDefined();
    expect(dialogCall![1]['aria-labelledby']).toBeDefined();
  });

  it('does not set aria-labelledby when heading is absent', () => {
    const c = makeDrawer();
    const calls = renderCalls(c);

    const dialogCall = calls.find(([tag]) => tag === 'dialog');
    expect(dialogCall).toBeDefined();
    expect(dialogCall![1]['aria-labelledby']).toBeUndefined();
  });
});
