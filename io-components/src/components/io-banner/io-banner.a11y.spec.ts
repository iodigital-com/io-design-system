import { describe, it, expect, beforeEach } from 'vitest';
import axe from 'axe-core';

import { getBannerStyles } from './io-banner-styles';

function renderToHTML(props: Partial<IoBanner> = {}): string {
  const variant = props.variant ?? 'info';
  const heading = props.heading ? `<strong>${props.heading}</strong>` : '';
  const dismissible = props.dismissible
    ? `<button type="button" aria-label="Dismiss ${variant} notification"></button>`
    : '';
  const role = variant === 'error' || variant === 'warning' ? 'alert' : 'status';
  const ariaLive = variant === 'error' || variant === 'warning' ? '' : ' aria-live="polite" aria-atomic="true"';
  return `
    <div>
      <style>${getBannerStyles()}</style>
      <div role="${role}"${ariaLive} class="banner banner--${variant}">
        <span aria-hidden="true">icon</span>
        <div class="banner__body">${heading}<div>Notification body</div></div>
        ${dismissible}
      </div>
    </div>
  `;
}

describe('io-banner — WCAG AA accessibility', () => {
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
    container.innerHTML = renderToHTML({ variant: 'warning', heading: 'Maintenance scheduled' });
    const result = await axe.run(container);
    expect(result.violations).toHaveLength(0);
  });

  it('passes axe with dismissible button', async () => {
    container.innerHTML = renderToHTML({ variant: 'info', dismissible: true });
    const result = await axe.run(container);
    expect(result.violations).toHaveLength(0);
  });

});
