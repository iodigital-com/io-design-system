import { describe, it } from 'vitest';
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-button-tile — a11y', () => {
  it('has no violations with label', async () => {
    const el = document.createElement('io-button-tile') as HTMLElement;
    (el as any).label = 'Blue Widget';
    const img = document.createElement('img');
    img.src = '/img/widget.jpg';
    img.alt = 'Blue Widget';
    el.appendChild(img);
    await renderAndCheckA11y(el);
  });

  it('has no violations in disabled state', async () => {
    const el = document.createElement('io-button-tile') as HTMLElement;
    (el as any).label = 'Blue Widget';
    (el as any).disabled = true;
    await renderAndCheckA11y(el);
  });
});
