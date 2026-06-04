import { test, expect } from '@playwright/test';

test.describe('io-button (Vue 3)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByText('io-button').click();
    await page.waitForFunction(() => customElements.get('io-button') !== undefined);
  });

  test('click increments counter', async ({ page }) => {
    const btn = page.locator('io-button').filter({ hasText: 'Click me' });
    await btn.click();
    await btn.click();
    await expect(page.getByTestId('button-result')).toContainText('Click count: 2');
  });

  test('reset sets counter to 0', async ({ page }) => {
    await page.locator('io-button').filter({ hasText: 'Click me' }).click();
    await page.locator('io-button').filter({ hasText: 'Reset' }).click();
    await expect(page.getByTestId('button-result')).toContainText('Click count: 0');
  });
});
