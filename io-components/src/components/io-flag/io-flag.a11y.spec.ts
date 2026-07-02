import { describe, it } from 'vitest';
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-flag — a11y (ARIA patterns)', () => {
  it('flag with alt text has no axe violations', async () => {
    const el = document.createElement('img');
    el.src = 'https://flagcdn.com/w24/nl.png';
    el.alt = 'Netherlands';
    el.width = 24;
    await renderAndCheckA11y(el);
  });

  it('decorative flag (empty alt) has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = '<img src="https://flagcdn.com/w24/nl.png" alt="" width="24" role="presentation" />';
    await renderAndCheckA11y(el);
  });

  it('flag inside a label context has no axe violations', async () => {
    const el = document.createElement('label');
    el.innerHTML = '<img src="https://flagcdn.com/w24/de.png" alt="Germany" width="24" /> German';
    await renderAndCheckA11y(el);
  });
});
