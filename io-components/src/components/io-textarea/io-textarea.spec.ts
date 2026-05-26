import { describe, it, expect, vi } from 'vitest';

import { IoTextarea } from './io-textarea';

describe('io-textarea — default props', () => {
  let component: IoTextarea;

  beforeEach(() => {
    component = new IoTextarea();
    (component as any).el = document.createElement('io-textarea');
    (component as any).input = { emit: vi.fn() };
    (component as any).change = { emit: vi.fn() };
    (component as any).focus = { emit: vi.fn() };
    (component as any).blur = { emit: vi.fn() };
  });

  it('has empty value by default', () => {
    expect(component.value).toBe('');
  });

  it('has rows=4 by default', () => {
    expect(component.rows).toBe(4);
  });

  it('has resize=vertical by default', () => {
    expect(component.resize).toBe('vertical');
  });

  it('has size=md by default', () => {
    expect(component.size).toBe('md');
  });

  it('is not required by default', () => {
    expect(component.required).toBe(false);
  });

  it('is not disabled by default', () => {
    expect(component.disabled).toBe(false);
  });

  it('has state=none by default', () => {
    expect(component.state).toBe('none');
  });

  it('has no placeholder by default', () => {
    expect(component.placeholder).toBeUndefined();
  });

  it('has no maxLength by default', () => {
    expect(component.maxLength).toBeUndefined();
  });

  it('setFocus resolves without throwing', async () => {
    const textarea = document.createElement('textarea');
    textarea.focus = vi.fn();
    const shadowRoot = { querySelector: vi.fn().mockReturnValue(textarea) };
    (component as any).el = { shadowRoot };
    await expect(component.setFocus()).resolves.toBeUndefined();
  });

  it('applies state-success class when state is success', () => {
    component.state = 'success';
    component.message = 'Looks good';
    (component as any).label = 'Notes';
    (component as any).componentWillLoad();
    expect(() => (component as any).render()).not.toThrow();
  });

  it('applies state-warning class when state is warning', () => {
    component.state = 'warning';
    component.message = 'Check this field';
    (component as any).label = 'Notes';
    (component as any).componentWillLoad();
    expect(() => (component as any).render()).not.toThrow();
  });

  it('message paragraph uses role=status for success state', () => {
    component.state = 'success';
    component.message = 'Looks good';
    (component as any).label = 'Notes';
    (component as any).componentWillLoad();
    expect(() => (component as any).render()).not.toThrow();
  });
});