import { Component, Prop, Host, Watch, h } from '@stencil/core';

import { getGridStyles } from './io-grid-styles';
import { resolveGap, resolveAlign, resolveJustify, resolveColumns } from './io-grid-utils';
import type { IoGridGap, IoGridAlign, IoGridJustify } from './types';

/**
 * io-grid
 * ========
 * 12-column responsive CSS Grid layout primitive.
 *
 * Thin layout wrapper that sets up the grid context via CSS custom
 * properties. All real column arithmetic is left to child io-grid-item
 * elements (or light-DOM children using the same tokens).
 *
 * Uses shadow: false (light DOM) so consumers can use CSS selectors on
 * child elements without crossing a shadow boundary.
 *
 * @slot - Grid cells. Use io-grid-item or any block-level element.
 *
 * @example
 * <io-grid gap="md">
 *   <io-grid-item col-span="6">Left half</io-grid-item>
 *   <io-grid-item col-span="6">Right half</io-grid-item>
 * </io-grid>
 */
@Component({
  tag: 'io-grid',
  shadow: false,
})
export class IoGrid {
  // ── Props ─────────────────────────────────────────────────────

  /** Gap between grid cells. Maps to --io-grid-gap-* tokens. */
  @Prop({ reflect: true }) gap: IoGridGap = 'md';

  /** Number of columns in the grid. Default 12. */
  @Prop({ reflect: true }) columns = 12;

  /** Align-items for all grid cells. */
  @Prop({ reflect: true }) align: IoGridAlign = 'start';

  /** Justify-items for all grid cells. */
  @Prop({ reflect: true }) justify: IoGridJustify = 'stretch';

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    this.validateProps();
  }

  @Watch('gap')
  @Watch('columns')
  @Watch('align')
  @Watch('justify')
  validateProps() {
    const resolvedColumns = resolveColumns(this.columns);
    if (resolvedColumns !== this.columns) {
      console.error(`[io-grid] Invalid columns value: ${this.columns}. Clamped to ${resolvedColumns}.`);
    }
  }

  // ── Render ────────────────────────────────────────────────────

  render() {
    const gap = resolveGap(this.gap);
    const align = resolveAlign(this.align);
    const justify = resolveJustify(this.justify);
    const columns = resolveColumns(this.columns);

    const style = {
      display: 'grid',
      width: '100%',
      'grid-template-columns': `repeat(${columns}, 1fr)`,
      'gap': `var(--io-grid-gap-${gap})`,
      'align-items': align,
      'justify-items': justify,
      'box-sizing': 'border-box',
    };

    return (
      <Host style={style}>
        <style>{getGridStyles()}</style>
        <slot />
      </Host>
    );
  }
}
