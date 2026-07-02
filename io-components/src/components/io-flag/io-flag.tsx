import { Component, Host, Prop, h } from '@stencil/core';

import { getFlagStyles } from './io-flag-styles';
import { getFlagLabel, getFlagSrc, FLAG_SIZE_PX } from './io-flag-utils';

import type { IoFlagName, IoFlagSize } from './types';

/**
 * io-flag
 * ========
 * Country flag indicator using the io icon size scale.
 *
 * Ships a curated set of flags: EU member states plus key client regions.
 * Flags are lazy-loaded from flagcdn.com — no bundle overhead.
 * Uses an <img> element with the country name as alt text for accessibility.
 *
 * @example
 * <io-flag name="nl" size="md"></io-flag>
 * <io-flag name="us" size="lg" label="United States"></io-flag>
 */
@Component({
  tag: 'io-flag',
  shadow: { delegatesFocus: true },
})
export class IoFlag {
  /**
   * ISO 3166-1 alpha-2 country code (lowercase).
   * Must be one of the codes in the shipped flag catalogue.
   */
  @Prop({ reflect: true }) name!: IoFlagName;

  /**
   * Visual size — aligned with io-icon's size scale.
   * Use 'inherit' to match the surrounding font size.
   */
  @Prop({ reflect: true }) size: IoFlagSize = 'md';

  /**
   * Accessible label for the flag image.
   * Defaults to the country name derived from the ISO code.
   * Pass an empty string to treat the flag as decorative (sets alt="").
   */
  @Prop() label?: string;

  render() {
    const { name, size } = this;

    if (!name) return null;

    const alt = getFlagLabel(name, this.label);
    const sizePx = FLAG_SIZE_PX[size] ?? FLAG_SIZE_PX['md'];
    const src = getFlagSrc(name, sizePx);
    const srcSet = [
      `${getFlagSrc(name, sizePx)} 1x`,
      `${getFlagSrc(name, sizePx * 2)} 2x`,
    ].join(', ');

    return (
      <Host>
        <style>{getFlagStyles()}</style>
        <span class={`flag flag--${size}`}>
          <img
            src={src}
            srcset={srcSet}
            alt={alt}
            width={sizePx}
            loading="lazy"
          />
        </span>
      </Host>
    );
  }
}
