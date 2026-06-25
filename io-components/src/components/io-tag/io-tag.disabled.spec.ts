import { describe, it, expect, vi, beforeEach } from 'vitest';

import { h } from '@stencil/core';
import { IoTag } from './io-tag';

describe('io-tag — disabled', () => {
  let component: IoTag;

  beforeEach(() => {
    component = new IoTag();
    (component as any).el = document.createElement('io-tag');
    (component as any).toggle = { emit: vi.fn() };
    (component as any).remove = { emit: vi.fn() };
  });

  it('is not disabled by default', () => {
    expect(component.disabled).toBe(false);
  });

  it('reflects disabled prop when set to true', () => {
    component.disabled = true;
    expect(component.disabled).toBe(true);
  });

  it('does not toggle selected state when disabled', () => {
    component.disabled = true;
    component.selected = false;
    const ev = new MouseEvent('click');
    Object.defineProperty(ev, 'preventDefault', { value: vi.fn() });
    Object.defineProperty(ev, 'stopPropagation', { value: vi.fn() });
    (component as any).handleToggle(ev);
    expect(component.selected).toBe(false);
  });

  it('calls preventDefault and stopPropagation on toggle when disabled', () => {
    component.disabled = true;
    const preventDefaultMock = vi.fn();
    const stopPropagationMock = vi.fn();
    const ev = new MouseEvent('click');
    Object.defineProperty(ev, 'preventDefault', { value: preventDefaultMock });
    Object.defineProperty(ev, 'stopPropagation', { value: stopPropagationMock });
    (component as any).handleToggle(ev);
    expect(preventDefaultMock).toHaveBeenCalled();
    expect(stopPropagationMock).toHaveBeenCalled();
  });
});

describe('io-tag — aria-disabled pattern (#864)', () => {
  let component: IoTag;

  beforeEach(() => {
    component = new IoTag();
    (component as any).el = document.createElement('io-tag');
    (component as any).toggle = { emit: vi.fn() };
    (component as any).remove = { emit: vi.fn() };
  });

  it('non-removable: disabled button uses aria-disabled not disabled attribute', () => {
    component.disabled = true;
    vi.mocked(h).mockClear();
    component.render();
    const buttonCall = vi.mocked(h).mock.calls.find(([tag, attrs]) =>
      tag === 'button' && (attrs as any)?.['aria-pressed'] !== undefined && !(attrs as any)?.class?.includes('tag__remove'),
    );
    expect((buttonCall?.[1] as any)?.['aria-disabled']).toBe('true');
    expect((buttonCall?.[1] as any)?.disabled).toBeUndefined();
  });

  it('non-removable: enabled button has no aria-disabled', () => {
    component.disabled = false;
    vi.mocked(h).mockClear();
    component.render();
    const buttonCall = vi.mocked(h).mock.calls.find(([tag, attrs]) =>
      tag === 'button' && (attrs as any)?.['aria-pressed'] !== undefined,
    );
    expect((buttonCall?.[1] as any)?.['aria-disabled']).toBeUndefined();
    expect((buttonCall?.[1] as any)?.disabled).toBeUndefined();
  });

  it('removable: both buttons use aria-disabled when disabled', () => {
    component.disabled = true;
    component.removable = true;
    vi.mocked(h).mockClear();
    component.render();
    const buttonCalls = vi.mocked(h).mock.calls.filter(([tag]) => tag === 'button');
    expect(buttonCalls.length).toBeGreaterThanOrEqual(2);
    for (const call of buttonCalls) {
      expect((call[1] as any)?.['aria-disabled']).toBe('true');
      expect((call[1] as any)?.disabled).toBeUndefined();
    }
  });
});
