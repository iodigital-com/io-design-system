/**
 * io-button — WCAG AA accessibility pattern tests
 *
 * Tests the native HTML accessibility patterns that io-button renders internally
 * (a <button> element with accessible label or aria-label). Full component-level
 * axe auditing against the Shadow DOM requires the Stencil render environment
 * (vitest.render.config.ts) and is out of scope for unit tests.
 *
 * Uses vitest-axe registered globally via tests/unit/config/vitest.setup.ts.
 */
import { describe, it } from 'vitest';

import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-button — a11y (ARIA patterns)', () => {
  it('button with visible text label has no violations', async () => {
    const el = document.createElement('button');
    el.textContent = 'Submit form';
    el.setAttribute('type', 'button');
    await renderAndCheckA11y(el);
  });

  it('icon-only button with aria-label has no violations', async () => {
    const el = document.createElement('button');
    el.setAttribute('type', 'button');
    el.setAttribute('aria-label', 'Close dialog');
    // Simulate icon-only content (non-text)
    const icon = document.createElement('span');
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = '×';
    el.appendChild(icon);
    await renderAndCheckA11y(el);
  });
});
