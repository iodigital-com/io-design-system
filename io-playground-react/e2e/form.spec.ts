import { test, expect } from '@playwright/test';

// Helper: set FACE values and submit in one evaluate() call.
// Stencil renders async — requestSubmit() checks native-input validity before
// the render cycle updates it, silently blocking submission. dispatchEvent
// bypasses constraint validation while still firing the submit event.
function submitForm(fields: Record<string, string>, checkboxNames: string[] = [], radioValues: Record<string, string> = {}) {
  return (page: import('@playwright/test').Page) =>
    page.evaluate(
      ({ fields, checkboxNames, radioValues }: { fields: Record<string, string>; checkboxNames: string[]; radioValues: Record<string, string> }) => {
        const form = document.querySelector('form') as HTMLFormElement;
        // React (like Vue) sets custom element props as DOM properties, not HTML attributes.
        // FACE FormData uses content attributes for element names — sync them first.
        // React/Vue set custom element props as DOM properties, not HTML attributes.
        // FACE FormData uses content attributes — sync name AND value props to attributes.
        form?.querySelectorAll('io-input, io-checkbox, io-radio, io-select').forEach((el: any) => {
          if (el.name && !el.getAttribute('name')) el.setAttribute('name', el.name);
          if (el.tagName === 'IO-RADIO' && el.value && !el.getAttribute('value'))
            el.setAttribute('value', el.value);
        });
        for (const [name, value] of Object.entries(fields)) {
          const inputs = Array.from(form?.querySelectorAll('io-input') ?? []) as any[];
          const el = inputs.find((e: any) => e.name === name);
          if (el) el.value = value;
        }
        for (const name of checkboxNames) {
          const checkboxes = Array.from(form?.querySelectorAll('io-checkbox') ?? []) as any[];
          const el = checkboxes.find((e: any) => e.name === name);
          if (el) el.checked = true;
        }
        for (const [name, value] of Object.entries(radioValues)) {
          const radios = Array.from(form?.querySelectorAll('io-radio') ?? []) as any[];
          const el = radios.find((e: any) => e.value === value && e.name === name);
          if (el) el.checked = true;
        }
        form?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      },
      { fields, checkboxNames, radioValues }
    );
}

test.describe('FACE form (React)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/form');
    await page.waitForFunction(() => {
      const inputs = Array.from(document.querySelectorAll('io-input'));
      return inputs.length > 0 &&
        inputs.every(el => !!(el as any).shadowRoot?.querySelector('input'));
    });
  });

  test('full submission captures all field values', async ({ page }) => {
    await submitForm({ name: 'Jake Ortega', email: 'jake@io.digital' }, ['terms'])(page);
    await expect(page.getByTestId('result')).toContainText('Jake Ortega');
    await expect(page.getByTestId('result')).toContainText('jake@io.digital');
  });

  test('fill all required fields — FormData contains name, email, and terms', async ({ page }) => {
    await submitForm({ name: 'Jane Doe', email: 'jane@io.digital' }, ['terms'])(page);
    const result = page.getByTestId('result');
    await expect(result).toContainText('Jane Doe');
    await expect(result).toContainText('jane@io.digital');
    await expect(result).toContainText('"terms"');
    await expect(result).toContainText('"on"');
  });

  test('checkbox FACE value: checked = "on" in FormData', async ({ page }) => {
    await submitForm({ name: 'Test User', email: 'test@io.digital' }, ['terms'])(page);
    await expect(page.getByTestId('result')).toContainText('"on"');
  });

  test('unchecked checkbox not present in FormData', async ({ page }) => {
    await submitForm({ name: 'Test User', email: 'test@io.digital' })(page);
    const result = page.getByTestId('result');
    await expect(result).toBeVisible();
    await expect(result).not.toContainText('"terms"');
  });

  test('radio: selecting option B includes choice=b in FormData', async ({ page }) => {
    await submitForm(
      { name: 'Radio Tester', email: 'radio@io.digital' },
      ['terms'],
      { choice: 'b' }
    )(page);
    const result = page.getByTestId('result');
    await expect(result).toContainText('"choice"');
    await expect(result).toContainText('"b"');
  });

  test('reset form — all fields clear via FACE formResetCallback', async ({ page }) => {
    await page.evaluate(() => {
      const nameInput = document.querySelector('io-input[name="name"]') as any;
      const emailInput = document.querySelector('io-input[name="email"]') as any;
      const checkbox = document.querySelector('io-checkbox[name="terms"]') as any;
      if (nameInput) nameInput.value = 'To Be Cleared';
      if (emailInput) emailInput.value = 'clear@io.digital';
      if (checkbox) checkbox.checked = true;
      (document.querySelector('form') as HTMLFormElement)?.reset();
    });

    const nameValue = await page.evaluate(() =>
      (document.querySelector('io-input[name="name"]') as any)?.value ?? ''
    );
    const checkboxChecked = await page.evaluate(() =>
      (document.querySelector('io-checkbox[name="terms"]') as any)?.checked ?? false
    );

    expect(nameValue).toBe('');
    expect(checkboxChecked).toBe(false);
  });
});
