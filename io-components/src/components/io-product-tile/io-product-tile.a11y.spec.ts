import { describe, it } from 'vitest';
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-product-tile — a11y', () => {
  it('has no violations with required props', async () => {
    const el = document.createElement('io-product-tile');
    (el as any).heading = 'Test product';
    (el as any).price = '€49';
    await renderAndCheckA11y(el);
  });

  it('has no violations with sale price', async () => {
    const el = document.createElement('io-product-tile');
    (el as any).heading = 'Test product';
    (el as any).price = '€49';
    (el as any).priceOriginal = '€79';
    await renderAndCheckA11y(el);
  });

  it('has no violations with like button', async () => {
    const el = document.createElement('io-product-tile');
    (el as any).heading = 'Test product';
    (el as any).price = '€49';
    (el as any).likeButton = true;
    await renderAndCheckA11y(el);
  });

  it('has no violations with href link', async () => {
    const el = document.createElement('io-product-tile');
    (el as any).heading = 'Test product';
    (el as any).price = '€49';
    (el as any).href = '/product/1';
    await renderAndCheckA11y(el);
  });
});
