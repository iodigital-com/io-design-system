import { Component, Prop, Host, h } from '@stencil/core';

import { getBadgeStyles } from './io-badge-styles';
import { getBadgeClassName } from './io-badge-utils';

import type { IoBadgeVariant, IoBadgeSize } from './types';

/**
 * io-badge
 * =========
 * Small label/tag for categorizing content or showing status.
 *
 * @example
 * <io-badge variant="blue">New</io-badge>
 * <io-badge variant="success">Active</io-badge>
 * <io-badge variant="error">Error</io-badge>
 */
@Component({
  tag: 'io-badge',
  shadow: { delegatesFocus: true },
})
export class IoBadge {
  /** Color/semantic variant */
  @Prop({ reflect: true }) variant: IoBadgeVariant = 'blue';

  /** Size variant aligned with io-tag */
  @Prop({ reflect: true }) size: IoBadgeSize = 'md';

  /** Accessible label for icon-only or abbreviated badges */
  @Prop() ariaLabel: string | undefined;

  render() {
    return (
      <Host aria-label={this.ariaLabel || undefined}>
        <style>{getBadgeStyles()}</style>
        <span class={getBadgeClassName(this.variant, this.size)}>
          <slot />
        </span>
      </Host>
    );
  }
}
