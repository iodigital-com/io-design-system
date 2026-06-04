import { test, expect } from '@playwright/test';

test.describe('io-tabs (React)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tabs');
    // Wait for io-tabs shadow root (confirms component initialized)
    await page.waitForFunction(() => !!document.querySelector('io-tabs')?.shadowRoot);
  });

  test('initial active tab is 0', async ({ page }) => {
    await expect(page.getByTestId('result')).toContainText('Active tab: 0');
  });

  test('clicking tab 1 triggers update event — active tab becomes 1', async ({ page }) => {
    // io-tabs uses light DOM <button> children — click second button
    const btns = page.locator('io-tabs button');
    await btns.nth(1).click();
    await expect(page.getByTestId('result')).toContainText('Active tab: 1');
  });

  test('clicking tab 2 triggers update event — active tab becomes 2', async ({ page }) => {
    await page.locator('io-tabs button').nth(2).click();
    await expect(page.getByTestId('result')).toContainText('Active tab: 2');
  });

  test('switching from tab 2 back to tab 0 resets active indicator', async ({ page }) => {
    const btns = page.locator('io-tabs button');
    await btns.nth(2).click();
    await expect(page.getByTestId('result')).toContainText('Active tab: 2');

    await btns.nth(0).click();
    await expect(page.getByTestId('result')).toContainText('Active tab: 0');
  });
});
