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

function getSvgAttrs(calls: Array<[unknown, unknown]>): Record<string, unknown> {
  const svgCall = calls.find(([tag]) => tag === 'svg');
  return (svgCall?.[1] ?? {}) as Record<string, unknown>;
}

describe('io-icon — a11y (decorative and labelled modes)', () => {
  it('decorative icon (no label) renders aria-hidden="true" on the SVG', () => {
    const attrs = getSvgAttrs(renderIcon((c) => {
      c.name = 'check';
    }));
    expect(attrs['aria-hidden']).toBe('true');
    expect(attrs['role']).toBeUndefined();
  });

  it('labelled icon renders role="img" on the SVG', () => {
    const attrs = getSvgAttrs(renderIcon((c) => {
      c.name = 'check';
      c.label = 'Done';
    }));
    expect(attrs['role']).toBe('img');
  });

  it('labelled icon renders aria-label matching the label prop', () => {
    const attrs = getSvgAttrs(renderIcon((c) => {
      c.name = 'check';
      c.label = 'Confirmation checkmark';
    }));
    expect(attrs['aria-label']).toBe('Confirmation checkmark');
  });

  it('labelled icon does not render aria-hidden="true"', () => {
    const attrs = getSvgAttrs(renderIcon((c) => {
      c.name = 'check';
      c.label = 'Done';
    }));
    expect(attrs['aria-hidden']).toBeUndefined();
  });

  it('label prop sets role="img" + aria-label, removes aria-hidden', () => {
    const attrs = getSvgAttrs(renderIcon((c) => {
      c.name = 'arrow-right';
      c.label = 'Navigate forward';
    }));
    expect(attrs['role']).toBe('img');
    expect(attrs['aria-label']).toBe('Navigate forward');
    expect(attrs['aria-hidden']).toBeUndefined();
  });

  it('decorative icon structure has no axe violations', async () => {
    const el = document.createElement('div');
    el.innerHTML = `
      <div>
        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <use href="#io-icon-check" />
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
          <use href="#io-icon-arrow-right" />
        </svg>
      </div>
    `;
    await renderAndCheckA11y(el);
  });
});
