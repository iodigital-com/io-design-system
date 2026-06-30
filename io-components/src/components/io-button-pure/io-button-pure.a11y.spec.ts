import { describe, it } from 'vitest';
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-button-pure — a11y (ARIA patterns)', () => {
  it('default button has no axe violations', async () => {
    const el = document.createElement('button');
    el.type = 'button';
    el.textContent = 'View details';
    await renderAndCheckA11y(el);
  });

  it('button with aria-label has no axe violations', async () => {
    const el = document.createElement('button');
    el.type = 'button';
    el.setAttribute('aria-label', 'View details');
    await renderAndCheckA11y(el);
  });

  it('anchor variant has no axe violations', async () => {
    const el = document.createElement('a');
    el.href = '/pricing';
    el.textContent = 'See pricing';
    await renderAndCheckA11y(el);
  });

  it('disabled button has no axe violations', async () => {
    const el = document.createElement('button');
    el.type = 'button';
    el.disabled = true;
    el.textContent = 'Disabled';
    await renderAndCheckA11y(el);
  });
});
