/**
 * io-breadcrumb-item — WCAG AA accessibility pattern tests
 *
 * Tests the native HTML accessibility patterns rendered by io-breadcrumb-item.
 * Uses vitest-axe registered globally via tests/unit/config/vitest.setup.ts.
 */
import { describe, it, expect } from 'vitest';

import { renderAndCheckA11y } from '../../../../tests/unit/helpers/axe';

describe('io-breadcrumb-item — a11y (ARIA patterns)', () => {
  it('link item inside a list has no violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <nav aria-label="Breadcrumb">
        <ol>
          <li><a href="/">Home</a></li>
        </ol>
      </nav>
    `;
    await renderAndCheckA11y(el);
  });

  it('current item with aria-current="page" inside a list has no violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <nav aria-label="Breadcrumb">
        <ol>
          <li><a href="/">Home</a></li>
          <li><span aria-current="page">Current Page</span></li>
        </ol>
      </nav>
    `;
    await renderAndCheckA11y(el);
  });

  it('span item without aria-current inside a list has no violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <nav aria-label="Breadcrumb">
        <ol>
          <li><span>Intermediate</span></li>
          <li><span aria-current="page">Current</span></li>
        </ol>
      </nav>
    `;
    await renderAndCheckA11y(el);
  });

  it('aria-current="page" is on span, not on <a>, when current=true', () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <li><span aria-current="page">Current Page</span></li>
    `;
    const span = el.querySelector('span');
    expect(span?.getAttribute('aria-current')).toBe('page');
    expect(el.querySelector('a')).toBeNull();
  });

  it('<a> element has no aria-current when current=false', () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <li><a href="/home">Home</a></li>
    `;
    const anchor = el.querySelector('a');
    expect(anchor?.hasAttribute('aria-current')).toBe(false);
  });

  it('link with aria-label has no violations (itemLabel override)', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <nav aria-label="Breadcrumb">
        <ol>
          <li><a href="/docs" aria-label="Documentation (opens in new tab)">Docs</a></li>
          <li><span aria-current="page">API Reference</span></li>
        </ol>
      </nav>
    `;
    await renderAndCheckA11y(el);
  });

  it('link with target="_blank" and rel="noopener noreferrer" has no violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <nav aria-label="Breadcrumb">
        <ol>
          <li><a href="/docs" target="_blank" rel="noopener noreferrer">Docs</a></li>
          <li><span aria-current="page">API Reference</span></li>
        </ol>
      </nav>
    `;
    await renderAndCheckA11y(el);
  });
});
