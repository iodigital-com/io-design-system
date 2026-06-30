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

// ── tabIndex — conditional ────────────────────────────────────────────────────

describe('io-scroller render() — conditional tabIndex', () => {
  it('omits tabIndex when atStart=true and atEnd=true (no overflow)', () => {
    const c = makeComponent();
    // Default state: atStart=true, atEnd=true
    const calls = renderCalls(c);

    const regionDiv = calls.find(
      ([tag, attrs]) => tag === 'div' && (attrs as Record<string, unknown>)?.role === 'region',
    );
    expect(regionDiv).toBeDefined();
    expect(regionDiv![1]['tabIndex']).toBeUndefined();
  });

  it('sets tabIndex=0 when atStart=false (content overflows start)', () => {
    const c = makeComponent();
    (c as any).atStart = false;
    (c as any).atEnd = true;
    const calls = renderCalls(c);

    const regionDiv = calls.find(
      ([tag, attrs]) => tag === 'div' && (attrs as Record<string, unknown>)?.role === 'region',
    );
    expect(regionDiv).toBeDefined();
    expect(regionDiv![1]['tabIndex']).toBe(0);
  });

  it('sets tabIndex=0 when atEnd=false (content overflows end)', () => {
    const c = makeComponent();
    (c as any).atStart = true;
    (c as any).atEnd = false;
    const calls = renderCalls(c);

    const regionDiv = calls.find(
      ([tag, attrs]) => tag === 'div' && (attrs as Record<string, unknown>)?.role === 'region',
    );
    expect(regionDiv).toBeDefined();
    expect(regionDiv![1]['tabIndex']).toBe(0);
  });

  it('sets tabIndex=0 when both atStart=false and atEnd=false', () => {
    const c = makeComponent();
    (c as any).atStart = false;
    (c as any).atEnd = false;
    const calls = renderCalls(c);

    const regionDiv = calls.find(
      ([tag, attrs]) => tag === 'div' && (attrs as Record<string, unknown>)?.role === 'region',
    );
    expect(regionDiv).toBeDefined();
    expect(regionDiv![1]['tabIndex']).toBe(0);
  });
});

// ── scroll indicator buttons ──────────────────────────────────────────────────

describe('io-scroller render() — scroll indicator buttons', () => {
  it('does not render prev indicator when atStart=true', () => {
    const c = makeComponent();
    (c as any).atStart = true;
    const calls = renderCalls(c);

    const prevBtn = calls.find(
      ([tag, attrs]) =>
        tag === 'button' && String(attrs?.class).includes('indicator--prev'),
    );
    expect(prevBtn).toBeUndefined();
  });

  it('does not render next indicator when atEnd=true', () => {
    const c = makeComponent();
    (c as any).atEnd = true;
    const calls = renderCalls(c);

    const nextBtn = calls.find(
      ([tag, attrs]) =>
        tag === 'button' && String(attrs?.class).includes('indicator--next'),
    );
    expect(nextBtn).toBeUndefined();
  });

  it('renders prev indicator when atStart=false', () => {
    const c = makeComponent();
    (c as any).atStart = false;
    (c as any).atEnd = true;
    const calls = renderCalls(c);

    const prevBtn = calls.find(
      ([tag, attrs]) =>
        tag === 'button' && String(attrs?.class).includes('indicator--prev'),
    );
    expect(prevBtn).toBeDefined();
    expect(prevBtn![1]['aria-label']).toBe('Scroll backward');
    expect(prevBtn![1]['tabIndex']).toBe(-1);
  });

  it('renders next indicator when atEnd=false', () => {
    const c = makeComponent();
    (c as any).atStart = true;
    (c as any).atEnd = false;
    const calls = renderCalls(c);

    const nextBtn = calls.find(
      ([tag, attrs]) =>
        tag === 'button' && String(attrs?.class).includes('indicator--next'),
    );
    expect(nextBtn).toBeDefined();
    expect(nextBtn![1]['aria-label']).toBe('Scroll forward');
    expect(nextBtn![1]['tabIndex']).toBe(-1);
  });

  it('renders both indicators when neither edge is reached', () => {
    const c = makeComponent();
    (c as any).atStart = false;
    (c as any).atEnd = false;
    const calls = renderCalls(c);

    const prevBtn = calls.find(
      ([tag, attrs]) =>
        tag === 'button' && String(attrs?.class).includes('indicator--prev'),
    );
    const nextBtn = calls.find(
      ([tag, attrs]) =>
        tag === 'button' && String(attrs?.class).includes('indicator--next'),
    );
    expect(prevBtn).toBeDefined();
    expect(nextBtn).toBeDefined();
  });

  it('adds scroller__indicator--sticky class to prev button when sticky=true', () => {
    const c = makeComponent({ sticky: true });
    (c as any).atStart = false;
    const calls = renderCalls(c);

    const prevBtn = calls.find(
      ([tag, attrs]) =>
        tag === 'button' && String(attrs?.class).includes('indicator--prev'),
    );
    expect(prevBtn).toBeDefined();
    expect(String(prevBtn![1].class)).toContain('scroller__indicator--sticky');
  });

  it('adds scroller__indicator--sticky class to next button when sticky=true', () => {
    const c = makeComponent({ sticky: true });
    (c as any).atEnd = false;
    const calls = renderCalls(c);

    const nextBtn = calls.find(
      ([tag, attrs]) =>
        tag === 'button' && String(attrs?.class).includes('indicator--next'),
    );
    expect(nextBtn).toBeDefined();
    expect(String(nextBtn![1].class)).toContain('scroller__indicator--sticky');
  });

  it('does not add sticky class when sticky=false', () => {
    const c = makeComponent({ sticky: false });
    (c as any).atStart = false;
    const calls = renderCalls(c);

    const prevBtn = calls.find(
      ([tag, attrs]) =>
        tag === 'button' && String(attrs?.class).includes('indicator--prev'),
    );
    expect(prevBtn).toBeDefined();
    expect(String(prevBtn![1].class)).not.toContain('scroller__indicator--sticky');
  });
});

// ── ARIA pass-through ─────────────────────────────────────────────────────────

describe('io-scroller render() — ARIA pass-through', () => {
  it('uses scrollRole as role on container when provided', () => {
    const c = makeComponent({ scrollRole: 'tablist' });
    const calls = renderCalls(c);

    const containerDiv = calls.find(
      ([tag, attrs]) => tag === 'div' && (attrs as Record<string, unknown>)?.role === 'tablist',
    );
    expect(containerDiv).toBeDefined();
  });

  it('defaults to role="region" when scrollRole is not provided', () => {
    const c = makeComponent();
    const calls = renderCalls(c);

    const containerDiv = calls.find(
      ([tag, attrs]) => tag === 'div' && (attrs as Record<string, unknown>)?.role === 'region',
    );
    expect(containerDiv).toBeDefined();
  });

  it('uses scrollAriaLabel on container when provided', () => {
    const c = makeComponent({ scrollAriaLabel: 'Navigation tabs' });
    const calls = renderCalls(c);

    const containerDiv = calls.find(
      ([tag, attrs]) =>
        tag === 'div' && (attrs as Record<string, unknown>)?.['aria-label'] === 'Navigation tabs',
    );
    expect(containerDiv).toBeDefined();
  });

  it('uses scrollAriaOrientation on container when provided', () => {
    const c = makeComponent({ scrollAriaOrientation: 'vertical' });
    const calls = renderCalls(c);

    const containerDiv = calls.find(
      ([tag, attrs]) =>
        tag === 'div' && (attrs as Record<string, unknown>)?.['aria-orientation'] === 'vertical',
    );
    expect(containerDiv).toBeDefined();
  });

  it('derives aria-orientation from orientation prop when scrollAriaOrientation is not provided', () => {
    const c = makeComponent({ orientation: 'horizontal' });
    const calls = renderCalls(c);

    const containerDiv = calls.find(
      ([tag, attrs]) =>
        tag === 'div' && (attrs as Record<string, unknown>)?.['aria-orientation'] === 'horizontal',
    );
    expect(containerDiv).toBeDefined();
  });
});
