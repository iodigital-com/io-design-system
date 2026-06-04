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
    // Set FACE values and submit in one evaluate() — Stencil renders async so
    // requestSubmit() would check validity before the native input reflects the
    // new value. dispatchEvent bypasses constraint validation while still firing
    // the submit event that handleSubmit listens to.
    await page.evaluate(() => {
      const nameInput = document.querySelector('io-input[name="name"]') as any;
      const emailInput = document.querySelector('io-input[name="email"]') as any;
      const checkbox = document.querySelector('io-checkbox[name="terms"]') as any;
      if (nameInput) nameInput.value = 'Vue User';
      if (emailInput) emailInput.value = 'vue@test.io';
      if (checkbox) checkbox.checked = true;
      const form = document.querySelector('form') as HTMLFormElement;
      form?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    });
    await expect(page.getByTestId('form-result')).toContainText('Vue User');
  });
});
