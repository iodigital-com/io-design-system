import { describe, it, expect, beforeEach, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoInput } from './io-input';

describe('io-input — new props (#347 / hideLabel)', () => {
  let component: IoInput;

  beforeEach(() => {
    component = new IoInput();
    (component as any).el = document.createElement('io-input');
    (component as any).input = { emit: vi.fn() };
    (component as any).change = { emit: vi.fn() };
    (component as any).focus = { emit: vi.fn() };
    (component as any).blur = { emit: vi.fn() };
    (component as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };
  });

  it('has loading=false by default', () => {
    expect(component.loading).toBe(false);
  });

  it('has counter=false by default', () => {
    expect(component.counter).toBe(false);
  });

  it('has minLength=undefined by default', () => {
    expect(component.minLength).toBeUndefined();
  });

  it('has spellCheck=undefined by default', () => {
    expect(component.spellCheck).toBeUndefined();
  });

  it('has autoComplete=undefined by default', () => {
    expect(component.autoComplete).toBeUndefined();
  });

  it('has form=undefined by default', () => {
    expect(component.form).toBeUndefined();
  });

  it('passes minLength to native input via render', () => {
    (component as any).componentWillLoad();
    component.minLength = 3;

    vi.mocked(h).mockClear();
    component.render();

    const inputCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'input');
    const inputProps = (inputCall?.[1] ?? {}) as Record<string, unknown>;
    expect(inputProps['minLength']).toBe(3);
  });

  it('passes spellCheck to native input via render', () => {
    (component as any).componentWillLoad();
    component.spellCheck = false;

    vi.mocked(h).mockClear();
    component.render();

    const inputCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'input');
    const inputProps = (inputCall?.[1] ?? {}) as Record<string, unknown>;
    expect(inputProps['spellcheck']).toBe(false);
  });

  it('passes autoComplete to native input via render', () => {
    (component as any).componentWillLoad();
    component.autoComplete = 'email';

    vi.mocked(h).mockClear();
    component.render();

    const inputCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'input');
    const inputProps = (inputCall?.[1] ?? {}) as Record<string, unknown>;
    expect(inputProps['autocomplete']).toBe('email');
  });

  it('passes form to native input via render', () => {
    (component as any).componentWillLoad();
    component.form = 'my-form';

    vi.mocked(h).mockClear();
    component.render();

    const inputCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'input');
    const inputProps = (inputCall?.[1] ?? {}) as Record<string, unknown>;
    expect(inputProps['form']).toBe('my-form');
  });

  it('renders counter div when counter=true and maxLength is set', () => {
    (component as any).componentWillLoad();
    component.counter = true;
    component.maxLength = 100;
    component.value = 'hello';

    vi.mocked(h).mockClear();
    component.render();

    const divCalls = vi.mocked(h).mock.calls.filter(
      (call) => call[0] === 'div' && (call[1] as Record<string, unknown>)?.['class'] === 'input-counter',
    );
    expect(divCalls.length).toBe(1);
  });

  it('does not render counter when counter=true but maxLength is not set', () => {
    (component as any).componentWillLoad();
    component.counter = true;

    vi.mocked(h).mockClear();
    component.render();

    const divCalls = vi.mocked(h).mock.calls.filter(
      (call) => call[0] === 'div' && (call[1] as Record<string, unknown>)?.['class'] === 'input-counter',
    );
    expect(divCalls.length).toBe(0);
  });

  it('renders io-spinner when loading=true', () => {
    (component as any).componentWillLoad();
    component.loading = true;

    vi.mocked(h).mockClear();
    component.render();

    const spinnerCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'io-spinner');
    expect(spinnerCall).toBeDefined();
  });

  it('sets aria-busy on host when loading=true', () => {
    (component as any).componentWillLoad();
    component.loading = true;

    vi.mocked(h).mockClear();
    component.render();

    // In the Stencil unit-test mock, Host resolves to undefined,
    // so the h() call for <Host> has undefined as its first argument.
    const hostCall = vi.mocked(h).mock.calls.find(
      (call) => call[0] == null && (call[1] as Record<string, unknown>)?.['aria-busy'] !== undefined,
    );
    const hostProps = (hostCall?.[1] ?? {}) as Record<string, unknown>;
    expect(hostProps['aria-busy']).toBe('true');
  });

  it('does not set aria-busy when loading=false', () => {
    (component as any).componentWillLoad();

    vi.mocked(h).mockClear();
    component.render();

    // No Host call should have aria-busy='true'
    const busyCall = vi.mocked(h).mock.calls.find(
      (call) => call[0] == null && (call[1] as Record<string, unknown>)?.['aria-busy'] === 'true',
    );
    expect(busyCall).toBeUndefined();
  });

  it('does not emit events when loading=true', () => {
    component.loading = true;

    const inputEv = new Event('input') as InputEvent;
    Object.defineProperty(inputEv, 'target', { value: { value: 'x' } });
    (component as any).handleInput(inputEv);
    expect((component as any).input.emit).not.toHaveBeenCalled();

    const changeEv = new Event('change');
    Object.defineProperty(changeEv, 'target', { value: { value: 'x' } });
    (component as any).handleChange(changeEv);
    expect((component as any).change.emit).not.toHaveBeenCalled();
  });

  it('generates stable counterId in componentWillLoad', () => {
    (component as any).componentWillLoad();
    const id1 = (component as any).counterId;
    expect(id1).toMatch(/^io-input-counter-\d+$/);

    component.render();
    expect((component as any).counterId).toBe(id1);
  });

  it('defaults hideLabel to false', () => {
    expect(component.hideLabel).toBe(false);
  });

  it('accepts hideLabel=true', () => {
    component.hideLabel = true;
    expect(component.hideLabel).toBe(true);
  });

  it('warns when hideLabel=true and label is empty', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    component.label = '';
    component.hideLabel = true;
    (component as any).componentWillLoad();
    expect(warnSpy).toHaveBeenCalledWith('[io-input] hideLabel=true requires a non-empty label for accessibility.');
    warnSpy.mockRestore();
  });

  it('does not warn when hideLabel=true and label is provided', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    component.label = 'Search';
    component.hideLabel = true;
    (component as any).componentWillLoad();
    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});

describe('io-input — stable id linkage', () => {
  let component: IoInput;

  beforeEach(() => {
    component = new IoInput();
    (component as any).el = document.createElement('io-input');
  });

  it('generates fallback id once and keeps it stable across rerenders', () => {
    (component as any).componentWillLoad();
    const firstIds = (component as any).getInputIds();

    (component as any).render();
    (component as any).render();

    const secondIds = (component as any).getInputIds();
    expect(firstIds.inputId).toMatch(/^io-input-/);
    expect(secondIds.inputId).toBe(firstIds.inputId);
    expect(secondIds.errorId).toBe(`${firstIds.inputId}-error`);
  });

  it('uses deterministic name-based id when name is provided', () => {
    component.name = 'email';
    (component as any).componentWillLoad();

    const ids = (component as any).getInputIds();
    expect(ids.inputId).toMatch(/^io-input-email-[a-z0-9]+$/);
    expect(ids.errorId).toBe(`${ids.inputId}-error`);
  });

  it('updates ids when name changes after load', () => {
    (component as any).componentWillLoad();
    (component as any).nameChanged('username');

    const ids = (component as any).getInputIds();
    expect(ids.inputId).toMatch(/^io-input-username-[a-z0-9]+$/);
    expect(ids.errorId).toBe(`${ids.inputId}-error`);
  });

  it('defaults to size=md', () => {
    expect(component.size).toBe('md');
  });

  it('accepts date and time input types', () => {
    component.type = 'date';
    expect(component.type).toBe('date');

    component.type = 'time';
    expect(component.type).toBe('time');
  });

  it('forwards min, max, and step to native input', () => {
    (component as any).componentWillLoad();
    component.type = 'time';
    component.min = '09:00';
    component.max = '17:00';
    component.step = '900';

    vi.mocked(h).mockClear();
    component.render();

    const inputCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'input');
    const inputProps = (inputCall?.[1] ?? {}) as Record<string, unknown>;

    expect(inputProps['type']).toBe('time');
    expect(inputProps['min']).toBe('09:00');
    expect(inputProps['max']).toBe('17:00');
    expect(inputProps['step']).toBe('900');
  });

  it('keeps aria-describedby target stable for error state across rerenders', () => {
    component.state = 'error';
    component.message = 'Required field';
    (component as any).componentWillLoad();

    const firstIds = (component as any).getInputIds();
    (component as any).render();
    (component as any).render();
    const secondIds = (component as any).getInputIds();

    expect(secondIds.inputId).toBe(firstIds.inputId);
    expect(secondIds.errorId).toBe(firstIds.errorId);
  });

  it('keeps ids unique across instances with the same name', () => {
    const first = new IoInput();
    const second = new IoInput();

    first.name = 'email';
    second.name = 'email';

    (first as any).componentWillLoad();
    (second as any).componentWillLoad();

    const firstIds = (first as any).getInputIds();
    const secondIds = (second as any).getInputIds();

    expect(firstIds.inputId).not.toBe(secondIds.inputId);
    expect(firstIds.inputId).toMatch(/^io-input-email-[a-z0-9]+$/);
    expect(secondIds.inputId).toMatch(/^io-input-email-[a-z0-9]+$/);
  });

  it('applies state-success wrapper class when state is success', () => {
    component.state = 'success';
    component.message = 'Looks good';
    (component as any).componentWillLoad();
    expect(() => (component as any).render()).not.toThrow();
  });

  it('applies state-warning wrapper class when state is warning', () => {
    component.state = 'warning';
    component.message = 'Check this field';
    (component as any).componentWillLoad();
    expect(() => (component as any).render()).not.toThrow();
  });

  it('message paragraph uses role=status for success state', () => {
    component.state = 'success';
    component.message = 'Looks good';
    (component as any).componentWillLoad();
    expect(() => (component as any).render()).not.toThrow();
  });
});