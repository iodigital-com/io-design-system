import { Component, Prop, Host, h, Watch } from '@stencil/core';

import { getBadgeStyles } from './io-badge-styles';
import { getBadgeClassName, DEPRECATED_BADGE_COLOR_MAP } from './io-badge-utils';
import type { IoIconName } from '../../utils/icons';

import type { IoBadgeVariant, IoBadgeAppearance, IoBadgeSize } from './types';

/**
 * io-badge
 * =========
 * Small non-interactive label for categorizing content or showing status.
 *
 * @example
 * <io-badge variant="primary">New</io-badge>
 * <io-badge variant="success" appearance="solid">Active</io-badge>
 * <io-badge variant="error" icon="alert-circle">Error</io-badge>
 */
@Component({
  tag: 'io-badge',
  shadow: { delegatesFocus: true },
})
export class IoBadge {
  /**
   * Semantic colour variant.
   * Replaces legacy brand-colour names (beige, rouge, etc.).
   * Legacy values are still accepted for backwards compatibility.
   */
  @Prop({ reflect: true }) variant: IoBadgeVariant = 'primary';

  /**
   * Appearance modifier — controls the fill/blend style.
   * - solid: fully-filled background (default for badges)
   * - soft: translucent tinted background
   * - frosted: backdrop-filter blur over a semi-transparent fill
   */
  @Prop({ reflect: true }) appearance: IoBadgeAppearance = 'soft';

  /** Size variant: sm (compact), md (default), lg (prominent) */
  @Prop({ reflect: true }) size: IoBadgeSize = 'md';

  /** Accessible label for icon-only or abbreviated badges */
  @Prop({ attribute: 'aria-label' }) ariaLabel: string | undefined;

  /**
   * Optional leading icon name (from the io icon set).
   * Renders with `aria-hidden="true"` and `size="xs"`.
   */
  @Prop() icon?: IoIconName;

  /**
   * Custom SVG URL for the leading icon.
   * When set alongside `icon`, this URL takes precedence as the icon source.
   */
  @Prop() iconSource?: string;

  // ── Lifecycle ─────────────────────────────────────────────────

  @Watch('variant')
  onVariantChange(newVariant: IoBadgeVariant) {
    const legacyNames = ['beige', 'blue', 'dark', 'orange', 'rouge', 'outline'];
    if (legacyNames.includes(newVariant as string)) {
      const mapped = DEPRECATED_BADGE_COLOR_MAP[newVariant as string];
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn(
          `[io-badge] variant="${newVariant}" is a deprecated brand-colour name. ` +
          `Use variant="${mapped ?? 'neutral'}" instead. This alias will be removed in a future release.`
        );
      }
    }
  }

  render() {
    const { variant, appearance, size, icon, iconSource } = this;
    const badgeClass = getBadgeClassName(variant, appearance, size);

    const iconEl = (icon || iconSource) ? (
      <io-icon
        name={icon ?? 'x'}
        iconSource={iconSource}
        size="xs"
        aria-hidden="true"
      />
    ) : null;

    return (
      <Host aria-label={this.ariaLabel || undefined}>
        <style>{getBadgeStyles()}</style>
        <span class={badgeClass}>
          {iconEl}
          <slot />
        </span>
      </Host>
    );
  }
}
