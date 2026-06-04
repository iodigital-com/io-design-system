import { describe, it } from 'vitest';

/**
 * Axe tests — WCAG 2.2 AA — ARIA patterns used by io-link
 *
 * Tests the native HTML patterns rendered inside io-link's Shadow DOM
 * (an <a> element with text content, aria-label for external links,
 * and aria-disabled for the disabled state).
 * Full component-level auditing against the Shadow DOM requires the
 * Stencil render environment and is out of scope for unit tests.
 */
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-link — a11y (ARIA patterns)', () => {
  it('link with visible text content has no axe violations', async () => {
    const el = document.createElement('a');
    el.href = '#';
    el.textContent = 'Learn more';
    await renderAndCheckA11y(el);
  });

  it('link with aria-label for external navigation has no axe violations', async () => {
    const el = document.createElement('a');
    el.href = 'https://example.com';
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
    el.setAttribute('aria-label', 'Learn more, opens in new tab');
    el.textContent = 'Learn more';
    await renderAndCheckA11y(el);
  });

  it('disabled link using aria-disabled has no axe violations', async () => {
    const el = document.createElement('a');
    el.setAttribute('aria-disabled', 'true');
    el.setAttribute('tabindex', '-1');
    el.textContent = 'Disabled link';
    await renderAndCheckA11y(el);
  });

  it('inline link inside paragraph text has no axe violations', async () => {
    const container = document.createElement('p');
    container.textContent = 'Read our ';
    const link = document.createElement('a');
    link.href = '/privacy';
    link.textContent = 'privacy policy';
    container.appendChild(link);
    container.appendChild(document.createTextNode(' for more details.'));
    await renderAndCheckA11y(container);
  });
});
