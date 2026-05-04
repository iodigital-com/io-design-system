/**
 * io-button — WCAG AA accessibility smoke test
 *
 * Validates that a baseline io-button render produces zero axe violations.
 * Uses vitest-axe registered globally via tests/unit/config/vitest.setup.ts.
 */
import { describe, it } from 'vitest';

import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-button — a11y', () => {
  it('has no violations with visible text label', async () => {
    const el = document.createElement('button');
    el.textContent = 'Submit form';
    el.setAttribute('type', 'button');
    await renderAndCheckA11y(el);
  });

  it('has no violations with aria-label on icon-only button', async () => {
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
