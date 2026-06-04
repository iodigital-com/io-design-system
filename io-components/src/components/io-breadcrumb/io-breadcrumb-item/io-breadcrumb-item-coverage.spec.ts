import { describe, it, expect, beforeEach, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoBreadcrumbItem } from './io-breadcrumb-item';

describe('io-breadcrumb-item — render method coverage', () => {
  let c: IoBreadcrumbItem;

  beforeEach(() => {
    c = new IoBreadcrumbItem();
  });

  it('render() does not throw with default props', () => {
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with href and current=false (isLink=true) does not throw', () => {
    c.href = '/services';
    c.current = false;
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with href and current=true (isLink=false) does not throw', () => {
    c.href = '/services';
    c.current = true;
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() without href (isLink=false) does not throw', () => {
    c.href = undefined;
    c.current = false;
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with current=true does not throw', () => {
    c.current = true;
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with current=false does not throw', () => {
    c.current = false;
    expect(() => (c as any).render()).not.toThrow();
  });
});

describe('io-breadcrumb-item — separator rendering', () => {
  const hMock = h as unknown as ReturnType<typeof vi.fn>;

  it('renders .breadcrumb__separator span when current=false', () => {
    const c = new IoBreadcrumbItem();
    c.current = false;
    hMock.mockClear();
    (c as any).render();

    const sepCall = hMock.mock.calls.find(
      ([tag, attrs]) => tag === 'span' && (attrs as Record<string, unknown>)?.class === 'breadcrumb__separator',
    );
    expect(sepCall).toBeDefined();
    expect((sepCall![1] as Record<string, unknown>)['aria-hidden']).toBe('true');
  });

  it('does not render .breadcrumb__separator when current=true', () => {
    const c = new IoBreadcrumbItem();
    c.current = true;
    hMock.mockClear();
    (c as any).render();

    const sepCall = hMock.mock.calls.find(
      ([tag, attrs]) => tag === 'span' && (attrs as Record<string, unknown>)?.class === 'breadcrumb__separator',
    );
    expect(sepCall).toBeUndefined();
  });
});
