import { Component, Prop, Host, h } from '@stencil/core';

import { getSkeletonStyles } from './io-skeleton-styles';

import type { IoSkeletonVariant } from './types';

/**
 * io-skeleton
 * ===========
 * Animated placeholder that represents loading content.
 * Use while async data is being fetched to communicate activity
 * without resorting to a spinner or blank region.
 *
 * Wrap multiple skeletons in a container with `aria-busy="true"` + `aria-label`
 * to communicate the loading state to screen readers as a unit.
 *
 * @example
 * <io-skeleton variant="text" width="200px"></io-skeleton>
 * <io-skeleton variant="circular" width="40px" height="40px"></io-skeleton>
 * <io-skeleton variant="rectangular" width="100%" height="120px"></io-skeleton>
 *
 * <!-- Composition: card skeleton -->
 * <div aria-busy="true" aria-label="Loading article">
 *   <io-skeleton variant="rectangular" height="160px"></io-skeleton>
 *   <io-skeleton variant="text" width="60%"></io-skeleton>
 *   <io-skeleton variant="text" width="80%"></io-skeleton>
 * </div>
 */
@Component({
  tag: 'io-skeleton',
  shadow: true,
})
export class IoSkeleton {
  // ── Props ─────────────────────────────────────────────────────

  /** Shape preset for the skeleton placeholder. */
  @Prop({ reflect: true }) variant: IoSkeletonVariant = 'text';

  /**
   * CSS width value applied as an inline style.
   * Defaults to the variant's CSS width when not provided.
   */
  @Prop() width?: string;

  /**
   * CSS height value applied as an inline style.
   * Defaults to the variant's CSS height when not provided.
   */
  @Prop() height?: string;

  /**
   * When false the shimmer animation is disabled.
   * Prefer the `prefers-reduced-motion` media query for system-level control.
   */
  @Prop({ reflect: true }) animated = true;

  /** Accessible label announced by screen readers. */
  @Prop() label = 'Loading';

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { variant, width, height, animated, label } = this;

    const inlineStyle: Record<string, string> = {};
    if (width) inlineStyle['width'] = width;
    if (height) inlineStyle['height'] = height;

    const cls = [
      'skeleton',
      `skeleton--${variant}`,
      !animated && 'skeleton--static',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Host role="img" aria-label={label}>
        <style>{getSkeletonStyles()}</style>
        <span class={cls} style={inlineStyle} aria-hidden="true" />
      </Host>
    );
  }
}
