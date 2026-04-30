import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoModal } from './io-modal';
import { getModalStyles } from './io-modal-styles';

describe('io-modal — default props', () => {
  let component: IoModal;

  beforeEach(() => {
    component = new IoModal();
    (component as any).el = document.createElement('io-modal');
    (component as any).dismissEvent = { emit: vi.fn() };
    (component as any).componentWillLoad();
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
  it('enter animation uses --io-motion-overlay-enter semantic token', () => {
    const styles: string = getModalStyles();
    expect(styles).toContain('--io-motion-overlay-enter');
    expect(styles).toContain('--io-motion-overlay-easing');
  });

  it('prefers-reduced-motion guard disables all animations', () => {
    const styles: string = getModalStyles();
    expect(styles).toContain('@media (prefers-reduced-motion: reduce)');
    const rmIdx = styles.indexOf('@media (prefers-reduced-motion: reduce)');
    expect(styles.slice(rmIdx)).toContain('animation: none');
  });
});
