import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { IoSwitch } from './io-switch';
import { getSwitchStyles } from './io-switch-styles';

describe('io-switch — default props', () => {
  let component: IoSwitch;

  beforeEach(() => {
    component = new IoSwitch();
    (component as any).el = document.createElement('io-switch');
    (component as any).change = { emit: vi.fn() };
  });

  it('is not checked by default', () => {
    expect(component.checked).toBe(false);
  });

  it('has value "on" by default', () => {
    expect(component.value).toBe('on');
  });

  it('is not required by default', () => {
    expect(component.required).toBe(false);
  });

  it('is not disabled by default', () => {
    expect(component.disabled).toBe(false);
  });

  it('is not in error state by default', () => {
    expect(component.error).toBe(false);
  });

  it('has no errorMessage by default', () => {
    expect(component.errorMessage).toBeUndefined();
  });

  it('has no helperText by default', () => {
    expect(component.helperText).toBeUndefined();
  });

  it('setFocus resolves without throwing', async () => {
    const input = document.createElement('input');
    input.focus = vi.fn();
    const shadowRoot = { querySelector: vi.fn().mockReturnValue(input) };
    (component as any).el = { shadowRoot };
    await expect(component.setFocus()).resolves.toBeUndefined();
  });

  it('setFocus handles missing shadowRoot gracefully', async () => {
    (component as any).el = { shadowRoot: null };
    await expect(component.setFocus()).resolves.toBeUndefined();
  });

  it('setFocus handles missing el gracefully', async () => {
    (component as any).el = null;
    await expect(component.setFocus()).resolves.toBeUndefined();
  });
});

describe('io-switch — regression guards (Wave J)', () => {
  let warnSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  it('does not emit console.warn when label is omitted (#460)', () => {
    const c = new IoSwitch();
    (c as any).el = document.createElement('io-switch');
    (c as any).componentWillLoad?.();
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it('thumb shadow uses var(--io-switch-thumb-shadow) token, not hardcoded value (#452)', () => {
    const styles = getSwitchStyles();
    expect(styles).toContain('box-shadow: var(--io-switch-thumb-shadow)');
    expect(styles).not.toMatch(/box-shadow:\s*0\s+1px/);
  });
});

describe('io-switch — formDisabledCallback', () => {
  let component: IoSwitch;

  beforeEach(() => {
    component = new IoSwitch();
    (component as any).el = document.createElement('io-switch');
    (component as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };
    (component as any).change = { emit: vi.fn() };
  });

  it('sets disabled to true when formDisabledCallback(true) is called', () => {
    (component as any).formDisabledCallback(true);
    expect(component.disabled).toBe(true);
  });

  it('sets disabled to false when formDisabledCallback(false) is called', () => {
    component.disabled = true;
    (component as any).formDisabledCallback(false);
    expect(component.disabled).toBe(false);
  });
});
