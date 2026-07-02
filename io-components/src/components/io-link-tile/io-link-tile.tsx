import { Component, Prop, Element, Host, h } from '@stencil/core';

import { getLinkTileStyles } from './io-link-tile-styles';
import { resolveAspectRatio, resolveAlign, resolveSize, resolveWeight, resolveTileRel } from './io-link-tile-utils';
import type { IoTileAspectRatio, IoTileAlign, IoTileSize, IoTileWeight } from './types';

let _idCounter = 0;

/**
 * io-link-tile
 * ============
 * Media tile primitive with an embedded link action.
 *
 * Wraps a media element (img/picture/video) in a visually rich card with
 * an optional gradient overlay, label, description, and navigational action.
 * A full-surface transparent anchor covers the entire tile for easy click
 * target while still allowing slotted interactive elements (io-tag chips,
 * custom footer links) to receive focus independently.
 *
 * Focus delegates from the host to the embedded anchor via
 * shadow: { delegatesFocus: true }.
 *
 * @slot - Primary media slot (img, picture, video).
 * @slot header - Tag chips, breadcrumbs, or other header-area metadata.
 * @slot footer - Additional metadata below the label/description row.
 *
 * @example
 * <io-link-tile
 *   href="/products/blue-widget"
 *   label="Blue Widget"
 *   description="High-performance widget in iO blue."
 *   aspect-ratio="4/3"
 *   gradient
 * >
 *   <img src="/img/widget.jpg" alt="Blue Widget" />
 * </io-link-tile>
 */
@Component({
  tag: 'io-link-tile',
  shadow: { delegatesFocus: true },
})
export class IoLinkTile {
  @Element() el!: HTMLElement;

  private tileId = '';

  // ── Props ─────────────────────────────────────────────────────

  /** Navigation destination (required). */
  @Prop() href!: string;

  /** Link target. '_blank' auto-adds noopener noreferrer. */
  @Prop() target: string | undefined = '_self';

  /** Rel attribute. */
  @Prop() rel: string | undefined;

  /** Download attribute for the link. */
  @Prop() download: string | undefined;

  /** Tile label (required — accessible name for the link). */
  @Prop() label!: string;

  /** Supporting description text displayed below the label. */
  @Prop() description: string | undefined;

  /** Media aspect ratio. */
  @Prop({ reflect: true }) aspectRatio: IoTileAspectRatio = '4/3';

  /** Text alignment of the overlay content. */
  @Prop({ reflect: true }) align: IoTileAlign = 'bottom';

  /** Label text size preset. */
  @Prop({ reflect: true }) size: IoTileSize = 'md';

  /** Label font weight. */
  @Prop({ reflect: true }) weight: IoTileWeight = 'semibold';

  /** Show gradient overlay behind the label/description. */
  @Prop({ reflect: true }) gradient = true;

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    this.tileId = `io-link-tile-${++_idCounter}`;
    if (!this.href) {
      console.error('[io-link-tile] The `href` prop is required.');
    }
    if (!this.label) {
      console.error('[io-link-tile] The `label` prop is required for accessibility.');
    }
  }

  // ── Render ────────────────────────────────────────────────────

  render() {
    const aspectRatio = resolveAspectRatio(this.aspectRatio);
    const align = resolveAlign(this.align);
    const size = resolveSize(this.size);
    const weight = resolveWeight(this.weight);
    const rel = resolveTileRel(this.rel, this.target);

    const hostStyle = {
      '--io-link-tile-aspect-ratio': aspectRatio.replace('/', '/'),
    };

    return (
      <Host
        style={hostStyle}
        data-align={align}
        data-size={size}
        data-weight={weight}
      >
        <style>{getLinkTileStyles()}</style>

        {/* Full-surface link anchor */}
        <a
          id={this.tileId}
          class="tile__link"
          href={this.href}
          target={this.target}
          rel={rel}
          download={this.download}
          aria-label={this.description ? `${this.label} — ${this.description}` : this.label}
          tabIndex={0}
        />

        {/* Media slot */}
        <div class="tile__media" aria-hidden="true">
          <slot />
        </div>

        {/* Gradient */}
        <div class="tile__gradient" aria-hidden="true" />

        {/* Content overlay */}
        <div class="tile__overlay" aria-hidden="true">
          <div class="tile__header">
            <slot name="header" />
          </div>

          {this.label && (
            <span class="tile__label">{this.label}</span>
          )}

          {this.description && (
            <span class="tile__description">{this.description}</span>
          )}

          <div class="tile__footer">
            <slot name="footer" />
          </div>
        </div>
      </Host>
    );
  }
}
