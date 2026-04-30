/**
 * io-divider — render-path tests
 * ================================
 * Verifies the three render branches (horizontal, vertical, labeled) produce
 * the correct element tags and ARIA attributes.
 *
 * Uses vi.mocked(h).mock.calls to inspect the VNode arguments passed to
 * Stencil's h() function, following the pattern used in io-toast and io-input.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoDivider } from './io-divider';

// ── Helpers ──────────────────────────────────────────────────────────────────

function makeComp(overrides: Partial<IoDivider> = {}): IoDivider {
  const comp = new IoDivider();
  (comp as any).el = document.createElement('io-divider');
  Object.assign(comp, overrides);
  return comp;
}

/** Find calls to h() by the tag name. Returns the props object (second arg). */
function hCallProps(tag: string): Record<string, unknown> | undefined {
  const call = vi.mocked(h).mock.calls.find((args) => args[0] === tag);
  return call?.[1] as Record<string, unknown> | undefined;
}

/** Return all calls to h() for a given tag. */
function hCallsForTag(tag: string): Array<Record<string, unknown> | undefined> {
  return vi
    .mocked(h)
    .mock.calls.filter((args) => args[0] === tag)
    .map((args) => args[1] as Record<string, unknown> | undefined);
}

// ── Horizontal (default) branch ───────────────────────────────────────────────

describe('io-divider render — horizontal (default)', () => {
  let comp: IoDivider;

  beforeEach(() => {
    comp = makeComp();
    vi.mocked(h).mockClear();
    comp.render();
  });

  it('renders an <hr> element', () => {
    const hrCalls = hCallsForTag('hr');
    expect(hrCalls.length).toBeGreaterThan(0);
  });

  it('<hr> does NOT carry an explicit role attribute (hr has implicit role=separator)', () => {
    const hrProps = hCallProps('hr');
    expect((hrProps as Record<string, unknown>)?.['role']).toBeUndefined();
  });

  it('<hr> does NOT carry aria-orientation (horizontal is the ARIA default for role=separator)', () => {
    const hrProps = hCallProps('hr');
    expect((hrProps as Record<string, unknown>)?.['aria-orientation']).toBeUndefined();
  });

  it('does NOT render a <div> separator for the horizontal variant', () => {
    const divCalls = hCallsForTag('div').filter(
      (p) => p && typeof p === 'object' && (p as Record<string, unknown>)['role'] === 'separator',
    );
    expect(divCalls).toHaveLength(0);
  });
});

// ── Vertical branch ───────────────────────────────────────────────────────────

describe('io-divider render — vertical', () => {
  let comp: IoDivider;

  beforeEach(() => {
    comp = makeComp({ orientation: 'vertical' });
    vi.mocked(h).mockClear();
    comp.render();
  });

  it('renders a <div> with role="separator" for the vertical variant', () => {
    const separatorDivs = hCallsForTag('div').filter(
      (p) => p && typeof p === 'object' && (p as Record<string, unknown>)['role'] === 'separator',
    );
    expect(separatorDivs.length).toBeGreaterThan(0);
  });

  it('vertical <div> has aria-orientation="vertical"', () => {
    const separatorDivs = hCallsForTag('div').filter(
      (p) => p && typeof p === 'object' && (p as Record<string, unknown>)['role'] === 'separator',
    );
    expect(separatorDivs[0]?.['aria-orientation']).toBe('vertical');
  });

  it('vertical <div> carries the .divider--vertical class', () => {
    const separatorDivs = hCallsForTag('div').filter(
      (p) =>
        p &&
        typeof p === 'object' &&
        typeof (p as Record<string, unknown>)['class'] === 'string' &&
        ((p as Record<string, unknown>)['class'] as string).includes('divider--vertical'),
    );
    expect(separatorDivs.length).toBeGreaterThan(0);
  });

  it('does NOT render an <hr> for the vertical variant', () => {
    const hrCalls = hCallsForTag('hr');
    expect(hrCalls).toHaveLength(0);
  });
});

// ── Labeled branch ────────────────────────────────────────────────────────────

describe('io-divider render — labeled', () => {
  beforeEach(() => {
    vi.mocked(h).mockClear();
  });

  it('labeled wrapper has role="separator"', () => {
    const comp = makeComp({ label: 'or' });
    comp.render();
    const separatorDivs = hCallsForTag('div').filter(
      (p) => p && typeof p === 'object' && (p as Record<string, unknown>)['role'] === 'separator',
    );
    expect(separatorDivs.length).toBeGreaterThan(0);
  });

  it('labeled wrapper always has aria-orientation="horizontal" (visual layout is always horizontal)', () => {
    const comp = makeComp({ label: 'or', orientation: 'horizontal' });
    comp.render();
    const separatorDivs = hCallsForTag('div').filter(
      (p) => p && typeof p === 'object' && (p as Record<string, unknown>)['role'] === 'separator',
    );
    expect(separatorDivs[0]?.['aria-orientation']).toBe('horizontal');
  });

  it('aria-orientation remains "horizontal" even when orientation prop is "vertical"', () => {
    // The labeled layout is always a horizontal flex row regardless of the
    // orientation prop. Emitting aria-orientation="vertical" here would mislead AT.
    const comp = makeComp({ label: 'or', orientation: 'vertical' });
    comp.render();
    const separatorDivs = hCallsForTag('div').filter(
      (p) => p && typeof p === 'object' && (p as Record<string, unknown>)['role'] === 'separator',
    );
    expect(separatorDivs.length).toBeGreaterThan(0);
    expect(separatorDivs[0]?.['aria-orientation']).toBe('horizontal');
  });

  it('labeled wrapper carries the .divider--labeled class', () => {
    const comp = makeComp({ label: 'or' });
    comp.render();
    const labeledDivs = hCallsForTag('div').filter(
      (p) =>
        p &&
        typeof p === 'object' &&
        typeof (p as Record<string, unknown>)['class'] === 'string' &&
        ((p as Record<string, unknown>)['class'] as string).includes('divider--labeled'),
    );
    expect(labeledDivs.length).toBeGreaterThan(0);
  });

  it('renders two decorative line spans with aria-hidden="true"', () => {
    const comp = makeComp({ label: 'or' });
    comp.render();
    const hiddenSpans = hCallsForTag('span').filter(
      (p) => p && typeof p === 'object' && (p as Record<string, unknown>)['aria-hidden'] === 'true',
    );
    expect(hiddenSpans).toHaveLength(2);
  });

  it('renders a .divider__label span', () => {
    const comp = makeComp({ label: 'or' });
    comp.render();
    const labelSpans = hCallsForTag('span').filter(
      (p) =>
        p &&
        typeof p === 'object' &&
        typeof (p as Record<string, unknown>)['class'] === 'string' &&
        ((p as Record<string, unknown>)['class'] as string).includes('divider__label'),
    );
    expect(labelSpans.length).toBeGreaterThan(0);
  });

  it('does NOT render an <hr> when label is set', () => {
    const comp = makeComp({ label: 'or' });
    comp.render();
    const hrCalls = hCallsForTag('hr');
    expect(hrCalls).toHaveLength(0);
  });
});
