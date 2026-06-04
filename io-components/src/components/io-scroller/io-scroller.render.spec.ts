/**
 * io-scroller — render() ref callback coverage
 *
 * The three ref callbacks in render() (scrollContainer, startSentinel, endSentinel)
 * are never invoked by the lifecycle tests. This spec calls render(), extracts each
 * ref from h.mock.calls, and invokes it to drive coverage for lines 192-207.
 */
import { describe, it, expect, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoScroller } from './io-scroller';

function makeComponent(overrides: Partial<IoScroller> = {}): IoScroller {
  const c = new IoScroller();
  (c as any).el = document.createElement('io-scroller');
  Object.assign(c, overrides);
  return c;
}

function renderCalls(c: IoScroller) {
  const hMock = h as unknown as ReturnType<typeof vi.fn>;
  hMock.mockClear();
  c.render();
  return hMock.mock.calls as Array<[unknown, Record<string, unknown>, ...unknown[]]>;
}

// ── ref callbacks ─────────────────────────────────────────────────────────────

describe('io-scroller render() — ref callbacks', () => {
  it('scrollContainer ref assigns the element to this.scrollContainer', () => {
    const c = makeComponent();
    const calls = renderCalls(c);

    // scrollContainer div is identified by role="region" (unique among divs)
    const divCall = calls.find(
      ([tag, attrs]) => tag === 'div' && (attrs as Record<string, unknown>)?.role === 'region',
    );
    expect(divCall).toBeDefined();

    const refFn = divCall![1].ref as (el: HTMLDivElement | undefined) => void;
    const mockEl = document.createElement('div') as HTMLDivElement;
    refFn(mockEl);
    expect((c as any).scrollContainer).toBe(mockEl);
  });

  it('scrollContainer ref clears when called with undefined', () => {
    const c = makeComponent();
    (c as any).scrollContainer = document.createElement('div');
    const calls = renderCalls(c);

    const divCall = calls.find(
      ([tag, attrs]) => tag === 'div' && (attrs as Record<string, unknown>)?.role === 'region',
    );
    const refFn = divCall![1].ref as (el: HTMLDivElement | undefined) => void;
    refFn(undefined);
    expect((c as any).scrollContainer).toBeUndefined();
  });

  it('startSentinel ref assigns the element to this.startSentinel', () => {
    const c = makeComponent();
    const calls = renderCalls(c);

    const sentinelCall = calls.find(
      ([tag, attrs]) =>
        tag === 'div' && String(attrs?.class).includes('sentinel--start'),
    );
    expect(sentinelCall).toBeDefined();

    const refFn = sentinelCall![1].ref as (el: HTMLDivElement | undefined) => void;
    const mockEl = document.createElement('div') as HTMLDivElement;
    refFn(mockEl);
    expect((c as any).startSentinel).toBe(mockEl);
  });

  it('endSentinel ref assigns the element to this.endSentinel', () => {
    const c = makeComponent();
    const calls = renderCalls(c);

    const sentinelCall = calls.find(
      ([tag, attrs]) =>
        tag === 'div' && String(attrs?.class).includes('sentinel--end'),
    );
    expect(sentinelCall).toBeDefined();

    const refFn = sentinelCall![1].ref as (el: HTMLDivElement | undefined) => void;
    const mockEl = document.createElement('div') as HTMLDivElement;
    refFn(mockEl);
    expect((c as any).endSentinel).toBe(mockEl);
  });
});

// ── label prop ────────────────────────────────────────────────────────────────

describe('io-scroller render() — label prop', () => {
  it('uses label prop as aria-label when provided', () => {
    const c = makeComponent({ label: 'Image carousel' });
    const calls = renderCalls(c);

    const regionDiv = calls.find(
      ([tag, attrs]) => tag === 'div' && (attrs as Record<string, unknown>)?.role === 'region',
    );
    expect(regionDiv).toBeDefined();
    expect(regionDiv![1]['aria-label']).toBe('Image carousel');
  });

  it('uses fallback label when label prop is absent', () => {
    const c = makeComponent({ orientation: 'horizontal' });
    const calls = renderCalls(c);

    const regionDiv = calls.find(
      ([tag, attrs]) => tag === 'div' && (attrs as Record<string, unknown>)?.role === 'region',
    );
    expect(regionDiv).toBeDefined();
    expect(regionDiv![1]['aria-label']).toContain('horizontal');
  });
});
