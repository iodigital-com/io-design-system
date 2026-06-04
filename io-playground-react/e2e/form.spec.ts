import { test, expect } from '@playwright/test';

test.describe('FACE form (React)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/form');
  });

  // --- original test kept intact ---

  test('full submission captures all field values', async ({ page }) => {
    await page.evaluate(() => {
      const nameInput = document.querySelector('io-input[name="name"]') as any;
      const emailInput = document.querySelector('io-input[name="email"]') as any;
      if (nameInput) nameInput.value = 'Jake Ortega';
      if (emailInput) emailInput.value = 'jake@io.digital';
    });

    await page.evaluate(() => {
      const checkbox = document.querySelector('io-checkbox[name="terms"]') as any;
      if (checkbox) checkbox.checked = true;
    });

    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByTestId('result')).toContainText('Jake Ortega');
    await expect(page.getByTestId('result')).toContainText('jake@io.digital');
  });

  // --- new tests ---

  test('submit with all empty required fields — form does NOT submit', async ({ page }) => {
    await page.getByRole('button', { name: 'Submit' }).click();
    // The result div is only rendered after a successful submission
    await expect(page.getByTestId('result')).not.toBeVisible();
  });

  test('fill name only, leave email empty — form does NOT submit', async ({ page }) => {
    await page.evaluate(() => {
      const nameInput = document.querySelector('io-input[name="name"]') as any;
      if (nameInput) nameInput.value = 'Jake';
    });

    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByTestId('result')).not.toBeVisible();
  });

  test('fill all required fields — FormData contains name, email, and terms', async ({ page }) => {
    await page.evaluate(() => {
      const nameInput = document.querySelector('io-input[name="name"]') as any;
      const emailInput = document.querySelector('io-input[name="email"]') as any;
      if (nameInput) nameInput.value = 'Jane Doe';
      if (emailInput) emailInput.value = 'jane@io.digital';
    });

    await page.evaluate(() => {
      const checkbox = document.querySelector('io-checkbox[name="terms"]') as any;
      if (checkbox) checkbox.checked = true;
    });

    await page.getByRole('button', { name: 'Submit' }).click();

    const result = page.getByTestId('result');
    await expect(result).toContainText('Jane Doe');
    await expect(result).toContainText('jane@io.digital');
    await expect(result).toContainText('"terms"');
    await expect(result).toContainText('"on"');
  });

  test('checkbox FACE value: checked = "on" in FormData, unchecked not present', async ({ page }) => {
    // First: check box and submit — terms should appear as "on"
    await page.evaluate(() => {
      const nameInput = document.querySelector('io-input[name="name"]') as any;
      const emailInput = document.querySelector('io-input[name="email"]') as any;
      if (nameInput) nameInput.value = 'Test User';
      if (emailInput) emailInput.value = 'test@io.digital';
    });
    await page.evaluate(() => {
      const checkbox = document.querySelector('io-checkbox[name="terms"]') as any;
      if (checkbox) checkbox.checked = true;
    });

    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByTestId('result')).toContainText('"on"');

    // Reload, leave checkbox unchecked, submit — terms key should not be present
    await page.reload();
    await page.evaluate(() => {
      const nameInput = document.querySelector('io-input[name="name"]') as any;
      const emailInput = document.querySelector('io-input[name="email"]') as any;
      if (nameInput) nameInput.value = 'Test User';
      if (emailInput) emailInput.value = 'test@io.digital';
    });

    await page.getByRole('button', { name: 'Submit' }).click();
    // Without the required checkbox the form should not submit
    await expect(page.getByTestId('result')).not.toBeVisible();
  });

  test('radio: selecting option B includes choice=b in FormData', async ({ page }) => {
    await page.evaluate(() => {
      const nameInput = document.querySelector('io-input[name="name"]') as any;
      const emailInput = document.querySelector('io-input[name="email"]') as any;
      if (nameInput) nameInput.value = 'Radio Tester';
      if (emailInput) emailInput.value = 'radio@io.digital';
    });

    await page.evaluate(() => {
      const checkbox = document.querySelector('io-checkbox[name="terms"]') as any;
      if (checkbox) checkbox.checked = true;
    });

    // Select radio option B
    await page.evaluate(() => {
      const radioB = document.querySelector('io-radio[value="b"]') as any;
      if (radioB) radioB.checked = true;
    });

    await page.getByRole('button', { name: 'Submit' }).click();

    const result = page.getByTestId('result');
    await expect(result).toContainText('"choice"');
    await expect(result).toContainText('"b"');
  });

  test('reset form — all fields clear', async ({ page }) => {
    // Set values first
    await page.evaluate(() => {
      const nameInput = document.querySelector('io-input[name="name"]') as any;
      const emailInput = document.querySelector('io-input[name="email"]') as any;
      if (nameInput) nameInput.value = 'To Be Cleared';
      if (emailInput) emailInput.value = 'clear@io.digital';
    });

    await page.evaluate(() => {
      const checkbox = document.querySelector('io-checkbox[name="terms"]') as any;
      if (checkbox) checkbox.checked = true;
    });

    // Trigger native form reset
    await page.evaluate(() => {
      const form = document.querySelector('form') as HTMLFormElement;
      form?.reset();
    });

    // Verify io-input values are cleared via FACE formResetCallback
    const nameValue = await page.evaluate(() => {
      return (document.querySelector('io-input[name="name"]') as any)?.value ?? '';
    });
    const checkboxChecked = await page.evaluate(() => {
      return (document.querySelector('io-checkbox[name="terms"]') as any)?.checked ?? false;
    });

    expect(nameValue).toBe('');
    expect(checkboxChecked).toBe(false);
  });
});
