import { describe, it } from 'vitest';

/**
 * Axe tests — WCAG 2.1 AA — ARIA patterns used by io-banner
 *
 * Tests the native HTML patterns rendered inside io-banner's Shadow DOM.
 * io-banner places the live-region role on the inner .banner div (not the Host)
 * so the live region only exists while open=true.
 *
 * ARIA strategy (mirroring io-banner.tsx):
 *   - error variant:     role="alert" on inner div (implicit aria-live="assertive")
 *   - all other variants: role="status" + aria-live="polite" + aria-atomic="true" on inner div
 */
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-banner — a11y (ARIA patterns)', () => {
  it('info variant has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div role="status" aria-live="polite" aria-atomic="true" class="banner banner--info">
        <span aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10" /></svg>
        </span>
        <div class="banner__body">
          <div class="banner__content">Notification body</div>
        </div>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('success variant has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div role="status" aria-live="polite" aria-atomic="true" class="banner banner--success">
        <span aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><polyline points="22 4 12 14.01 9 11.01" /></svg>
        </span>
        <div class="banner__body">
          <div class="banner__content">Notification body</div>
        </div>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('warning variant has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div role="status" aria-live="polite" aria-atomic="true" class="banner banner--warning">
        <span aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><line x1="12" y1="9" x2="12" y2="13" /></svg>
        </span>
        <div class="banner__body">
          <div class="banner__content">Notification body</div>
        </div>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('error variant uses role="alert" and has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div role="alert" class="banner banner--error">
        <span aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10" /></svg>
        </span>
        <div class="banner__body">
          <div class="banner__content">Notification body</div>
        </div>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('dismissible banner has accessible dismiss button with no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div role="status" aria-live="polite" aria-atomic="true" class="banner banner--info">
        <span aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10" /></svg>
        </span>
        <div class="banner__body">
          <div class="banner__content">Notification body</div>
        </div>
        <button type="button" class="banner__dismiss" aria-label="Dismiss info notification">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><line x1="18" y1="6" x2="6" y2="18" /></svg>
        </button>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('banner with heading has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div role="status" aria-live="polite" aria-atomic="true" class="banner banner--warning">
        <span aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><line x1="12" y1="9" x2="12" y2="13" /></svg>
        </span>
        <div class="banner__body">
          <strong class="banner__heading">Maintenance scheduled</strong>
          <div class="banner__content">Scheduled maintenance on Saturday 10:00–12:00 UTC.</div>
        </div>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('dismissible banner with heading uses heading-derived dismiss label and has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div role="status" aria-live="polite" aria-atomic="true" class="banner banner--success">
        <span aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><polyline points="22 4 12 14.01 9 11.01" /></svg>
        </span>
        <div class="banner__body">
          <strong class="banner__heading">Changes saved</strong>
          <div class="banner__content">Your changes have been saved successfully.</div>
        </div>
        <button type="button" class="banner__dismiss" aria-label='Dismiss "Changes saved"'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><line x1="18" y1="6" x2="6" y2="18" /></svg>
        </button>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('dismissible error banner has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div role="alert" class="banner banner--error">
        <span aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10" /></svg>
        </span>
        <div class="banner__body">
          <div class="banner__content">Something went wrong. Please try again.</div>
        </div>
        <button type="button" class="banner__dismiss" aria-label="Dismiss error notification">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><line x1="18" y1="6" x2="6" y2="18" /></svg>
        </button>
      </div>
    `;
    await renderAndCheckA11y(el);
  });
});
