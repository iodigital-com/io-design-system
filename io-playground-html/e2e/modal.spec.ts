import { test, expect } from '@playwright/test';

test.describe('io-modal — footer button click (Native HTML)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => (window as any).show('modal'));
    await page.getByRole('button', { name: 'Open modal' }).click();
    await page.waitForTimeout(300);
  });

  test('Cancel button real mouse click closes modal', async ({ page }) => {
    const { x, y } = await page.evaluate(() => {
      const modal = document.getElementById('test-modal');
      const cancelBtn = modal?.querySelectorAll('io-button[slot="footer"]')?.[0];
      const rect = cancelBtn?.shadowRoot?.querySelector('button')?.getBoundingClientRect();
      return { x: Math.round((rect?.left ?? 0) + (rect?.width ?? 0) / 2), y: Math.round((rect?.top ?? 0) + (rect?.height ?? 0) / 2) };
    });
    await page.mouse.click(x, y);
    await page.waitForTimeout(200);
    await expect(page.getByTestId('result')).toContainText('cancel-clicked');
  });
});
