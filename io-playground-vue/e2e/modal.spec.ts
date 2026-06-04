import { test, expect } from '@playwright/test';

test.describe('io-modal — footer button click (Vue 3)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByText('io-modal').click();
    await page.getByRole('button', { name: 'Open modal' }).click();
    await page.waitForTimeout(300);
  });

  test('Cancel button real mouse click closes modal', async ({ page }) => {
    const { x, y } = await page.evaluate(() => {
      const modal = document.querySelector('io-modal');
      const cancelBtn = modal?.querySelectorAll('io-button[slot="footer"]')?.[0];
      const rect = cancelBtn?.shadowRoot?.querySelector('button')?.getBoundingClientRect();
      return { x: Math.round((rect?.left ?? 0) + (rect?.width ?? 0) / 2), y: Math.round((rect?.top ?? 0) + (rect?.height ?? 0) / 2) };
    });
    await page.mouse.click(x, y);
    await page.waitForTimeout(200);
    await expect(page.getByTestId('modal-result')).toContainText('cancel-clicked');
  });

  test('Save button with empty input stays open and shows validation error', async ({ page }) => {
    const { x, y } = await page.evaluate(() => {
      const modal = document.querySelector('io-modal');
      const saveBtn = modal?.querySelectorAll('io-button[slot="footer"]')?.[1];
      const rect = saveBtn?.shadowRoot?.querySelector('button')?.getBoundingClientRect();
      return { x: Math.round((rect?.left ?? 0) + (rect?.width ?? 0) / 2), y: Math.round((rect?.top ?? 0) + (rect?.height ?? 0) / 2) };
    });
    await page.mouse.click(x, y);
    await page.waitForTimeout(200);
    await expect(page.getByTestId('modal-result')).toContainText('validation-error');
  });

  test('Save button with filled input closes modal and shows saved value', async ({ page }) => {
    await page.evaluate(() => {
      const input = document.querySelector('io-modal io-input') as any;
      if (input) input.value = 'Test Vue item';
    });
    // Trigger the Vue @input handler by dispatching an input event so modalName state updates
    await page.evaluate(() => {
      const input = document.querySelector('io-modal io-input') as any;
      input?.dispatchEvent(new Event('input', { bubbles: true }));
    });
    const { x, y } = await page.evaluate(() => {
      const modal = document.querySelector('io-modal');
      const saveBtn = modal?.querySelectorAll('io-button[slot="footer"]')?.[1];
      const rect = saveBtn?.shadowRoot?.querySelector('button')?.getBoundingClientRect();
      return { x: Math.round((rect?.left ?? 0) + (rect?.width ?? 0) / 2), y: Math.round((rect?.top ?? 0) + (rect?.height ?? 0) / 2) };
    });
    await page.mouse.click(x, y);
    await page.waitForTimeout(200);
    await expect(page.getByTestId('modal-result')).toContainText('saved: Test Vue item');
  });

  test('Backdrop click closes modal', async ({ page }) => {
    // Click the backdrop element directly via its shadow root coordinates
    const { x, y } = await page.evaluate(() => {
      const modal = document.querySelector('io-modal');
      const backdrop = modal?.shadowRoot?.querySelector('.modal__backdrop') as HTMLElement | null;
      const rect = backdrop?.getBoundingClientRect();
      // Click near top-left corner of backdrop, well outside the dialog
      return { x: Math.round((rect?.left ?? 0) + 10), y: Math.round((rect?.top ?? 0) + 10) };
    });
    await page.mouse.click(x, y);
    await page.waitForTimeout(200);
    await expect(page.getByTestId('modal-result')).toContainText('cancel-clicked');
  });
});
