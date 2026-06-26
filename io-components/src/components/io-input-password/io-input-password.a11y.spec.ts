import { describe, it, expect, vi, beforeEach } from 'vitest';
import { h } from '@stencil/core';

import { IoInputPassword } from './io-input-password';
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-input-password — a11y (ARIA patterns)', () => {
  it('visible label associated with password input has no axe violations', async () => {
    const container = document.createElement('div');
    container.innerHTML = `
      <div>
        <label for="pw1">Password</label>
        <input id="pw1" type="password" />
      </div>
    `;
    await renderAndCheckA11y(container);
  });

  describe('render ARIA props', () => {
    let component: IoInputPassword;

    beforeEach(() => {
      component = new IoInputPassword();
      (component as any).el = document.createElement('io-input-password');
      (component as any).change = { emit: vi.fn() };
      (component as any).input = { emit: vi.fn() };
      (component as any).focus = { emit: vi.fn() };
      (component as any).blur = { emit: vi.fn() };
      (component as any).internals = { setFormValue: vi.fn() };
      component.label = 'Password';
      (component as any).componentWillLoad();
    });

    it('sets aria-invalid when state is error', () => {
      component.state = 'error';
      component.message = 'Required';
      vi.mocked(h).mockClear();
      component.render();
      const inputCall = vi.mocked(h).mock.calls.find((c) => c[0] === 'input');
      const props = (inputCall?.[1] ?? {}) as Record<string, unknown>;
      expect(props['aria-invalid']).toBe('true');
    });

    it('does not set aria-invalid when state is none', () => {
      component.state = 'none';
      vi.mocked(h).mockClear();
      component.render();
      const inputCall = vi.mocked(h).mock.calls.find((c) => c[0] === 'input');
      const props = (inputCall?.[1] ?? {}) as Record<string, unknown>;
      expect(props['aria-invalid']).toBeUndefined();
    });

    it('sets aria-describedby when error message present', () => {
      component.state = 'error';
      component.message = 'Required field';
      vi.mocked(h).mockClear();
      component.render();
      const inputCall = vi.mocked(h).mock.calls.find((c) => c[0] === 'input');
      const props = (inputCall?.[1] ?? {}) as Record<string, unknown>;
      expect(props['aria-describedby']).toBeTruthy();
    });

    it('label htmlFor matches inputId', () => {
      vi.mocked(h).mockClear();
      component.render();
      const labelCall = vi.mocked(h).mock.calls.find((c) => c[0] === 'label');
      const props = (labelCall?.[1] ?? {}) as Record<string, unknown>;
      expect(props['htmlFor']).toBe((component as any).inputId);
    });

    it('toggle button has aria-pressed="false" when password is masked', () => {
      (component as any).showPassword = false;
      vi.mocked(h).mockClear();
      component.render();
      const btnCall = vi.mocked(h).mock.calls.find(
        ([tag, attrs]: [string, Record<string, unknown>]) =>
          tag === 'button' && (attrs as Record<string, unknown>)?.class === 'password-toggle',
      );
      const props = (btnCall?.[1] ?? {}) as Record<string, unknown>;
      expect(props['aria-pressed']).toBe('false');
    });

    it('toggle button has aria-pressed="true" when password is visible', () => {
      (component as any).showPassword = true;
      vi.mocked(h).mockClear();
      component.render();
      const btnCall = vi.mocked(h).mock.calls.find(
        ([tag, attrs]: [string, Record<string, unknown>]) =>
          tag === 'button' && (attrs as Record<string, unknown>)?.class === 'password-toggle',
      );
      const props = (btnCall?.[1] ?? {}) as Record<string, unknown>;
      expect(props['aria-pressed']).toBe('true');
    });
  });
});
