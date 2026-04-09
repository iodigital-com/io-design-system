import { Component, Prop, Host, h } from '@stencil/core';
import type { IoBadgeVariant } from './types';
import { getBadgeStyles } from './io-badge-styles';
import { getBadgeClassName } from './io-badge-utils';

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

  render() {
    return (
      <Host>
        <style>{getBadgeStyles()}</style>
        <span class={getBadgeClassName(this.variant)}>
          <slot />
        </span>
      </Host>
    );
  }
}
