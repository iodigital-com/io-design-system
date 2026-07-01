import { describe, it, expect, beforeEach, vi } from 'vitest';

import { IoBreadcrumb } from './io-breadcrumb';
import { h } from '@stencil/core';

describe('io-breadcrumb — default props and structure', () => {
  let c: IoBreadcrumb;

  beforeEach(() => {
    c = new IoBreadcrumb();
  });

  it('can be instantiated', () => {
    expect(c).toBeInstanceOf(IoBreadcrumb);
  });

  it('label defaults to "Breadcrumb"', () => {
    expect(c.label).toBe('Breadcrumb');
  });

  it('has no items prop', () => {
    expect((c as any).items).toBeUndefined();
  });

  it('has no separator prop', () => {
    expect((c as any).separator).toBeUndefined();
  });

  it('has no maxVisible prop', () => {
    expect((c as any).maxVisible).toBeUndefined();
  });
});

describe('io-breadcrumb — label prop', () => {
  it('accepts a custom label string', () => {
    const c = new IoBreadcrumb();
    (c as any).label = 'Brotkrümel';
    expect(c.label).toBe('Brotkrümel');
  });

  it('render() does not throw with custom label', () => {
    const c = new IoBreadcrumb();
    (c as any).el = document.createElement('io-breadcrumb');
    (c as any).label = 'Fil d\'Ariane';
    expect(() => (c as any).render()).not.toThrow();
  });

  it('label prop is bound to nav aria-label in vnode (default)', () => {
    const hMock = h as unknown as { mock: { calls: unknown[][] } };
    vi.clearAllMocks();
    const c = new IoBreadcrumb();
    (c as any).el = document.createElement('io-breadcrumb');
    (c as any).render();
    const navCall = hMock.mock.calls.find(([tag]) => tag === 'nav');
    expect(navCall).toBeDefined();
    const attrs = navCall![1] as Record<string, unknown>;
    expect(attrs['aria-label']).toBe('Breadcrumb');
  });

  it('label prop is bound to nav aria-label in vnode (custom)', () => {
    const hMock = h as unknown as { mock: { calls: unknown[][] } };
    vi.clearAllMocks();
    const c = new IoBreadcrumb();
    (c as any).el = document.createElement('io-breadcrumb');
    c.label = 'Navigatie';
    (c as any).render();
    const navCall = hMock.mock.calls.find(([tag]) => tag === 'nav');
    expect(navCall).toBeDefined();
    const attrs = navCall![1] as Record<string, unknown>;
    expect(attrs['aria-label']).toBe('Navigatie');
  });
});

// ── maxItems / collapse (#836) ────────────────────────────────────────────────

describe('io-breadcrumb — maxItems collapse (#836)', () => {
  function makeItems(count: number): HTMLElement[] {
    return Array.from({ length: count }, (_, i) => {
      const el = document.createElement('io-breadcrumb-item');
      el.textContent = `Item ${i}`;
      return el;
    });
  }

  it('hides intermediate items when collapsed and itemCount > maxItems', () => {
    const c = new IoBreadcrumb();
    const hostEl = document.createElement('io-breadcrumb');
    (c as any).el = hostEl;
    c.maxItems = 3;
    (c as any).collapsed = true;

    const items = makeItems(5);
    items.forEach(item => hostEl.appendChild(item));

    (c as any).applyVisibility();

    // Items 1 and 2 (indices 1..2) should be visually hidden via class (5 items, maxItems=3, showLastCount=2, hideStart=1, hideEnd=3)
    expect(items[0].classList.contains('breadcrumb-item--hidden')).toBe(false);
    expect(items[1].classList.contains('breadcrumb-item--hidden')).toBe(true);
    expect(items[2].classList.contains('breadcrumb-item--hidden')).toBe(true);
    expect(items[3].classList.contains('breadcrumb-item--hidden')).toBe(false);
    expect(items[4].classList.contains('breadcrumb-item--hidden')).toBe(false);
  });

  it('shows all items when not collapsed', () => {
    const c = new IoBreadcrumb();
    const hostEl = document.createElement('io-breadcrumb');
    (c as any).el = hostEl;
    c.maxItems = 3;
    (c as any).collapsed = false;

    const items = makeItems(5);
    items.forEach(item => hostEl.appendChild(item));

    // Pre-hide some items
    items[1].classList.add('breadcrumb-item--hidden');
    items[2].classList.add('breadcrumb-item--hidden');

    (c as any).applyVisibility();

    items.forEach(item => expect(item.classList.contains('breadcrumb-item--hidden')).toBe(false));
  });

  it('shows all items when maxItems not set', () => {
    const c = new IoBreadcrumb();
    const hostEl = document.createElement('io-breadcrumb');
    (c as any).el = hostEl;
    (c as any).collapsed = true;

    const items = makeItems(5);
    items.forEach(item => hostEl.appendChild(item));

    (c as any).applyVisibility();

    items.forEach(item => expect(item.classList.contains('breadcrumb-item--hidden')).toBe(false));
  });

  it('handleTriggerClick toggles popoverOpen state', () => {
    const c = new IoBreadcrumb();
    (c as any).el = document.createElement('io-breadcrumb');
    (c as any).collapsed = true;

    // Simulate having a trigger button and a popover wired up
    const btn = document.createElement('button');
    btn.setAttribute('aria-expanded', 'false');
    const mockPopover = { open: false };
    (c as any).triggerBtn = btn;
    (c as any).popoverEl = mockPopover;

    (c as any).handleTriggerClick();

    expect((c as any).popoverOpen).toBe(true);
    expect(btn.getAttribute('aria-expanded')).toBe('true');
  });
});

// ── JSON-LD SEO (#969) ────────────────────────────────────────────────────────

describe('io-breadcrumb — seo prop and JSON-LD (#969)', () => {
  it('seo defaults to false', () => {
    const c = new IoBreadcrumb();
    expect(c.seo).toBe(false);
  });

  it('jsonLd is empty string when seo=false', () => {
    const c = new IoBreadcrumb();
    (c as any).el = document.createElement('io-breadcrumb');
    (c as any).regenerateJsonLd();
    expect((c as any).jsonLd).toBe('');
  });

  it('regenerateJsonLd generates valid BreadcrumbList when seo=true', () => {
    const c = new IoBreadcrumb();
    const hostEl = document.createElement('io-breadcrumb');
    (c as any).el = hostEl;
    (c as any).seo = true;

    // Create mock breadcrumb items
    const item1 = document.createElement('io-breadcrumb-item');
    item1.setAttribute('href', '/');
    item1.textContent = 'Home';
    const item2 = document.createElement('io-breadcrumb-item');
    item2.setAttribute('href', '/services');
    item2.textContent = 'Services';
    const item3 = document.createElement('io-breadcrumb-item');
    item3.setAttribute('current', '');
    item3.textContent = 'Digital Strategy';
    hostEl.appendChild(item1);
    hostEl.appendChild(item2);
    hostEl.appendChild(item3);

    (c as any).regenerateJsonLd();

    const jsonLd = (c as any).jsonLd;
    expect(jsonLd).toBeTruthy();
    const parsed = JSON.parse(jsonLd);
    expect(parsed['@type']).toBe('BreadcrumbList');
    expect(parsed['@context']).toBe('https://schema.org');
    expect(parsed.itemListElement).toHaveLength(3);
    expect(parsed.itemListElement[0].position).toBe(1);
    expect(parsed.itemListElement[0].name).toBe('Home');
    expect(parsed.itemListElement[1].position).toBe(2);
    expect(parsed.itemListElement[2].position).toBe(3);
    expect(parsed.itemListElement[2].name).toBe('Digital Strategy');
  });

  it('render does not throw when seo=true and jsonLd is set', () => {
    const c = new IoBreadcrumb();
    (c as any).el = document.createElement('io-breadcrumb');
    (c as any).seo = true;
    (c as any).jsonLd = '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[]}';
    expect(() => (c as any).render()).not.toThrow();
  });
});

// ── Popover for hidden items (#960) ──────────────────────────────────────────

describe('io-breadcrumb — popover trigger (#960)', () => {
  it('handlePopoverClose resets popoverOpen and aria-expanded', () => {
    const c = new IoBreadcrumb();
    (c as any).el = document.createElement('io-breadcrumb');
    (c as any).popoverOpen = true;

    const btn = document.createElement('button');
    btn.setAttribute('aria-expanded', 'true');
    (c as any).triggerBtn = btn;

    (c as any).handlePopoverClose();

    expect((c as any).popoverOpen).toBe(false);
    expect(btn.getAttribute('aria-expanded')).toBe('false');
  });

  it('handleTriggerClick sets popoverOpen=false on second call (toggle)', () => {
    const c = new IoBreadcrumb();
    (c as any).el = document.createElement('io-breadcrumb');
    (c as any).popoverOpen = true;

    const btn = document.createElement('button');
    btn.setAttribute('aria-expanded', 'true');
    const mockPopover = { open: true };
    (c as any).triggerBtn = btn;
    (c as any).popoverEl = mockPopover;

    (c as any).handleTriggerClick();

    expect((c as any).popoverOpen).toBe(false);
    expect(btn.getAttribute('aria-expanded')).toBe('false');
  });
});
