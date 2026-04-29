import { describe, it, expect, beforeEach } from 'vitest';

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

  it('keeps aria-describedby target stable for error state across rerenders', () => {
    component.error = true;
    component.errorMessage = 'Required field';
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
});
