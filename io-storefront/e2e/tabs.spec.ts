/**
 * Tab navigation — verifies the five tab links are present on every component
 * page and that clicking navigates to the correct URL.
 *
 * Uses io-button as the representative component.
 */

import { test, expect } from '@playwright/test';

const TABS = [
  { label: 'Configurator', path: 'configurator' },
  { label: 'Examples', path: 'examples' },
  { label: 'Usage', path: 'usage' },
  { label: 'Accessibility', path: 'accessibility' },
  { label: 'API', path: 'api' },
] as const;

test.describe('io-button tab navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/io-button/configurator');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  for (const { label, path } of TABS) {
    test(`"${label}" tab link is present and points to the correct path`, async ({ page }) => {
      const tabLink = page.getByRole('link', { name: label, exact: true });
      await expect(tabLink).toBeVisible();
      await expect(tabLink).toHaveAttribute('href', `/components/io-button/${path}`);
    });
  }

  test('clicking the Examples tab navigates to /components/io-button/examples', async ({ page }) => {
    await page.getByRole('link', { name: 'Examples', exact: true }).click();
    await expect(page).toHaveURL(/\/components\/io-button\/examples/);
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('clicking the API tab navigates to /components/io-button/api', async ({ page }) => {
    await page.getByRole('link', { name: 'API', exact: true }).click();
    await expect(page).toHaveURL(/\/components\/io-button\/api/);
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('active tab has aria-current="page"', async ({ page }) => {
    // The active tab link has aria-current="page" per WCAG 4.1.2.
    // Two such links exist (breadcrumb + tab nav); .first() resolves to the tab nav link.
    const activeLink = page.locator('a[href="/components/io-button/configurator"][aria-current="page"]').first();
    await expect(activeLink).toBeVisible();
  });
});
