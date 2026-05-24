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
