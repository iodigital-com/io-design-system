import { test, expect } from '@playwright/test';

test.describe('io-button (Native HTML)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => (window as any).show('button'));
    await page.waitForFunction(() => customElements.get('io-button') !== undefined);
  });

  test('click increments counter', async ({ page }) => {
    await page.locator('#count-btn').click();
    await page.locator('#count-btn').click();
    await expect(page.getByTestId('button-result')).toContainText('Click count: 2');
  });

  test('reset works', async ({ page }) => {
    await page.locator('#count-btn').click();
    await page.locator('#reset-btn').click();
    await expect(page.getByTestId('button-result')).toContainText('Click count: 0');
  });
});
