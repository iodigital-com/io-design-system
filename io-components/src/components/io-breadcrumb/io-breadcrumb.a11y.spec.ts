/**
 * io-breadcrumb — WCAG AA accessibility pattern tests
 *
 * Tests the native HTML accessibility patterns that io-breadcrumb renders
 * internally. Uses vitest-axe registered globally via tests/unit/config/vitest.setup.ts.
 */
import { describe, it } from 'vitest';

import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-breadcrumb — a11y (ARIA patterns)', () => {
  it('nav with aria-label="Breadcrumb" has no violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <nav aria-label="Breadcrumb">
        <ol>
          <li><a href="/">Home</a></li>
          <li><span aria-hidden="true">/</span></li>
          <li><a href="/services">Services</a></li>
          <li><span aria-hidden="true">/</span></li>
          <li><span aria-current="page">Digital Strategy</span></li>
        </ol>
      </nav>
    `;
    await renderAndCheckA11y(el);
  });

  it('single-item breadcrumb (just current page) has no violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <nav aria-label="Breadcrumb">
        <ol>
          <li><span aria-current="page">Dashboard</span></li>
        </ol>
      </nav>
    `;
    await renderAndCheckA11y(el);
  });

  it('two-item breadcrumb has no violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <nav aria-label="Breadcrumb">
        <ol>
          <li><a href="/">Home</a></li>
          <li><span aria-hidden="true">/</span></li>
          <li><span aria-current="page">Current Page</span></li>
        </ol>
      </nav>
    `;
    await renderAndCheckA11y(el);
  });

  it('aria-current="page" is present on the current item', () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <nav aria-label="Breadcrumb">
        <ol>
          <li><a href="/">Home</a></li>
          <li><span aria-current="page">Current</span></li>
        </ol>
      </nav>
    `;
    const current = el.querySelector('[aria-current="page"]');
    expect(current).not.toBeNull();
    expect(current?.tagName.toLowerCase()).toBe('span');
  });

  it('separators have aria-hidden="true"', () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <nav aria-label="Breadcrumb">
        <ol>
          <li><a href="/">Home</a></li>
          <li><span class="breadcrumb__separator" aria-hidden="true">/</span></li>
          <li><span aria-current="page">Current</span></li>
        </ol>
      </nav>
    `;
    const sep = el.querySelector('.breadcrumb__separator');
    expect(sep?.getAttribute('aria-hidden')).toBe('true');
  });

  it('nav has aria-label="Breadcrumb"', () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <nav aria-label="Breadcrumb">
        <ol>
          <li><span aria-current="page">Home</span></li>
        </ol>
      </nav>
    `;
    const nav = el.querySelector('nav');
    expect(nav?.getAttribute('aria-label')).toBe('Breadcrumb');
  });
});
