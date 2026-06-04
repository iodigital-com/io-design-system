import { test, expect } from '@playwright/test';

test.describe('io-button (Vue 3)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByText('io-button').click();
  });

  test('click increments counter', async ({ page }) => {
    await page.getByRole('button', { name: 'Click me' }).click();
    await page.getByRole('button', { name: 'Click me' }).click();
    await expect(page.getByTestId('button-result')).toContainText('Click count: 2');
  });

  test('reset sets counter to 0', async ({ page }) => {
    await page.getByRole('button', { name: 'Click me' }).click();
    await page.getByRole('button', { name: 'Reset' }).click();
    await expect(page.getByTestId('button-result')).toContainText('Click count: 0');
  });
});
