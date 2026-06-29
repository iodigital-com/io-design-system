import { beforeEach, describe, expect, it, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoProgress } from './io-progress';
import { computePercentage } from './io-progress-utils';

const hMock = h as unknown as ReturnType<typeof vi.fn>;

/**
 * Extract Host attrs from a rendered component.
 * Looks specifically for the Host call with role="progressbar" to avoid
 * matching the indeterminate live-region span (role="status").
 */
function hostAttrs(component: IoProgress): Record<string, unknown> {
  hMock.mockClear();
  (component as any).render();
  const call = hMock.mock.calls.find(
    ([, attrs]: [unknown, unknown]) =>
      attrs &&
      typeof attrs === 'object' &&
      (attrs as Record<string, unknown>)['role'] === 'progressbar',
  ) as [unknown, Record<string, unknown>] | undefined;
  return call?.[1] ?? {};
}

describe('io-progress — default props', () => {
  let component: IoProgress;

  beforeEach(() => {
    component = new IoProgress();
  });

  it('value defaults to 0', () => {
    expect(component.value).toBe(0);
  });

  it('color defaults to blue', () => {
    expect(component.color).toBe('blue');
  });

  it('size defaults to md', () => {
    expect(component.size).toBe('md');
  });

  it('animated defaults to true', () => {
    expect(component.animated).toBe(true);
  });

  it('showLabel defaults to false', () => {
    expect(component.showLabel).toBe(false);
  });

  it('label is undefined by default', () => {
    expect(component.label).toBeUndefined();
  });

  it('labelledBy is undefined by default', () => {
    expect(component.labelledBy).toBeUndefined();
  });

  it('valueText is undefined by default', () => {
    expect(component.valueText).toBeUndefined();
  });

  it('min defaults to 0', () => {
    expect(component.min).toBe(0);
  });

  it('max defaults to 100', () => {
    expect(component.max).toBe(100);
  });

  it('indeterminate defaults to false', () => {
    expect(component.indeterminate).toBe(false);
  });
});

describe('io-progress — render stability', () => {
  it('does not throw for value=0', () => {
    const component = new IoProgress();
    expect(() => component.render()).not.toThrow();
  });

  it('does not throw for value=100', () => {
    const component = new IoProgress();
    component.value = 100;
    expect(() => component.render()).not.toThrow();
  });

  it('does not throw for value=-10 (clamped)', () => {
    const component = new IoProgress();
    component.value = -10;
    expect(() => component.render()).not.toThrow();
  });

  it('does not throw for value=110 (clamped)', () => {
    const component = new IoProgress();
    component.value = 110;
    expect(() => component.render()).not.toThrow();
  });

  it('does not throw with color=success', () => {
    const component = new IoProgress();
    component.color = 'success';
    expect(() => component.render()).not.toThrow();
  });

  it('does not throw with size=lg', () => {
    const component = new IoProgress();
    component.size = 'lg';
    expect(() => component.render()).not.toThrow();
  });

  it('does not throw with showLabel=true', () => {
    const component = new IoProgress();
    component.value = 72;
    component.showLabel = true;
    expect(() => component.render()).not.toThrow();
  });

  it('does not throw with animated=false', () => {
    const component = new IoProgress();
    component.animated = false;
    expect(() => component.render()).not.toThrow();
  });

  it('does not throw with a custom label', () => {
    const component = new IoProgress();
    component.label = 'Upload progress';
    expect(() => component.render()).not.toThrow();
  });

  it('does not throw with labelledBy set', () => {
    const component = new IoProgress();
    component.labelledBy = 'custom-label-id';
    expect(() => component.render()).not.toThrow();
  });

  it('does not throw with valueText set', () => {
    const component = new IoProgress();
    component.valueText = '3 of 5 steps';
    expect(() => component.render()).not.toThrow();
  });

  it('does not throw with custom min/max range', () => {
    const component = new IoProgress();
    component.min = 0;
    component.max = 50;
    component.value = 25;
    expect(() => component.render()).not.toThrow();
  });

  it('does not throw with indeterminate=true', () => {
    const component = new IoProgress();
    component.indeterminate = true;
    expect(() => component.render()).not.toThrow();
  });
});

describe('io-progress — aria-busy (#1021)', () => {
  it('sets aria-busy="true" on Host when indeterminate', () => {
    const component = new IoProgress();
    component.indeterminate = true;
    const attrs = hostAttrs(component);
    expect(attrs['aria-busy']).toBe('true');
  });

  it('does not set aria-busy when determinate', () => {
    const component = new IoProgress();
    component.indeterminate = false;
    component.value = 50;
    const attrs = hostAttrs(component);
    expect(attrs['aria-busy']).toBeUndefined();
  });
});

describe('io-progress — aria-valuenow throttling (#1021)', () => {
  it('sets aria-valuenow to rounded integer percentage', () => {
    const component = new IoProgress();
    component.value = 67;
    const attrs = hostAttrs(component);
    expect(attrs['aria-valuenow']).toBe(67);
  });

  it('does not include aria-valuenow when indeterminate', () => {
    const component = new IoProgress();
    component.indeterminate = true;
    const attrs = hostAttrs(component);
    expect(attrs['aria-valuenow']).toBeUndefined();
  });

  it('rounds sub-integer percentage changes to integer', () => {
    const component = new IoProgress();
    // 67.3 rounds to 67
    component.value = 67.3;
    const attrs1 = hostAttrs(component);
    expect(attrs1['aria-valuenow']).toBe(67);

    // 67.8 rounds to 68
    component.value = 67.8;
    const attrs2 = hostAttrs(component);
    expect(attrs2['aria-valuenow']).toBe(68);
  });
});

describe('io-progress — indeterminate live region (#813)', () => {
  it('renders span with role="status" and aria-live="polite" when indeterminate', () => {
    const component = new IoProgress();
    component.indeterminate = true;
    (h as ReturnType<typeof vi.fn>).mockClear();
    (component as any).render();
    const calls = (h as ReturnType<typeof vi.fn>).mock.calls as Array<[unknown, Record<string, unknown> | null, ...unknown[]]>;
    const statusSpan = calls.find(([tag, attrs]) => tag === 'span' && attrs?.['role'] === 'status' && attrs?.['aria-live'] === 'polite');
    expect(statusSpan).toBeDefined();
  });

  it('live region renders fallback text "Loading…" when valueText is absent', () => {
    const component = new IoProgress();
    component.indeterminate = true;
    (h as ReturnType<typeof vi.fn>).mockClear();
    (component as any).render();
    const calls = (h as ReturnType<typeof vi.fn>).mock.calls as Array<[unknown, Record<string, unknown> | null, ...unknown[]]>;
    const statusSpan = calls.find(([tag, attrs]) => tag === 'span' && attrs?.['role'] === 'status');
    expect(statusSpan?.[2]).toBe('Loading…');
  });

  it('live region renders provided valueText when set', () => {
    const component = new IoProgress();
    component.indeterminate = true;
    component.valueText = 'Processing…';
    (h as ReturnType<typeof vi.fn>).mockClear();
    (component as any).render();
    const calls = (h as ReturnType<typeof vi.fn>).mock.calls as Array<[unknown, Record<string, unknown> | null, ...unknown[]]>;
    const statusSpan = calls.find(([tag, attrs]) => tag === 'span' && attrs?.['role'] === 'status');
    expect(statusSpan?.[2]).toBe('Processing…');
  });
});

describe('io-progress — no interactive methods', () => {
  it('does not expose click or keyboard handlers', () => {
    const methodNames = Object.getOwnPropertyNames(IoProgress.prototype);
    expect(methodNames).not.toContain('handleClick');
    expect(methodNames).not.toContain('handleKeyDown');
    expect(methodNames).not.toContain('handleChange');
  });
});

describe('io-progress — utility: computePercentage', () => {
  it('computes percentage for default range [0, 100]', () => {
    expect(computePercentage(0, 0, 100)).toBe(0);
    expect(computePercentage(50, 0, 100)).toBe(50);
    expect(computePercentage(100, 0, 100)).toBe(100);
  });

  it('computes percentage for custom range [0, 50]', () => {
    expect(computePercentage(0, 0, 50)).toBe(0);
    expect(computePercentage(25, 0, 50)).toBe(50);
    expect(computePercentage(50, 0, 50)).toBe(100);
  });

  it('computes percentage for offset range [10, 20]', () => {
    expect(computePercentage(10, 10, 20)).toBe(0);
    expect(computePercentage(15, 10, 20)).toBe(50);
    expect(computePercentage(20, 10, 20)).toBe(100);
  });

  it('clamps result to [0, 100] when value exceeds max', () => {
    expect(computePercentage(150, 0, 100)).toBe(100);
  });

  it('clamps result to [0, 100] when value below min', () => {
    expect(computePercentage(-50, 0, 100)).toBe(0);
  });

  it('returns 0 when min equals max (edge case)', () => {
    expect(computePercentage(50, 100, 100)).toBe(0);
  });

  it('returns 0 when min > max (invalid range)', () => {
    expect(computePercentage(50, 100, 50)).toBe(0);
  });
});
