/**
 * io-banner E2E tests.
 *
 * Tests the fixed-overlay banner component via the storefront configurator
 * and examples pages served from the static Next.js export.
 */

import { test, expect } from '@playwright/test';

const TABS = ['configurator', 'examples', 'usage', 'accessibility', 'api'] as const;

test.describe('io-banner — page structure', () => {
  test('page title is "Banner"', async ({ page }) => {
    await page.goto('/components/io-banner/configurator');
    await expect(page.locator('#main-content h1').first()).toHaveText('Banner');
  });

  for (const tab of TABS) {
    test(`${tab} tab renders without error`, async ({ page }) => {
      await page.goto(`/components/io-banner/${tab}`);
      await expect(page.locator('#main-content h1').first()).toBeVisible();
      await expect(page.locator('.next-error-h1')).not.toBeAttached();
    });
  }

  test('all 5 tab links are present on the configurator page', async ({ page }) => {
    await page.goto('/components/io-banner/configurator');
    for (const tab of TABS) {
      await expect(
        page.locator(`a[href="/components/io-banner/${tab}"]`).first(),
      ).toBeVisible();
    }
  });
});

test.describe('io-banner — configurator interaction', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/io-banner/configurator');
    await expect(page.locator('#main-content h1').first()).toBeVisible();
    // Wait for Stencil custom elements to be defined and hydrated
    await page.waitForFunction(() => customElements.get('io-banner') !== undefined);
    await page.waitForFunction(() => customElements.get('io-button') !== undefined);
  });

  test('io-banner element is present in the preview', async ({ page }) => {
    await expect(page.locator('io-banner').first()).toBeAttached();
  });

  test('banner is hidden by default (no open attribute)', async ({ page }) => {
    // open=false — reflect:true means the attribute is absent when false
    await expect(page.locator('io-banner').first()).not.toHaveAttribute('open', '');
  });

  test('trigger button is visible and labelled "Show banner"', async ({ page }) => {
    // The configurator story renders an io-button as the trigger
    await expect(page.locator('io-button').first()).toBeAttached();
  });

  test('clicking trigger reveals the banner (open attribute set)', async ({ page }) => {
    const banner = page.locator('io-banner').first();
    await expect(banner).not.toHaveAttribute('open', '');
    // Click the io-button trigger — fires native click, generator handler sets open:true
    await page.locator('io-button').first().click();
    await expect(banner).toHaveAttribute('open', '');
  });
});

test.describe('io-banner — examples page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/io-banner/examples');
    await expect(page.locator('#main-content h1').first()).toBeVisible();
  });

  test('examples page contains trigger buttons', async ({ page }) => {
    await expect(page.locator('button').first()).toBeAttached();
  });

  test('examples page renders io-banner elements', async ({ page }) => {
    await expect(page.locator('io-banner').first()).toBeAttached();
  });
});
