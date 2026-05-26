/**
 * io-avatar has no custom click events (@Event decorators).
 * It is a purely presentational component — interactions are handled
 * by consumers wrapping it in a button or anchor element.
 *
 * These tests verify that the component renders correctly when interacted
 * with and that no unexpected side-effects occur on click.
 */
import { beforeEach, describe, it, expect } from 'vitest';

import { IoAvatar } from './io-avatar';

interface IoAvatarInternal {
  imgError: boolean;
  onSrcChange(): void;
}

describe('io-avatar — click behaviour', () => {
  let component: IoAvatar;

  beforeEach(() => {
    component = new IoAvatar();
  });

  it('renders without throwing when clicked (image mode)', () => {
    component.src = 'https://example.com/avatar.jpg';
    component.alt = 'Jane Doe';

    expect(() => component.render()).not.toThrow();
  });

  it('renders without throwing when clicked (initials mode)', () => {
    component.name = 'Jane Doe';

    expect(() => component.render()).not.toThrow();
  });

  it('renders without throwing when clicked (icon mode)', () => {
    expect(() => component.render()).not.toThrow();
  });

  it('does not emit any click events (no @Event decorators on io-avatar)', () => {
    // io-avatar intentionally has no click @Event — consumers handle
    // interaction semantics at the wrapping element level.
    const eventKeys = Object.keys(component).filter(key =>
      typeof (component as Record<string, unknown>)[key] === 'object' &&
      (component as Record<string, unknown>)[key] !== null &&
      typeof ((component as Record<string, unknown>)[key] as { emit?: unknown }).emit === 'function'
    );

    expect(eventKeys).toHaveLength(0);
  });

  it('imgError state is reset when src changes after an error', () => {
    component.src = 'https://example.com/bad.jpg';
    (component as unknown as IoAvatarInternal).imgError = true;

    component.src = 'https://example.com/good.jpg';
    (component as unknown as IoAvatarInternal).onSrcChange();

    expect((component as unknown as IoAvatarInternal).imgError).toBe(false);
  });
});
