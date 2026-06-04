import { test, expect } from '@playwright/test';

test.describe('Angular — io-button click counter', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/button');
  });

  test('single click increments counter to 1', async ({ page }) => {
    await page.getByRole('button', { name: 'Click me' }).click();
    await expect(page.getByTestId('result')).toContainText('Click count: 1');
  });

  test('click 3 times — result shows Click count: 3', async ({ page }) => {
    const btn = page.getByRole('button', { name: 'Click me' });
    await btn.click();
    await btn.click();
    await btn.click();
    await expect(page.getByTestId('result')).toContainText('Click count: 3');
  });

  test('reset after clicks — result shows Click count: 0', async ({ page }) => {
    const btn = page.getByRole('button', { name: 'Click me' });
    await btn.click();
    await btn.click();
    await expect(page.getByTestId('result')).toContainText('Click count: 2');

    await page.getByRole('button', { name: 'Reset' }).click();
    await expect(page.getByTestId('result')).toContainText('Click count: 0');
  });

  test('keyboard Enter on focused button increments counter', async ({ page }) => {
    // Tab into the page to reach the first focusable button (Click me)
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(page.getByTestId('result')).toContainText('Click count: 1');
  });
});
