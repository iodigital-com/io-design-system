import { describe, it } from 'vitest';

import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-link-pure — a11y', () => {
  it('has no violations with href and label', async () => {
    const el = document.createElement('io-link-pure');
    (el as any).href = '/docs';
    el.textContent = 'Read the docs';
    await renderAndCheckA11y(el);
  });

  it('has no violations with active state', async () => {
    const el = document.createElement('io-link-pure');
    (el as any).href = '/current';
    (el as any).active = true;
    el.textContent = 'Current page';
    await renderAndCheckA11y(el);
  });

  it('has no violations as button (no href)', async () => {
    const el = document.createElement('io-link-pure');
    el.textContent = 'Action';
    await renderAndCheckA11y(el);
  });
});
