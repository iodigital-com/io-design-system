import { describe, it, expect, beforeEach, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoInput } from './io-input';
import { getInputStyles } from './io-input-styles';

// ── Style string tests ────────────────────────────────────────────────────────

describe('io-input — RTL styles', () => {
  it('includes :host-context([dir="rtl"]) selector', () => {
    const styles = getInputStyles();
    expect(styles).toContain(':host-context([dir="rtl"])');
  });

  it('mirrors the label anchor to right: 0 in RTL', () => {
    const styles = getInputStyles();
    const labelRule = styles.split(':host-context([dir="rtl"]) .input-label')[1];
    expect(labelRule).toBeDefined();
    expect(labelRule).toContain('right: 0');
    expect(labelRule).toContain('left: auto');
  });

  it('swaps prefix padding to right side in RTL', () => {
    const styles = getInputStyles();
    const prefixRule = styles.split(':host-context([dir="rtl"]) .input-field--has-prefix')[1];
    expect(prefixRule).toBeDefined();
    expect(prefixRule).toContain('padding-right: var(--io-space-2)');
    expect(prefixRule).toContain('padding-left: 0');
  });

  it('swaps suffix padding to left side in RTL', () => {
    const styles = getInputStyles();
    const suffixRule = styles.split(':host-context([dir="rtl"]) .input-field--has-suffix')[1];
    expect(suffixRule).toBeDefined();
    expect(suffixRule).toContain('padding-left: var(--io-space-2)');
    expect(suffixRule).toContain('padding-right: 0');
  });

  it('mirrors error icon to left: 0 in RTL', () => {
    const styles = getInputStyles();
    const errorIconRule = styles.split(':host-context([dir="rtl"]) .input-error-icon')[1];
    expect(errorIconRule).toBeDefined();
    expect(errorIconRule).toContain('left: 0');
    expect(errorIconRule).toContain('right: auto');
  });

  it('sets direction: rtl on the input-field-row in RTL context', () => {
    const styles = getInputStyles();
    expect(styles).toContain(':host-context([dir="rtl"]) .input-field-row');
    const rowRule = styles.split(':host-context([dir="rtl"]) .input-field-row')[1];
    expect(rowRule).toContain('direction: rtl');
  });
});

// ── Component render tests ────────────────────────────────────────────────────

function makeInternals() {
  return {
    setFormValue: vi.fn(),
    setValidity: vi.fn(),
    checkValidity: vi.fn().mockReturnValue(true),
    reportValidity: vi.fn().mockReturnValue(true),
  };
}

function makeInput() {
  const c = new IoInput();
  c.label = 'Name';
  (c as any).el = document.createElement('io-input');
  (c as any).internals = makeInternals();
  (c as any).input = { emit: vi.fn() };
  (c as any).change = { emit: vi.fn() };
  (c as any).focus = { emit: vi.fn() };
  (c as any).blur = { emit: vi.fn() };
  (c as any).componentWillLoad();
  return c;
}

describe('io-input — RTL render', () => {
  let c: IoInput;

  beforeEach(() => {
    c = makeInput();
  });

  it('renders without throwing in RTL context', () => {
    (c as any).el.setAttribute('dir', 'rtl');
    expect(() => c.render()).not.toThrow();
  });

  it('renders with prefix slot without throwing in RTL context', () => {
    (c as any).hasPrefix = true;
    (c as any).el.setAttribute('dir', 'rtl');
    expect(() => c.render()).not.toThrow();
  });

  it('renders with suffix slot without throwing in RTL context', () => {
    (c as any).hasSuffix = true;
    (c as any).el.setAttribute('dir', 'rtl');
    expect(() => c.render()).not.toThrow();
  });

  it('renders error state without throwing in RTL context', () => {
    c.errorMessage = 'Field required';
    (c as any).showError = true;
    (c as any).el.setAttribute('dir', 'rtl');
    expect(() => c.render()).not.toThrow();
  });

  it('includes RTL styles in the rendered style element', () => {
    vi.mocked(h).mockClear();
    c.render();

    const styleCalls = vi.mocked(h).mock.calls.filter((call) => call[0] === 'style');
    expect(styleCalls.length).toBeGreaterThan(0);

    const styleContent = styleCalls[0][2] as string;
    expect(typeof styleContent).toBe('string');
    expect(styleContent).toContain(':host-context([dir="rtl"])');
  });
});
