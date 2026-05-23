import { describe, it, expect } from 'vitest';

import { getInitials, getAvatarClass } from './io-avatar-utils';

describe('getInitials', () => {
  it('gets first and last initials from two-word name', () => {
    expect(getInitials('Jane Doe')).toBe('JD');
  });

  it('gets first two chars for a single name', () => {
    expect(getInitials('Jane')).toBe('JA');
  });

  it('uses first and last words for a three-word name', () => {
    expect(getInitials('Mary Jane Watson')).toBe('MW');
  });

  it('upper-cases the result', () => {
    expect(getInitials('jane doe')).toBe('JD');
  });

  it('trims leading/trailing whitespace', () => {
    expect(getInitials('  Alice  ')).toBe('AL');
  });

  it('handles extra internal whitespace', () => {
    expect(getInitials('Alice   Bob')).toBe('AB');
  });
});

describe('getAvatarClass', () => {
  it('always starts with avatar base class', () => {
    expect(getAvatarClass('md', 'circle', 'grey', false)).toMatch(/^avatar/);
  });

  it('includes the size modifier', () => {
    expect(getAvatarClass('md', 'circle', 'grey', false)).toContain('avatar--md');
  });

  it('includes the shape modifier', () => {
    expect(getAvatarClass('md', 'circle', 'grey', false)).toContain('avatar--circle');
  });

  it('includes the colour modifier when no image', () => {
    expect(getAvatarClass('md', 'circle', 'blue', false)).toContain('avatar--blue');
  });

  it('excludes the colour modifier when image is shown', () => {
    expect(getAvatarClass('md', 'circle', 'blue', true)).not.toContain('avatar--blue');
  });

  it('produces a clean space-separated string', () => {
    const cls = getAvatarClass('lg', 'square', 'purple', false);
    expect(cls).toBe('avatar avatar--lg avatar--square avatar--purple');
  });

  it('produces a clean string without colour when image shown', () => {
    const cls = getAvatarClass('sm', 'circle', 'orange', true);
    expect(cls).toBe('avatar avatar--sm avatar--circle');
  });
});
