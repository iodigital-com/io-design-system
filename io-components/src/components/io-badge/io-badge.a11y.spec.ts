/**
 * io-badge — WCAG AA accessibility pattern tests
 *
 * Tests the native HTML accessibility patterns that io-badge renders internally:
 * - A `<span>` containing text content
 * - Used inline within text or as a standalone label
 *
 * Uses vitest-axe registered globally via tests/unit/config/vitest.setup.ts.
 */
import { describe, it } from 'vitest';

import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-badge — a11y (ARIA patterns)', () => {
  it('badge with text content has no axe violations', async () => {
    const badge = document.createElement('span');
    badge.textContent = 'New';

    await renderAndCheckA11y(badge);
  });

  it('badge used inline within a heading has no axe violations', async () => {
    const wrapper = document.createElement('div');

    const heading = document.createElement('h2');
    heading.textContent = 'Product title ';

    const badge = document.createElement('span');
    badge.textContent = 'Active';
    heading.appendChild(badge);

    wrapper.appendChild(heading);

    await renderAndCheckA11y(wrapper);
  });

  it('badge with visually distinct status label has no axe violations', async () => {
    const wrapper = document.createElement('div');

    const label = document.createElement('span');
    label.textContent = 'Status: ';

    const badge = document.createElement('span');
    badge.setAttribute('aria-label', 'Error');
    badge.textContent = 'Error';

    wrapper.appendChild(label);
    wrapper.appendChild(badge);

    await renderAndCheckA11y(wrapper);
  });

  it('multiple badges in a list have no axe violations', async () => {
    const wrapper = document.createElement('div');

    const list = document.createElement('ul');
    list.setAttribute('aria-label', 'Category tags');

    ['Design', 'Development', 'Testing'].forEach((text) => {
      const item = document.createElement('li');
      const badge = document.createElement('span');
      badge.textContent = text;
      item.appendChild(badge);
      list.appendChild(item);
    });

    wrapper.appendChild(list);

    await renderAndCheckA11y(wrapper);
  });
});
