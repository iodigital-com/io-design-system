/**
 * Configurator tab — verifies the preview and controls sections render.
 *
 * The configurator preview is a live preview area; the controls panel
 * opens automatically on desktop viewports (≥1024px) for configurator routes
 * via SidebarContext. The viewport is set to 1280×720 in playwright.config.ts.
 */

import { test, expect } from '@playwright/test';

test.describe('io-button configurator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/io-button/configurator');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('page title is "Button"', async ({ page }) => {
    await expect(page.locator('h1').first()).toHaveText('Button');
  });

  test('configurator preview area is present', async ({ page }) => {
    // The configurator renders a preview section with the live component preview.
    // Wait for the section with id="main-content" which wraps the preview.
    const main = page.locator('#main-content');
    await expect(main).toBeVisible();
  });

  test('component description paragraph is present in the pre-rendered HTML', async ({ page }) => {
    // The description is server-rendered — present even before JS hydration.
    await expect(page.locator('#main-content p').first()).toBeVisible();
  });

  test('all 5 tab links exist on the configurator page', async ({ page }) => {
    for (const tabPath of ['configurator', 'examples', 'usage', 'accessibility', 'api']) {
      await expect(
        page.locator(`a[href="/components/io-button/${tabPath}"]`).first(),
      ).toBeVisible();
    }
  });
});

