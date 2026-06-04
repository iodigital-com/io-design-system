import { test, expect } from '@playwright/test';

test.describe('io-select (React)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/select');
  });

  test('default state shows "none"', async ({ page }) => {
    await expect(page.getByTestId('result')).toContainText('none');
  });

  test('selecting an option via JS updates the result', async ({ page }) => {
    // Set value and dispatch a change event to trigger the React onChange handler
    await page.evaluate(() => {
      const el = document.querySelector('io-select') as any;
      if (el) el.value = 'banana';
      el?.dispatchEvent(
        new CustomEvent('change', { detail: { value: 'banana' }, bubbles: true, composed: true })
      );
    });
    await expect(page.getByTestId('result')).toContainText('banana');
  });

  test('selecting apple then cherry reflects the latest value', async ({ page }) => {
    await page.evaluate(() => {
      const el = document.querySelector('io-select') as any;
      if (el) el.value = 'apple';
      el?.dispatchEvent(
        new CustomEvent('change', { detail: { value: 'apple' }, bubbles: true, composed: true })
      );
    });
    await expect(page.getByTestId('result')).toContainText('apple');

    await page.evaluate(() => {
      const el = document.querySelector('io-select') as any;
      if (el) el.value = 'cherry';
      el?.dispatchEvent(
        new CustomEvent('change', { detail: { value: 'cherry' }, bubbles: true, composed: true })
      );
    });
    await expect(page.getByTestId('result')).toContainText('cherry');
  });

  test('component value property reflects the selected value', async ({ page }) => {
    await page.evaluate(() => {
      const el = document.querySelector('io-select') as any;
      if (el) el.value = 'banana';
      el?.dispatchEvent(
        new CustomEvent('change', { detail: { value: 'banana' }, bubbles: true, composed: true })
      );
    });

    const componentValue = await page.evaluate(() => {
      return (document.querySelector('io-select') as any)?.value;
    });
    expect(componentValue).toBe('banana');
  });
});
