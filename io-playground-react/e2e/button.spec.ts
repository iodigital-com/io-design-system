import { test, expect } from '@playwright/test';

test('io-button click increments counter', async ({ page }) => {
  await page.goto('/button');
  await page.getByRole('button', { name: 'Click me' }).click();
  await page.getByRole('button', { name: 'Click me' }).click();
  await expect(page.getByTestId('result')).toContainText('Click count: 2');
});
