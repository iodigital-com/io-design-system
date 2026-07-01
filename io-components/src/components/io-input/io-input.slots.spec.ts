import { describe, it, expect, beforeEach, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoInput } from './io-input';

describe('io-input — named slots (label, description, message)', () => {
  let component: IoInput;

  beforeEach(() => {
    component = new IoInput();
    component.label = 'Email address';
    (component as any).el = document.createElement('io-input');
    (component as any).change = { emit: vi.fn() };
    (component as any).input = { emit: vi.fn() };
    (component as any).focus = { emit: vi.fn() };
    (component as any).blur = { emit: vi.fn() };
    (component as any).internals = {
      setFormValue: vi.fn(),
      setValidity: vi.fn(),
      checkValidity: vi.fn(() => true),
      reportValidity: vi.fn(() => true),
    };
    (component as any).componentWillLoad();
  });

  // ── label slot ───────────────────────────────────────────────

  it('defaults hasLabelSlot to false', () => {
    expect((component as any).hasLabelSlot).toBe(false);
  });

  it('sets hasLabelSlot=true when label slot fires with elements', () => {
    const slotEl = document.createElement('slot');
    const mockEl = document.createElement('span');
    vi.spyOn(slotEl, 'assignedElements').mockReturnValue([mockEl]);

    (component as any).handleLabelSlotChange({ target: slotEl } as unknown as Event);
    expect((component as any).hasLabelSlot).toBe(true);
  });

  it('clears hasLabelSlot when label slot is emptied', () => {
    (component as any).hasLabelSlot = true;
    const slotEl = document.createElement('slot');
    vi.spyOn(slotEl, 'assignedElements').mockReturnValue([]);

    (component as any).handleLabelSlotChange({ target: slotEl } as unknown as Event);
    expect((component as any).hasLabelSlot).toBe(false);
  });

  it('hides label slot container when hasLabelSlot is false', () => {
    (component as any).hasLabelSlot = false;
    vi.mocked(h).mockClear();
    component.render();

    const spanCalls = vi.mocked(h).mock.calls.filter(
      (call) => call[0] === 'span' && String((call[1] as Record<string, unknown>)?.class ?? '').includes('input-label__slot--hidden'),
    );
    expect(spanCalls.length).toBeGreaterThan(0);
  });

  it('shows label slot container when hasLabelSlot is true', () => {
    (component as any).hasLabelSlot = true;
    vi.mocked(h).mockClear();
    component.render();

    const slotContainerCalls = vi.mocked(h).mock.calls.filter(
      (call) => call[0] === 'span' && (call[1] as Record<string, unknown>)?.class === 'input-label__slot',
    );
    expect(slotContainerCalls.length).toBeGreaterThan(0);
  });

  // ── description slot ─────────────────────────────────────────

  it('defaults hasDescriptionSlot to false', () => {
    expect((component as any).hasDescriptionSlot).toBe(false);
  });

  it('sets hasDescriptionSlot=true when description slot fires with elements', () => {
    const slotEl = document.createElement('slot');
    const mockEl = document.createElement('span');
    vi.spyOn(slotEl, 'assignedElements').mockReturnValue([mockEl]);

    (component as any).handleDescriptionSlotChange({ target: slotEl } as unknown as Event);
    expect((component as any).hasDescriptionSlot).toBe(true);
  });

  it('renders description paragraph when description slot is occupied', () => {
    (component as any).hasDescriptionSlot = true;
    component.helperText = undefined;
    component.state = 'none';
    vi.mocked(h).mockClear();
    component.render();

    const pCalls = vi.mocked(h).mock.calls.filter(
      (call) => call[0] === 'p' && String((call[1] as Record<string, unknown>)?.class ?? '').includes('input-helper'),
    );
    expect(pCalls.length).toBeGreaterThan(0);
    const pProps = pCalls[0][1] as Record<string, unknown>;
    expect(String(pProps['class'] ?? '')).not.toContain('input-helper--hidden');
  });

  it('hides description paragraph when neither slot nor helperText is present', () => {
    (component as any).hasDescriptionSlot = false;
    component.helperText = undefined;
    component.state = 'none';
    vi.mocked(h).mockClear();
    component.render();

    const pCalls = vi.mocked(h).mock.calls.filter(
      (call) => call[0] === 'p' && String((call[1] as Record<string, unknown>)?.class ?? '').includes('input-helper--hidden'),
    );
    expect(pCalls.length).toBeGreaterThan(0);
  });

  // ── message slot ─────────────────────────────────────────────

  it('defaults hasMessageSlot to false', () => {
    expect((component as any).hasMessageSlot).toBe(false);
  });

  it('sets hasMessageSlot=true when message slot fires with elements', () => {
    const slotEl = document.createElement('slot');
    const mockEl = document.createElement('span');
    vi.spyOn(slotEl, 'assignedElements').mockReturnValue([mockEl]);

    (component as any).handleMessageSlotChange({ target: slotEl } as unknown as Event);
    expect((component as any).hasMessageSlot).toBe(true);
  });

  it('renders message paragraph when message slot is occupied and error is true', () => {
    component.state = 'error';
    (component as any).hasMessageSlot = true;
    component.message = '';
    vi.mocked(h).mockClear();
    component.render();

    const msgCall = vi.mocked(h).mock.calls.find(
      (call) => call[0] === 'p' && typeof call[1]?.class === 'string' && (call[1].class as string).includes('input-message--error'),
    );
    expect(msgCall).toBeDefined();
    expect(String(msgCall![1]?.class ?? '')).not.toContain('input-error--hidden');
  });

  it('hides message paragraph when error is true but no slot or errorMessage', () => {
    component.state = 'error';
    (component as any).hasMessageSlot = false;
    component.message = '';
    vi.mocked(h).mockClear();
    component.render();

    const msgCall = vi.mocked(h).mock.calls.find(
      (call) => call[0] === 'p' && typeof call[1]?.class === 'string' && (call[1].class as string).includes('input-message--error'),
    );
    expect(msgCall).toBeDefined();
    expect(String(msgCall![1]?.class ?? '')).toContain('input-error--hidden');
  });

  // ── backward compatibility ────────────────────────────────────

  it('renders label prop text when no label slot content', () => {
    (component as any).hasLabelSlot = false;
    vi.mocked(h).mockClear();
    component.render();

    const spanCalls = vi.mocked(h).mock.calls.filter(
      (call) => call[0] === 'span' && String((call[1] as Record<string, unknown>)?.class ?? '').includes('input-label__slot--hidden'),
    );
    expect(spanCalls.length).toBeGreaterThan(0);
  });

  it('renders helperText prop when no description slot and no error', () => {
    (component as any).hasDescriptionSlot = false;
    component.helperText = 'Enter a valid email';
    component.state = 'none';
    vi.mocked(h).mockClear();
    component.render();

    const pCalls = vi.mocked(h).mock.calls.filter(
      (call) => call[0] === 'p' && String((call[1] as Record<string, unknown>)?.class ?? '').includes('input-helper'),
    );
    expect(pCalls.length).toBeGreaterThan(0);
    const pProps = pCalls[0][1] as Record<string, unknown>;
    expect(String(pProps['class'] ?? '')).not.toContain('--hidden');
  });

  it('renders message paragraph with visible=true when no slot but message prop and error is true', () => {
    component.state = 'error';
    (component as any).hasMessageSlot = false;
    component.message = 'Enter a valid email address';
    vi.mocked(h).mockClear();
    component.render();

    const msgCall = vi.mocked(h).mock.calls.find(
      (call) => call[0] === 'p' && typeof call[1]?.class === 'string' && (call[1].class as string).includes('input-message--error'),
    );
    expect(msgCall).toBeDefined();
    expect(String(msgCall![1]?.class ?? '')).not.toContain('input-error--hidden');
  });
});
