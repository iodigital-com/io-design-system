import { describe, it, expect, beforeEach, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoCheckbox } from './io-checkbox';

describe('io-checkbox — named slots (label, description, message)', () => {
  let component: IoCheckbox;

  beforeEach(() => {
    component = new IoCheckbox();
    component.label = 'Accept terms';
    (component as any).el = document.createElement('io-checkbox');
    (component as any).change = { emit: vi.fn() };
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
      (call) => call[0] === 'span' && String((call[1] as Record<string, unknown>)?.class ?? '').includes('checkbox-label__slot--hidden'),
    );
    expect(spanCalls.length).toBeGreaterThan(0);
  });

  it('shows label slot container when hasLabelSlot is true', () => {
    (component as any).hasLabelSlot = true;
    vi.mocked(h).mockClear();
    component.render();

    const slotContainerCalls = vi.mocked(h).mock.calls.filter(
      (call) => call[0] === 'span' && (call[1] as Record<string, unknown>)?.class === 'checkbox-label__slot',
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
      (call) => call[0] === 'p' && String((call[1] as Record<string, unknown>)?.class ?? '').includes('checkbox-helper'),
    );
    expect(pCalls.length).toBeGreaterThan(0);
    const pProps = pCalls[0][1] as Record<string, unknown>;
    expect(String(pProps['class'] ?? '')).not.toContain('checkbox-helper--hidden');
  });

  it('hides description paragraph when neither slot nor helperText is present', () => {
    (component as any).hasDescriptionSlot = false;
    component.helperText = undefined;
    component.state = 'none';
    vi.mocked(h).mockClear();
    component.render();

    const pCalls = vi.mocked(h).mock.calls.filter(
      (call) => call[0] === 'p' && String((call[1] as Record<string, unknown>)?.class ?? '').includes('checkbox-helper--hidden'),
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

    const pCalls = vi.mocked(h).mock.calls.filter(
      (call) => call[0] === 'p' && String((call[1] as Record<string, unknown>)?.class ?? '').includes('checkbox-message'),
    );
    // Filter out the face-error paragraph
    const errorCalls = pCalls.filter(
      (call) => !(call[2] as string[])?.includes('Please check this box'),
    );
    expect(errorCalls.length).toBeGreaterThan(0);
    const pProps = errorCalls[0][1] as Record<string, unknown>;
    expect(String(pProps['class'] ?? '')).not.toContain('checkbox-message--hidden');
  });

  it('hides error paragraph when error is true but no slot or errorMessage', () => {
    component.state = 'error';
    (component as any).hasMessageSlot = false;
    component.message = '';
    vi.mocked(h).mockClear();
    component.render();

    const pCalls = vi.mocked(h).mock.calls.filter(
      (call) => call[0] === 'p' && String((call[1] as Record<string, unknown>)?.class ?? '').includes('checkbox-message--hidden'),
    );
    expect(pCalls.length).toBeGreaterThan(0);
  });

  // ── backward compatibility ────────────────────────────────────

  it('renders label prop text when no label slot content', () => {
    (component as any).hasLabelSlot = false;
    vi.mocked(h).mockClear();
    component.render();

    const spanCalls = vi.mocked(h).mock.calls.filter(
      (call) => call[0] === 'span' && (call[1] as Record<string, unknown>)?.class === 'checkbox-label__slot checkbox-label__slot--hidden',
    );
    expect(spanCalls.length).toBeGreaterThan(0);
  });

  it('renders helperText prop when no description slot and no error', () => {
    (component as any).hasDescriptionSlot = false;
    component.helperText = 'Check to agree';
    component.state = 'none';
    vi.mocked(h).mockClear();
    component.render();

    const pCalls = vi.mocked(h).mock.calls.filter(
      (call) => call[0] === 'p' && String((call[1] as Record<string, unknown>)?.class ?? '').includes('checkbox-helper'),
    );
    expect(pCalls.length).toBeGreaterThan(0);
    const pProps = pCalls[0][1] as Record<string, unknown>;
    expect(String(pProps['class'] ?? '')).not.toContain('--hidden');
  });

  it('renders errorMessage prop when no message slot and error is true', () => {
    component.state = 'error';
    (component as any).hasMessageSlot = false;
    component.message = 'Required';
    vi.mocked(h).mockClear();
    component.render();

    const pCalls = vi.mocked(h).mock.calls.filter(
      (call) => call[0] === 'p' && String((call[1] as Record<string, unknown>)?.class ?? '').includes('checkbox-message'),
    );
    expect(pCalls.length).toBeGreaterThan(0);
    // At least one should not be hidden
    const nonHiddenCalls = pCalls.filter(
      (call) => !String((call[1] as Record<string, unknown>)?.class ?? '').includes('--hidden'),
    );
    expect(nonHiddenCalls.length).toBeGreaterThan(0);
  });
});
