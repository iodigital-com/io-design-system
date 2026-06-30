import { describe, it, expect, beforeEach, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoInput } from './io-input';

describe('io-input — readonly + prefix/suffix slots', () => {
  let component: IoInput;

  beforeEach(() => {
    component = new IoInput();
    (component as any).el = document.createElement('io-input');
    (component as any).componentWillLoad();
  });

  // ── readonly prop ───────────────────────────────────────────────

  it('defaults readonly to false', () => {
    expect(component.readOnly).toBe(false);
  });

  it('passes readOnly to the native input element', () => {
    component.readOnly = true;
    vi.mocked(h).mockClear();
    component.render();

    const inputCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'input');
    const props = (inputCall?.[1] ?? {}) as Record<string, unknown>;
    expect(props['readOnly']).toBe(true);
  });

  it('sets aria-readonly="true" when readonly', () => {
    component.readOnly = true;
    vi.mocked(h).mockClear();
    component.render();

    const inputCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'input');
    const props = (inputCall?.[1] ?? {}) as Record<string, unknown>;
    expect(props['aria-readonly']).toBe('true');
  });

  it('does not set aria-readonly when not readonly', () => {
    component.readOnly = false;
    vi.mocked(h).mockClear();
    component.render();

    const inputCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'input');
    const props = (inputCall?.[1] ?? {}) as Record<string, unknown>;
    expect(props['aria-readonly']).toBeUndefined();
  });

  it('adds input-wrapper--readonly class when readonly', () => {
    component.readOnly = true;
    vi.mocked(h).mockClear();
    component.render();

    const wrapperCall = vi.mocked(h).mock.calls.find(
      (call) => typeof call[1]?.class === 'string' && (call[1].class as string).includes('input-wrapper'),
    );
    expect((wrapperCall?.[1]?.class as string)).toContain('input-wrapper--readonly');
  });

  it('readonly field does not prevent handleInput from being wired', () => {
    // readonly prop is passed to the input — browser prevents typing natively.
    // The component does NOT intercept events for readonly (browser handles it).
    component.readOnly = true;
    vi.mocked(h).mockClear();
    component.render();

    const inputCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'input');
    const props = (inputCall?.[1] ?? {}) as Record<string, unknown>;
    // Event handlers should still be present so the component API stays intact
    expect(typeof props['onInput']).toBe('function');
  });

  // ── prefix / suffix slots ──────────────────────────────────────

  it('defaults hasPrefix and hasSuffix to false', () => {
    expect((component as any).hasPrefix).toBe(false);
    expect((component as any).hasSuffix).toBe(false);
  });

  it('sets hasPrefix=true when prefix slotchange fires with nodes', () => {
    const slotEl = document.createElement('slot');
    slotEl.name = 'prefix';
    const mockNode = document.createElement('span');
    vi.spyOn(slotEl, 'assignedNodes').mockReturnValue([mockNode]);

    component.handleSlotChange({ target: slotEl } as unknown as Event);
    expect((component as any).hasPrefix).toBe(true);
  });

  it('sets hasSuffix=true when suffix slotchange fires with nodes', () => {
    const slotEl = document.createElement('slot');
    slotEl.name = 'suffix';
    const mockNode = document.createElement('span');
    vi.spyOn(slotEl, 'assignedNodes').mockReturnValue([mockNode]);

    component.handleSlotChange({ target: slotEl } as unknown as Event);
    expect((component as any).hasSuffix).toBe(true);
  });

  it('clears hasPrefix when prefix slot is emptied', () => {
    (component as any).hasPrefix = true;
    const slotEl = document.createElement('slot');
    slotEl.name = 'prefix';
    vi.spyOn(slotEl, 'assignedNodes').mockReturnValue([]);

    component.handleSlotChange({ target: slotEl } as unknown as Event);
    expect((component as any).hasPrefix).toBe(false);
  });

  it('adds input-field--has-prefix class when hasPrefix is true', () => {
    (component as any).hasPrefix = true;
    vi.mocked(h).mockClear();
    component.render();

    const inputCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'input');
    const props = (inputCall?.[1] ?? {}) as Record<string, unknown>;
    expect((props['class'] as string)).toContain('input-field--has-prefix');
  });

  it('adds input-field--has-suffix class when hasSuffix is true', () => {
    (component as any).hasSuffix = true;
    vi.mocked(h).mockClear();
    component.render();

    const inputCall = vi.mocked(h).mock.calls.find((call) => call[0] === 'input');
    const props = (inputCall?.[1] ?? {}) as Record<string, unknown>;
    expect((props['class'] as string)).toContain('input-field--has-suffix');
  });
});
