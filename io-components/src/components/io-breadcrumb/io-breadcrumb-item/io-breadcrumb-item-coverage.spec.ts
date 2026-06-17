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

  it('render() with target="_blank" does not throw', () => {
    c.href = '/external';
    (c as any).target = '_blank';
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with itemLabel does not throw', () => {
    c.href = '/';
    (c as any).itemLabel = 'Go to homepage';
    expect(() => (c as any).render()).not.toThrow();
  });

  it('render() with itemLabel on current item does not throw', () => {
    c.current = true;
    (c as any).itemLabel = 'Current: Dashboard';
    expect(() => (c as any).render()).not.toThrow();
  });
});

describe('io-breadcrumb-item — target / rel rendering', () => {
  const hMock = h as unknown as ReturnType<typeof vi.fn>;

  it('renders anchor with target and rel when target="_blank"', () => {
    const c = new IoBreadcrumbItem();
    c.href = '/external';
    (c as any).target = '_blank';
    c.current = false;
    hMock.mockClear();
    (c as any).render();

    const aCall = hMock.mock.calls.find(([tag]) => tag === 'a');
    expect(aCall).toBeDefined();
    expect((aCall![1] as Record<string, unknown>)['target']).toBe('_blank');
    expect((aCall![1] as Record<string, unknown>)['rel']).toBe('noopener noreferrer');
  });

  it('renders anchor without rel when target is not "_blank"', () => {
    const c = new IoBreadcrumbItem();
    c.href = '/page';
    (c as any).target = '_self';
    c.current = false;
    hMock.mockClear();
    (c as any).render();

    const aCall = hMock.mock.calls.find(([tag]) => tag === 'a');
    expect(aCall).toBeDefined();
    expect((aCall![1] as Record<string, unknown>)['rel']).toBeUndefined();
  });
});

describe('io-breadcrumb-item — itemLabel rendering', () => {
  const hMock = h as unknown as ReturnType<typeof vi.fn>;

  it('passes itemLabel as aria-label on anchor', () => {
    const c = new IoBreadcrumbItem();
    c.href = '/home';
    (c as any).itemLabel = 'Go to homepage';
    c.current = false;
    hMock.mockClear();
    (c as any).render();

    const aCall = hMock.mock.calls.find(([tag]) => tag === 'a');
    expect(aCall).toBeDefined();
    expect((aCall![1] as Record<string, unknown>)['aria-label']).toBe('Go to homepage');
  });

  it('passes itemLabel as aria-label on current span', () => {
    const c = new IoBreadcrumbItem();
    c.current = true;
    (c as any).itemLabel = 'Current: Services';
    hMock.mockClear();
    (c as any).render();

    const spanCall = hMock.mock.calls.find(
      ([tag, attrs]) => tag === 'span' && (attrs as Record<string, unknown>)?.['aria-current'] === 'page',
    );
    expect(spanCall).toBeDefined();
    expect((spanCall![1] as Record<string, unknown>)['aria-label']).toBe('Current: Services');
  });

  it('omits aria-label on anchor when itemLabel is undefined', () => {
    const c = new IoBreadcrumbItem();
    c.href = '/home';
    c.current = false;
    hMock.mockClear();
    (c as any).render();

    const aCall = hMock.mock.calls.find(([tag]) => tag === 'a');
    expect(aCall).toBeDefined();
    expect((aCall![1] as Record<string, unknown>)['aria-label']).toBeUndefined();
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
