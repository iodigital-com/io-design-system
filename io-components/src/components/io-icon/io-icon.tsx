import { Component, Host, Prop, h } from '@stencil/core';

import type { IoIconName } from '../../utils/icons';
import { getIconSvg } from '../../utils/icons';
import { getIconStyles } from './io-icon-styles';
import type { IoIconSize } from './types';

/**
 * io-icon
 * ========
 * Renders a Lucide icon as an inline SVG within Shadow DOM.
 *
 * Sizing is controlled by the `size` prop which maps to --io-icon-size-*
 * CSS custom properties. The SVG inherits `color: currentColor` so it
 * adopts the text color of its parent.
 *
 * @example
 * <io-icon name="check" size="md"></io-icon>
 * <io-icon name="arrow-right" size="sm" label="Navigate forward"></io-icon>
 */
@Component({
  tag: 'io-icon',
  shadow: true,
})
export class IoIcon {
  /** Name of the Lucide icon to render. */
  @Prop({ reflect: true }) name!: IoIconName;

  /** Visual size of the icon. Defaults to 'md' (20px). */
  @Prop({ reflect: true }) size: IoIconSize = 'md';

  /** Accessible label. When provided, replaces aria-hidden with role="img" + aria-label. */
  @Prop() label?: string;

  render() {
    const svg = getIconSvg(this.name);
    if (!svg) return null;

    const svgWithAria = this.label
      ? svg.replace('aria-hidden="true"', `role="img" aria-label="${this.label}"`)
      : svg;

    return (
      <Host>
        <style>{getIconStyles()}</style>
        <span innerHTML={svgWithAria} />
      </Host>
    );
  }
}
