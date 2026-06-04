import { describe, it } from 'vitest';

/**
 * Axe tests — WCAG 2.1 AA — ARIA patterns used by io-inline-notification
 *
 * Tests the native HTML patterns rendered by io-inline-notification's Shadow DOM.
 * Unlike io-banner, io-inline-notification places the live-region role on the
 * Host element itself (it renders unconditionally — no open/close toggle).
 *
 * ARIA strategy (mirroring io-inline-notification.tsx):
 *   - error variant:     role="alert" on the host wrapper (implicit aria-live="assertive")
 *   - all other variants: role="status" + aria-live="polite" + aria-atomic="true" on the host wrapper
 */
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-inline-notification — a11y (ARIA patterns)', () => {
  it('info variant has no axe violations', async () => {
    const el = document.createElement('div');
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    el.setAttribute('aria-atomic', 'true');
    el.innerHTML = `
      <div class="inline-notification inline-notification--info">
        <span aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10" /></svg>
        </span>
        <div class="inline-notification__body">
          <div class="inline-notification__content">Notification body</div>
        </div>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('success variant has no axe violations', async () => {
    const el = document.createElement('div');
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    el.setAttribute('aria-atomic', 'true');
    el.innerHTML = `
      <div class="inline-notification inline-notification--success">
        <span aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><polyline points="22 4 12 14.01 9 11.01" /></svg>
        </span>
        <div class="inline-notification__body">
          <div class="inline-notification__content">Notification body</div>
        </div>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('warning variant has no axe violations', async () => {
    const el = document.createElement('div');
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    el.setAttribute('aria-atomic', 'true');
    el.innerHTML = `
      <div class="inline-notification inline-notification--warning">
        <span aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><line x1="12" y1="9" x2="12" y2="13" /></svg>
        </span>
        <div class="inline-notification__body">
          <div class="inline-notification__content">Notification body</div>
        </div>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('error variant uses role="alert" and has no axe violations', async () => {
    const el = document.createElement('div');
    el.setAttribute('role', 'alert');
    el.innerHTML = `
      <div class="inline-notification inline-notification--error">
        <span aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10" /></svg>
        </span>
        <div class="inline-notification__body">
          <div class="inline-notification__content">Notification body</div>
        </div>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('dismissible notification has accessible dismiss button with no axe violations', async () => {
    const el = document.createElement('div');
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    el.setAttribute('aria-atomic', 'true');
    el.innerHTML = `
      <div class="inline-notification inline-notification--warning">
        <span aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><line x1="12" y1="9" x2="12" y2="13" /></svg>
        </span>
        <div class="inline-notification__body">
          <div class="inline-notification__content">Notification body</div>
        </div>
        <button type="button" class="inline-notification__dismiss" aria-label="Dismiss warning notification">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><line x1="18" y1="6" x2="6" y2="18" /></svg>
        </button>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('notification with heading has no axe violations', async () => {
    const el = document.createElement('div');
    el.setAttribute('role', 'alert');
    el.innerHTML = `
      <div class="inline-notification inline-notification--error">
        <span aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10" /></svg>
        </span>
        <div class="inline-notification__body">
          <strong class="inline-notification__heading">Upload failed</strong>
          <div class="inline-notification__content">The file could not be uploaded. Please try again.</div>
        </div>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('dismissible notification with heading uses heading-derived dismiss label and has no axe violations', async () => {
    const el = document.createElement('div');
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    el.setAttribute('aria-atomic', 'true');
    el.innerHTML = `
      <div class="inline-notification inline-notification--info">
        <span aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10" /></svg>
        </span>
        <div class="inline-notification__body">
          <strong class="inline-notification__heading">Storage limit</strong>
          <div class="inline-notification__content">You have used 90% of your quota.</div>
        </div>
        <button type="button" class="inline-notification__dismiss" aria-label='Dismiss "Storage limit"'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><line x1="18" y1="6" x2="6" y2="18" /></svg>
        </button>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('dismissible error notification has no axe violations', async () => {
    const el = document.createElement('div');
    el.setAttribute('role', 'alert');
    el.innerHTML = `
      <div class="inline-notification inline-notification--error">
        <span aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10" /></svg>
        </span>
        <div class="inline-notification__body">
          <div class="inline-notification__content">Failed to save. Please try again.</div>
        </div>
        <button type="button" class="inline-notification__dismiss" aria-label="Dismiss error notification">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><line x1="18" y1="6" x2="6" y2="18" /></svg>
        </button>
      </div>
    `;
    await renderAndCheckA11y(el);
  });
});
