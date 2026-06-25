import { describe, it, expect, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoIcon } from './io-icon';
import { renderAndCheckA11y } from '../../../tests/unit/helpers/axe';

function renderIcon(setup: (c: IoIcon) => void): Array<ReturnType<typeof vi.fn>['mock']['calls'][0]> {
  const c = new IoIcon();
  (c as any).el = document.createElement('io-icon');
  setup(c);

  const hMock = h as unknown as ReturnType<typeof vi.fn>;
  hMock.mockClear();
  c.render();
  return hMock.mock.calls as Array<[unknown, unknown]>;
}

function getSpanInnerHTML(calls: Array<[unknown, unknown]>): string | undefined {
  const spanCall = calls.find(([tag]) => tag === 'span');
  const attrs = (spanCall?.[1] ?? {}) as Record<string, unknown>;
  return attrs.innerHTML as string | undefined;
}

describe('io-icon — a11y (decorative and labelled modes)', () => {
  it('decorative icon (no label) renders aria-hidden="true" on the SVG', () => {
    const calls = renderIcon((c) => {
      c.name = 'check';
    });
    const innerHTML = getSpanInnerHTML(calls);
    expect(innerHTML).toContain('aria-hidden="true"');
    expect(innerHTML).not.toContain('role="img"');
  });

  it('labelled icon renders role="img" on the SVG', () => {
    const calls = renderIcon((c) => {
      c.name = 'check';
      c.label = 'Done';
    });
    const innerHTML = getSpanInnerHTML(calls);
    expect(innerHTML).toContain('role="img"');
  });

  it('labelled icon renders aria-label matching the label prop', () => {
    const calls = renderIcon((c) => {
      c.name = 'check';
      c.label = 'Confirmation checkmark';
    });
    const innerHTML = getSpanInnerHTML(calls);
    expect(innerHTML).toContain('aria-label="Confirmation checkmark"');
  });

  it('labelled icon does not render aria-hidden="true"', () => {
    const calls = renderIcon((c) => {
      c.name = 'check';
      c.label = 'Done';
    });
    const innerHTML = getSpanInnerHTML(calls);
    expect(innerHTML).not.toContain('aria-hidden="true"');
  });

  it('label prop replaces aria-hidden with role="img" + aria-label', () => {
    const calls = renderIcon((c) => {
      c.name = 'arrow-right';
      c.label = 'Navigate forward';
    });
    const innerHTML = getSpanInnerHTML(calls);
    expect(innerHTML).toContain('role="img"');
    expect(innerHTML).toContain('aria-label="Navigate forward"');
    expect(innerHTML).not.toContain('aria-hidden="true"');
  });

  it('decorative icon structure has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M5 12h14" stroke="currentColor" fill="none"/>
        </svg>
      </div>
    `;
    await renderAndCheckA11y(el);
  });

  it('labelled icon structure has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <svg role="img" aria-label="Navigate forward" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M5 12h14" stroke="currentColor" fill="none"/>
        </svg>
      </div>
    `;
    await renderAndCheckA11y(el);
  });
});
