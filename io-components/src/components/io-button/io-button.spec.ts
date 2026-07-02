import { describe, it, expect, vi, beforeEach } from 'vitest';
import { h } from '@stencil/core';

import { IoButton } from './io-button';
import { getButtonStyles } from './io-button-styles';

describe('io-button — default props', () => {
  let component: IoButton;

  beforeEach(() => {
    component = new IoButton();
    (component as any).el = document.createElement('io-button');
    (component as any).click = { emit: vi.fn() };
  });

  it('has variant solid by default', () => {
    expect(component.variant).toBe('solid');
  });

  it('has color blue by default', () => {
    expect(component.color).toBe('blue');
  });

  it('has size md by default', () => {
    expect(component.size).toBe('md');
  });

  it('has type button by default', () => {
    expect(component.type).toBe('button');
  });

  it('has target _self by default', () => {
    expect(component.target).toBe('_self');
  });

  it('is not disabled by default', () => {
    expect(component.disabled).toBe(false);
  });

  it('is not loading by default', () => {
    expect(component.loading).toBe(false);
  });

  it('is not fullWidth by default', () => {
    expect(component.fullWidth).toBe(false);
  });

  it('is not iconOnly by default', () => {
    expect(component.iconOnly).toBe(false);
  });

  it('has no arrow by default', () => {
    expect(component.arrow).toBeUndefined();
  });

  it('hideLabel is false by default', () => {
    expect(component.hideLabel).toBe(false);
  });

  it('hideLabel can be set to true', () => {
    component.hideLabel = true;
    expect(component.hideLabel).toBe(true);
  });

  it('setFocus resolves without throwing', async () => {
    const inner = document.createElement('button');
    inner.className = 'btn';
    inner.focus = vi.fn();
    const shadowRoot = { querySelector: vi.fn().mockReturnValue(inner) };
    (component as any).el = { shadowRoot };
    await expect(component.setFocus()).resolves.toBeUndefined();
  });

  it('warns in dev when iconOnly is true without label or aria-label', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    component.iconOnly = true;

    expect(() => component.render()).not.toThrow();
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('accessible label'));

    warnSpy.mockRestore();
  });
});

describe('io-button — :host styles', () => {
  it(':host CSS includes align-self: flex-start to prevent flex stretch', () => {
    const styles = getButtonStyles();
    expect(styles).toContain('align-self: flex-start');
  });
});

describe('io-button — disabled anchor tabIndex (WCAG 2.4.3)', () => {
  let component: IoButton;
  const hMock = vi.mocked(h);

  beforeEach(() => {
    component = new IoButton();
    (component as any).el = document.createElement('io-button');
    (component as any).click = { emit: vi.fn() };
  });

  it('disabled anchor retains tabIndex=0 for keyboard discoverability', () => {
    hMock.mockClear();
    component.href = '/page';
    component.disabled = true;
    component.render();
    const anchorCall = hMock.mock.calls.find(
      (call) => call[0] === 'a' && call[1] && typeof call[1] === 'object' && 'href' in (call[1] as object),
    );
    expect((anchorCall?.[1] as Record<string, unknown>)?.tabIndex).toBe(0);
  });

  it('non-disabled anchor does not set tabIndex', () => {
    hMock.mockClear();
    component.href = '/page';
    component.disabled = false;
    component.render();
    const anchorCall = hMock.mock.calls.find(
      (call) => call[0] === 'a' && call[1] && typeof call[1] === 'object' && 'href' in (call[1] as object),
    );
    expect((anchorCall?.[1] as Record<string, unknown>)?.tabIndex).toBeUndefined();
  });
});
