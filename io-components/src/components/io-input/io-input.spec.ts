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
    expect(ids.inputId).toBe('io-input-email');
    expect(ids.errorId).toBe('io-input-email-error');
  });

  it('updates ids when name changes after load', () => {
    (component as any).componentWillLoad();
    (component as any).nameChanged('username');

    const ids = (component as any).getInputIds();
    expect(ids.inputId).toBe('io-input-username');
    expect(ids.errorId).toBe('io-input-username-error');
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
});
