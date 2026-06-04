import { test, expect } from '@playwright/test';

test.describe('Angular — FACE form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/form');
  });

  test('form shows correctly', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Forms' })).toBeVisible();
    // Initially no result shown
    const result = page.getByTestId('result');
    await expect(result).not.toBeVisible();
  });

  test('filling and submitting form shows FormData result', async ({ page }) => {
    await page.evaluate(() => {
      const nameInput = document.querySelector('io-input[name="name"]') as any;
      const emailInput = document.querySelector('io-input[name="email"]') as any;
      if (nameInput) nameInput.value = 'Jake Ortega';
      if (emailInput) emailInput.value = 'jake@io.digital';
    });
    // Check the terms checkbox
    await page.evaluate(() => {
      const checkbox = document.querySelector('io-checkbox[name="terms"]') as any;
      if (checkbox) checkbox.checked = true;
    });
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByTestId('result')).toBeVisible();
    await expect(page.getByTestId('result')).toContainText('Jake Ortega');
    await expect(page.getByTestId('result')).toContainText('jake@io.digital');
  });
});
