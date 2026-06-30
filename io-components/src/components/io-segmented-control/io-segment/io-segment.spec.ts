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

/**
 * #1084 — role="radio" and aria-checked now live on the inner <button>,
 * not on the Host element. The Host carries no ARIA role to prevent
 * double-announcement by screen readers (radio + button).
 */
describe('io-segment — render() ARIA (#1084)', () => {
  beforeEach(() => {
    vi.mocked(h).mockClear();
  });

  it('Host has no role attribute (prevents double-announcement)', () => {
    const component = new IoSegment();
    const el = document.createElement('io-segment');
    (component as any).el = el;
    (component as any).segmentSelect = { emit: vi.fn() };
    component.value = 'list';
    component.label = 'List';

    component.render();

    const hostCalls = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>]>)
      .filter(args => args[0] === 'Host' || args[0] == null);

    // Host must not carry role="radio" — role lives on the inner button
    expect(hostCalls[0]?.[1]?.['role']).toBeUndefined();
  });

  it('inner button has role="radio"', () => {
    const component = new IoSegment();
    const el = document.createElement('io-segment');
    (component as any).el = el;
    (component as any).segmentSelect = { emit: vi.fn() };
    component.value = 'list';
    component.label = 'List';

    component.render();

    const buttonCalls = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>]>)
      .filter(args => args[0] === 'button');

    expect(buttonCalls.length).toBeGreaterThanOrEqual(1);
    expect(buttonCalls[0]?.[1]?.['role']).toBe('radio');
  });

  it('inner button has aria-checked="true" when selected', () => {
    const component = new IoSegment();
    const el = document.createElement('io-segment');
    (component as any).el = el;
    (component as any).segmentSelect = { emit: vi.fn() };
    (component as any).selected = true;
    component.value = 'grid';
    component.label = 'Grid';

    vi.mocked(h).mockClear();
    component.render();

    const buttonCalls = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>]>)
      .filter(args => args[0] === 'button');

    expect(buttonCalls[0]?.[1]?.['aria-checked']).toBe('true');
  });

  it('inner button has aria-checked="false" when not selected', () => {
    const component = new IoSegment();
    const el = document.createElement('io-segment');
    (component as any).el = el;
    (component as any).segmentSelect = { emit: vi.fn() };
    (component as any).selected = false;
    component.value = 'grid';
    component.label = 'Grid';

    vi.mocked(h).mockClear();
    component.render();

    const buttonCalls = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>]>)
      .filter(args => args[0] === 'button');

    expect(buttonCalls[0]?.[1]?.['aria-checked']).toBe('false');
  });

  it('Host has no aria-disabled (disabled state handled by native button disabled attr)', () => {
    const component = new IoSegment();
    const el = document.createElement('io-segment');
    (component as any).el = el;
    (component as any).segmentSelect = { emit: vi.fn() };
    component.value = 'map';
    component.label = 'Map';
    component.disabled = true;

    vi.mocked(h).mockClear();
    component.render();

    const hostCalls = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>]>)
      .filter(args => args[0] === 'Host' || args[0] == null);

    // The Host no longer carries aria-disabled; the button's native `disabled`
    // attribute communicates the state to AT.
    expect(hostCalls[0]?.[1]?.['aria-disabled']).toBeUndefined();
  });

  it('inner button has disabled attribute when disabled', () => {
    const component = new IoSegment();
    const el = document.createElement('io-segment');
    (component as any).el = el;
    (component as any).segmentSelect = { emit: vi.fn() };
    component.value = 'map';
    component.label = 'Map';
    component.disabled = true;

    vi.mocked(h).mockClear();
    component.render();

    const buttonCalls = (vi.mocked(h).mock.calls as Array<[unknown, Record<string, unknown>]>)
      .filter(args => args[0] === 'button');

    expect(buttonCalls[0]?.[1]?.['disabled']).toBe(true);
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
