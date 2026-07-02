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
          <io-icon name="sparkles" size="xs" aria-hidden="true" />
          {content}
        </span>
      </Host>
    );
  }
}
