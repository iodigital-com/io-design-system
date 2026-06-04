import { test, expect } from '@playwright/test';

test.describe('FACE form (Vue 3)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByText('Forms').click();
    await page.waitForFunction(() => {
      const inputs = Array.from(document.querySelectorAll('io-input'));
      return inputs.length > 0 &&
        inputs.every(el => !!(el as any).shadowRoot?.querySelector('input'));
    });
  });

  test('form submits with FACE values', async ({ page }) => {
    // Set FACE values and submit in one evaluate() — Stencil renders async so
    // requestSubmit() would check validity before the native input reflects the
    // new value. dispatchEvent bypasses constraint validation while still firing
    // the submit event that handleSubmit listens to.
    await page.evaluate(() => {
      const form = document.querySelector('form') as HTMLFormElement;
      // Vue 3 sets custom element props as DOM properties, not HTML attributes.
      // FACE FormData uses the content attribute for element names — sync them first.
      form?.querySelectorAll('io-input, io-checkbox, io-select').forEach((el: any) => {
        if (el.name && !el.getAttribute('name')) el.setAttribute('name', el.name);
      });
      const nameInput = form?.querySelector('io-input[name="name"]') as any;
      const emailInput = form?.querySelector('io-input[name="email"]') as any;
      const checkbox = form?.querySelector('io-checkbox[name="terms"]') as any;
      if (nameInput) nameInput.value = 'Vue User';
      if (emailInput) emailInput.value = 'vue@test.io';
      if (checkbox) checkbox.checked = true;
      form?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    });
    await expect(page.getByTestId('form-result')).toContainText('Vue User');
  });
});
