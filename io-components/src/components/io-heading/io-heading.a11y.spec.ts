/**
 * io-heading — WCAG AA accessibility pattern tests
 *
 * io-heading is a light DOM typography primitive. It renders standard semantic
 * heading elements (h1–h6) with no ARIA modifications.
 * The `tag` prop controls document outline semantics — users must choose the
 * correct heading level for their page structure.
 *
 * WHY NATIVE ELEMENTS ARE USED HERE:
 * io-heading uses `shadow: false` and delegates all semantics to the host tag.
 * The component renders <Tag style={...}>{text}</Tag> — jsdom resolves this to
 * the host element, making renderAndCheckA11y(nativeEl) equivalent to testing
 * the component's rendered output for axe purposes.
 *
 * COVERAGE GAP (intentional):
 * These tests do NOT cover inline styles, the resolveTag() fallback, or the
 * console.error guard for missing tag prop. Token contrast and prop-driven
 * style regressions require Lighthouse / visual regression tests.
 *
 * Uses vitest-axe registered globally via tests/unit/config/vitest.setup.ts.
 */
import { describe, it } from 'vitest';

import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-heading — a11y (ARIA patterns)', () => {
  it('h1 element with text content has no violations', async () => {
    const el = document.createElement('h1');
    el.textContent = 'Page Title';
    await renderAndCheckA11y(el);
  });

  it('h2 element with text content has no violations', async () => {
    const el = document.createElement('h2');
    el.textContent = 'Section Heading';
    await renderAndCheckA11y(el);
  });

  it('h3 element with text content has no violations', async () => {
    const el = document.createElement('h3');
    el.textContent = 'Subsection Heading';
    await renderAndCheckA11y(el);
  });

  it('h4 element with text content has no violations', async () => {
    const el = document.createElement('h4');
    el.textContent = 'Card Title';
    await renderAndCheckA11y(el);
  });

  it('h5 element with text content has no violations', async () => {
    const el = document.createElement('h5');
    el.textContent = 'Detail Title';
    await renderAndCheckA11y(el);
  });

  it('h6 element with text content has no violations', async () => {
    const el = document.createElement('h6');
    el.textContent = 'Minor Title';
    await renderAndCheckA11y(el);
  });

  it('heading in a main landmark has no violations', async () => {
    const main = document.createElement('main');
    const h1 = document.createElement('h1');
    h1.textContent = 'Main Page Title';
    const section = document.createElement('section');
    section.setAttribute('aria-labelledby', 'section-heading');
    const h2 = document.createElement('h2');
    h2.id = 'section-heading';
    h2.textContent = 'Section Title';
    section.appendChild(h2);
    main.appendChild(h1);
    main.appendChild(section);
    await renderAndCheckA11y(main);
  });
});
