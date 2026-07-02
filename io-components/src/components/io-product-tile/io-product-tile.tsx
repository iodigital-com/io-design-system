import { Component, Prop, Event, EventEmitter, Element, Host, State, Watch, h } from '@stencil/core';

import { getProductTileStyles } from './io-product-tile-styles';
import { getHeartIcon, validateProductTileUsage } from './io-product-tile-utils';
import type { IoProductTileHeadingTag, IoProductTileAspect } from './types';

/**
 * io-product-tile
 * ===============
 * Commerce primitive tile for product listings: heading + price display +
 * optional strikethrough original price + optional wishlist/like button.
 *
 * Accessible price differentiation: use
 * `<s>` for semantic strikethrough with visually-hidden 'Original price:' / 'Sale price:'
 * labels so screen readers announce both values with meaningful context.
 *
 * The tile is optionally linked via the `href` prop (renders an `<a>` wrapper)
 * or a slotted `<a>` element. Providing both is disallowed.
 *
 * @example
 * <io-product-tile
 *   heading="Product name"
 *   price="€ 49,00"
 *   price-original="€ 79,00"
 *   description="Short description"
 *   href="/products/1"
 *   like-button
 * >
 *   <img slot="image" src="/product.jpg" alt="Product name" />
 * </io-product-tile>
 */
@Component({
  tag: 'io-product-tile',
  shadow: { delegatesFocus: true },
})
export class IoProductTile {
  @Element() el!: HTMLElement;

  // ── State ──────────────────────────────────────────────────────
  @State() private hasImageSlot = false;

  // ── Instance variables ─────────────────────────────────────────
  private headingId!: string;

  // ── Props ──────────────────────────────────────────────────────

  /** Product name displayed as the tile heading */
  @Prop() heading!: string;

  /** Semantic HTML tag for the heading. Defaults to 'h2'. */
  @Prop() headingTag: IoProductTileHeadingTag = 'h2';

  /** Current/sale price to display */
  @Prop() price!: string;

  /**
   * Optional original (pre-sale) price. When provided, it renders as
   * `<s>` (strikethrough) with screen-reader labels announcing the price
   * difference: "Sale price: €49.00 / Original price: €79.00".
   */
  @Prop() priceOriginal?: string;

  /** Optional short description shown beneath the heading */
  @Prop() description?: string;

  /**
   * Optional URL — renders the tile content inside an `<a>` tag.
   * Mutually exclusive with a slotted `<a>` element.
   */
  @Prop() href?: string;

  /** Link target — only used when `href` is set */
  @Prop() target?: string = '_self';

  /** Show a wishlist/like toggle button over the product image */
  @Prop({ reflect: true }) likeButton = false;

  /**
   * Controls whether the like button is in its active (liked) state.
   * Mutable so consumers can bind this reactively.
   */
  @Prop({ mutable: true, reflect: true }) liked = false;

  /** Image aspect ratio. Defaults to 'square'. */
  @Prop({ reflect: true }) aspect: IoProductTileAspect = 'square';

  /** Accessible label for the like button in its default (not liked) state */
  @Prop() likeLabel = 'Add to wishlist';

  /** Accessible label for the like button in its liked (active) state */
  @Prop() unlikeLabel = 'Remove from wishlist';

  // ── Events ──────────────────────────────────────────────────────

  /**
   * Emitted when the like button is toggled.
   * `event.detail` contains the new `liked` state.
   */
  @Event({ eventName: 'like' }) likeEvent!: EventEmitter<boolean>;

  // ── Lifecycle ───────────────────────────────────────────────────

  componentWillLoad() {
    this.headingId = `io-product-tile-heading-${Math.random().toString(36).slice(2)}`;
    this.hasImageSlot = Array.from(this.el.children).some(
      (c) => c.getAttribute('slot') === 'image',
    );

    if (!this.heading) {
      console.error('[io-product-tile] The `heading` prop is required for WCAG 4.1.2 compliance.');
    }
    if (!this.price) {
      console.error('[io-product-tile] The `price` prop is required.');
    }

    const hasSlottedAnchor = Array.from(this.el.children).some(
      (c) => c.tagName === 'A',
    );
    validateProductTileUsage(this.href, hasSlottedAnchor);
  }

  @Watch('liked')
  onLikedChange() {
    // Propagate external liked changes (no re-emit)
  }

  // ── Handlers ────────────────────────────────────────────────────

  private handleImageSlotChange = () => {
    this.hasImageSlot = Array.from(this.el.children).some(
      (c) => c.getAttribute('slot') === 'image',
    );
  };

  private handleLikeClick = (ev: MouseEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
    this.liked = !this.liked;
    this.likeEvent.emit(this.liked);
  };

  // ── Render ───────────────────────────────────────────────────────

  /**
   * @slot image - Product image (use an <img> with alt text).
   * @slot - Default slot. Additional content rendered below the price.
   */
  render() {
    const {
      heading, headingTag, price, priceOriginal, description, href, target,
      likeButton, liked, likeLabel, unlikeLabel, headingId,
    } = this;

    const HeadingTag = headingTag;
    const hasSale = Boolean(priceOriginal);
    const Tag = href ? 'a' : 'div';

    const linkProps: Record<string, unknown> = {};
    if (href) {
      linkProps['href'] = href;
      linkProps['target'] = target;
    }

    return (
      <Host>
        <style>{getProductTileStyles()}</style>
        <Tag class="product-tile" aria-labelledby={headingId} {...linkProps}>
          {/* Media / image area */}
          <div class="product-tile__media">
            <slot name="image" onSlotchange={this.handleImageSlotChange} />

            {likeButton && (
              <button
                type="button"
                class={`product-tile__like${liked ? ' product-tile__like--liked' : ''}`}
                aria-label={liked ? unlikeLabel : likeLabel}
                aria-pressed={String(liked)}
                onClick={this.handleLikeClick}
                innerHTML={getHeartIcon(liked)}
              />
            )}
          </div>

          {/* Text content */}
          <div class="product-tile__content">
            <HeadingTag id={headingId} class="product-tile__heading">
              {heading}
            </HeadingTag>

            {description && (
              <p class="product-tile__description">{description}</p>
            )}

            {/* Price block — accessible price diff via sr-only labels */}
            <div class="product-tile__prices">
              <span class={`product-tile__price${hasSale ? ' product-tile__price--sale' : ''}`}>
                {hasSale && <span class="sr-only">Sale price: </span>}
                {price}
              </span>
              {hasSale && (
                <s class="product-tile__price-original">
                  <span class="sr-only">Original price: </span>
                  {priceOriginal}
                </s>
              )}
            </div>

            {/* Optional extra content */}
            <slot />
          </div>
        </Tag>
      </Host>
    );
  }
}
