import { describe, it } from 'vitest';
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-link-tile — a11y', () => {
  it('has no violations with label and href', async () => {
    const el = document.createElement('io-link-tile') as HTMLElement;
    (el as any).href = '/products/widget';
    (el as any).label = 'Blue Widget';
    const img = document.createElement('img');
    img.src = '/img/widget.jpg';
    img.alt = 'Blue Widget';
    el.appendChild(img);
    await renderAndCheckA11y(el);
  });

  it('has no violations with description', async () => {
    const el = document.createElement('io-link-tile') as HTMLElement;
    (el as any).href = '/products/widget';
    (el as any).label = 'Blue Widget';
    (el as any).description = 'Premium quality widget';
    await renderAndCheckA11y(el);
  });
});
