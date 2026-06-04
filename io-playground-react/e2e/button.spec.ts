import { test, expect } from '@playwright/test';

test.describe('io-button (React)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/button');
  });

  test('click increments counter', async ({ page }) => {
    await page.getByRole('button', { name: 'Click me' }).click();
    await page.getByRole('button', { name: 'Click me' }).click();
    await expect(page.getByTestId('result')).toContainText('Click count: 2');
  });

  test('click 5 times — counter reaches 5', async ({ page }) => {
    const btn = page.getByRole('button', { name: 'Click me' });
    for (let i = 0; i < 5; i++) {
      await btn.click();
    }
    await expect(page.getByTestId('result')).toContainText('Click count: 5');
  });

  test('reset button sets counter back to 0', async ({ page }) => {
    const clickBtn = page.getByRole('button', { name: 'Click me' });
    await clickBtn.click();
    await clickBtn.click();
    await clickBtn.click();
    await expect(page.getByTestId('result')).toContainText('Click count: 3');

    await page.getByRole('button', { name: 'Reset' }).click();
    await expect(page.getByTestId('result')).toContainText('Click count: 0');
  });

  test('keyboard: Tab to button then Enter increments counter', async ({ page }) => {
    // Start from a known position by focusing the body, then Tab into the first io-button
    await page.keyboard.press('Tab');
    // The Click me button is the first focusable element; press Enter to activate it
    await page.keyboard.press('Enter');
    await expect(page.getByTestId('result')).toContainText('Click count: 1');
  });
});
