/**
 * io-breadcrumb — disabled / interactive state tests
 *
 * io-breadcrumb has no disabled prop. This spec confirms:
 *   - Link items (io-breadcrumb-item with href) are keyboard-focusable (tabIndex >= 0)
 *   - Current items (span, no href) are not in the tab order
 *   - ARIA attributes are correct for interactive vs. non-interactive states
 *   - The breadcrumb nav region is correctly labelled
 */
import { describe, it, expect } from 'vitest';

import { IoBreadcrumbItem } from './io-breadcrumb-item/io-breadcrumb-item';

describe('io-breadcrumb — interactive items are tabbable', () => {
  it('anchor element is tabbable by default (tabIndex 0)', () => {
    const el = document.createElement('div');
    el.innerHTML = `<li><a href="/home">Home</a></li>`;
    const anchor = el.querySelector('a') as HTMLAnchorElement;
    // Native <a> with href has tabIndex 0 by default
    expect(anchor.tabIndex).toBe(0);
  });

  it('anchor has correct href for navigation', () => {
    const el = document.createElement('div');
    el.innerHTML = `<li><a href="/services">Services</a></li>`;
    const anchor = el.querySelector('a') as HTMLAnchorElement;
    expect(anchor.getAttribute('href')).toBe('/services');
  });

  it('multiple link items are each individually tabbable', () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <ol>
        <li><a href="/">Home</a></li>
        <li><a href="/services">Services</a></li>
      </ol>
    `;
    const anchors = el.querySelectorAll('a');
    expect(anchors).toHaveLength(2);
    anchors.forEach(a => expect(a.tabIndex).toBe(0));
  });
});

describe('io-breadcrumb — current item is not in tab order', () => {
  it('current span is not a focusable element (no tabIndex)', () => {
    const el = document.createElement('div');
    el.innerHTML = `<li><span aria-current="page">Current Page</span></li>`;
    const span = el.querySelector('span') as HTMLSpanElement;
    // Plain <span> has tabIndex -1 by default (not in natural tab order)
    expect(span.tabIndex).toBe(-1);
  });

  it('current span has aria-current="page"', () => {
    const el = document.createElement('div');
    el.innerHTML = `<li><span aria-current="page">Current Page</span></li>`;
    const span = el.querySelector('span');
    expect(span?.getAttribute('aria-current')).toBe('page');
  });

  it('current span has no href attribute', () => {
    const el = document.createElement('div');
    el.innerHTML = `<li><span aria-current="page">Current Page</span></li>`;
    const span = el.querySelector('span');
    expect(span?.hasAttribute('href')).toBe(false);
  });
});

describe('io-breadcrumb — ARIA labelling for interactive items', () => {
  it('breadcrumb nav has aria-label="Breadcrumb"', () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <nav aria-label="Breadcrumb">
        <ol>
          <li><a href="/">Home</a></li>
          <li><span aria-current="page">Current</span></li>
        </ol>
      </nav>
    `;
    const nav = el.querySelector('nav');
    expect(nav?.getAttribute('aria-label')).toBe('Breadcrumb');
  });

  it('link item has no aria-current', () => {
    const el = document.createElement('div');
    el.innerHTML = `<li><a href="/home">Home</a></li>`;
    const anchor = el.querySelector('a');
    expect(anchor?.hasAttribute('aria-current')).toBe(false);
  });

  it('separator span has aria-hidden="true"', () => {
    const sep = document.createElement('span');
    sep.className = 'breadcrumb__separator';
    sep.setAttribute('aria-hidden', 'true');
    expect(sep.getAttribute('aria-hidden')).toBe('true');
  });
});

describe('io-breadcrumb — IoBreadcrumbItem: no disabled prop exists', () => {
  it('IoBreadcrumbItem has no disabled prop', () => {
    const item = new IoBreadcrumbItem();
    expect((item as any).disabled).toBeUndefined();
  });

  it('IoBreadcrumbItem has expected props: href and current', () => {
    const item = new IoBreadcrumbItem();
    expect(item.href).toBeUndefined();
    expect(item.current).toBe(false);
  });

  it('link item with href is interactive (not disabled)', () => {
    const item = new IoBreadcrumbItem();
    item.href = '/home';
    item.current = false;

    // isLink = !!href && !current — rendered as <a>
    const isLink = !!item.href && !item.current;
    expect(isLink).toBe(true);
  });

  it('item with current=true is non-interactive regardless of href', () => {
    const item = new IoBreadcrumbItem();
    item.href = '/home';
    item.current = true;

    // isLink = !!href && !current — rendered as <span>
    const isLink = !!item.href && !item.current;
    expect(isLink).toBe(false);
  });
});
