import { describe, it, expect, beforeEach, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoWordmark } from './io-wordmark';

describe('io-wordmark - default props and render contract', () => {
  it('has md as the default size', () => {
    const component = new IoWordmark();
    expect(component.size).toBe('md');
  });

  it('has false as the default mono value', () => {
    const component = new IoWordmark();
    expect(component.mono).toBe(false);
  });

  it('has "io Digital" as the default ariaLabel', () => {
    const component = new IoWordmark();
    expect(component.ariaLabel).toBe('io Digital');
  });

  it('href defaults to undefined', () => {
    const component = new IoWordmark();
    expect(component.href).toBeUndefined();
  });

  it('target defaults to undefined', () => {
    const component = new IoWordmark();
    expect(component.target).toBeUndefined();
  });

  it('rel defaults to undefined', () => {
    const component = new IoWordmark();
    expect(component.rel).toBeUndefined();
  });

  it('renders without throwing for each supported size', () => {
    const sizes = ['sm', 'md', 'lg', 'xl'] as const;

    for (const size of sizes) {
      const component = new IoWordmark();
      component.size = size;
      expect(() => component.render()).not.toThrow();
    }
  });

  it('renders without throwing in mono mode', () => {
    const component = new IoWordmark();
    component.mono = true;
    expect(() => component.render()).not.toThrow();
  });

  it('renders without throwing with custom ariaLabel', () => {
    const component = new IoWordmark();
    component.ariaLabel = 'iO Digital wordmark';
    expect(() => component.render()).not.toThrow();
  });
});

// ── href / link rendering tests ───────────────────────────────────────────────

function makeWordmark(overrides: Partial<IoWordmark> = {}): IoWordmark {
  const component = new IoWordmark();
  Object.assign(component, overrides);
  return component;
}

function hCallsForTag(tag: string): Array<Record<string, unknown> | undefined> {
  return vi
    .mocked(h)
    .mock.calls.filter((args) => args[0] === tag)
    .map((args) => args[1] as Record<string, unknown> | undefined);
}

describe('io-wordmark — render without href (static presentational)', () => {
  beforeEach(() => {
    vi.mocked(h).mockClear();
  });

  it('renders without throwing when href is not set', () => {
    expect(() => makeWordmark().render()).not.toThrow();
  });

  it('does NOT render an <a> element when href is not set', () => {
    makeWordmark().render();
    expect(hCallsForTag('a')).toHaveLength(0);
  });
});

describe('io-wordmark — render with href (link mode)', () => {
  beforeEach(() => {
    vi.mocked(h).mockClear();
  });

  it('renders an <a> element when href is set', () => {
    makeWordmark({ href: '/' }).render();
    expect(hCallsForTag('a').length).toBeGreaterThan(0);
  });

  it('renders without throwing when href is set', () => {
    expect(() => makeWordmark({ href: '/' }).render()).not.toThrow();
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

  it('does NOT render an <a> element when href is not set', () => {
    makeWordmark({ target: '_blank' }).render();
    expect(hCallsForTag('a')).toHaveLength(0);
  });

  it('renders without throwing for all supported size + href combinations', () => {
    const sizes = ['sm', 'md', 'lg', 'xl'] as const;
    for (const size of sizes) {
      expect(() => makeWordmark({ href: '/', size }).render()).not.toThrow();
    }
  });
});
