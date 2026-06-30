import { Component, Host, Prop, h } from '@stencil/core';

import { getAiTagStyles } from './io-ai-tag-styles';
import { getAiTagLabel, getAiTagTranslation } from './io-ai-tag-utils';

import type { IoAiTagVariant, IoAiTagLocale } from './types';

/**
 * io-ai-tag
 * ==========
 * EU AI Act transparency disclosure badge.
 *
 * Renders a pill badge indicating that content was generated or modified
 * by artificial intelligence. The `abbreviation` variant uses an `<abbr>`
 * element so screen readers announce the full term on focus or hover.
 *
 * Supported locales: 'en' (default), 'nl'.
 *
 * @example
 * <io-ai-tag variant="generated"></io-ai-tag>
 * <io-ai-tag variant="abbreviation" locale="nl"></io-ai-tag>
 */
@Component({
  tag: 'io-ai-tag',
  shadow: { delegatesFocus: true },
})
export class IoAiTag {
  /**
   * Display variant.
   * - 'abbreviation' — renders an <abbr> element with the full term as title
   * - 'generated'    — renders the locale-specific "AI-generated" string
   * - 'modified'     — renders the locale-specific "AI-modified" string
   */
  @Prop({ reflect: true }) variant: IoAiTagVariant = 'generated';

  /**
   * BCP 47 locale code — controls the label language.
   * Currently supports: 'en' | 'nl'. Unknown locales fall back to 'en'.
   */
  @Prop({ reflect: true }) locale: IoAiTagLocale = 'en';

  private renderSparkle() {
    return (
      <span class="ai-tag__icon" aria-hidden="true">
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Simple 4-point star / sparkle */}
          <path d="M5 0 L5.8 3.7 L9.5 5 L5.8 6.3 L5 10 L4.2 6.3 L0.5 5 L4.2 3.7 Z" />
        </svg>
      </span>
    );
  }

  render() {
    const { variant, locale } = this;
    const translation = getAiTagTranslation(locale);
    const label = getAiTagLabel(variant, locale);

    const content =
      variant === 'abbreviation' ? (
        <abbr title={translation.long}>{label}</abbr>
      ) : (
        label
      );

    return (
      <Host>
        <style>{getAiTagStyles()}</style>
        <span class="ai-tag">
          {this.renderSparkle()}
          {content}
        </span>
      </Host>
    );
  }
}
