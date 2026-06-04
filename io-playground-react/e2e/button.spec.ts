import { test, expect } from '@playwright/test';

test.describe('io-button (React)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/button');
    await page.waitForFunction(() => customElements.get('io-button') !== undefined);
  });

  test('click increments counter', async ({ page }) => {
    const btn = page.locator('io-button').filter({ hasText: 'Click me' });
    await btn.click();
    await btn.click();
    await expect(page.getByTestId('result')).toContainText('Click count: 2');
  });

  test('click 5 times — counter reaches 5', async ({ page }) => {
    const btn = page.locator('io-button').filter({ hasText: 'Click me' });
    for (let i = 0; i < 5; i++) {
      await btn.click();
    }
    await expect(page.getByTestId('result')).toContainText('Click count: 5');
  });

  test('reset button sets counter back to 0', async ({ page }) => {
    const clickBtn = page.locator('io-button').filter({ hasText: 'Click me' });
    await clickBtn.click();
    await clickBtn.click();
    await clickBtn.click();
    await expect(page.getByTestId('result')).toContainText('Click count: 3');
    await page.locator('io-button').filter({ hasText: 'Reset' }).click();
    await expect(page.getByTestId('result')).toContainText('Click count: 0');
  });

  test('keyboard: Tab to button then Enter increments counter', async ({ page }) => {
    await page.locator('io-button').filter({ hasText: 'Click me' }).focus();
    await page.keyboard.press('Enter');
    await expect(page.getByTestId('result')).toContainText('Click count: 1');
  });
});
