import { h, Host } from '@stencil/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { IoWordmark } from './io-wordmark';

// ── Default props ──────────────────────────────────────────────────────────────

describe('io-wordmark — default props', () => {
  it('has "mark" as the default variant', () => {
    expect(new IoWordmark().variant).toBe('mark');
  });

  it('has "blue" as the default color', () => {
    expect(new IoWordmark().color).toBe('blue');
  });

  it('has "md" as the default size', () => {
    expect(new IoWordmark().size).toBe('md');
  });

  it('has "io Digital" as the default ariaLabel', () => {
    expect(new IoWordmark().ariaLabel).toBe('io Digital');
  });
});

// ── Render helpers ─────────────────────────────────────────────────────────────

function makeWordmark(overrides: Partial<IoWordmark> = {}): IoWordmark {
  return Object.assign(new IoWordmark(), overrides);
}

function hCallsForTag(tag: string): Array<Record<string, unknown> | undefined> {
  return vi
    .mocked(h)
    .mock.calls.filter((args) => args[0] === tag)
    .map((args) => args[1] as Record<string, unknown> | undefined);
}

function hostCalls(): Array<Record<string, unknown> | undefined> {
  return vi
    .mocked(h)
    .mock.calls.filter((args) => args[0] === Host)
    .map((args) => args[1] as Record<string, unknown> | undefined);
}

// ── variant='mark' ─────────────────────────────────────────────────────────────

describe('io-wordmark — variant="mark" render contract', () => {
  beforeEach(() => { vi.mocked(h).mockClear(); });

  it('renders without throwing', () => {
    expect(() => makeWordmark({ variant: 'mark' }).render()).not.toThrow();
  });

  it('renders without throwing for each supported size', () => {
    for (const size of ['sm', 'md', 'lg', 'xl'] as const) {
      expect(() => makeWordmark({ variant: 'mark', size }).render()).not.toThrow();
    }
  });

  it('renders without throwing for each supported color', () => {
    for (const color of ['blue', 'black', 'white', 'beige'] as const) {
      expect(() => makeWordmark({ variant: 'mark', color }).render()).not.toThrow();
    }
  });

  it('Host has role="img"', () => {
    makeWordmark({ variant: 'mark' }).render();
    const [host] = hostCalls();
    expect(host?.['role']).toBe('img');
  });

  it('Host has default aria-label', () => {
    makeWordmark({ variant: 'mark' }).render();
    const [host] = hostCalls();
    expect(host?.['aria-label']).toBe('io Digital');
  });

  it('Host has custom aria-label when ariaLabel is set', () => {
    makeWordmark({ variant: 'mark', ariaLabel: 'iO brand mark' }).render();
    const [host] = hostCalls();
    expect(host?.['aria-label']).toBe('iO brand mark');
  });

  it('renders an SVG element', () => {
    makeWordmark({ variant: 'mark' }).render();
    expect(hCallsForTag('svg').length).toBeGreaterThan(0);
  });
});

// ── variant='lockup' ───────────────────────────────────────────────────────────

describe('io-wordmark — variant="lockup" render contract', () => {
  beforeEach(() => { vi.mocked(h).mockClear(); });

  it('renders without throwing', () => {
    expect(() => makeWordmark({ variant: 'lockup' }).render()).not.toThrow();
  });

  it('renders without throwing for each supported size', () => {
    for (const size of ['sm', 'md', 'lg', 'xl'] as const) {
      expect(() => makeWordmark({ variant: 'lockup', size }).render()).not.toThrow();
    }
  });

  it('renders without throwing for each supported color', () => {
    for (const color of ['blue', 'black', 'white'] as const) {
      expect(() => makeWordmark({ variant: 'lockup', color }).render()).not.toThrow();
    }
  });

  it('Host has role="img"', () => {
    makeWordmark({ variant: 'lockup' }).render();
    const [host] = hostCalls();
    expect(host?.['role']).toBe('img');
  });

  it('Host has default aria-label', () => {
    makeWordmark({ variant: 'lockup' }).render();
    const [host] = hostCalls();
    expect(host?.['aria-label']).toBe('io Digital');
  });

  it('Host has custom aria-label when ariaLabel is set', () => {
    makeWordmark({ variant: 'lockup', ariaLabel: 'iO Digital brand lockup' }).render();
    const [host] = hostCalls();
    expect(host?.['aria-label']).toBe('iO Digital brand lockup');
  });

  it('renders an SVG element', () => {
    makeWordmark({ variant: 'lockup' }).render();
    expect(hCallsForTag('svg').length).toBeGreaterThan(0);
  });
});

// ── default render (no variant prop) ─────────────────────────────────────────

describe('io-wordmark — default render (mark)', () => {
  beforeEach(() => { vi.mocked(h).mockClear(); });

  it('renders without throwing when no variant is set', () => {
    expect(() => new IoWordmark().render()).not.toThrow();
  });

  it('Host has role="img"', () => {
    new IoWordmark().render();
    const [host] = hostCalls();
    expect(host?.['role']).toBe('img');
  });

  it('does not render an <a> element', () => {
    new IoWordmark().render();
    expect(hCallsForTag('a')).toHaveLength(0);
  });
});
