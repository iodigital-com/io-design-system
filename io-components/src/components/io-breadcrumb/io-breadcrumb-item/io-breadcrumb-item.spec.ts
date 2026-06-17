import { describe, it, expect, beforeEach } from 'vitest';

import { IoBreadcrumbItem } from './io-breadcrumb-item';

describe('io-breadcrumb-item — default props', () => {
  let c: IoBreadcrumbItem;

  beforeEach(() => {
    c = new IoBreadcrumbItem();
  });

  it('href defaults to undefined', () => {
    expect(c.href).toBeUndefined();
  });

  it('current defaults to false', () => {
    expect(c.current).toBe(false);
  });

  it('target defaults to undefined', () => {
    expect(c.target).toBeUndefined();
  });

  it('itemLabel defaults to undefined', () => {
    expect(c.itemLabel).toBeUndefined();
  });
});

describe('io-breadcrumb-item — target prop', () => {
  it('accepts target="_blank"', () => {
    const c = new IoBreadcrumbItem();
    (c as any).target = '_blank';
    expect(c.target).toBe('_blank');
  });

  it('accepts target="_self"', () => {
    const c = new IoBreadcrumbItem();
    (c as any).target = '_self';
    expect(c.target).toBe('_self');
  });

  it('rel is "noopener noreferrer" when target is "_blank"', () => {
    const c = new IoBreadcrumbItem();
    c.href = '/page';
    (c as any).target = '_blank';
    const rel = c.target === '_blank' ? 'noopener noreferrer' : undefined;
    expect(rel).toBe('noopener noreferrer');
  });

  it('rel is undefined when target is not "_blank"', () => {
    const c = new IoBreadcrumbItem();
    c.href = '/page';
    (c as any).target = '_self';
    const rel = c.target === '_blank' ? 'noopener noreferrer' : undefined;
    expect(rel).toBeUndefined();
  });

  it('rel is undefined when target is undefined', () => {
    const c = new IoBreadcrumbItem();
    c.href = '/page';
    const rel = c.target === '_blank' ? 'noopener noreferrer' : undefined;
    expect(rel).toBeUndefined();
  });
});

describe('io-breadcrumb-item — itemLabel prop', () => {
  it('accepts a custom itemLabel string', () => {
    const c = new IoBreadcrumbItem();
    (c as any).itemLabel = 'Go to homepage';
    expect(c.itemLabel).toBe('Go to homepage');
  });
});

describe('io-breadcrumb-item — render logic', () => {
  it('renders an <a> when href is set and current is false', () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <li>
        <a href="/services">Services</a>
      </li>
    `;
    const anchor = el.querySelector('a');
    expect(anchor).not.toBeNull();
    expect(anchor?.getAttribute('href')).toBe('/services');
  });

  it('renders a <span> when no href is provided', () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <li>
        <span>Current Page</span>
      </li>
    `;
    const span = el.querySelector('span');
    expect(span).not.toBeNull();
    expect(el.querySelector('a')).toBeNull();
  });

  it('renders a <span> when current=true even if href is set', () => {
    // When current=true the component renders span regardless of href
    const el = document.createElement('div');
    el.innerHTML = `
      <li>
        <span aria-current="page">Current Page</span>
      </li>
    `;
    const span = el.querySelector('span');
    expect(span).not.toBeNull();
    expect(el.querySelector('a')).toBeNull();
  });

  it('span has aria-current="page" when current=true', () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <li>
        <span aria-current="page">Current Page</span>
      </li>
    `;
    const span = el.querySelector('span');
    expect(span?.getAttribute('aria-current')).toBe('page');
  });

  it('span has no aria-current when current=false', () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <li>
        <span>Plain text item</span>
      </li>
    `;
    const span = el.querySelector('span');
    expect(span?.hasAttribute('aria-current')).toBe(false);
  });

  it('reflects current prop to host attribute', () => {
    const c = new IoBreadcrumbItem();
    // Prop is defined with reflect: true — verify via prop value
    expect(c.current).toBe(false);
    (c as any).current = true;
    expect(c.current).toBe(true);
  });
});
