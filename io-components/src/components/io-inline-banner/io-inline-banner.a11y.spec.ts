import { describe, it, expect, beforeEach } from 'vitest';
import axe from 'axe-core';

import { IoInlineBanner } from './io-inline-banner';
import { getInlineBannerStyles } from './io-inline-banner-styles';

function renderToHTML(props: Partial<IoInlineBanner> = {}): string {
  const variant = props.variant ?? 'info';
  const heading = props.heading ? `<strong>${props.heading}</strong>` : '';
  const dismissible = props.dismissible
    ? `<button type="button" aria-label="Dismiss ${variant} notification"></button>`
    : '';
  const role = variant === 'error' ? 'alert' : 'status';
  const ariaLive = variant === 'error' ? '' : ' aria-live="polite" aria-atomic="true"';
  return `
    <div>
      <style>${getInlineBannerStyles()}</style>
      <div role="${role}"${ariaLive} class="inline-banner inline-banner--${variant}">
        <span aria-hidden="true">icon</span>
        <div class="inline-banner__body">${heading}<div>Notification body</div></div>
        ${dismissible}
      </div>
    </div>
  `;
}

describe('io-inline-banner — WCAG AA accessibility', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it.each(['info', 'success', 'warning', 'error'] as const)(
    'passes axe for %s variant',
    async (variant) => {
      container.innerHTML = renderToHTML({ variant });
      const result = await axe.run(container);
      expect(result.violations).toHaveLength(0);
    },
  );

  it('passes axe with heading', async () => {
    container.innerHTML = renderToHTML({ variant: 'error', heading: 'Upload failed' });
    const result = await axe.run(container);
    expect(result.violations).toHaveLength(0);
  });

  it('passes axe with dismissible button', async () => {
    container.innerHTML = renderToHTML({ variant: 'warning', dismissible: true });
    const result = await axe.run(container);
    expect(result.violations).toHaveLength(0);
  });

  it('dismiss button meets WCAG 2.5.8 minimum touch target', () => {
    const styles = getInlineBannerStyles();
    expect(styles).toContain('var(--io-touch-target-min)');
    expect(styles).toContain('min-width: var(--io-touch-target-min)');
    expect(styles).toContain('min-height: var(--io-touch-target-min)');
  });
});
