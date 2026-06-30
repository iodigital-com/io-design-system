import { Component, Prop, h } from '@stencil/core';

import type { IoHeadingAlign, IoHeadingColor, IoHeadingHyphens, IoHeadingSize, IoHeadingTag, IoHeadingWeight } from './types';

const HEADING_SIZE_TOKEN_MAP: Record<IoHeadingSize, string> = {
  sm: 'var(--io-font-size-sm)',
  md: 'var(--io-font-size-base)',
  lg: 'var(--io-font-size-lg)',
  xl: 'var(--io-font-size-xl)',
  '2xl': 'var(--io-font-size-2xl)',
  '3xl': 'var(--io-font-size-3xl)',
  '4xl': 'var(--io-font-size-4xl)',
};

const HEADING_TRACKING_MAP: Partial<Record<IoHeadingSize, string>> = {
  '4xl': 'var(--io-heading-tracking-1)',
  '3xl': 'var(--io-heading-tracking-2)',
  '2xl': 'var(--io-heading-tracking-3)',
  xl: 'var(--io-heading-tracking-4)',
};

/**
 * io-heading
 * ==========
 * Light DOM typography primitive for headings.
 * Renders h1–h6 with token-driven font size, weight, color, and alignment.
 *
 * The `tag` prop is required for correct document outline semantics.
 * A dev warning is logged if `tag` is omitted, and it falls back to 'h2'.
 *
 * Uses light DOM intentionally — typography must be stylable from outside.
 *
 * @example
 * <io-heading tag="h1" size="4xl">Page Title</io-heading>
 * <io-heading tag="h2" size="2xl">Section Heading</io-heading>
 */
@Component({
  tag: 'io-heading',
  shadow: false, // light DOM — no *-styles.ts; typography inherits from app.css globals
  scoped: false,
})
export class IoHeading {
  /** Semantic HTML heading tag — required for correct document outline */
  @Prop({ reflect: true }) tag: IoHeadingTag | undefined;

  /** Font size using --io-font-size-* tokens */
  @Prop({ reflect: true }) size: IoHeadingSize = '2xl';

  /** Font weight using --io-font-weight-* tokens */
  @Prop({ reflect: true }) weight: IoHeadingWeight = 'semibold';

  /** Text alignment */
  @Prop({ reflect: true }) align: IoHeadingAlign = 'start';

  /** Text color using semantic --io-text-* tokens */
  @Prop({ reflect: true }) color: IoHeadingColor = 'primary';

  /** Single-line truncation with text-overflow: ellipsis */
  @Prop({ reflect: true }) ellipsis = false;

  /** CSS hyphens property for word breaking and hyphenation */
  @Prop({ reflect: true }) hyphens: IoHeadingHyphens = 'none';

  componentWillLoad() {
    if (!this.tag) {
      console.error('[io-heading] `tag` prop is required for correct document outline semantics (WCAG 1.3.1). Falling back to "h2".');
    }
  }

  private resolveTag(): IoHeadingTag {
    return this.tag ?? 'h2';
  }

  private resolveColor(): string {
    if (this.color === 'inherit') return 'inherit';
    if (this.color === 'brand') return 'var(--io-color-primary)';
    if (this.color === 'inverse') return 'var(--io-text-inverse)';
    return `var(--io-text-${this.color})`;
  }

  render() {
    const Tag = this.resolveTag();
    const sizeToken = HEADING_SIZE_TOKEN_MAP[this.size];
    const tracking = HEADING_TRACKING_MAP[this.size];

    const style: Record<string, string> = {
      fontSize: sizeToken,
      fontWeight: `var(--io-font-weight-${this.weight})`,
      lineHeight: 'var(--io-line-height-dynamic)',
      color: this.resolveColor(),
      textAlign: this.align,
      hyphens: this.hyphens,
    };

    if (tracking) {
      style['letterSpacing'] = tracking;
    }

    if ((this.hyphens === 'auto' || this.hyphens === 'manual') && !style['overflowWrap']) {
      style['overflowWrap'] = 'break-word';
    }

    if (this.ellipsis) {
      style['overflow'] = 'hidden';
      style['textOverflow'] = 'ellipsis';
      style['whiteSpace'] = 'nowrap';
    }

    return (
      <Tag style={style}>
        <slot />
      </Tag>
    );
  }
}
