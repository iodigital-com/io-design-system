import { test, expect } from '@playwright/test';

test.describe('io-tabs (React)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tabs');
  });

  test('initial active tab is 0', async ({ page }) => {
    await expect(page.getByTestId('result')).toContainText('Active tab: 0');
  });

  test('clicking tab 1 triggers update event — active tab becomes 1', async ({ page }) => {
    await page.evaluate(() => {
      const tabs = document.querySelector('io-tabs');
      tabs?.dispatchEvent(
        new CustomEvent('update', { detail: { index: 1 }, bubbles: true, composed: true })
      );
    });
    await expect(page.getByTestId('result')).toContainText('Active tab: 1');
  });

  test('clicking tab 2 triggers update event — active tab becomes 2', async ({ page }) => {
    await page.evaluate(() => {
      const tabs = document.querySelector('io-tabs');
      tabs?.dispatchEvent(
        new CustomEvent('update', { detail: { index: 2 }, bubbles: true, composed: true })
      );
    });
    await expect(page.getByTestId('result')).toContainText('Active tab: 2');
  });

  test('switching from tab 2 back to tab 0 resets active indicator', async ({ page }) => {
    await page.evaluate(() => {
      const tabs = document.querySelector('io-tabs');
      tabs?.dispatchEvent(
        new CustomEvent('update', { detail: { index: 2 }, bubbles: true, composed: true })
      );
    });
    await expect(page.getByTestId('result')).toContainText('Active tab: 2');

    await page.evaluate(() => {
      const tabs = document.querySelector('io-tabs');
      tabs?.dispatchEvent(
        new CustomEvent('update', { detail: { index: 0 }, bubbles: true, composed: true })
      );
    });
    await expect(page.getByTestId('result')).toContainText('Active tab: 0');
  });
});
