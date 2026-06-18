import { Component, Prop, h } from '@stencil/core';

import type { IoTextAlign, IoTextColor, IoTextHyphens, IoTextSize, IoTextTag, IoTextWeight } from './types';

/**
 * io-text
 * =======
 * Light DOM typography primitive for body text.
 * Renders semantic HTML (p, span, div, blockquote, time) with token-driven
 * font size, weight, color, and alignment.
 *
 * Uses light DOM intentionally — typography must be stylable from outside.
 *
 * @example
 * <io-text size="base" weight="regular">Body paragraph</io-text>
 * <io-text tag="span" size="sm" color="secondary">Secondary label</io-text>
 */
@Component({
  tag: 'io-text',
  shadow: false,
  scoped: false,
})
export class IoText {
  /** HTML tag to render */
  @Prop({ reflect: true }) tag: IoTextTag = 'p';

  /** Font size using --io-font-size-* tokens */
  @Prop({ reflect: true }) size: IoTextSize = 'base';

  /** Font weight using --io-font-weight-* tokens */
  @Prop({ reflect: true }) weight: IoTextWeight = 'regular';

  /** Text alignment */
  @Prop({ reflect: true }) align: IoTextAlign = 'start';

  /** Text color using semantic --io-text-* tokens */
  @Prop({ reflect: true }) color: IoTextColor = 'primary';

  /** Single-line truncation with text-overflow: ellipsis */
  @Prop({ reflect: true }) ellipsis = false;

  /**
   * Machine-readable date/time value for `tag="time"` — maps to the HTML
   * `datetime` attribute. Required by WCAG 1.3.1 / HTML spec when the text
   * content alone does not express a machine-parseable date.
   *
   * @example <io-text tag="time" datetime="2024-12-25">Christmas Day</io-text>
   */
  @Prop() datetime?: string;

  /** CSS hyphens property for word breaking and hyphenation */
  @Prop({ reflect: true }) hyphens: IoTextHyphens = 'inherit';

  private resolveColor(): string {
    switch (this.color) {
      case 'success':
        return 'var(--io-color-success)';
      case 'warning':
        return 'var(--io-color-warning)';
      case 'error':
        return 'var(--io-color-error)';
      case 'info':
        return 'var(--io-color-info)';
      case 'inherit':
        return 'inherit';
      default:
        return `var(--io-text-${this.color})`;
    }
  }

  render() {
    const Tag = this.tag;

    const fontSize = this.size === 'inherit' ? 'inherit' : `var(--io-font-size-${this.size})`;

    const style: Record<string, string> = {
      fontSize,
      fontWeight: `var(--io-font-weight-${this.weight})`,
      color: this.resolveColor(),
      textAlign: this.align,
      hyphens: this.hyphens,
    };

    if ((this.hyphens === 'auto' || this.hyphens === 'manual') && !style['overflowWrap']) {
      style['overflowWrap'] = 'break-word';
    }

    if (this.ellipsis) {
      style['overflow'] = 'hidden';
      style['textOverflow'] = 'ellipsis';
      style['whiteSpace'] = 'nowrap';
    }

    const extraAttrs = this.tag === 'time' && this.datetime ? { dateTime: this.datetime } : {};

    return (
      <Tag style={style} {...extraAttrs}>
        <slot />
      </Tag>
    );
  }
}
