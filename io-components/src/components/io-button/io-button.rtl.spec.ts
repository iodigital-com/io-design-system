import { describe, it, expect, beforeEach, vi } from 'vitest';
import { h } from '@stencil/core';

import { IoButton } from './io-button';
import { getButtonStyles } from './io-button-styles';

// ── Style string tests ────────────────────────────────────────────────────────

describe('io-button — RTL styles', () => {
  it('includes :host-context([dir="rtl"]) selector for forward arrow flip', () => {
    const styles = getButtonStyles();
    expect(styles).toContain(':host-context([dir="rtl"])');
  });

  it('applies scaleX(-1) to flip forward arrow in RTL', () => {
    const styles = getButtonStyles();
    expect(styles).toContain('transform: scaleX(-1)');
  });

  it('includes back arrow RTL rule with rotate(180deg) then scaleX(-1) — matching LTR axis order', () => {
    const styles = getButtonStyles();
    // Correct order: rotate first so scaleX and translateX operate on the post-rotation axis,
    // matching the LTR rule: rotate(180deg) translateX(...)
    expect(styles).toContain('rotate(180deg) scaleX(-1)');
  });

  it('includes RTL hover rule for forward arrow', () => {
    const styles = getButtonStyles();
    expect(styles).toContain(
      ':host-context([dir="rtl"]) .btn:hover:not(.btn--disabled):not(.btn--loading) .btn__arrow:not(.btn__arrow--back):not(.btn__arrow--down)',
    );
  });

  it('includes RTL hover rule for back arrow', () => {
    const styles = getButtonStyles();
    expect(styles).toContain(
      ':host-context([dir="rtl"]) .btn:hover:not(.btn--disabled):not(.btn--loading) .btn__arrow--back',
    );
  });

  it('includes RTL link underline anchor rule', () => {
    const styles = getButtonStyles();
    expect(styles).toContain(':host-context([dir="rtl"]) .btn--link::after');
  });

  it('sets right: 0 on the link underline in RTL', () => {
    const styles = getButtonStyles();
    const rtlSection = styles.split(':host-context([dir="rtl"]) .btn--link::after')[1];
    expect(rtlSection).toBeDefined();
    expect(rtlSection).toContain('right: 0');
  });
});

// ── Component render tests ────────────────────────────────────────────────────

describe('io-button — RTL render', () => {
  let component: IoButton;

  beforeEach(() => {
    component = new IoButton();
    (component as any).el = document.createElement('io-button');
    (component as any).click = { emit: vi.fn() };
  });

  it('renders without throwing when dir="rtl" is set on host', () => {
    (component as any).el.setAttribute('dir', 'rtl');
    expect(() => component.render()).not.toThrow();
  });

  it('renders forward arrow without throwing in RTL context', () => {
    component.arrow = 'forward';
    (component as any).el.setAttribute('dir', 'rtl');
    expect(() => component.render()).not.toThrow();
  });

  it('renders back arrow without throwing in RTL context', () => {
    component.arrow = 'back';
    (component as any).el.setAttribute('dir', 'rtl');
    expect(() => component.render()).not.toThrow();
  });

  it('renders down arrow without throwing in RTL context', () => {
    component.arrow = 'down';
    (component as any).el.setAttribute('dir', 'rtl');
    expect(() => component.render()).not.toThrow();
  });

  it('renders link variant without throwing in RTL context', () => {
    component.variant = 'link';
    (component as any).el.setAttribute('dir', 'rtl');
    expect(() => component.render()).not.toThrow();
  });

  it('includes RTL styles in the rendered style element', () => {
    vi.mocked(h).mockClear();
    component.render();

    const styleCalls = vi.mocked(h).mock.calls.filter((call) => call[0] === 'style');
    expect(styleCalls.length).toBeGreaterThan(0);

    const styleContent = styleCalls[0][2] as string;
    expect(typeof styleContent).toBe('string');
    expect(styleContent).toContain(':host-context([dir="rtl"])');
  });
});
