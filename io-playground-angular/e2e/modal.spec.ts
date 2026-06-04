import { test, expect } from '@playwright/test';

test.describe('io-modal — footer button click (Angular 20)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/modal');
    await page.getByRole('button', { name: 'Open modal' }).click();
    await page.waitForTimeout(300);
  });

  test('Cancel button — real mouse click closes modal', async ({ page }) => {
    const { x, y } = await page.evaluate(() => {
      const modal = document.querySelector('io-modal');
      const footerBtns = modal?.querySelectorAll('io-button[slot="footer"]');
      const cancelBtn = footerBtns?.[0];
      const shadowBtn = cancelBtn?.shadowRoot?.querySelector('button');
      const rect = shadowBtn?.getBoundingClientRect();
      return {
        x: Math.round((rect?.left ?? 0) + (rect?.width ?? 0) / 2),
        y: Math.round((rect?.top ?? 0) + (rect?.height ?? 0) / 2),
      };
    });

    await page.mouse.click(x, y);
    await page.waitForTimeout(200);

    await expect(page.getByTestId('result')).toContainText('cancel-clicked');
  });

  test('Save button — real mouse click fires save action', async ({ page }) => {
    await page.evaluate(() => {
      const input = document.querySelector('io-modal io-input') as any;
      if (input) input.value = 'Test item';
    });

    const { x, y } = await page.evaluate(() => {
      const modal = document.querySelector('io-modal');
      const footerBtns = modal?.querySelectorAll('io-button[slot="footer"]');
      const saveBtn = footerBtns?.[1];
      const shadowBtn = saveBtn?.shadowRoot?.querySelector('button');
      const rect = shadowBtn?.getBoundingClientRect();
      return {
        x: Math.round((rect?.left ?? 0) + (rect?.width ?? 0) / 2),
        y: Math.round((rect?.top ?? 0) + (rect?.height ?? 0) / 2),
      };
    });

    await page.mouse.click(x, y);
    await page.waitForTimeout(200);

    const modalOpen = await page.evaluate(() => (document.querySelector('io-modal') as any)?.open);
    expect(modalOpen).toBeFalsy();
  });
});
