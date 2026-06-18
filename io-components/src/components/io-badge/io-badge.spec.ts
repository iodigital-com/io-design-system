import { describe, it, expect, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoBadge } from './io-badge';
import { getBadgeClassName } from './io-badge-utils';

describe('io-badge - default props and render contract', () => {
  it('has blue as the default variant', () => {
    const component = new IoBadge();
    expect(component.variant).toBe('blue');
  });

  it('maps variant to expected class name', () => {
    expect(getBadgeClassName('success', 'sm')).toBe('badge badge--success badge--sm');
    expect(getBadgeClassName('outline', 'md')).toBe('badge badge--outline badge--md');
    expect(getBadgeClassName('blue', 'lg')).toBe('badge badge--blue badge--lg');
  });

  it('uses md as the default size', () => {
    const component = new IoBadge();
    expect(component.size).toBe('md');
  });

  it('renders without throwing for each supported variant', () => {
    const variants = ['beige', 'blue', 'dark', 'orange', 'rouge', 'success', 'warning', 'error', 'outline'] as const;

    for (const variant of variants) {
      const component = new IoBadge();
      component.variant = variant;
      expect(() => component.render()).not.toThrow();
    }
  });

  it('includes badge--lg class when size is lg', () => {
    expect(getBadgeClassName('success', 'lg')).toBe('badge badge--success badge--lg');
  });

  it('renders aria-label when ariaLabel prop is provided', () => {
    const hMock = h as unknown as ReturnType<typeof vi.fn>;
    hMock.mockClear();
    const component = new IoBadge();
    component.ariaLabel = 'New feature';
    component.render();
    const calls = hMock.mock.calls as Array<[unknown, Record<string, unknown>, ...unknown[]]>;
    const spanCall = calls.find(([tag]) => tag === 'span');
    expect(spanCall).toBeDefined();
    expect(spanCall![1]['aria-label']).toBe('New feature');
  });

  it('does not set aria-label when ariaLabel prop is undefined', () => {
    const hMock = h as unknown as ReturnType<typeof vi.fn>;
    hMock.mockClear();
    const component = new IoBadge();
    component.render();
    const calls = hMock.mock.calls as Array<[unknown, Record<string, unknown>, ...unknown[]]>;
    const spanCall = calls.find(([tag]) => tag === 'span');
    expect(spanCall).toBeDefined();
    expect(spanCall![1]['aria-label']).toBeUndefined();
  });
});
