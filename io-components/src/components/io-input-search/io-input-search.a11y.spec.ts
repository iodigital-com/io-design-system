import { describe, it, expect, vi, beforeEach } from 'vitest';
import { h } from '@stencil/core';

import { IoInputSearch } from './io-input-search';
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

describe('io-input-search — a11y (ARIA patterns)', () => {
  it('visible label associated with search input has no axe violations', async () => {
    const container = document.createElement('div');
    container.innerHTML = `
      <div>
        <label for="srch1">Search</label>
        <input id="srch1" type="search" />
      </div>
    `;
    await renderAndCheckA11y(container);
  });

  describe('render ARIA props', () => {
    let component: IoInputSearch;

    beforeEach(() => {
      component = new IoInputSearch();
      (component as any).el = document.createElement('io-input-search');
      (component as any).change = { emit: vi.fn() };
      (component as any).input = { emit: vi.fn() };
      (component as any).focus = { emit: vi.fn() };
      (component as any).blur = { emit: vi.fn() };
      (component as any).clear = { emit: vi.fn() };
      (component as any).internals = { setFormValue: vi.fn() };
      component.label = 'Search';
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
      component.message = 'Search failed';
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

    it('clear button has aria-label', () => {
      vi.mocked(h).mockClear();
      component.render();
      const btnCall = vi.mocked(h).mock.calls.find(
        (c) => c[0] === 'button' && (c[1] as Record<string, unknown>)?.['aria-label']
      );
      const props = (btnCall?.[1] ?? {}) as Record<string, unknown>;
      expect(props['aria-label']).toBeTruthy();
    });
  });
});
