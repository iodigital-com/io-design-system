/**
 * io-text — WCAG AA accessibility pattern tests
 *
 * io-text is a light DOM typography primitive. It renders standard semantic
 * HTML elements (p, span, div, blockquote, time) with no ARIA modifications.
 * Accessibility comes from correct HTML semantics + token-driven contrast.
 *
 * WHY NATIVE ELEMENTS ARE USED HERE:
 * io-text uses `shadow: false` and renders a native <Tag> element (p, span,
 * div, blockquote, time) in the light DOM. Stencil's jsdom environment does
 * not run the custom-element lifecycle, so these tests create the native
 * output elements directly — equivalent to testing the component's final
 * rendered HTML for axe purposes.
 *
 * COVERAGE GAP (intentional):
 * These tests do NOT cover inline styles injected by the component (font-size,
 * color tokens), conditional prop logic (ellipsis, hyphens), or the datetime
 * attribute wiring. Token contrast and prop-driven style regressions require
 * Lighthouse / visual regression tests, not axe-in-jsdom.
 *
 * Uses vitest-axe registered globally via tests/unit/config/vitest.setup.ts.
 */
import { describe, it } from 'vitest';

import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-text — a11y (ARIA patterns)', () => {
  it('paragraph element with text content has no violations', async () => {
    const el = document.createElement('p');
    el.textContent = 'Body paragraph text.';
    await renderAndCheckA11y(el);
  });

  it('span element with text content has no violations', async () => {
    const el = document.createElement('span');
    el.textContent = 'Inline text content.';
    await renderAndCheckA11y(el);
  });

  it('div element with text content has no violations', async () => {
    const el = document.createElement('div');
    el.textContent = 'Block text content.';
    await renderAndCheckA11y(el);
  });

  it('blockquote element with text content has no violations', async () => {
    const el = document.createElement('blockquote');
    el.textContent = 'A notable quote from a source.';
    await renderAndCheckA11y(el);
  });

  it('time element with datetime attribute has no violations', async () => {
    const el = document.createElement('time');
    el.setAttribute('datetime', '2024-01-01');
    el.textContent = '1 January 2024';
    await renderAndCheckA11y(el);
  });

  it('text nested inside a main landmark has no violations', async () => {
    const main = document.createElement('main');
    const p = document.createElement('p');
    p.textContent = 'Main content body text.';
    main.appendChild(p);
    await renderAndCheckA11y(main);
  });
});
