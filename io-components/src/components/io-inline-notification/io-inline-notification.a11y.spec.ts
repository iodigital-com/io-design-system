import { describe, it, expect, beforeEach } from 'vitest';
import axe from 'axe-core';

import { IoInlineNotification } from './io-inline-notification';
import { getInlineNotificationStyles } from './io-inline-notification-styles';

function renderToHTML(props: Partial<IoInlineNotification> = {}): string {
  const variant = props.variant ?? 'info';
  const heading = props.heading ? `<strong>${props.heading}</strong>` : '';
  const dismissible = props.dismissible
    ? `<button type="button" aria-label="Dismiss ${variant} notification"></button>`
    : '';
  const role = variant === 'error' ? 'alert' : 'status';
  const ariaLive = variant === 'error' ? '' : ' aria-live="polite" aria-atomic="true"';
  return `
    <div>
      <style>${getInlineNotificationStyles(variant)}</style>
      <div role="${role}"${ariaLive} class="inline-notification inline-notification--${variant}">
        <span aria-hidden="true">icon</span>
        <div class="inline-notification__body">${heading}<div>Notification body</div></div>
        ${dismissible}
      </div>
    </div>
  `;
}

describe('io-inline-notification — WCAG AA accessibility', () => {
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

});
