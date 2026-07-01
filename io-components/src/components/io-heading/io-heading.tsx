import { Component, Element, Prop, h } from '@stencil/core';

import type { IoHeadingAlign, IoHeadingColor, IoHeadingHyphens, IoHeadingSize, IoHeadingTag, IoHeadingWeight } from './types';
import type { BreakpointValue } from '../../utils/breakpoint';
import { parseBreakpoint, buildMediaBlock } from '../../utils/breakpoint';

const HEADING_SIZE_TOKEN_MAP: Record<IoHeadingSize, string> = {
  sm: 'var(--io-font-size-sm)',
  md: 'var(--io-font-size-base)',
  lg: 'var(--io-font-size-lg)',
  xl: 'var(--io-font-size-xl)',
  '2xl': 'var(--io-font-size-2xl)',
  '3xl': 'var(--io-font-size-3xl)',
  '4xl': 'var(--io-font-size-4xl)',
  '5xl': 'var(--io-font-size-5xl)',
  '6xl': 'var(--io-font-size-6xl)',
};

const HEADING_TRACKING_MAP: Partial<Record<IoHeadingSize, string>> = {
  '6xl': 'var(--io-heading-tracking-1)',
  '5xl': 'var(--io-heading-tracking-1)',
  '4xl': 'var(--io-heading-tracking-1)',
  '3xl': 'var(--io-heading-tracking-2)',
  '2xl': 'var(--io-heading-tracking-3)',
  xl: 'var(--io-heading-tracking-4)',
};

/**
 * Size-to-tag inference map.
 * When no explicit `tag` is provided, the component infers a reasonable heading
 * level from the visual size. This is a best-effort default — the explicit `tag`
 * prop always takes precedence.
 */
const HEADING_SIZE_TO_TAG_MAP: Record<IoHeadingSize, IoHeadingTag> = {
  '6xl': 'h1',
  '5xl': 'h1',
  '4xl': 'h1',
  '3xl': 'h2',
  '2xl': 'h2',
  xl: 'h3',
  lg: 'h4',
  md: 'h5',
  sm: 'h6',
};

const HEADING_TAGS = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

/**
 * io-heading
 * ==========
 * Light DOM typography primitive for headings.
 * Renders h1–h6 with token-driven font size, weight, color, and alignment.
 *
 * When `tag` is omitted, the component infers a heading level from `size`
 * (e.g. 4xl → h1, 2xl → h2) and logs a dev-mode warning. If a heading
 * element is already present as a direct parent, the component downgrades
 * to `div` to avoid nesting headings.
 *
 * Uses light DOM intentionally — typography must be stylable from outside.
 *
 * @example
 * <io-heading tag="h1" size="4xl">Page Title</io-heading>
 * <io-heading tag="h2" size="2xl">Section Heading</io-heading>
 * <io-heading size="5xl">Hero Heading (tag inferred as h1)</io-heading>
 */
@Component({
  tag: 'io-heading',
  shadow: false, // light DOM — no *-styles.ts; typography inherits from app.css globals
  scoped: false,
})
export class IoHeading {
  @Element() el!: HTMLElement;

  /** Semantic HTML heading tag. When omitted, the tag is inferred from size. */
  @Prop({ reflect: true }) tag: IoHeadingTag | undefined;

  /**
   * Font size using --io-font-size-* tokens.
   * Accepts a scalar string ('sm'–'6xl') for a fixed size, or a breakpoint
   * object for responsive sizing:
   *   size="2xl"
   *   :size="{ base: 'lg', l: '4xl' }"
   *   size='{"base":"lg","l":"4xl"}'
   */
  @Prop({ reflect: true }) size: IoHeadingSize | BreakpointValue<IoHeadingSize> = '2xl';

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

  private bpId?: string;

  componentWillLoad() {
    if (!this.tag) {
      if (typeof console !== 'undefined' && process?.env?.NODE_ENV !== 'production') {
        console.warn('[io-heading] `tag` prop omitted — inferring heading level from size. For reliable document outline semantics, always provide an explicit `tag` prop (WCAG 1.3.1).');
      }
    }
    // Generate a stable unique ID for responsive CSS scoping
    this.bpId = `io-h-${Math.random().toString(36).slice(2, 8)}`;
    if (this.el) this.el.setAttribute('data-bp-id', this.bpId);
  }

  private hasHeadingAncestor(): boolean {
    if (typeof document === 'undefined') return false;
    let node: HTMLElement | null = this.el?.parentElement ?? null;
    while (node) {
      if (HEADING_TAGS.has(node.tagName.toLowerCase())) return true;
      node = node.parentElement;
    }
    return false;
  }

  private resolveTag(): IoHeadingTag | 'div' {
    if (this.hasHeadingAncestor()) return 'div';
    const scalarSize = typeof this.size === 'string' ? (this.size as IoHeadingSize) : '2xl';
    return this.tag ?? HEADING_SIZE_TO_TAG_MAP[scalarSize] ?? 'h2';
  }

  private resolveColor(): string {
    if (this.color === 'inherit') return 'inherit';
    if (this.color === 'brand') return 'var(--io-color-primary)';
    if (this.color === 'inverse') return 'var(--io-text-inverse)';
    return `var(--io-text-${this.color})`;
  }

  private buildResponsiveSizeCSS(selector: string): string {
    const parsed = parseBreakpoint<IoHeadingSize>(this.size as BreakpointValue<IoHeadingSize>, '2xl');
    if (parsed.isFixed) return '';
    return parsed.entries
      .map(({ key, value }) => {
        const token = HEADING_SIZE_TOKEN_MAP[value] ?? `var(--io-font-size-${value})`;
        const tracking = HEADING_TRACKING_MAP[value];
        const props = tracking
          ? `font-size: ${token}; letter-spacing: ${tracking};`
          : `font-size: ${token};`;
        return buildMediaBlock(key, props, selector);
      })
      .join('\n');
  }

  render() {
    const Tag = this.resolveTag() as string;

    // Resolve scalar size for baseline styles (use base breakpoint or the scalar value)
    const parsedSize = parseBreakpoint<IoHeadingSize>(this.size as BreakpointValue<IoHeadingSize>, '2xl');
    const baseSize: IoHeadingSize = parsedSize.isFixed
      ? parsedSize.value
      : (parsedSize.entries.find((e) => e.key === 'base')?.value ?? '2xl');

    const sizeToken = HEADING_SIZE_TOKEN_MAP[baseSize];
    const tracking = HEADING_TRACKING_MAP[baseSize];

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

    const responsiveCSS = this.bpId ? this.buildResponsiveSizeCSS(`[data-bp-id="${this.bpId}"]`) : '';

    return [
      responsiveCSS ? <style>{responsiveCSS}</style> : null,
      <Tag style={style}>
        <slot />
      </Tag>,
    ];
  }
}
