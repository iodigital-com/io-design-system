import { h } from '@stencil/core';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { IoSegment } from './io-segment';

describe('io-segment — default props', () => {
  let component: IoSegment;

  beforeEach(() => {
    component = new IoSegment();
    (component as any).el = document.createElement('io-segment');
    (component as any).segmentSelect = { emit: vi.fn() };
  });

  it('is not disabled by default', () => {
    expect(component.disabled).toBe(false);
  });

  it('has undefined icon by default', () => {
    expect(component.icon).toBeUndefined();
  });

  it('selected state is false by default', () => {
    expect((component as any).selected).toBe(false);
  });
});

describe('io-segment — render()', () => {
  beforeEach(() => {
    vi.mocked(h).mockClear();
  });

  it('renders with role="radio" on Host', () => {
    const component = new IoSegment();
    const el = document.createElement('io-segment');
    (component as any).el = el;
    (component as any).segmentSelect = { emit: vi.fn() };
    component.value = 'list';
    component.label = 'List';

    component.render();

    // In the test mock, Host is resolved to undefined, so we check for
    // h() calls where the first arg is null/undefined (the Host sentinel)
    const hostCalls = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>]>)
      .filter(args => args[0] === 'Host' || args[0] == null);

    expect(hostCalls.length).toBeGreaterThanOrEqual(1);
    expect(hostCalls[0]?.[1]?.['role']).toBe('radio');
  });

  it('renders aria-checked="true" when selected', () => {
    const component = new IoSegment();
    const el = document.createElement('io-segment');
    (component as any).el = el;
    (component as any).segmentSelect = { emit: vi.fn() };
    (component as any).selected = true;
    component.value = 'grid';
    component.label = 'Grid';

    component.render();

    const hostCalls = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>]>)
      .filter(args => args[0] === 'Host' || args[0] == null);

    expect(hostCalls[0]?.[1]?.['aria-checked']).toBe('true');
  });

  it('renders aria-checked="false" when not selected', () => {
    const component = new IoSegment();
    const el = document.createElement('io-segment');
    (component as any).el = el;
    (component as any).segmentSelect = { emit: vi.fn() };
    (component as any).selected = false;
    component.value = 'grid';
    component.label = 'Grid';

    component.render();

    const hostCalls = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>]>)
      .filter(args => args[0] === 'Host' || args[0] == null);

    expect(hostCalls[0]?.[1]?.['aria-checked']).toBe('false');
  });

  it('sets aria-disabled on Host when disabled', () => {
    const component = new IoSegment();
    const el = document.createElement('io-segment');
    (component as any).el = el;
    (component as any).segmentSelect = { emit: vi.fn() };
    component.value = 'map';
    component.label = 'Map';
    component.disabled = true;

    component.render();

    const hostCalls = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>]>)
      .filter(args => args[0] === 'Host' || args[0] == null);

    expect(hostCalls[0]?.[1]?.['aria-disabled']).toBe('true');
  });
});

describe('io-segment — handleClick', () => {
  it('emits segmentSelect with value when clicked', () => {
    const component = new IoSegment();
    const el = document.createElement('io-segment');
    (component as any).el = el;
    const emitFn = vi.fn();
    (component as any).segmentSelect = { emit: emitFn };
    component.value = 'grid';
    component.label = 'Grid';
    component.disabled = false;

    (component as any).handleClick();

    expect(emitFn).toHaveBeenCalledWith({ value: 'grid' });
  });

  it('does not emit when disabled', () => {
    const component = new IoSegment();
    const el = document.createElement('io-segment');
    (component as any).el = el;
    const emitFn = vi.fn();
    (component as any).segmentSelect = { emit: emitFn };
    component.value = 'grid';
    component.label = 'Grid';
    component.disabled = true;

    (component as any).handleClick();

    expect(emitFn).not.toHaveBeenCalled();
  });
});

describe('io-segment — handleKeydown', () => {
  it('emits segmentSelect on Enter key', () => {
    const component = new IoSegment();
    const el = document.createElement('io-segment');
    (component as any).el = el;
    const emitFn = vi.fn();
    (component as any).segmentSelect = { emit: emitFn };
    component.value = 'map';
    component.label = 'Map';
    component.disabled = false;

    const ev = new KeyboardEvent('keydown', { key: 'Enter' });
    const preventDefault = vi.spyOn(ev, 'preventDefault');
    (component as any).handleKeydown(ev);

    expect(preventDefault).toHaveBeenCalled();
    expect(emitFn).toHaveBeenCalledWith({ value: 'map' });
  });

  it('emits segmentSelect on Space key', () => {
    const component = new IoSegment();
    const el = document.createElement('io-segment');
    (component as any).el = el;
    const emitFn = vi.fn();
    (component as any).segmentSelect = { emit: emitFn };
    component.value = 'map';
    component.label = 'Map';
    component.disabled = false;

    const ev = new KeyboardEvent('keydown', { key: ' ' });
    const preventDefault = vi.spyOn(ev, 'preventDefault');
    (component as any).handleKeydown(ev);

    expect(preventDefault).toHaveBeenCalled();
    expect(emitFn).toHaveBeenCalledWith({ value: 'map' });
  });

  it('does not emit on other keys', () => {
    const component = new IoSegment();
    const el = document.createElement('io-segment');
    (component as any).el = el;
    const emitFn = vi.fn();
    (component as any).segmentSelect = { emit: emitFn };
    component.value = 'map';
    component.label = 'Map';
    component.disabled = false;

    const ev = new KeyboardEvent('keydown', { key: 'Tab' });
    (component as any).handleKeydown(ev);

    expect(emitFn).not.toHaveBeenCalled();
  });

  it('does not emit when disabled', () => {
    const component = new IoSegment();
    const el = document.createElement('io-segment');
    (component as any).el = el;
    const emitFn = vi.fn();
    (component as any).segmentSelect = { emit: emitFn };
    component.value = 'map';
    component.label = 'Map';
    component.disabled = true;

    const ev = new KeyboardEvent('keydown', { key: 'Enter' });
    (component as any).handleKeydown(ev);

    expect(emitFn).not.toHaveBeenCalled();
  });
});
