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
    await page.evaluate(() => {
      const nameInput = document.querySelector('io-input[name="name"]') as any;
      if (nameInput) nameInput.value = 'HTML User';
      const checkbox = document.querySelector('io-checkbox[name="terms"]') as any;
      if (checkbox) checkbox.checked = true;
    });
    // Shadow DOM buttons cannot submit light DOM forms natively; call requestSubmit directly.
    await page.evaluate(() => {
      (document.getElementById('test-form') as HTMLFormElement)?.requestSubmit();
    });
    const result = page.getByTestId('form-result');
    await expect(result).toBeVisible();
    await expect(result).toContainText('HTML User');
  });
});
