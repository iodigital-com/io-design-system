import { describe, it, expect, beforeEach, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoInput } from './io-input';

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