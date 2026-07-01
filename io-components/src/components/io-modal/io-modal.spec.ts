import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { IoModal } from './io-modal';
import { getModalStyles } from './io-modal-styles';
import type { IoModalBackdrop, IoModalBackground } from './types';

describe('io-modal — default props', () => {
  let component: IoModal;

  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    component = new IoModal();
    (component as any).el = document.createElement('io-modal');
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).motionVisibleEndEvent = { emit: vi.fn() };
    (component as any).motionHiddenEndEvent = { emit: vi.fn() };
    (component as any).componentWillLoad();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('is not open by default', () => {
    expect(component.open).toBe(false);
  });

  it('defaults to md size', () => {
    expect(component.size).toBe('md');
  });

  it('closes on backdrop by default', () => {
    expect(component.closeOnBackdrop).toBe(true);
  });

  it('has no heading by default', () => {
    expect(component.heading).toBeUndefined();
  });

  it('has no description by default', () => {
    expect(component.description).toBeUndefined();
  });

  it('generates a stable headingId in componentWillLoad', () => {
    const id = (component as any).headingId as string;
    expect(id).toMatch(/^io-modal-heading-/);
  });
});

describe('io-modal — overlay transition contract', () => {
  it('enter transition uses --io-duration-overlay-enter and --io-ease-overlay-enter tokens', () => {
    const styles: string = getModalStyles();
    expect(styles).toContain('--io-duration-overlay-enter');
    expect(styles).toContain('--io-ease-overlay-enter');
  });

  it('exit transition uses --io-duration-overlay-exit and --io-ease-overlay-exit tokens', () => {
    const styles: string = getModalStyles();
    expect(styles).toContain('--io-duration-overlay-exit');
    expect(styles).toContain('--io-ease-overlay-exit');
  });

  it('prefers-reduced-motion guard collapses all transitions to 0ms', () => {
    const styles: string = getModalStyles();
    expect(styles).toContain('@media (prefers-reduced-motion: reduce)');
    const rmIdx = styles.indexOf('@media (prefers-reduced-motion: reduce)');
    expect(styles.slice(rmIdx)).toContain('transition-duration: 0ms');
  });
});

describe('io-modal — background prop', () => {
  let component: IoModal;

  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    component = new IoModal();
    (component as any).el = document.createElement('io-modal');
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).motionVisibleEndEvent = { emit: vi.fn() };
    (component as any).motionHiddenEndEvent = { emit: vi.fn() };
    (component as any).componentWillLoad();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('defaults to canvas background', () => {
    expect(component.background).toBe('canvas');
  });

  it('accepts surface background', () => {
    component.background = 'surface' as IoModalBackground;
    expect(component.background).toBe('surface');
  });

  it('accepts elevated background', () => {
    component.background = 'elevated' as IoModalBackground;
    expect(component.background).toBe('elevated');
  });

  it('styles contain canvas background token', () => {
    const styles: string = getModalStyles();
    expect(styles).toContain('modal--bg-canvas');
    expect(styles).toContain('var(--io-bg-page)');
  });

  it('styles contain surface background token', () => {
    const styles: string = getModalStyles();
    expect(styles).toContain('modal--bg-surface');
    expect(styles).toContain('var(--io-bg-surface)');
  });

  it('styles contain elevated background token with shadow', () => {
    const styles: string = getModalStyles();
    expect(styles).toContain('modal--bg-elevated');
    expect(styles).toContain('var(--io-bg-raised)');
  });
});

describe('io-modal — backdrop prop (#983)', () => {
  let component: IoModal;

  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    component = new IoModal();
    (component as any).el = document.createElement('io-modal');
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).motionVisibleEndEvent = { emit: vi.fn() };
    (component as any).motionHiddenEndEvent = { emit: vi.fn() };
    (component as any).componentWillLoad();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('defaults to blur', () => {
    expect(component.backdrop).toBe('blur');
  });

  it('accepts shading variant', () => {
    component.backdrop = 'shading' as IoModalBackdrop;
    expect(component.backdrop).toBe('shading');
  });

  it('styles contain shading selector that removes backdrop-filter', () => {
    const styles: string = getModalStyles();
    expect(styles).toContain('backdrop="shading"');
    const shadingIdx = styles.indexOf('backdrop="shading"');
    const shadingBlock = styles.slice(shadingIdx, shadingIdx + 100);
    expect(shadingBlock).toContain('backdrop-filter: none');
  });

  it('styles use --io-bg-overlay token for the native ::backdrop', () => {
    const styles: string = getModalStyles();
    expect(styles).toContain('var(--io-bg-overlay)');
  });
});

describe('io-modal — dismissButton prop', () => {
  let component: IoModal;
  let errorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    component = new IoModal();
    (component as any).el = document.createElement('io-modal');
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).motionVisibleEndEvent = { emit: vi.fn() };
    (component as any).motionHiddenEndEvent = { emit: vi.fn() };
  });

  afterEach(() => {
    errorSpy.mockRestore();
  });

  it('defaults to true', () => {
    component.heading = 'Test';
    (component as any).componentWillLoad();
    expect(component.dismissButton).toBe(true);
  });

  it('can be set to false', () => {
    component.heading = 'Test';
    component.dismissButton = false;
    (component as any).componentWillLoad();
    expect(component.dismissButton).toBe(false);
  });
});

describe('io-modal — WCAG 4.1.2 accessible name warning', () => {
  let errorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    errorSpy.mockRestore();
  });

  it('logs console.error when no heading, aria-label, or aria-labelledby is provided', () => {
    const component = new IoModal();
    (component as any).el = document.createElement('io-modal');
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).motionVisibleEndEvent = { emit: vi.fn() };
    (component as any).motionHiddenEndEvent = { emit: vi.fn() };
    (component as any).componentWillLoad();

    expect(errorSpy).toHaveBeenCalledWith(
      '[io-modal] No accessible name provided. Set heading, aria-label, or aria-labelledby prop for WCAG 4.1.2 compliance.',
    );
  });

  it('does not log console.error when heading is provided', () => {
    const component = new IoModal();
    (component as any).el = document.createElement('io-modal');
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).motionVisibleEndEvent = { emit: vi.fn() };
    (component as any).motionHiddenEndEvent = { emit: vi.fn() };
    component.heading = 'My Modal';
    (component as any).componentWillLoad();

    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('does not log console.error when aria-label prop is provided', () => {
    const component = new IoModal();
    (component as any).el = document.createElement('io-modal');
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).motionVisibleEndEvent = { emit: vi.fn() };
    (component as any).motionHiddenEndEvent = { emit: vi.fn() };
    component.aria = { 'aria-label': 'My modal dialog' };
    (component as any).componentWillLoad();

    expect(errorSpy).not.toHaveBeenCalled();
  });

  it('does not log console.error when aria-labelledby prop is provided', () => {
    const component = new IoModal();
    (component as any).el = document.createElement('io-modal');
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).motionVisibleEndEvent = { emit: vi.fn() };
    (component as any).motionHiddenEndEvent = { emit: vi.fn() };
    component.aria = { 'aria-labelledby': 'external-heading-id' };
    (component as any).componentWillLoad();

    expect(errorSpy).not.toHaveBeenCalled();
  });
});
