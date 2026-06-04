import { test, expect } from '@playwright/test';

test.describe('Angular — FACE form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/form');
    // Wait for io-input shadow DOM to confirm Stencil lifecycle complete
    await page.waitForFunction(() => {
      const inputs = Array.from(document.querySelectorAll('io-input'));
      return inputs.length > 0 && inputs.every(el => !!(el as any).shadowRoot?.querySelector('input'));
    });
  });

  test('form shows correctly', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Forms' })).toBeVisible();
    const result = page.getByTestId('result');
    await expect(result).not.toBeVisible();
  });

  test('filling and submitting form shows FormData result', async ({ page }) => {
    // Set FACE values and submit via dispatchEvent — bypasses browser FACE constraint
    // validation timing (Stencil async render cycle hasn't updated native inputs yet).
    // Attribute sync needed because Angular sets props not HTML attributes.
    await page.evaluate(() => {
      const form = document.querySelector('form') as HTMLFormElement;
      // Sync name/value attributes for FACE FormData keying
      form?.querySelectorAll('io-input, io-checkbox, io-radio, io-select').forEach((el: any) => {
        if (el.name && !el.getAttribute('name')) el.setAttribute('name', el.name);
      });
      const inputs = Array.from(form?.querySelectorAll('io-input') ?? []) as any[];
      const nameInput = inputs.find(e => e.name === 'name');
      const emailInput = inputs.find(e => e.name === 'email');
      const checkbox = form?.querySelector('io-checkbox') as any;
      if (nameInput) nameInput.value = 'Jake Ortega';
      if (emailInput) emailInput.value = 'jake@io.digital';
      if (checkbox) checkbox.checked = true;
      form?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    });
    await expect(page.getByTestId('result')).toBeVisible();
    await expect(page.getByTestId('result')).toContainText('Jake Ortega');
    await expect(page.getByTestId('result')).toContainText('jake@io.digital');
  });
});
