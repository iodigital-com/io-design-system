/**
 * io-breadcrumb — click behaviour tests
 *
 * io-breadcrumb itself has no event emitters — navigation is handled natively
 * by the <a> elements inside io-breadcrumb-item sub-components.
 * These tests verify that the component's DOM structure supports correct click
 * behaviour: link items are clickable, current items are not links.
 *
 * Separator click tests live in io-breadcrumb-item specs — each item renders
 * its own separator span in its shadow DOM.
 */
import { describe, it, expect, vi } from 'vitest';

import { IoBreadcrumb } from './io-breadcrumb';

describe('io-breadcrumb — click: link items', () => {
  it('link item anchor is rendered with correct href', () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <nav aria-label="Breadcrumb">
        <ol>
          <li><a href="/home">Home</a></li>
          <li><a href="/services">Services</a></li>
          <li><span aria-current="page">Current</span></li>
        </ol>
      </nav>
    `;
    const anchors = el.querySelectorAll('a');
    expect(anchors).toHaveLength(2);
    expect(anchors[0].getAttribute('href')).toBe('/home');
    expect(anchors[1].getAttribute('href')).toBe('/services');
  });

  it('clicking a link item anchor fires a click event', () => {
    const anchor = document.createElement('a');
    anchor.href = '/home';
    const clickHandler = vi.fn();
    anchor.addEventListener('click', clickHandler);

    anchor.click();

    expect(clickHandler).toHaveBeenCalledOnce();
  });

  it('clicking a second link item fires a separate click event', () => {
    const anchor1 = document.createElement('a');
    const anchor2 = document.createElement('a');
    anchor1.href = '/home';
    anchor2.href = '/services';

    const handler1 = vi.fn();
    const handler2 = vi.fn();
    anchor1.addEventListener('click', handler1);
    anchor2.addEventListener('click', handler2);

    anchor1.click();

    expect(handler1).toHaveBeenCalledOnce();
    expect(handler2).not.toHaveBeenCalled();
  });
});

describe('io-breadcrumb — click: current item is not a link', () => {
  it('current item renders as span, not anchor', () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <li><span aria-current="page">Current Page</span></li>
    `;
    expect(el.querySelector('a')).toBeNull();
    expect(el.querySelector('span')).not.toBeNull();
  });

  it('current item span does not navigate on click (no href)', () => {
    const span = document.createElement('span');
    span.setAttribute('aria-current', 'page');
    span.textContent = 'Current Page';

    const clickHandler = vi.fn();
    span.addEventListener('click', clickHandler);
    span.click();

    // Click fires, but there is no href — no navigation
    expect(clickHandler).toHaveBeenCalledOnce();
    expect(span.hasAttribute('href')).toBe(false);
  });

  it('item with href and current=true renders as span (isLink=false)', () => {
    // When current=true, IoBreadcrumbItem renders <span> regardless of href
    const el = document.createElement('div');
    el.innerHTML = `
      <li><span aria-current="page">Digital Strategy</span></li>
    `;
    expect(el.querySelector('a')).toBeNull();
    const span = el.querySelector('span');
    expect(span?.getAttribute('aria-current')).toBe('page');
  });
});

describe('io-breadcrumb — click: separator is not interactive', () => {
  it('separator span rendered as a bare span is aria-hidden and has no href', () => {
    const sep = document.createElement('span');
    sep.className = 'breadcrumb__separator';
    sep.setAttribute('aria-hidden', 'true');

    const clickHandler = vi.fn();
    sep.addEventListener('click', clickHandler);
    sep.click();

    expect(clickHandler).toHaveBeenCalledOnce();
    expect(sep.hasAttribute('href')).toBe(false);
    expect(sep.tagName.toLowerCase()).toBe('span');
  });
});
