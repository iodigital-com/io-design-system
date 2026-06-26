import { describe, it, expect, vi, beforeEach } from 'vitest';
import { h } from '@stencil/core';

import { IoInputPassword } from './io-input-password';

describe('io-input-password — default props', () => {
  let component: IoInputPassword;

  beforeEach(() => {
    component = new IoInputPassword();
    (component as any).el = document.createElement('io-input-password');
    (component as any).change = { emit: vi.fn() };
    (component as any).input = { emit: vi.fn() };
    (component as any).focus = { emit: vi.fn() };
    (component as any).blur = { emit: vi.fn() };
    (component as any).internals = { setFormValue: vi.fn() };
  });

  it('value defaults to empty string', () => { expect(component.value).toBe(''); });
  it('required defaults to false', () => { expect(component.required).toBe(false); });
  it('disabled defaults to false', () => { expect(component.disabled).toBe(false); });
  it('state defaults to none', () => { expect(component.state).toBe('none'); });
  it('hideLabel defaults to false', () => { expect(component.hideLabel).toBe(false); });
  it('size defaults to md', () => { expect(component.size).toBe('md'); });
  it('autocomplete defaults to current-password', () => { expect(component.autocomplete).toBe('current-password'); });
  it('showPassword defaults to false', () => { expect((component as any).showPassword).toBe(false); });

  it('generates inputId in componentWillLoad', () => {
    component.label = 'Password';
    (component as any).componentWillLoad();
    expect((component as any).inputId).toBeTruthy();
  });

  it('renders type=password by default', () => {
    component.label = 'Password';
    (component as any).componentWillLoad();
    vi.mocked(h).mockClear();
    component.render();
    const inputCall = vi.mocked(h).mock.calls.find((c) => c[0] === 'input');
    const props = (inputCall?.[1] ?? {}) as Record<string, unknown>;
    expect(props['type']).toBe('password');
  });

  it('renders type=text when showPassword is true', () => {
    component.label = 'Password';
    (component as any).showPassword = true;
    (component as any).componentWillLoad();
    vi.mocked(h).mockClear();
    component.render();
    const inputCall = vi.mocked(h).mock.calls.find((c) => c[0] === 'input');
    const props = (inputCall?.[1] ?? {}) as Record<string, unknown>;
    expect(props['type']).toBe('text');
  });

  it('passes disabled to native input', () => {
    component.label = 'Password';
    component.disabled = true;
    (component as any).componentWillLoad();
    vi.mocked(h).mockClear();
    component.render();
    const inputCall = vi.mocked(h).mock.calls.find((c) => c[0] === 'input');
    const props = (inputCall?.[1] ?? {}) as Record<string, unknown>;
    expect(props['disabled']).toBe(true);
  });

  it('sets aria-invalid when state is error', () => {
    component.label = 'Password';
    component.state = 'error';
    component.message = 'Required';
    (component as any).componentWillLoad();
    vi.mocked(h).mockClear();
    component.render();
    const inputCall = vi.mocked(h).mock.calls.find((c) => c[0] === 'input');
    const props = (inputCall?.[1] ?? {}) as Record<string, unknown>;
    expect(props['aria-invalid']).toBe('true');
  });

  it('applies size class to input field', () => {
    component.label = 'Password';
    component.size = 'lg';
    (component as any).componentWillLoad();
    vi.mocked(h).mockClear();
    component.render();
    const inputCall = vi.mocked(h).mock.calls.find((c) => c[0] === 'input');
    const props = (inputCall?.[1] ?? {}) as Record<string, unknown>;
    expect((props['class'] as string)).toContain('input-field--lg');
  });

  it('toggle function flips showPassword', () => {
    expect((component as any).showPassword).toBe(false);
    (component as any).toggleVisibility();
    expect((component as any).showPassword).toBe(true);
    (component as any).toggleVisibility();
    expect((component as any).showPassword).toBe(false);
  });
});

describe('io-input-password — toggle prop (#851)', () => {
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

  it('toggle defaults to true', () => {
    expect(component.toggle).toBe(true);
  });

  it('renders toggle button when toggle=true', () => {
    component.toggle = true;
    vi.mocked(h).mockClear();
    component.render();
    const toggleCall = vi.mocked(h).mock.calls.find(
      ([tag, attrs]) => tag === 'button' && (attrs as any)?.class === 'password-toggle',
    );
    expect(toggleCall).toBeDefined();
  });

  it('does not render toggle button when toggle=false', () => {
    component.toggle = false;
    vi.mocked(h).mockClear();
    component.render();
    const toggleCall = vi.mocked(h).mock.calls.find(
      ([tag, attrs]) => tag === 'button' && (attrs as any)?.class === 'password-toggle',
    );
    expect(toggleCall).toBeUndefined();
  });
});
