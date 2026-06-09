/**
 * io-button — render() ref callback and branch coverage
 *
 * The btnEl ref at lines 166-168 is never invoked by existing tests because
 * h is mocked and refs are just props on the vnode. This spec extracts the ref
 * from h.mock.calls and invokes it to drive coverage.
 */
import { describe, it, expect, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoButton } from './io-button';

function makeButton(overrides: Partial<IoButton> = {}): IoButton {
  const c = new IoButton();
  (c as any).el = document.createElement('io-button');
  (c as any).click = { emit: vi.fn() };
  Object.assign(c, overrides);
  return c;
}

function renderCalls(c: IoButton) {
  const hMock = h as unknown as ReturnType<typeof vi.fn>;
  hMock.mockClear();
  c.render();
  return hMock.mock.calls as Array<[string, Record<string, unknown>, ...unknown[]]>;
}

// ── btnEl ref callback ────────────────────────────────────────────────────────

describe('io-button render() — btnEl ref callback', () => {
  it('assigns element to btnEl when ref is called with an element', () => {
    const c = makeButton();
    const calls = renderCalls(c);

    // The inner button element carries the ref
    const btnCall = calls.find(([tag]) => tag === 'button');
    expect(btnCall).toBeDefined();

    const refFn = btnCall![1].ref as (el: HTMLElement | undefined) => void;
    const mockEl = document.createElement('button');
    refFn(mockEl);
    expect((c as any).btnEl).toBe(mockEl);
  });

  it('assigns undefined to btnEl when ref is called with undefined', () => {
    const c = makeButton();
    (c as any).btnEl = document.createElement('button');
    const calls = renderCalls(c);

    const btnCall = calls.find(([tag]) => tag === 'button');
    const refFn = btnCall![1].ref as (el: HTMLElement | undefined) => void;
    refFn(undefined);
    expect((c as any).btnEl).toBeUndefined();
  });

  it('renders as <a> tag when href is provided', () => {
    const c = makeButton({ href: '/about' });
    const calls = renderCalls(c);

    const aCall = calls.find(([tag]) => tag === 'a');
    expect(aCall).toBeDefined();
  });
});

// ── render branch coverage ────────────────────────────────────────────────────

describe('io-button render() — branch coverage', () => {
  it('does not throw with default props', () => {
    const c = makeButton();
    expect(() => c.render()).not.toThrow();
  });

  it('does not throw when loading=true', () => {
    const c = makeButton({ loading: true });
    expect(() => c.render()).not.toThrow();
  });

  it('does not throw when disabled=true', () => {
    const c = makeButton({ disabled: true });
    expect(() => c.render()).not.toThrow();
  });

  it('does not throw when fullWidth=true', () => {
    const c = makeButton({ fullWidth: true });
    expect(() => c.render()).not.toThrow();
  });

  it('does not throw when iconOnly=true', () => {
    const c = makeButton({ iconOnly: true });
    expect(() => c.render()).not.toThrow();
  });

  it('does not throw when arrow prop is set', () => {
    const c = makeButton({ arrow: 'forward' });
    expect(() => c.render()).not.toThrow();
  });

  it('does not throw when arrow is back', () => {
    const c = makeButton({ arrow: 'back' });
    expect(() => c.render()).not.toThrow();
  });

  it('does not throw with href and rel', () => {
    const c = makeButton({ href: '/page', rel: 'noopener', target: '_blank' });
    expect(() => c.render()).not.toThrow();
  });
});

// ── icon size scaling ─────────────────────────────────────────────────────────

describe('io-button renderIcon() — icon size scales with button size', () => {
  const cases: Array<{ buttonSize: string; expected: string }> = [
    { buttonSize: 'sm', expected: 'sm' },
    { buttonSize: 'md', expected: 'sm' },
    { buttonSize: 'lg', expected: 'md' },
    { buttonSize: 'xl', expected: 'lg' },
  ];

  for (const { buttonSize, expected } of cases) {
    it(`button size="${buttonSize}" renders io-icon size="${expected}"`, () => {
      const c = makeButton({ icon: 'add', size: buttonSize as any });
      const calls = renderCalls(c);
      const iconCall = calls.find(([tag]) => tag === 'io-icon');
      expect(iconCall).toBeDefined();
      expect(iconCall![1].size).toBe(expected);
    });
  }

  it('icon-only button with size="lg" renders io-icon size="md"', () => {
    const c = makeButton({ icon: 'add', iconOnly: true, size: 'lg' as any, label: 'Add' });
    const calls = renderCalls(c);
    const iconCall = calls.find(([tag]) => tag === 'io-icon');
    expect(iconCall).toBeDefined();
    expect(iconCall![1].size).toBe('md');
  });

  it('icon-only button with size="xl" renders io-icon size="lg"', () => {
    const c = makeButton({ icon: 'add', iconOnly: true, size: 'xl' as any, label: 'Add' });
    const calls = renderCalls(c);
    const iconCall = calls.find(([tag]) => tag === 'io-icon');
    expect(iconCall).toBeDefined();
    expect(iconCall![1].size).toBe('lg');
  });
});
