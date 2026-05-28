/**
 * io-inline-notification E2E tests.
 *
 * Tests the inline-notification component via the storefront configurator
 * and examples pages served from the static Next.js export.
 */

import { test, expect } from '@playwright/test';

const TABS = ['configurator', 'examples', 'usage', 'accessibility', 'api'] as const;

test.describe('io-inline-notification — page structure', () => {
  test('page title is "Inline Notification"', async ({ page }) => {
    await page.goto('/components/io-inline-notification/configurator');
    await expect(page.locator('#main-content h1').first()).toHaveText('Inline Notification');
  });

  for (const tab of TABS) {
    test(`${tab} tab renders without error`, async ({ page }) => {
      await page.goto(`/components/io-inline-notification/${tab}`);
      await expect(page.locator('#main-content h1').first()).toBeVisible();
      await expect(page.locator('.next-error-h1')).not.toBeAttached();
    });
  }

  test('all 5 tab links are present on the configurator page', async ({ page }) => {
    await page.goto('/components/io-inline-notification/configurator');
    for (const tab of TABS) {
      await expect(
        page.locator(`a[href="/components/io-inline-notification/${tab}"]`).first(),
      ).toBeVisible();
    }
  });
});

test.describe('io-inline-notification — configurator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/io-inline-notification/configurator');
    await expect(page.locator('#main-content h1').first()).toBeVisible();
    // Wait for Stencil custom elements to initialise
    await page.waitForFunction(() => customElements.get('io-inline-notification') !== undefined);
  });

  test('io-inline-notification element is visible in the preview', async ({ page }) => {
    // Unlike io-banner, inline-notification is always mounted — no trigger needed
    await expect(page.locator('io-inline-notification').first()).toBeVisible();
  });

  test('component renders with default info variant', async ({ page }) => {
    // The default story starts with variant="info" reflected as an attribute
    await expect(page.locator('io-inline-notification[variant="info"]').first()).toBeAttached();
  });

  test('component has no open attribute (visibility controlled by mounting)', async ({ page }) => {
    // io-inline-notification has no open prop — consumer mounts/unmounts
    await expect(page.locator('io-inline-notification').first()).not.toHaveAttribute('open', '');
  });
});

test.describe('io-inline-notification — examples page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/io-inline-notification/examples');
    await expect(page.locator('#main-content h1').first()).toBeVisible();
  });

  test('examples page renders multiple io-inline-notification elements', async ({ page }) => {
    const notifications = page.locator('io-inline-notification');
    await expect(notifications.first()).toBeAttached();
    expect(await notifications.count()).toBeGreaterThan(1);
  });

  test('examples page includes all four variant types', async ({ page }) => {
    for (const variant of ['info', 'success', 'warning', 'error']) {
      await expect(
        page.locator(`io-inline-notification[variant="${variant}"]`).first(),
      ).toBeAttached();
    }
  });
});
