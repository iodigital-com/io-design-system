import { test, expect } from '@playwright/test';

test.describe('FACE form (Vue 3)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByText('Forms').click();
    await page.waitForFunction(() =>
      customElements.get('io-input') !== undefined &&
      customElements.get('io-checkbox') !== undefined
    );
  });

  test('form submits with FACE values', async ({ page }) => {
    await page.evaluate(() => {
      const nameInput = document.querySelector('io-input[name="name"]') as any;
      const emailInput = document.querySelector('io-input[name="email"]') as any;
      if (nameInput) nameInput.value = 'Vue User';
      if (emailInput) emailInput.value = 'vue@test.io';
      const checkbox = document.querySelector('io-checkbox[name="terms"]') as any;
      if (checkbox) checkbox.checked = true;
    });
    // Shadow DOM io-button cannot trigger light DOM form submission natively.
    // Use requestSubmit() as the bridge to fire the form's submit event.
    await page.evaluate(() => {
      (document.querySelector('form') as HTMLFormElement)?.requestSubmit();
    });
    await expect(page.getByTestId('form-result')).toContainText('Vue User');
  });
});
