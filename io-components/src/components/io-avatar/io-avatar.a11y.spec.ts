/**
 * io-avatar — WCAG AA accessibility pattern tests
 *
 * Tests the native HTML accessibility patterns that io-avatar renders internally.
 * Full component-level axe auditing against the Shadow DOM requires the Stencil
 * render environment; this suite validates the ARIA patterns at a unit level.
 *
 * Uses vitest-axe registered globally via tests/unit/config/vitest.setup.ts.
 */
import { describe, it } from 'vitest';

import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-avatar — a11y (ARIA patterns)', () => {
  it('image avatar with meaningful alt text has no violations', async () => {
    const img = document.createElement('img');
    img.setAttribute('src', 'https://example.com/avatar.jpg');
    img.setAttribute('alt', 'Jane Doe');
    await renderAndCheckA11y(img);
  });

  it('decorative image (alt="", aria-hidden="true") has no violations', async () => {
    // When alt="" the image is decorative — the accessible name comes from the
    // surrounding context (e.g. a nearby text label). We model that here with a
    // figure + figcaption so the img itself can legitimately be aria-hidden.
    const figure = document.createElement('figure');

    const img = document.createElement('img');
    img.setAttribute('src', 'https://example.com/avatar.jpg');
    img.setAttribute('alt', '');
    img.setAttribute('aria-hidden', 'true');

    const caption = document.createElement('figcaption');
    caption.textContent = 'Jane Doe';

    figure.appendChild(img);
    figure.appendChild(caption);
    await renderAndCheckA11y(figure);
  });

  it('initials fallback with aria-label on host has no violations', async () => {
    const el = document.createElement('div');
    el.setAttribute('role', 'img');
    el.setAttribute('aria-label', 'Jane Doe');
    el.textContent = 'JD';
    await renderAndCheckA11y(el);
  });

  it('icon fallback (aria-hidden SVG) with aria-label on host has no violations', async () => {
    const el = document.createElement('div');
    el.setAttribute('role', 'img');
    el.setAttribute('aria-label', 'User profile');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('viewBox', '0 0 24 24');

    el.appendChild(svg);
    await renderAndCheckA11y(el);
  });
});
