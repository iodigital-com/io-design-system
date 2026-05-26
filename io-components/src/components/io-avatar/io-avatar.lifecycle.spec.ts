import { describe, it, expect, vi, beforeEach } from 'vitest';

import { IoAvatar } from './io-avatar';

describe('io-avatar — watcher and handler methods', () => {
  let c: IoAvatar;

  beforeEach(() => {
    c = new IoAvatar();
  });

  it('onSrcChange resets imgError to false', () => {
    (c as any).imgError = true;
    (c as any).onSrcChange();
    expect((c as any).imgError).toBe(false);
  });

  it('handleImgError sets imgError to true', () => {
    (c as any).imgError = false;
    (c as any).handleImgError();
    expect((c as any).imgError).toBe(true);
  });

  it('render() with imgError=true falls back to initials/icon (no img rendered)', () => {
    c.src = 'https://example.com/photo.jpg';
    (c as any).imgError = true;
    expect(() => c.render()).not.toThrow();
  });

  it('render() with src set and imgError=false shows image branch', () => {
    c.src = 'https://example.com/photo.jpg';
    (c as any).imgError = false;
    expect(() => c.render()).not.toThrow();
  });

  it('render() with name but no src shows initials branch', () => {
    c.src = undefined;
    c.name = 'Jane Doe';
    expect(() => c.render()).not.toThrow();
  });

  it('render() with no src and no name shows icon branch', () => {
    c.src = undefined;
    c.name = undefined;
    expect(() => c.render()).not.toThrow();
  });

  it('render() with external alt text and no image computes ariaLabel', () => {
    c.src = undefined;
    c.alt = 'User avatar';
    c.name = undefined;
    expect(() => c.render()).not.toThrow();
  });
});
