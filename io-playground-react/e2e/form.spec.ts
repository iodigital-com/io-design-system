import { test, expect } from '@playwright/test';

test('FACE form submission captures all field values', async ({ page }) => {
  await page.goto('/form');

  // Fill io-input fields via JS (Shadow DOM)
  await page.evaluate(() => {
    const nameInput = document.querySelector('io-input[name="name"]') as any;
    const emailInput = document.querySelector('io-input[name="email"]') as any;
    if (nameInput) nameInput.value = 'Jake Ortega';
    if (emailInput) emailInput.value = 'jake@io.digital';
  });

  // Check the checkbox
  await page.evaluate(() => {
    const checkbox = document.querySelector('io-checkbox[name="terms"]') as any;
    if (checkbox) checkbox.checked = true;
  });

  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByTestId('result')).toContainText('Jake Ortega');
  await expect(page.getByTestId('result')).toContainText('jake@io.digital');
});
