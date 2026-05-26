import { describe, it, expect, beforeEach } from 'vitest';

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
