import { Component, Prop, State, Host, h } from '@stencil/core';

import { getWordmarkStyles } from './io-wordmark-styles';

import type { IoWordmarkColor, IoWordmarkSize, IoWordmarkVariant } from './types';

/**
 * io-wordmark
 * ===========
 * Reusable iO brand identity component with three variants:
 *
 * - variant="mark"    — The official geometric iO mark SVG (i + O). Default.
 *                       Supports size scale and all four color values (incl. beige).
 * - variant="lockup"  — Full official brand lockup SVG (mark + "io digital" text).
 *                       Supports size scale and blue/black/white color values.
 * - variant="badge"   — Square brand mark for app icons, social avatars, and watermarks.
 *                       Renders the iO mark centered on a filled square/rounded background.
 *                       Supports size scale and blue/black/white/beige color values.
 *
 * @example
 * <io-wordmark />
 * <io-wordmark variant="mark" color="blue" size="lg" />
 * <io-wordmark variant="lockup" color="black" size="md" href="/" />
 * <io-wordmark variant="badge" color="blue" size="md" />
 * <io-wordmark size="inherit" style="height: 48px" />
 */
@Component({
  tag: 'io-wordmark',
  shadow: { delegatesFocus: true },
})
export class IoWordmark {
  /**
   * Which visual representation to render.
   * - 'mark'   → geometric iO mark SVG (default)
   * - 'lockup' → full official brand lockup SVG (mark + text)
   */
  @Prop({ reflect: true }) variant: IoWordmarkVariant = 'mark';

  /**
   * Colour applied to the wordmark.
   * For 'mark'/'lockup': drives the SVG fill via CSS currentColor.
   * 'beige' is only valid on variant='mark'.
   */
  @Prop({ reflect: true }) color: IoWordmarkColor = 'blue';

  /** Size scale — controls SVG height for mark and lockup variants */
  @Prop({ reflect: true }) size: IoWordmarkSize = 'md';

  /**
   * Accessible label for the host element.
   * Defaults to "io Digital".
   */
  @Prop({ attribute: 'aria-label' }) ariaLabel: string = 'io Digital';

  /** Internal resolved color — set in componentWillRender to avoid mutating non-mutable @Prop */
  @State() private resolvedColor: IoWordmarkColor = 'blue';

  /**
   * Optional URL to wrap the wordmark in an anchor element.
   * When set, the wordmark becomes a navigable link.
   */
  @Prop() href: string | undefined;

  /**
   * Target attribute for the anchor element (when href is set).
   * Defaults to '_self'.
   */
  @Prop() target: '_self' | '_blank' | '_parent' | '_top' = '_self';

  componentWillRender() {
    if (this.variant === 'lockup' && this.color === 'beige') {
      console.error(
        '[io-wordmark] color="beige" is not supported on variant="lockup". Falling back to color="blue".'
      );
      this.resolvedColor = 'blue';
    } else {
      this.resolvedColor = this.color;
    }
  }

  /** Renders the badge variant — square brand mark for app icons and watermarks */
  private renderBadge(ariaLabel: string, size: IoWordmarkSize, _resolvedColor: IoWordmarkColor) {
    return (
      <Host role="img" aria-label={ariaLabel} color={_resolvedColor}>
        <style>{getWordmarkStyles()}</style>
        {this.renderBadgeSVG(size)}
      </Host>
    );
  }

  private renderBadgeSVG(size: IoWordmarkSize) {
    return (
      <svg
        class={`badge-svg badge-svg--${size}`}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <title>{this.ariaLabel}</title>
        {/* Square background fill */}
        <rect width="100" height="100" rx="var(--io-wordmark-badge-radius-unitless, 18)" fill="currentColor" />
        {/* iO mark glyph centered and scaled to fit — white on colored background */}
        {/* i — diagonal stroke (scaled from 881×599 viewBox to ~40% centered in 100×100) */}
        <g class="badge-glyph" transform="translate(8, 20) scale(0.096, 0.1)">
          <path d="M135.15,219.96h0L0,523.52l152.19,67.76,67.39-151.37c37.42-84.05-.38-182.53-84.43-219.96Z" />
          <path d="M50.68,0c-37.42,84.05.38,182.53,84.43,219.96l67.76-152.19L50.68,0Z" />
          <path d="M594.5,26c-158.22,0-286.5,128.27-286.5,286.5s128.28,286.5,286.5,286.5,286.5-128.27,286.5-286.5S752.73,26,594.5,26ZM594.5,464.51c-83.95,0-152.01-68.06-152.01-152.01s68.05-152.02,152.01-152.02,152.01,68.07,152.01,152.02-68.05,152.01-152.01,152.01Z" />
        </g>
      </svg>
    );
  }

  componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return newVal !== oldVal;
  }

  render() {
    const { variant, ariaLabel, size, href, target, resolvedColor } = this;

    // If href is set, wrap the content in an anchor element
    if (href) {
      return (
        <Host color={resolvedColor}>
          <style>{getWordmarkStyles()}</style>
          <a
            href={href}
            target={target}
            rel={target === '_blank' ? 'noopener noreferrer' : undefined}
            aria-label={ariaLabel}
          >
            {variant === 'lockup' ? this.renderLockupSVG(size) : this.renderMarkSVG(size)}
          </a>
        </Host>
      );
    }

    // Default: render as img role
    if (variant === 'lockup') return this.renderLockup(ariaLabel, size, resolvedColor);
    if (variant === 'badge') return this.renderBadge(ariaLabel, size, resolvedColor);
    return this.renderMark(ariaLabel, size, resolvedColor);
  }

  private renderMark(ariaLabel: string, size: IoWordmarkSize, resolvedColor: IoWordmarkColor) {
    return (
      <Host role="img" aria-label={ariaLabel} color={resolvedColor}>
        <style>{getWordmarkStyles()}</style>
        {this.renderMarkSVG(size)}
      </Host>
    );
  }

  private renderLockup(ariaLabel: string, size: IoWordmarkSize, resolvedColor: IoWordmarkColor) {
    return (
      <Host role="img" aria-label={ariaLabel} color={resolvedColor}>
        <style>{getWordmarkStyles()}</style>
        {this.renderLockupSVG(size)}
      </Host>
    );
  }

  private renderMarkSVG(size: IoWordmarkSize) {
    return (
      <svg
        class={`mark-svg mark-svg--${size}`}
        viewBox="0 0 881 599"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <title>{this.ariaLabel}</title>
        {/* i — diagonal stroke */}
        <path fill="currentColor" d="M135.15,219.96h0L0,523.52l152.19,67.76,67.39-151.37c37.42-84.05-.38-182.53-84.43-219.96Z" />
        {/* i — upper stroke / dot */}
        <path fill="currentColor" d="M50.68,0c-37.42,84.05.38,182.53,84.43,219.96l67.76-152.19L50.68,0Z" />
        {/* O */}
        <path fill="currentColor" d="M594.5,26c-158.22,0-286.5,128.27-286.5,286.5s128.28,286.5,286.5,286.5,286.5-128.27,286.5-286.5S752.73,26,594.5,26ZM594.5,464.51c-83.95,0-152.01-68.06-152.01-152.01s68.05-152.02,152.01-152.02,152.01,68.07,152.01,152.02-68.05,152.01-152.01,152.01Z" />
      </svg>
    );
  }

  private renderLockupSVG(size: IoWordmarkSize) {
    return (
      <svg
        class={`lockup-svg lockup-svg--${size}`}
        viewBox="0 0 1500 1500"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <title>{this.ariaLabel}</title>
        {/* O */}
        <path fill="currentColor" d="M938.29,420.05c102.23,0,185.39,82.8,185.39,184.59s-83.16,184.59-185.39,184.59-185.39-82.8-185.39-184.59,83.16-184.59,185.39-184.59ZM938.29,235.46c-204.75,0-370.74,165.28-370.74,369.15s165.99,369.15,370.74,369.15,370.74-165.28,370.74-369.15-165.99-369.15-370.74-369.15Z" />
        {/* i — diagonal stroke */}
        <path fill="currentColor" d="M365.65,487.36l-174.68,390.64,196.67,87.19,87.11-194.77c48.36-108.15-.49-234.87-109.11-283.02v-.04Z" />
        {/* i — upper stroke / dot */}
        <path fill="currentColor" d="M256.55,204.29c-48.35,108.15.49,234.87,109.11,283.02l87.57-195.83-196.67-87.19Z" />
        {/* "io digital" outlined text */}
        <path fill="currentColor" d="M221.71,1254.93h-18.46v-107.97h18.46v107.97ZM212.48,1130.87c-3.29,0-6.08-1.15-8.37-3.44-2.15-2.29-3.22-5.08-3.22-8.37s1.07-6.23,3.22-8.37c2.29-2.14,5.08-3.22,8.37-3.22s6.22,1.07,8.37,3.22c2.29,2.15,3.43,4.94,3.43,8.37s-1.14,6.08-3.43,8.37c-2.29,2.29-5.08,3.44-8.37,3.44ZM290.1,1257.29c-9.44,0-18.17-2.43-26.19-7.3-7.87-5.01-14.17-11.8-18.89-20.39-4.72-8.73-7.08-18.32-7.08-28.76s2.36-19.97,7.08-28.55c4.72-8.59,11.02-15.31,18.89-20.18,8.01-5.01,16.74-7.51,26.19-7.51s17.96,2.51,25.97,7.51c8.01,4.87,14.38,11.59,19.1,20.18,4.72,8.58,7.08,18.1,7.08,28.55s-2.36,20.03-7.08,28.76c-4.72,8.58-11.09,15.38-19.1,20.39-8.01,4.87-16.67,7.3-25.97,7.3ZM290.1,1239.9c6.01,0,11.59-1.65,16.74-4.93,5.15-3.29,9.23-7.87,12.23-13.74,3.01-6.01,4.51-12.81,4.51-20.39s-1.5-14.31-4.51-20.18c-3-5.86-7.08-10.44-12.23-13.74-5.15-3.29-10.73-4.94-16.74-4.94s-11.59,1.65-16.74,4.94c-5.15,3.29-9.3,7.87-12.45,13.74-3.01,5.87-4.51,12.59-4.51,20.18s1.5,14.38,4.51,20.39c3.15,5.87,7.23,10.45,12.23,13.74,5.15,3.29,10.8,4.93,16.96,4.93ZM401.2,1257.29c-9.02,0-17.31-2.43-24.9-7.3-7.58-4.86-13.67-11.59-18.24-20.17-4.44-8.59-6.65-18.24-6.65-28.98s2.22-20.39,6.65-28.98c4.58-8.58,10.66-15.24,18.24-19.96,7.58-4.86,15.88-7.3,24.9-7.3,7.44,0,14.16,1.79,20.18,5.37,6.01,3.44,10.16,6.8,12.45,10.09h1.07v-55.38h18.46v150.25h-13.74l-4.08-13.52h-1.07c-2.58,3.44-6.87,6.94-12.88,10.52-5.86,3.58-12.66,5.37-20.39,5.37ZM402.28,1239.9c5.87,0,11.3-1.65,16.31-4.93,5.01-3.29,8.94-7.87,11.8-13.74,3-6.01,4.51-12.81,4.51-20.39s-1.5-14.31-4.51-20.18c-2.86-5.86-6.79-10.44-11.8-13.74s-10.45-4.94-16.31-4.94-11.3,1.65-16.31,4.94c-4.87,3.29-8.8,7.87-11.81,13.74-2.86,5.87-4.29,12.59-4.29,20.18s1.43,14.38,4.29,20.39c3,5.87,6.94,10.45,11.81,13.74,5.01,3.29,10.45,4.93,16.31,4.93ZM495.64,1254.93h-18.46v-107.97h18.46v107.97ZM486.41,1130.87c-3.29,0-6.08-1.15-8.37-3.44-2.14-2.29-3.22-5.08-3.22-8.37s1.07-6.23,3.22-8.37c2.29-2.14,5.08-3.22,8.37-3.22s6.22,1.07,8.37,3.22c2.29,2.15,3.44,4.94,3.44,8.37s-1.15,6.08-3.44,8.37c-2.29,2.29-5.08,3.44-8.37,3.44ZM563.61,1295.71c-8.73,0-16.38-1.57-22.97-4.72-6.58-3.15-11.88-7.3-15.88-12.45-4.01-5.01-6.73-10.37-8.16-16.1h18.67c1.72,5.01,5.01,8.94,9.87,11.81,5.01,3,11.09,4.51,18.25,4.51,9.01,0,16.17-2.58,21.46-7.73,5.44-5.15,8.16-12.17,8.16-21.04v-14.38h-1.07c-2.15,3.29-6.08,6.73-11.81,10.31-5.72,3.44-12.23,5.15-19.53,5.15-8.73,0-16.89-2.29-24.47-6.87-7.44-4.72-13.38-11.09-17.81-19.1-4.29-8.16-6.44-17.17-6.44-27.04s2.15-19.11,6.44-27.26c4.44-8.16,10.37-14.52,17.81-19.1,7.44-4.72,15.53-7.08,24.25-7.08,7.59,0,14.31,1.79,20.18,5.37,5.86,3.58,9.87,7.08,12.02,10.52h1.08l4.08-13.52h13.74v103.03c0,13.88-4.36,24.97-13.09,33.27-8.59,8.3-20.18,12.45-34.77,12.45ZM561.68,1234.11c5.58,0,10.73-1.58,15.45-4.72,4.87-3.15,8.73-7.44,11.59-12.88,2.86-5.58,4.29-11.73,4.29-18.46s-1.43-13.1-4.29-18.67-6.72-9.94-11.59-13.09c-4.72-3.15-9.87-4.72-15.45-4.72s-10.8,1.58-15.67,4.72c-4.72,3.15-8.51,7.52-11.37,13.09s-4.29,11.8-4.29,18.67,1.43,12.88,4.29,18.46c2.86,5.44,6.65,9.73,11.37,12.88,4.87,3.15,10.09,4.72,15.67,4.72ZM652.75,1254.93h-18.46v-107.97h18.46v107.97ZM643.53,1130.87c-3.29,0-6.08-1.15-8.37-3.44-2.15-2.29-3.22-5.08-3.22-8.37s1.07-6.23,3.22-8.37c2.29-2.14,5.08-3.22,8.37-3.22s6.22,1.07,8.37,3.22c2.29,2.15,3.43,4.94,3.43,8.37s-1.14,6.08-3.43,8.37c-2.29,2.29-5.08,3.44-8.37,3.44ZM714.5,1257.29c-9.3,0-16.96-3.22-22.97-9.66-5.86-6.44-8.8-15.24-8.8-26.4v-57.31h-18.46v-16.32h8.16c4.15,0,7.37-1.07,9.66-3.22,2.29-2.29,3.43-5.51,3.43-9.66v-16.1h15.67v28.33h24.47v16.96h-24.47v56.67c0,6.44,1.5,11.3,4.51,14.59,3,3.15,7.15,4.72,12.45,4.72,2.86,0,5.37-.5,7.51-1.5v16.95c-3.86,1.29-7.58,1.94-11.16,1.94ZM777.86,1144.6c8.16,0,15.38,1.79,21.68,5.37,6.3,3.44,11.16,8.37,14.6,14.81,3.58,6.3,5.37,13.52,5.37,21.68v68.47h-13.95l-3.86-13.52h-1.07c-2.87,4-7.01,7.65-12.45,10.95-5.44,3.29-12.09,4.94-19.96,4.94-7.15,0-13.45-1.43-18.89-4.29-5.44-2.86-9.66-6.73-12.67-11.59-3-5.01-4.51-10.52-4.51-16.53,0-6.73,2.01-12.67,6.01-17.82,4.15-5.3,9.87-9.38,17.17-12.24,7.44-2.86,15.88-4.29,25.33-4.29h20.18v-4.93c0-7.3-2.14-13.1-6.44-17.39-4.15-4.44-9.66-6.65-16.53-6.65-6.44,0-11.52,1.65-15.24,4.93-3.72,3.29-6.08,7.52-7.08,12.67h-18.67c.71-6.15,2.79-11.88,6.22-17.18,3.58-5.29,8.37-9.51,14.38-12.66,6.01-3.15,12.81-4.72,20.39-4.72ZM771.21,1240.98c8.87,0,16.03-2.57,21.46-7.72,5.44-5.3,8.16-11.88,8.16-19.75v-8.16h-18.89c-10.02,0-17.74,1.65-23.18,4.93-5.44,3.29-8.16,7.87-8.16,13.74,0,5.15,1.79,9.3,5.37,12.45,3.58,3.01,8.66,4.51,15.24,4.51ZM860.68,1254.93h-18.46v-150.25h18.46v150.25ZM891.25,1257.29c-3.58,0-6.66-1.22-9.23-3.65-2.43-2.58-3.65-5.73-3.65-9.45s1.22-6.58,3.65-9.01c2.57-2.58,5.65-3.86,9.23-3.86s6.65,1.29,9.23,3.86c2.58,2.43,3.86,5.44,3.86,9.01s-1.29,6.65-3.86,9.23c-2.43,2.58-5.51,3.87-9.23,3.87ZM966.01,1257.29c-9.45,0-18.17-2.43-26.19-7.3-7.87-5.01-14.17-11.8-18.89-20.39-4.73-8.73-7.08-18.32-7.08-28.76s2.36-19.97,7.08-28.55c4.72-8.59,11.02-15.31,18.89-20.18,8.01-5.01,16.74-7.51,26.19-7.51,8.3,0,15.81,1.93,22.54,5.8,6.87,3.86,12.52,8.94,16.96,15.24,4.44,6.3,7.37,13.09,8.8,20.39h-18.46c-2-7.01-5.58-12.73-10.73-17.17-5.01-4.58-11.38-6.87-19.1-6.87-6.01,0-11.59,1.65-16.74,4.94-5.15,3.29-9.3,7.87-12.45,13.74-3,5.87-4.51,12.59-4.51,20.18s1.5,14.38,4.51,20.39c3.15,5.87,7.23,10.45,12.24,13.74,5.15,3.29,10.8,4.93,16.96,4.93,7.72,0,14.1-2.22,19.1-6.65,5.15-4.58,8.73-10.38,10.73-17.39h18.46c-1.43,7.3-4.37,14.1-8.8,20.39-4.44,6.3-10.09,11.38-16.96,15.24-6.73,3.86-14.24,5.8-22.54,5.8ZM1074.86,1257.29c-9.45,0-18.18-2.43-26.19-7.3-7.87-5.01-14.17-11.8-18.89-20.39-4.73-8.73-7.08-18.32-7.08-28.76s2.36-19.97,7.08-28.55c4.72-8.59,11.02-15.31,18.89-20.18,8.01-5.01,16.74-7.51,26.19-7.51s17.96,2.51,25.97,7.51c8.01,4.87,14.38,11.59,19.1,20.18,4.72,8.58,7.08,18.1,7.08,28.55s-2.36,20.03-7.08,28.76c-4.72,8.58-11.09,15.38-19.1,20.39-8.01,4.87-16.67,7.3-25.97,7.3ZM1074.86,1239.9c6.01,0,11.59-1.65,16.74-4.93,5.15-3.29,9.23-7.87,12.24-13.74,3-6.01,4.51-12.81,4.51-20.39s-1.5-14.31-4.51-20.18c-3-5.86-7.08-10.44-12.24-13.74-5.15-3.29-10.73-4.94-16.74-4.94s-11.59,1.65-16.74,4.94c-5.15,3.29-9.3,7.87-12.45,13.74-3,5.87-4.51,12.59-4.51,20.18s1.5,14.38,4.51,20.39c3.15,5.87,7.23,10.45,12.24,13.74,5.15,3.29,10.8,4.93,16.96,4.93Z" />
      </svg>
    );
  }
}
