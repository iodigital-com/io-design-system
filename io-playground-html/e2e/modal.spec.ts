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
    await expect(page.getByTestId('modal-result')).toContainText('cancel-clicked');
  });

  test('Save button with empty input stays open with validation error', async ({ page }) => {
    const { x, y } = await page.evaluate(() => {
      const modal = document.getElementById('test-modal');
      const saveBtn = modal?.querySelectorAll('io-button[slot="footer"]')?.[1];
      const rect = saveBtn?.shadowRoot?.querySelector('button')?.getBoundingClientRect();
      return { x: Math.round((rect?.left ?? 0) + (rect?.width ?? 0) / 2), y: Math.round((rect?.top ?? 0) + (rect?.height ?? 0) / 2) };
    });
    await page.mouse.click(x, y);
    await page.waitForTimeout(200);
    await expect(page.getByTestId('modal-result')).toContainText('validation-error');
  });

  test('Save button with filled input closes modal and result contains saved value', async ({ page }) => {
    await page.evaluate(() => {
      const nameInput = document.getElementById('modal-name') as any;
      if (nameInput) nameInput.value = 'HTML User';
    });
    const { x, y } = await page.evaluate(() => {
      const modal = document.getElementById('test-modal');
      const saveBtn = modal?.querySelectorAll('io-button[slot="footer"]')?.[1];
      const rect = saveBtn?.shadowRoot?.querySelector('button')?.getBoundingClientRect();
      return { x: Math.round((rect?.left ?? 0) + (rect?.width ?? 0) / 2), y: Math.round((rect?.top ?? 0) + (rect?.height ?? 0) / 2) };
    });
    await page.mouse.click(x, y);
    await page.waitForTimeout(200);
    await expect(page.getByTestId('modal-result')).toContainText('saved: HTML User');
  });

  test('Backdrop click at (10, 10) closes modal', async ({ page }) => {
    const { x, y } = await page.evaluate(() => {
      const modal = document.getElementById('test-modal');
      const backdrop = modal?.shadowRoot?.querySelector('.modal__backdrop') as HTMLElement | null;
      const rect = backdrop?.getBoundingClientRect();
      return { x: Math.round((rect?.left ?? 0) + 10), y: Math.round((rect?.top ?? 0) + 10) };
    });
    await page.mouse.click(x, y);
    await page.waitForTimeout(200);
    await expect(page.getByTestId('modal-result')).toContainText('cancel-clicked');
  });
});
