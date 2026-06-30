import { Component, Prop, Host, h } from '@stencil/core';

import { getGridItemStyles } from './io-grid-item-styles';
import { resolveColSpan } from './io-grid-utils';

/**
 * io-grid-item
 * ============
 * Grid cell companion for io-grid.
 *
 * Controls how many columns (and optionally rows) this cell occupies.
 * Uses shadow: false (light DOM) to participate cleanly in the parent
 * CSS Grid layout — shadow DOM nodes would create an extra stacking layer.
 *
 * @slot - Cell content.
 *
 * @example
 * <io-grid>
 *   <io-grid-item col-span="8">Main content</io-grid-item>
 *   <io-grid-item col-span="4">Sidebar</io-grid-item>
 * </io-grid>
 */
@Component({
  tag: 'io-grid-item',
  shadow: false,
})
export class IoGridItem {
  // ── Props ─────────────────────────────────────────────────────

  /** Number of grid columns this item spans (1–12). */
  @Prop({ reflect: true }) colSpan: number | undefined;

  /** Number of grid rows this item spans. */
  @Prop({ reflect: true }) rowSpan: number | undefined;

  /** Starting column line (1–12 or 'auto'). */
  @Prop({ reflect: true }) colStart: number | string | undefined;

  // ── Render ────────────────────────────────────────────────────

  render() {
    const span = resolveColSpan(this.colSpan);
    const rowSpan = this.rowSpan && this.rowSpan > 1 ? this.rowSpan : undefined;

    const style: Record<string, string> = {
      'min-width': '0',
      'box-sizing': 'border-box',
    };

    if (span !== undefined) {
      style['grid-column'] = `span ${span}`;
    }
    if (rowSpan !== undefined) {
      style['grid-row'] = `span ${rowSpan}`;
    }
    if (this.colStart !== undefined && this.colStart !== 'auto') {
      style['grid-column-start'] = String(this.colStart);
      if (span !== undefined) {
        style['grid-column'] = `${this.colStart} / span ${span}`;
      }
    }

    return (
      <Host style={style}>
        <style>{getGridItemStyles()}</style>
        <slot />
      </Host>
    );
  }
}
