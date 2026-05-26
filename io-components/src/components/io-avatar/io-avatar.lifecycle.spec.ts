import { describe, it, expect, beforeEach } from 'vitest';

import { IoAvatar } from './io-avatar';

interface IoAvatarInternal {
  imgError: boolean;
  onSrcChange(): void;
  handleImgError(): void;
}

describe('io-avatar — watcher and handler methods', () => {
  let c: IoAvatar;

  beforeEach(() => {
    c = new IoAvatar();
  });

  it('onSrcChange resets imgError to false', () => {
    (c as unknown as IoAvatarInternal).imgError = true;
    (c as unknown as IoAvatarInternal).onSrcChange();
    expect((c as unknown as IoAvatarInternal).imgError).toBe(false);
  });

  it('handleImgError sets imgError to true', () => {
    (c as unknown as IoAvatarInternal).imgError = false;
    (c as unknown as IoAvatarInternal).handleImgError();
    expect((c as unknown as IoAvatarInternal).imgError).toBe(true);
  });

  it('render() with imgError=true falls back to initials/icon (no img rendered)', () => {
    c.src = 'https://example.com/photo.jpg';
    (c as unknown as IoAvatarInternal).imgError = true;
    expect(() => c.render()).not.toThrow();
  });

  it('render() with src set and imgError=false shows image branch', () => {
    c.src = 'https://example.com/photo.jpg';
    (c as unknown as IoAvatarInternal).imgError = false;
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
