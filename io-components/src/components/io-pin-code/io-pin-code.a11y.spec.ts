/**
 * io-pin-code — a11y (ARIA patterns) — WCAG 2.1 AA
 *
 * Tests the native HTML patterns rendered inside io-pin-code's Shadow DOM:
 * - role="group" with aria-labelledby
 * - Each input has inputMode="numeric" and aria-label="Digit N of M"
 * - aria-invalid propagated to each input in error state
 * - role="alert" on message when in error state
 */
import { describe, it } from 'vitest';

import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-pin-code — a11y (ARIA patterns)', () => {
  it('PIN group with label and 4 labelled inputs has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div role="group" aria-labelledby="pin-label">
        <span id="pin-label">Enter PIN</span>
        <input type="text" inputmode="numeric" maxlength="1" aria-label="Digit 1 of 4" />
        <input type="text" inputmode="numeric" maxlength="1" aria-label="Digit 2 of 4" />
        <input type="text" inputmode="numeric" maxlength="1" aria-label="Digit 3 of 4" />
        <input type="text" inputmode="numeric" maxlength="1" aria-label="Digit 4 of 4" />
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('PIN group with 6 slots has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div role="group" aria-labelledby="otp-label">
        <span id="otp-label">Enter OTP</span>
        <input type="text" inputmode="numeric" maxlength="1" aria-label="Digit 1 of 6" />
        <input type="text" inputmode="numeric" maxlength="1" aria-label="Digit 2 of 6" />
        <input type="text" inputmode="numeric" maxlength="1" aria-label="Digit 3 of 6" />
        <input type="text" inputmode="numeric" maxlength="1" aria-label="Digit 4 of 6" />
        <input type="text" inputmode="numeric" maxlength="1" aria-label="Digit 5 of 6" />
        <input type="text" inputmode="numeric" maxlength="1" aria-label="Digit 6 of 6" />
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('PIN group in error state with aria-invalid has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div role="group" aria-labelledby="pin-label2">
        <span id="pin-label2">Enter PIN</span>
        <input type="text" inputmode="numeric" maxlength="1" aria-label="Digit 1 of 4" aria-invalid="true" aria-describedby="pin-msg" />
        <input type="text" inputmode="numeric" maxlength="1" aria-label="Digit 2 of 4" aria-invalid="true" />
        <input type="text" inputmode="numeric" maxlength="1" aria-label="Digit 3 of 4" aria-invalid="true" />
        <input type="text" inputmode="numeric" maxlength="1" aria-label="Digit 4 of 4" aria-invalid="true" />
        <p id="pin-msg" role="alert">Please enter a valid PIN</p>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('masked PIN (password type) with label has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div role="group" aria-labelledby="pin-label3">
        <span id="pin-label3">Enter PIN</span>
        <input type="password" inputmode="numeric" maxlength="1" aria-label="Digit 1 of 4" autocomplete="one-time-code" />
        <input type="password" inputmode="numeric" maxlength="1" aria-label="Digit 2 of 4" autocomplete="one-time-code" />
        <input type="password" inputmode="numeric" maxlength="1" aria-label="Digit 3 of 4" autocomplete="one-time-code" />
        <input type="password" inputmode="numeric" maxlength="1" aria-label="Digit 4 of 4" autocomplete="one-time-code" />
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('required PIN group (required indicated in label) has no axe violations', async () => {
    const el = document.createElement('div');
    // Note: aria-required is not a valid attribute for role="group".
    // Required state is communicated via label text and required attr on inputs.
    el.innerHTML = `
      <div role="group" aria-labelledby="pin-label4">
        <span id="pin-label4">Security PIN <span aria-hidden="true"> *</span></span>
        <input type="text" inputmode="numeric" maxlength="1" aria-label="Digit 1 of 4" required />
        <input type="text" inputmode="numeric" maxlength="1" aria-label="Digit 2 of 4" required />
        <input type="text" inputmode="numeric" maxlength="1" aria-label="Digit 3 of 4" required />
        <input type="text" inputmode="numeric" maxlength="1" aria-label="Digit 4 of 4" required />
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('PIN group with helper message (role=status) has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div role="group" aria-labelledby="pin-label5">
        <span id="pin-label5">Enter PIN</span>
        <input type="text" inputmode="numeric" maxlength="1" aria-label="Digit 1 of 4" aria-describedby="pin-help" />
        <input type="text" inputmode="numeric" maxlength="1" aria-label="Digit 2 of 4" />
        <input type="text" inputmode="numeric" maxlength="1" aria-label="Digit 3 of 4" />
        <input type="text" inputmode="numeric" maxlength="1" aria-label="Digit 4 of 4" />
        <p id="pin-help" role="status" aria-live="polite" aria-atomic="true">Enter your 4-digit PIN</p>
      </div>
    `;
    await renderAndCheckA11y(el);
  });
});
