import { test, expect } from '@playwright/test';

test.describe('FACE form (Vue 3)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByText('Forms').click();
  });

  test('form submits with FACE values', async ({ page }) => {
    await page.evaluate(() => {
      const nameInput = document.querySelector('io-input[name="name"]') as any;
      if (nameInput) nameInput.value = 'Vue User';
      const checkbox = document.querySelector('io-checkbox[name="terms"]') as any;
      if (checkbox) checkbox.checked = true;
    });
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByTestId('form-result')).toContainText('Vue User');
  });
});
