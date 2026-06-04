import { describe, it } from 'vitest';

/**
 * Axe tests — WCAG 2.2 AA — ARIA patterns used by io-pagination
 *
 * Tests the native HTML patterns rendered inside io-pagination's Shadow DOM
 * (a <nav aria-label="Pagination"> wrapping page buttons with aria-label,
 * aria-current="page" on the active page, and an aria-live region for
 * screen reader announcements on page change).
 * Full component-level auditing against the Shadow DOM requires the
 * Stencil render environment and is out of scope for unit tests.
 */
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-pagination — a11y (ARIA patterns)', () => {
  it('pagination nav with labeled page buttons has no axe violations', async () => {
    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'Pagination');

    const prevBtn = document.createElement('button');
    prevBtn.setAttribute('type', 'button');
    prevBtn.setAttribute('aria-label', 'Previous page');
    prevBtn.disabled = true;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('width', '18');
    svg.setAttribute('height', '18');
    prevBtn.appendChild(svg);

    const page1 = document.createElement('button');
    page1.setAttribute('type', 'button');
    page1.setAttribute('aria-label', 'Page 1');
    page1.setAttribute('aria-current', 'page');
    page1.textContent = '1';

    const page2 = document.createElement('button');
    page2.setAttribute('type', 'button');
    page2.setAttribute('aria-label', 'Page 2');
    page2.textContent = '2';

    const nextBtn = document.createElement('button');
    nextBtn.setAttribute('type', 'button');
    nextBtn.setAttribute('aria-label', 'Next page');

    const svgNext = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgNext.setAttribute('aria-hidden', 'true');
    svgNext.setAttribute('width', '18');
    svgNext.setAttribute('height', '18');
    nextBtn.appendChild(svgNext);

    nav.appendChild(prevBtn);
    nav.appendChild(page1);
    nav.appendChild(page2);
    nav.appendChild(nextBtn);

    await renderAndCheckA11y(nav);
  });

  it('pagination with live region announcement has no axe violations', async () => {
    const container = document.createElement('div');

    const liveRegion = document.createElement('span');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.textContent = 'Page 1 of 2';

    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'Pagination');

    const btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-label', 'Page 1');
    btn.setAttribute('aria-current', 'page');
    btn.textContent = '1';

    nav.appendChild(btn);
    container.appendChild(liveRegion);
    container.appendChild(nav);

    await renderAndCheckA11y(container);
  });
});
