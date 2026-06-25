import { describe, it, expect, beforeEach } from 'vitest';
import axe from 'axe-core';
import { h } from '@stencil/core';

import { IoInlineNotification } from './io-inline-notification';
import { getInlineNotificationStyles } from './io-inline-notification-styles';

// error and warning both use role="alert" (assertive); info and success use role="status"
function renderToHTML(props: Partial<IoInlineNotification> = {}): string {
  const variant = props.variant ?? 'info';
  const heading = props.heading ? `<strong>${props.heading}</strong>` : '';
  const dismissible = props.dismissible
    ? `<button type="button" aria-label="Dismiss ${variant} notification"></button>`
    : '';
  const isAssertive = variant === 'error' || variant === 'warning';
  const role = isAssertive ? 'alert' : 'status';
  const ariaLive = isAssertive ? '' : ' aria-live="polite" aria-atomic="true"';
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

describe('io-inline-notification — component role per variant', () => {
  function renderComponent(variant: IoInlineNotification['variant']): Record<string, unknown> {
    const c = new IoInlineNotification();
    (c as any).el = document.createElement('io-inline-notification');
    c.variant = variant!;
    const hMock = h as unknown as ReturnType<typeof import('vitest').vi.fn>;
    hMock.mockClear();
    c.render();
    // Host is first h() call (tag === undefined in Stencil mock environment)
    const hostCall = hMock.mock.calls.find((call) => call[0] == null || call[0] === undefined);
    return (hostCall?.[1] ?? {}) as Record<string, unknown>;
  }

  it('warning variant renders role="alert" on host', () => {
    const props = renderComponent('warning');
    expect(props.role).toBe('alert');
  });

  it('error variant renders role="alert" on host', () => {
    const props = renderComponent('error');
    expect(props.role).toBe('alert');
  });

  it('info variant renders role="status" on host', () => {
    const props = renderComponent('info');
    expect(props.role).toBe('status');
  });

  it('success variant renders role="status" on host', () => {
    const props = renderComponent('success');
    expect(props.role).toBe('status');
  });
});
