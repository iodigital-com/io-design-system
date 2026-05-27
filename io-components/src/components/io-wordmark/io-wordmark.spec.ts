import { describe, it, expect, beforeEach, vi } from 'vitest';
import { h, Host } from '@stencil/core';

import { IoWordmark } from './io-wordmark';

// ── Default props ──────────────────────────────────────────────────────────────

describe('io-wordmark — default props', () => {
  it('has "text" as the default variant', () => {
    expect(new IoWordmark().variant).toBe('text');
  });

  it('has "blue" as the default color', () => {
    expect(new IoWordmark().color).toBe('blue');
  });

  it('has "md" as the default size', () => {
    expect(new IoWordmark().size).toBe('md');
  });

  it('has false as the default mono value', () => {
    expect(new IoWordmark().mono).toBe(false);
  });

  it('has "io Digital" as the default ariaLabel', () => {
    expect(new IoWordmark().ariaLabel).toBe('io Digital');
  });

  it('href defaults to undefined', () => {
    expect(new IoWordmark().href).toBeUndefined();
  });

  it('target defaults to undefined', () => {
    expect(new IoWordmark().target).toBeUndefined();
  });

  it('rel defaults to undefined', () => {
    expect(new IoWordmark().rel).toBeUndefined();
  });
});

// ── variant='text' ─────────────────────────────────────────────────────────────

describe('io-wordmark — variant="text" render contract', () => {
  it('renders without throwing for each supported size', () => {
    for (const size of ['sm', 'md', 'lg', 'xl'] as const) {
      const c = new IoWordmark();
      c.size = size;
      expect(() => c.render()).not.toThrow();
    }
  });

  it('renders without throwing in mono mode', () => {
    const c = new IoWordmark();
    c.mono = true;
    expect(() => c.render()).not.toThrow();
  });

  it('renders without throwing with custom ariaLabel', () => {
    const c = new IoWordmark();
    c.ariaLabel = 'iO Digital wordmark';
    expect(() => c.render()).not.toThrow();
  });

  it('renders without throwing for each color value', () => {
    for (const color of ['blue', 'black', 'white'] as const) {
      const c = new IoWordmark();
      c.color = color;
      expect(() => c.render()).not.toThrow();
    }
  });
});

// ── variant='text' href / link rendering ──────────────────────────────────────

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

describe('io-wordmark — variant="text" without href (static)', () => {
  beforeEach(() => { vi.mocked(h).mockClear(); });

  it('renders without throwing when href is not set', () => {
    expect(() => makeWordmark().render()).not.toThrow();
  });

  it('does NOT render an <a> element when href is not set', () => {
    makeWordmark().render();
    expect(hCallsForTag('a')).toHaveLength(0);
  });

  it('Host has role="img" when href is not set', () => {
    makeWordmark().render();
    const [host] = hostCalls();
    expect(host?.['role']).toBe('img');
  });

  it('Host has default aria-label when href is not set', () => {
    makeWordmark().render();
    const [host] = hostCalls();
    expect(host?.['aria-label']).toBe('io Digital');
  });
});

describe('io-wordmark — variant="text" with href (link mode)', () => {
  beforeEach(() => { vi.mocked(h).mockClear(); });

  it('Host has NO role="img" when href is set (label moves to <a>)', () => {
    makeWordmark({ href: '/' }).render();
    const [host] = hostCalls();
    expect(host?.['role']).toBeUndefined();
  });

  it('renders an <a> element when href is set', () => {
    makeWordmark({ href: '/' }).render();
    expect(hCallsForTag('a').length).toBeGreaterThan(0);
  });

  it('passes href to the <a> element', () => {
    makeWordmark({ href: '/home' }).render();
    const [anchor] = hCallsForTag('a');
    expect(anchor?.['href']).toBe('/home');
  });

  it('passes target to the <a> element', () => {
    makeWordmark({ href: 'https://iodigital.com', target: '_blank' }).render();
    const [anchor] = hCallsForTag('a');
    expect(anchor?.['target']).toBe('_blank');
  });

  it('passes rel to the <a> element', () => {
    makeWordmark({ href: 'https://iodigital.com', rel: 'noopener noreferrer' }).render();
    const [anchor] = hCallsForTag('a');
    expect(anchor?.['rel']).toBe('noopener noreferrer');
  });

  it('applies aria-label to the <a> element', () => {
    makeWordmark({ href: '/', ariaLabel: 'iO Digital — go to homepage' }).render();
    const [anchor] = hCallsForTag('a');
    expect(anchor?.['aria-label']).toBe('iO Digital — go to homepage');
  });

  it('uses default ariaLabel on the <a> when no custom label is set', () => {
    makeWordmark({ href: '/' }).render();
    const [anchor] = hCallsForTag('a');
    expect(anchor?.['aria-label']).toBe('io Digital');
  });

  it('does NOT render an <a> element when href is not set even if target is set', () => {
    makeWordmark({ target: '_blank' }).render();
    expect(hCallsForTag('a')).toHaveLength(0);
  });

  it('renders without throwing for all size + href combinations', () => {
    for (const size of ['sm', 'md', 'lg', 'xl'] as const) {
      expect(() => makeWordmark({ href: '/', size }).render()).not.toThrow();
    }
  });

  it('auto-adds rel="noopener noreferrer" when target="_blank" and no rel is set', () => {
    makeWordmark({ href: 'https://iodigital.com', target: '_blank' }).render();
    const [anchor] = hCallsForTag('a');
    expect(anchor?.['rel']).toBe('noopener noreferrer');
  });

  it('preserves explicit rel when target="_blank" and rel is provided', () => {
    makeWordmark({ href: 'https://iodigital.com', target: '_blank', rel: 'noopener' }).render();
    const [anchor] = hCallsForTag('a');
    expect(anchor?.['rel']).toBe('noopener');
  });

  it('does not set rel when target is not "_blank" and no rel is provided', () => {
    makeWordmark({ href: '/' }).render();
    const [anchor] = hCallsForTag('a');
    expect(anchor?.['rel']).toBeUndefined();
  });
});

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
});
