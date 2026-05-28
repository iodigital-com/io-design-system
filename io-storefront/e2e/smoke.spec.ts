/**
 * Smoke tests — every component × every tab loads without errors.
 *
 * These tests hit the static Next.js export served by `serve`.
 * Each assertion only requires the pre-rendered HTML; no JS hydration needed.
 */

import { test, expect } from '@playwright/test';

const COMPONENTS = [
  'io-accordion',
  'io-alert',
  'io-avatar',
  'io-badge',
  'io-breadcrumb',
  'io-button',
  'io-button-group',
  'io-carousel',
  'io-checkbox',
  'io-checkbox-group',
  'io-divider',
  'io-drawer',
  'io-heading',
  'io-input',
  'io-link',
  'io-modal',
  'io-multi-select',
  'io-pagination',
  'io-pin-code',
  'io-popover',
  'io-progress',
  'io-radio',
  'io-radio-group',
  'io-scroller',
  'io-select',
  'io-spinner',
  'io-stepper',
  'io-switch',
  'io-table',
  'io-tabs',
  'io-tabs-bar',
  'io-tag',
  'io-text',
  'io-textarea',
  'io-toast',
  'io-tooltip',
  'io-wordmark',
] as const;

const TABS = ['configurator', 'examples', 'usage', 'accessibility', 'api'] as const;

for (const component of COMPONENTS) {
  test.describe(component, () => {
    for (const tab of TABS) {
      test(`${tab} tab renders h1 and has no error boundary`, async ({ page }) => {
        await page.goto(`/components/${component}/${tab}`);
        // h1 is pre-rendered — verifies the correct HTML file was served
        await expect(page.locator('#main-content h1').first()).toBeVisible();
        // Next.js error boundary renders a specific class; plain text checks are too broad
        await expect(page.locator('.next-error-h1')).not.toBeAttached();
      });
    }
  });
}
