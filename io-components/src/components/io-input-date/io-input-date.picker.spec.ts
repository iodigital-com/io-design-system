/**
 * io-input-date — showPicker trigger button tests (#956)
 *
 * Covers: supported / unsupported environments, button render, ARIA label,
 * disabled state, and handlePickerTrigger logic.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { h } from '@stencil/core';

import { IoInputDate } from './io-input-date';

function makeComponent(): IoInputDate {
  const c = new IoInputDate();
  (c as any).el = document.createElement('io-input-date');
  (c as any).change = { emit: vi.fn() };
  (c as any).input = { emit: vi.fn() };
  (c as any).focus = { emit: vi.fn() };
  (c as any).blur = { emit: vi.fn() };
  (c as any).internals = { setFormValue: vi.fn(), setValidity: vi.fn() };
  c.label = 'Birth date';
  return c;
}

describe('io-input-date — showPicker trigger (#956)', () => {
  describe('when showPicker is supported', () => {
    beforeEach(() => {
      // Ensure support detection returns true
      Object.defineProperty(HTMLInputElement.prototype, 'showPicker', {
        configurable: true,
        value: vi.fn(),
      });
    });

    afterEach(() => {
      // Clean up
      const proto = HTMLInputElement.prototype as any;
      delete proto.showPicker;
    });

    it('renders a button.date-trigger instead of span.date-suffix', () => {
      const c = makeComponent();
      (c as any).componentWillLoad();
      vi.mocked(h).mockClear();
      c.render();
      const buttonCall = vi.mocked(h).mock.calls.find(([tag]) => tag === 'button');
      expect(buttonCall).toBeDefined();
      const props = (buttonCall?.[1] ?? {}) as Record<string, unknown>;
      expect((props['class'] as string)).toContain('date-trigger');
    });

    it('button has default aria-label "Open date picker"', () => {
      const c = makeComponent();
      (c as any).componentWillLoad();
      vi.mocked(h).mockClear();
      c.render();
      const buttonCall = vi.mocked(h).mock.calls.find(([tag]) => tag === 'button');
      const props = (buttonCall?.[1] ?? {}) as Record<string, unknown>;
      expect(props['aria-label']).toBe('Open date picker');
    });

    it('button uses custom pickerLabel when provided', () => {
      const c = makeComponent();
      c.pickerLabel = 'Kies een datum';
      (c as any).componentWillLoad();
      vi.mocked(h).mockClear();
      c.render();
      const buttonCall = vi.mocked(h).mock.calls.find(([tag]) => tag === 'button');
      const props = (buttonCall?.[1] ?? {}) as Record<string, unknown>;
      expect(props['aria-label']).toBe('Kies een datum');
    });

    it('button is disabled when component is disabled', () => {
      const c = makeComponent();
      c.disabled = true;
      (c as any).componentWillLoad();
      vi.mocked(h).mockClear();
      c.render();
      const buttonCall = vi.mocked(h).mock.calls.find(([tag]) => tag === 'button');
      const props = (buttonCall?.[1] ?? {}) as Record<string, unknown>;
      expect(props['disabled']).toBe(true);
    });

    it('button is disabled when loading', () => {
      const c = makeComponent();
      c.loading = true;
      (c as any).componentWillLoad();
      vi.mocked(h).mockClear();
      c.render();
      const buttonCall = vi.mocked(h).mock.calls.find(([tag]) => tag === 'button');
      const props = (buttonCall?.[1] ?? {}) as Record<string, unknown>;
      expect(props['disabled']).toBe(true);
    });

    it('button is disabled when readonly', () => {
      const c = makeComponent();
      c.readOnly = true;
      (c as any).componentWillLoad();
      vi.mocked(h).mockClear();
      c.render();
      const buttonCall = vi.mocked(h).mock.calls.find(([tag]) => tag === 'button');
      const props = (buttonCall?.[1] ?? {}) as Record<string, unknown>;
      expect(props['disabled']).toBe(true);
    });

    it('handlePickerTrigger calls showPicker on the native input', () => {
      const c = makeComponent();
      (c as any).componentWillLoad();
      const showPickerMock = vi.fn();
      (c as any).nativeInputEl = { showPicker: showPickerMock };
      (c as any).handlePickerTrigger();
      expect(showPickerMock).toHaveBeenCalledOnce();
    });

    it('handlePickerTrigger is a no-op when disabled', () => {
      const c = makeComponent();
      c.disabled = true;
      (c as any).componentWillLoad();
      const showPickerMock = vi.fn();
      (c as any).nativeInputEl = { showPicker: showPickerMock };
      (c as any).handlePickerTrigger();
      expect(showPickerMock).not.toHaveBeenCalled();
    });

    it('handlePickerTrigger is a no-op when loading', () => {
      const c = makeComponent();
      c.loading = true;
      (c as any).componentWillLoad();
      const showPickerMock = vi.fn();
      (c as any).nativeInputEl = { showPicker: showPickerMock };
      (c as any).handlePickerTrigger();
      expect(showPickerMock).not.toHaveBeenCalled();
    });

    it('handlePickerTrigger is a no-op when readonly', () => {
      const c = makeComponent();
      c.readOnly = true;
      (c as any).componentWillLoad();
      const showPickerMock = vi.fn();
      (c as any).nativeInputEl = { showPicker: showPickerMock };
      (c as any).handlePickerTrigger();
      expect(showPickerMock).not.toHaveBeenCalled();
    });
  });

  describe('when showPicker is NOT supported', () => {
    it('renders span.date-suffix decorative icon (no button)', () => {
      const c = makeComponent();
      // Ensure showPickerSupported is false
      (c as any).showPickerSupported = false;
      (c as any).componentWillLoad();
      // Override the state set by componentWillLoad to simulate absence
      (c as any).showPickerSupported = false;
      vi.mocked(h).mockClear();
      c.render();
      const spanCall = vi.mocked(h).mock.calls.find(
        ([tag, attrs]) => tag === 'span' && (attrs as Record<string, unknown>)?.['class'] === 'date-suffix',
      );
      expect(spanCall).toBeDefined();
      // No button with date-trigger class
      const buttonCall = vi.mocked(h).mock.calls.find(
        ([tag, attrs]) => tag === 'button' && ((attrs as Record<string, unknown>)?.['class'] as string)?.includes('date-trigger'),
      );
      expect(buttonCall).toBeUndefined();
    });
  });
});
