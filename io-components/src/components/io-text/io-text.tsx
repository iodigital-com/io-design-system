import { Component, Element, Prop, h } from '@stencil/core';

import type { IoTextAlign, IoTextColor, IoTextHyphens, IoTextSize, IoTextTag, IoTextWeight } from './types';
import type { BreakpointValue } from '../../utils/breakpoint';
import { parseBreakpoint, buildMediaBlock } from '../../utils/breakpoint';

/** Tags that cannot be legally nested inside themselves */
const SELF_NESTING_BLOCKED: Partial<Record<IoTextTag, boolean>> = {
  blockquote: true,
  address: true,
  p: true,
};

/**
 * io-text
 * =======
 * Light DOM typography primitive for body text.
 * Renders semantic HTML (p, span, div, blockquote, time, address, figcaption,
 * cite, legend) with token-driven font size, weight, color, and alignment.
 *
 * When a tag value cannot be legally nested inside the same tag in the ancestor
 * chain, the component downgrades to `div` to avoid invalid HTML.
 *
 * Uses light DOM intentionally — typography must be stylable from outside.
 *
 * @example
 * <io-text size="base" weight="regular">Body paragraph</io-text>
 * <io-text tag="span" size="sm" color="secondary">Secondary label</io-text>
 * <io-text tag="address">123 Main St</io-text>
 * <io-text tag="figcaption">Caption text</io-text>
 */
@Component({
  tag: 'io-text',
  shadow: false, // light DOM — no *-styles.ts; typography inherits from app.css globals
  scoped: false,
})
export class IoText {
  @Element() el!: HTMLElement;

  private bpId?: string;

  /** HTML tag to render */
  @Prop({ reflect: true }) tag: IoTextTag = 'p';

  /**
   * Font size using --io-font-size-* tokens.
   * Accepts a scalar string ('xs'–'xl' or 'inherit') for a fixed size, or a
   * breakpoint object for responsive sizing:
   *   size="sm"
   *   :size="{ base: 'sm', l: 'lg' }"
   *   size='{"base":"sm","l":"lg"}'
   */
  @Prop({ reflect: true }) size: IoTextSize | BreakpointValue<IoTextSize> = 'base';

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

  componentWillLoad() {
    this.bpId = `io-t-${Math.random().toString(36).slice(2, 8)}`;
    if (this.el) this.el.setAttribute('data-bp-id', this.bpId);
  }

  private hasBlockedAncestor(): boolean {
    if (typeof document === 'undefined') return false;
    if (!SELF_NESTING_BLOCKED[this.tag]) return false;
    const tagLower = this.tag.toLowerCase();
    let node: HTMLElement | null = this.el?.parentElement ?? null;
    while (node) {
      if (node.tagName.toLowerCase() === tagLower) return true;
      node = node.parentElement;
    }
    return false;
  }

  private resolveTag(): string {
    if (this.hasBlockedAncestor()) return 'div';
    return this.tag;
  }

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

  private buildResponsiveSizeCSS(selector: string): string {
    const parsed = parseBreakpoint<IoTextSize>(this.size as BreakpointValue<IoTextSize>, 'base');
    if (parsed.isFixed) return '';
    return parsed.entries
      .map(({ key, value }) => {
        const token = value === 'inherit' ? 'inherit' : `var(--io-font-size-${value})`;
        return buildMediaBlock(key, `font-size: ${token};`, selector);
      })
      .join('\n');
  }

  render() {
    const Tag = this.resolveTag();

    // Resolve scalar size for baseline styles
    const parsedSize = parseBreakpoint<IoTextSize>(this.size as BreakpointValue<IoTextSize>, 'base');
    const baseSize: IoTextSize = parsedSize.isFixed
      ? parsedSize.value
      : (parsedSize.entries.find((e) => e.key === 'base')?.value ?? 'base');

    const fontSize = baseSize === 'inherit' ? 'inherit' : `var(--io-font-size-${baseSize})`;

    const style: Record<string, string> = {
      fontSize,
      fontWeight: `var(--io-font-weight-${this.weight})`,
      lineHeight: 'var(--io-line-height-dynamic)',
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

    const responsiveCSS = this.bpId ? this.buildResponsiveSizeCSS(`[data-bp-id="${this.bpId}"]`) : '';

    return [
      responsiveCSS ? <style>{responsiveCSS}</style> : null,
      <Tag style={style} {...extraAttrs}>
        <slot />
      </Tag>,
    ];
  }
}
