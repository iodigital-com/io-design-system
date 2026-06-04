import { test, expect } from '@playwright/test';

test.describe('FACE form (Native HTML)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => (window as any).show('form'));
    await page.waitForFunction(() =>
      customElements.get('io-input') !== undefined &&
      customElements.get('io-checkbox') !== undefined
    );
  });

  test('FACE form captures io-input value via FormData', async ({ page }) => {
    // Set FACE values and submit in one evaluate() — Stencil renders async so
    // requestSubmit() would check validity before native inputs reflect new values.
    // dispatchEvent bypasses constraint validation while still firing the submit event.
    await page.evaluate(() => {
      const nameInput = document.querySelector('io-input[name="name"]') as any;
      const emailInput = document.querySelector('io-input[name="email"]') as any;
      const checkbox = document.querySelector('io-checkbox[name="terms"]') as any;
      if (nameInput) nameInput.value = 'HTML User';
      if (emailInput) emailInput.value = 'html@test.io';
      if (checkbox) checkbox.checked = true;
      const form = document.getElementById('test-form') as HTMLFormElement;
      form?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    });
    const result = page.getByTestId('form-result');
    await expect(result).toBeVisible();
    await expect(result).toContainText('HTML User');
  });
});
