/**
 * io-breadcrumb — WCAG AA accessibility pattern tests
 *
 * Tests the native HTML accessibility patterns that io-breadcrumb renders
 * internally. Uses vitest-axe registered globally via tests/unit/config/vitest.setup.ts.
 */
import { describe, it } from 'vitest';

import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-breadcrumb — a11y (ARIA patterns)', () => {
  it('nav with aria-label breadcrumb has no violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <nav aria-label="Breadcrumb">
        <ol>
          <li><a href="/">Home</a></li>
          <li><span aria-hidden="true">/</span><a href="/services">Services</a></li>
          <li><span aria-hidden="true">/</span><span aria-current="page">Digital Strategy</span></li>
        </ol>
      </nav>
    `;
    await renderAndCheckA11y(el);
  });

  it('collapsed breadcrumb with expand button has no violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <nav aria-label="Breadcrumb">
        <ol>
          <li><a href="/">Home</a></li>
          <li><button aria-label="Show full breadcrumb path">…</button></li>
          <li><span aria-current="page">Current Page</span></li>
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
          <li><span aria-current="page">Home</span></li>
        </ol>
      </nav>
    `;
    await renderAndCheckA11y(el);
  });
});
