import { Component, Prop, Event, EventEmitter, Element, Host, h } from '@stencil/core';

import { getButtonTileStyles } from './io-button-tile-styles';
import { resolveAspectRatio, resolveAlign, resolveSize, resolveWeight } from './io-button-tile-utils';
import type { IoTileAspectRatio, IoTileAlign, IoTileSize, IoTileWeight, IoButtonTileClickDetail } from './types';

let _idCounter = 0;

/**
 * io-button-tile
 * ==============
 * Media tile primitive with an embedded button action.
 *
 * Identical visual structure to io-link-tile but renders as <button>
 * rather than <a>. Use when the tile triggers an action (open modal,
 * add to cart, toggle favourite) rather than navigating to a new URL.
 *
 * Focus delegates from the host to the embedded button via
 * shadow: { delegatesFocus: true }.
 *
 * @slot - Primary media slot (img, picture, video).
 * @slot header - Tag chips, badges, or other header-area metadata.
 * @slot footer - Additional metadata below the label/description row.
 *
 * @example
 * <io-button-tile
 *   label="Add Blue Widget"
 *   description="Click to add to your dashboard."
 *   aspect-ratio="4/3"
 *   gradient
 * >
 *   <img src="/img/widget.jpg" alt="Blue Widget" />
 * </io-button-tile>
 */
@Component({
  tag: 'io-button-tile',
  shadow: { delegatesFocus: true },
})
export class IoButtonTile {
  @Element() el!: HTMLElement;

  private tileId = '';

  // ── Props ─────────────────────────────────────────────────────

  /** Tile label (required — accessible name for the button). */
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

  /** Native button type. */
  @Prop() type: 'button' | 'submit' | 'reset' = 'button';

  /** Disabled state. Prevents clicks and reduces opacity. */
  @Prop({ reflect: true }) disabled = false;

  /** Loading state — shows spinner, prevents double-submit. */
  @Prop({ reflect: true }) loading = false;

  // ── Events ────────────────────────────────────────────────────

  /** Emitted when the tile button is clicked (not fired when disabled or loading). */
  @Event() tileClick!: EventEmitter<IoButtonTileClickDetail>;

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    this.tileId = `io-button-tile-${++_idCounter}`;
    if (!this.label) {
      console.error('[io-button-tile] The `label` prop is required for accessibility.');
    }
  }

  // ── Handlers ─────────────────────────────────────────────────

  private handleClick = (e: MouseEvent) => {
    if (this.disabled || this.loading) {
      e.preventDefault();
      return;
    }
    this.tileClick.emit({ originalEvent: e });
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    if (this.disabled || this.loading) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.tileClick.emit({ originalEvent: e });
    }
  };

  // ── Render ────────────────────────────────────────────────────

  render() {
    const aspectRatio = resolveAspectRatio(this.aspectRatio);
    const align = resolveAlign(this.align);
    const size = resolveSize(this.size);
    const weight = resolveWeight(this.weight);

    const hostStyle = {
      '--io-button-tile-aspect-ratio': aspectRatio,
    };

    return (
      <Host
        style={hostStyle}
        data-align={align}
        data-size={size}
        data-weight={weight}
      >
        <style>{getButtonTileStyles()}</style>

        {/* Full-surface button */}
        <button
          id={this.tileId}
          class="tile__button"
          type={this.type}
          disabled={this.disabled}
          aria-label={this.description ? `${this.label} — ${this.description}` : this.label}
          aria-busy={this.loading ? 'true' : undefined}
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
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
