import { test, expect } from '@playwright/test';

test.describe('FACE form (Native HTML)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => (window as any).show('form'));
    // Wait for ALL io-input shadow DOMs to be rendered — confirms internals are set up.
    // customElements.get() only confirms class registration, not instance initialization.
    await page.waitForFunction(() => {
      const inputs = Array.from(document.querySelectorAll('io-input'));
      return inputs.length > 0 &&
        inputs.every(el => !!(el as any).shadowRoot?.querySelector('input'));
    });
  });

  test('FACE form captures io-input value via FormData', async ({ page }) => {
    // Set FACE values and submit in one evaluate() — Stencil renders async so
    // requestSubmit() would check validity before native inputs reflect new values.
    // dispatchEvent bypasses constraint validation while still firing the submit event.
    await page.evaluate(() => {
      // Scope to #test-form — the modal section also has io-input[name="name"]
      // and querySelector returns the first DOM match (the modal's, not the form's).
      const form = document.getElementById('test-form') as HTMLFormElement;
      const nameInput = form?.querySelector('io-input[name="name"]') as any;
      const emailInput = form?.querySelector('io-input[name="email"]') as any;
      const checkbox = form?.querySelector('io-checkbox[name="terms"]') as any;
      if (nameInput) nameInput.value = 'HTML User';
      if (emailInput) emailInput.value = 'html@test.io';
      if (checkbox) checkbox.checked = true;
      form?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    });
    const result = page.getByTestId('form-result');
    await expect(result).toBeVisible();
    await expect(result).toContainText('HTML User');
  });
});
