/**
 * io-tabs-bar — render() label prop coverage
 *
 * The `this.label || undefined` branch at render() line 198 is not tested
 * by existing specs. This spec covers both the truthy (label provided) and
 * falsy (label absent) paths.
 */
import { describe, it, expect, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoTabsBar } from './io-tabs-bar';

function makeTabsBar(overrides: Partial<IoTabsBar> = {}): IoTabsBar {
  const c = new IoTabsBar();
  (c as any).el = document.createElement('io-tabs-bar');
  Object.assign(c, overrides);
  return c;
}

function renderCalls(c: IoTabsBar) {
  const hMock = h as unknown as ReturnType<typeof vi.fn>;
  hMock.mockClear();
  c.render();
  return hMock.mock.calls as Array<[unknown, Record<string, unknown>, ...unknown[]]>;
}

// ── label prop ────────────────────────────────────────────────────────────────

describe('io-tabs-bar render() — label prop', () => {
  it('sets aria-label on tablist when label is provided', () => {
    const c = makeTabsBar({ label: 'Main navigation' });
    const calls = renderCalls(c);

    const tablistCall = calls.find(
      ([tag, attrs]) => tag === 'div' && (attrs as Record<string, unknown>)?.role === 'tablist',
    );
    expect(tablistCall).toBeDefined();
    expect(tablistCall![1]['aria-label']).toBe('Main navigation');
  });

  it('sets aria-label to undefined when label is absent', () => {
    const c = makeTabsBar();
    const calls = renderCalls(c);

    const tablistCall = calls.find(
      ([tag, attrs]) => tag === 'div' && (attrs as Record<string, unknown>)?.role === 'tablist',
    );
    expect(tablistCall).toBeDefined();
    expect(tablistCall![1]['aria-label']).toBeUndefined();
  });
});
