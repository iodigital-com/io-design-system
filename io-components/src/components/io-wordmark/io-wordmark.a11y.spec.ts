import { describe, it } from 'vitest';

import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-wordmark — a11y', () => {
  it('variant=mark: img role with aria-label has no violations', async () => {
    const el = document.createElement('span');
    el.setAttribute('role', 'img');
    el.setAttribute('aria-label', 'io Digital');
    await renderAndCheckA11y(el);
  });

  it('variant=mark: img role with custom aria-label has no violations', async () => {
    const el = document.createElement('span');
    el.setAttribute('role', 'img');
    el.setAttribute('aria-label', 'iO Digital wordmark');
    await renderAndCheckA11y(el);
  });

  it('variant=lockup: img role with aria-label has no violations', async () => {
    const el = document.createElement('span');
    el.setAttribute('role', 'img');
    el.setAttribute('aria-label', 'io Digital');
    await renderAndCheckA11y(el);
  });
});
