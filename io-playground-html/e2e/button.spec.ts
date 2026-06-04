import { test, expect } from '@playwright/test';

test.describe('io-button (Native HTML)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => (window as any).show('button'));
    await page.waitForTimeout(100);
  });

  test('click increments counter', async ({ page }) => {
    await page.getByRole('button', { name: 'Click me' }).click();
    await page.getByRole('button', { name: 'Click me' }).click();
    await expect(page.getByTestId('result')).toContainText('Click count: 2');
  });

  test('reset works', async ({ page }) => {
    await page.getByRole('button', { name: 'Click me' }).click();
    await page.getByRole('button', { name: 'Reset' }).click();
    await expect(page.getByTestId('result')).toContainText('Click count: 0');
  });
});
