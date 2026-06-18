import { describe, it, expect, vi, beforeEach } from 'vitest';
import { h } from '@stencil/core';

import { IoInputDate } from './io-input-date';
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-input-date — a11y (ARIA patterns)', () => {
  it('visible label associated with date input has no axe violations', async () => {
    const container = document.createElement('div');
    container.innerHTML = `
      <div>
        <label for="date1">Birth date</label>
        <input id="date1" type="date" />
      </div>
    `;
    await renderAndCheckA11y(container);
  });

  describe('render ARIA props', () => {
    let component: IoInputDate;

    beforeEach(() => {
      component = new IoInputDate();
      (component as any).el = document.createElement('io-input-date');
      (component as any).change = { emit: vi.fn() };
      (component as any).input = { emit: vi.fn() };
      (component as any).focus = { emit: vi.fn() };
      (component as any).blur = { emit: vi.fn() };
      (component as any).internals = { setFormValue: vi.fn() };
      component.label = 'Birth date';
      (component as any).componentWillLoad();
    });

    it('sets aria-invalid when state is error', () => {
      component.state = 'error';
      component.message = 'Invalid date';
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
      component.message = 'Date is required';
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
  });
});
