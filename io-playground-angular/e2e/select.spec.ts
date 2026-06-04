import { test, expect } from '@playwright/test';

test.describe('Angular — io-select', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/select');
  });

  test('initial state shows "none"', async ({ page }) => {
    await expect(page.getByTestId('result')).toContainText('none');
  });

  test('programmatically setting value updates Angular signal', async ({ page }) => {
    await page.evaluate(() => {
      const el = document.querySelector('io-select') as any;
      if (el) {
        el.value = 'apple';
        el.dispatchEvent(new CustomEvent('change', { detail: { value: 'apple' }, bubbles: true }));
      }
    });
    await expect(page.getByTestId('result')).toContainText('apple');
  });
});
