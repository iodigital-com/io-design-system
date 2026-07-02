import { describe, it, expect, beforeEach, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoSpinner } from './io-spinner';

const hMock = h as unknown as ReturnType<typeof vi.fn>;

/**
 * Extract the attrs passed to the Host element (first h() call whose second
 * argument is an object with a 'role' key — the Host call in io-spinner).
 */
function hostAttrs(component: IoSpinner): Record<string, unknown> {
  hMock.mockClear();
  (component as any).render();
  const call = hMock.mock.calls.find(
    ([, attrs]: [unknown, unknown]) =>
      attrs && typeof attrs === 'object' && 'role' in (attrs as Record<string, unknown>),
  ) as [unknown, Record<string, unknown>] | undefined;
  return call?.[1] ?? {};
}

describe('io-spinner — default props', () => {
  let component: IoSpinner;

  beforeEach(() => {
    component = new IoSpinner();
  });

  it('has md size by default', () => {
    expect(component.size).toBe('md');
  });

  it('has primary color by default', () => {
    expect(component.color).toBe('primary');
  });

  it('has "Loading" label by default', () => {
    expect(component.label).toBe('Loading');
  });

  it('has no aria prop by default', () => {
    expect(component.aria).toBeUndefined();
  });

  it('has inline context by default', () => {
    expect(component.context).toBe('inline');
  });
});

describe('io-spinner — interaction model consistency', () => {
  it('does not expose interactive handlers or event emitters', () => {
    const component = new IoSpinner() as any;
    const methodNames = Object.getOwnPropertyNames(IoSpinner.prototype);

    expect(methodNames).not.toContain('handleClick');
    expect(methodNames).not.toContain('handleKeydown');
    expect(methodNames).not.toContain('handleDismiss');
    expect(component.dismiss).toBeUndefined();
    expect(component.click).toBeUndefined();
  });

  it('stays render-only across visual prop changes', () => {
    const component = new IoSpinner();

    expect(() => {
      component.size = 'sm';
      component.color = 'white';
      component.render();

      component.size = 'lg';
      component.color = 'current';
      component.label = 'Saving';
      component.render();
    }).not.toThrow();
  });

  it('falls back to Loading when label is nullish at runtime', () => {
    const component = new IoSpinner() as any;

    expect(() => {
      component.label = undefined;
      component.render();
      component.label = null;
      component.render();
    }).not.toThrow();
  });
});

describe('io-spinner — size scale', () => {
  it('accepts xs as a valid size value', () => {
    const component = new IoSpinner();
    component.size = 'xs';
    expect(component.size).toBe('xs');
    expect(() => component.render()).not.toThrow();
  });

  it('accepts sm as a valid size value', () => {
    const component = new IoSpinner();
    component.size = 'sm';
    expect(component.size).toBe('sm');
  });

  it('accepts md as a valid size value', () => {
    const component = new IoSpinner();
    component.size = 'md';
    expect(component.size).toBe('md');
  });

  it('accepts lg as a valid size value', () => {
    const component = new IoSpinner();
    component.size = 'lg';
    expect(component.size).toBe('lg');
  });

  it('accepts xl as a valid size value (#1022)', () => {
    const component = new IoSpinner();
    component.size = 'xl';
    expect(component.size).toBe('xl');
    expect(() => component.render()).not.toThrow();
  });

  it('accepts inherit as a valid size value', () => {
    const component = new IoSpinner();
    component.size = 'inherit';
    expect(component.size).toBe('inherit');
    expect(() => component.render()).not.toThrow();
  });
});

describe('io-spinner — context prop (#1001)', () => {
  it('context=inline renders role="status"', () => {
    const component = new IoSpinner();
    component.context = 'inline';
    const attrs = hostAttrs(component);
    expect(attrs['role']).toBe('status');
  });

  it('context=blocking renders role="alert"', () => {
    const component = new IoSpinner();
    component.context = 'blocking';
    const attrs = hostAttrs(component);
    expect(attrs['role']).toBe('alert');
  });

  it('context=inline sets aria-live="polite"', () => {
    const component = new IoSpinner();
    component.context = 'inline';
    const attrs = hostAttrs(component);
    expect(attrs['aria-live']).toBe('polite');
  });

  it('context=blocking sets aria-live="assertive"', () => {
    const component = new IoSpinner();
    component.context = 'blocking';
    const attrs = hostAttrs(component);
    expect(attrs['aria-live']).toBe('assertive');
  });
});


describe('io-spinner — SVG rendering (#1028)', () => {
  it('renders svg element with aria-hidden', () => {
    const component = new IoSpinner();
    hMock.mockClear();
    component.render();
    const calls = hMock.mock.calls as Array<[unknown, Record<string, unknown> | null, ...unknown[]]>;
    const svgCall = calls.find(([tag]) => tag === 'svg');
    expect(svgCall).toBeDefined();
    expect(svgCall?.[1]?.['aria-hidden']).toBe('true');
  });

  it('renders track and arc circles inside SVG', () => {
    const component = new IoSpinner();
    hMock.mockClear();
    component.render();
    const calls = hMock.mock.calls as Array<[unknown, Record<string, unknown> | null, ...unknown[]]>;
    const circleTrack = calls.find(([tag, attrs]) => tag === 'circle' && (attrs?.['class'] as string)?.includes('spinner__track'));
    const circleArc = calls.find(([tag, attrs]) => tag === 'circle' && (attrs?.['class'] as string)?.includes('spinner__arc'));
    expect(circleTrack).toBeDefined();
    expect(circleArc).toBeDefined();
  });

  it('includes stroke-dasharray on the arc circle', () => {
    const component = new IoSpinner();
    hMock.mockClear();
    component.render();
    const calls = hMock.mock.calls as Array<[unknown, Record<string, unknown> | null, ...unknown[]]>;
    const arcCall = calls.find(([tag, attrs]) => tag === 'circle' && (attrs?.['class'] as string)?.includes('spinner__arc'));
    expect(arcCall?.[1]?.['stroke-dasharray']).toBeDefined();
  });
});
