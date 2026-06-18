import { describe, it, expect, vi, beforeEach } from 'vitest';
import { h } from '@stencil/core';

import { IoInputDate } from './io-input-date';

describe('io-input-date — default props', () => {
  let component: IoInputDate;

  beforeEach(() => {
    component = new IoInputDate();
    (component as any).el = document.createElement('io-input-date');
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
  it('message defaults to empty string', () => { expect(component.message).toBe(''); });
  it('min defaults to undefined', () => { expect(component.min).toBeUndefined(); });
  it('max defaults to undefined', () => { expect(component.max).toBeUndefined(); });

  it('generates inputId in componentWillLoad', () => {
    component.label = 'Birth date';
    (component as any).componentWillLoad();
    expect((component as any).inputId).toBeTruthy();
  });

  it('renders type=date on native input', () => {
    component.label = 'Birth date';
    (component as any).componentWillLoad();
    vi.mocked(h).mockClear();
    component.render();
    const inputCall = vi.mocked(h).mock.calls.find((c) => c[0] === 'input');
    const props = (inputCall?.[1] ?? {}) as Record<string, unknown>;
    expect(props['type']).toBe('date');
  });

  it('passes min/max to native input', () => {
    component.label = 'Birth date';
    component.min = '2000-01-01';
    component.max = '2026-12-31';
    (component as any).componentWillLoad();
    vi.mocked(h).mockClear();
    component.render();
    const inputCall = vi.mocked(h).mock.calls.find((c) => c[0] === 'input');
    const props = (inputCall?.[1] ?? {}) as Record<string, unknown>;
    expect(props['min']).toBe('2000-01-01');
    expect(props['max']).toBe('2026-12-31');
  });

  it('passes disabled to native input', () => {
    component.label = 'Birth date';
    component.disabled = true;
    (component as any).componentWillLoad();
    vi.mocked(h).mockClear();
    component.render();
    const inputCall = vi.mocked(h).mock.calls.find((c) => c[0] === 'input');
    const props = (inputCall?.[1] ?? {}) as Record<string, unknown>;
    expect(props['disabled']).toBe(true);
  });

  it('sets aria-invalid when state is error', () => {
    component.label = 'Birth date';
    component.state = 'error';
    component.message = 'Invalid date';
    (component as any).componentWillLoad();
    vi.mocked(h).mockClear();
    component.render();
    const inputCall = vi.mocked(h).mock.calls.find((c) => c[0] === 'input');
    const props = (inputCall?.[1] ?? {}) as Record<string, unknown>;
    expect(props['aria-invalid']).toBe('true');
  });

  it('does not set aria-invalid when state is none', () => {
    component.label = 'Birth date';
    (component as any).componentWillLoad();
    vi.mocked(h).mockClear();
    component.render();
    const inputCall = vi.mocked(h).mock.calls.find((c) => c[0] === 'input');
    const props = (inputCall?.[1] ?? {}) as Record<string, unknown>;
    expect(props['aria-invalid']).toBeUndefined();
  });

  it('applies size class to input field', () => {
    component.label = 'Birth date';
    component.size = 'lg';
    (component as any).componentWillLoad();
    vi.mocked(h).mockClear();
    component.render();
    const inputCall = vi.mocked(h).mock.calls.find((c) => c[0] === 'input');
    const props = (inputCall?.[1] ?? {}) as Record<string, unknown>;
    expect((props['class'] as string)).toContain('input-field--lg');
  });
});
