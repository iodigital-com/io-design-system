import { Component, Prop, State, Watch, Host, h } from '@stencil/core';

import { getAvatarStyles } from './io-avatar-styles';
import { getInitials, getAvatarClass } from './io-avatar-utils';
import type { IoAvatarSize, IoAvatarColor, IoAvatarShape, IoAvatarRole } from './types';

/**
 * io-avatar
 * =========
 * Displays a user avatar with three progressive fallbacks:
 *  1. Image (when `src` is provided and loads successfully)
 *  2. Initials (when `name` is provided)
 *  3. Generic person icon (when neither is available)
 *
 * @example
 * <io-avatar src="/jane.jpg" alt="Jane Doe" name="Jane Doe" size="md" />
 * <io-avatar name="Jane Doe" color="blue" shape="circle" />
 * <io-avatar size="lg" />
 */
@Component({
  tag: 'io-avatar',
  shadow: { delegatesFocus: true },
})
export class IoAvatar {
  /** Image URL. When loading fails the component falls back to initials or icon. */
  @Prop() src: string | undefined;

  /** Accessible alt text for the image. Pass an empty string for decorative avatars. */
  @Prop() alt = '';

  /** Full name used to derive initials ("Jane Doe" → "JD"). */
  @Prop() name: string | undefined;

  /** Visual size of the avatar. */
  @Prop({ reflect: true }) size: IoAvatarSize = 'md';

  /** Background colour applied to the initials / icon fallback. */
  @Prop({ reflect: true }) color: IoAvatarColor = 'grey';

  /** Shape of the avatar container. */
  @Prop({ reflect: true }) shape: IoAvatarShape = 'circle';

  /**
   * ARIA role for the host element. Defaults to 'presentation' when an image is
   * visible (the img element carries its own accessible name via alt) and to 'img'
   * for initials and icon fallback modes. Pass 'presentation' or 'none' to mark a
   * purely decorative avatar so assistive technology skips it entirely. (WCAG 4.1.2)
   */
  @Prop() role: IoAvatarRole | '' = '';

  /** Tracks whether the image has failed to load. */
  @State() imgError = false;

  /** Reset the error flag whenever the src prop changes. */
  @Watch('src')
  onSrcChange(): void {
    this.imgError = false;
  }

  private handleImgError = (): void => {
    this.imgError = true;
  };

  render() {
    const showImage = !!this.src && !this.imgError;
    const showInitials = !showImage && !!this.name;
    const showIcon = !showImage && !this.name;

    const cls = getAvatarClass(this.size, this.shape, this.color, showImage);

    // Default: 'presentation' when image is visible (img alt carries the name);
    // 'img' for initials and icon modes so Host IS the labelled image widget.
    // Validate role prop — reject empty string and non-IoAvatarRole values.
    const VALID_ROLES: IoAvatarRole[] = ['img', 'presentation', 'none'];
    const effectiveRole: IoAvatarRole =
      this.role && VALID_ROLES.includes(this.role)
        ? this.role
        : showImage
          ? 'presentation'
          : 'img';

    let effectiveAriaLabel: string | undefined;
    if (effectiveRole === 'img') {
      if (showInitials) {
        effectiveAriaLabel = this.name;
      } else if (showIcon) {
        effectiveAriaLabel = this.alt || this.name || 'User avatar';
      } else {
        // showImage with consumer-forced role='img' — honour alt
        effectiveAriaLabel = this.alt || undefined;
      }
    }

    return (
      <Host role={effectiveRole} aria-label={effectiveAriaLabel}>
        <style>{getAvatarStyles()}</style>
        <div class={cls}>
          {showImage && (
            <img
              class="avatar-img"
              src={this.src}
              alt={this.alt}
              loading="lazy"
              aria-hidden={effectiveRole === 'img' || this.alt === '' ? 'true' : undefined}
              onError={this.handleImgError}
            />
          )}
          {showInitials && getInitials(this.name!)}
          {showIcon && (
            <svg
              class="avatar-icon"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.5" />
              <path
                d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          )}
        </div>
      </Host>
    );
  }
}
