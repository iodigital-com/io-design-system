/**
 * io-wordmark — WCAG AA accessibility pattern tests
 */
import { describe, it } from 'vitest';

import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-wordmark — a11y (ARIA patterns)', () => {
  it('img role element with aria-label has no violations', async () => {
    const el = document.createElement('div');
    el.setAttribute('role', 'img');
    el.setAttribute('aria-label', 'io Digital');
    await renderAndCheckA11y(el);
  });

  it('link element wrapping img-role has no violations', async () => {
    const link = document.createElement('a');
    link.href = '/';
    link.setAttribute('aria-label', 'io Digital');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
    title.textContent = 'io Digital';
    svg.appendChild(title);
    link.appendChild(svg);
    await renderAndCheckA11y(link);
  });

  it('SVG with title has no violations', async () => {
    const container = document.createElement('div');
    container.setAttribute('role', 'img');
    container.setAttribute('aria-label', 'io Digital');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
    title.textContent = 'io Digital';
    svg.appendChild(title);
    container.appendChild(svg);
    await renderAndCheckA11y(container);
  });
});
