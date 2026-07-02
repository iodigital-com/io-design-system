import { describe, it } from 'vitest';
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-grid — a11y', () => {
  it('has no violations with default props', async () => {
    const el = document.createElement('io-grid') as HTMLElement;
    const item = document.createElement('div');
    item.textContent = 'Grid cell';
    el.appendChild(item);
    await renderAndCheckA11y(el);
  });

  it('has no violations with gap set', async () => {
    const el = document.createElement('io-grid') as HTMLElement;
    (el as any).gap = 'lg';
    const item = document.createElement('div');
    item.textContent = 'Content';
    el.appendChild(item);
    await renderAndCheckA11y(el);
  });
});
