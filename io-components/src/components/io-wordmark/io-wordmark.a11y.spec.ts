import { describe, it } from 'vitest';

import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-wordmark — a11y', () => {
  it('img role with aria-label has no violations', async () => {
    const el = document.createElement('span');
    el.setAttribute('role', 'img');
    el.setAttribute('aria-label', 'io Digital');
    el.textContent = 'io digital';
    await renderAndCheckA11y(el);
  });

  it('img role with custom aria-label has no violations', async () => {
    const el = document.createElement('span');
    el.setAttribute('role', 'img');
    el.setAttribute('aria-label', 'iO Digital wordmark');
    el.textContent = 'io digital';
    await renderAndCheckA11y(el);
  });
});
