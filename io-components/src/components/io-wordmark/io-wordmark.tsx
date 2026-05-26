import { Component, Prop, Host, h } from '@stencil/core';

import { getWordmarkStyles } from './io-wordmark-styles';

import type { IoWordmarkSize } from './types';

/**
 * io-wordmark
 * ===========
 * Reusable "io Digital" brand wordmark. Renders "io" in brand blue and
 * "digital" in the current text colour, using the primary font at a
 * token-driven size.
 *
 * When `href` is set, the wordmark renders inside an `<a>` element, enabling
 * logo-as-home-link navigation patterns without shadow-DOM focus issues.
 *
 * @example
 * <io-wordmark />
 * <io-wordmark size="lg" />
 * <io-wordmark mono />
 * <io-wordmark href="/" aria-label="iO Digital — go to homepage" />
 * <io-wordmark href="https://iodigital.com" target="_blank" rel="noopener noreferrer" />
 */
@Component({
  tag: 'io-wordmark',
  // delegatesFocus must be true unconditionally: the component may render a
  // focusable <a> element, and this compile-time flag cannot be toggled at runtime.
  shadow: { delegatesFocus: true },
})
export class IoWordmark {
  /** Size scale controlling the overall font-size of the wordmark */
  @Prop({ reflect: true }) size: IoWordmarkSize = 'md';

  /** Monochrome mode — both "io" and "digital" use current text colour */
  @Prop({ reflect: true }) mono: boolean = false;

  /**
   * Accessible label applied to the root element (or the `<a>` when href is set).
   * Defaults to "io Digital".
   */
  @Prop() ariaLabel: string = 'io Digital';

  /**
   * When provided, the wordmark renders as an `<a>` element with this href.
   * Common use case: logo linking back to the homepage.
   */
  @Prop() href?: string;

  /**
   * Browsing context for the link (`_self`, `_blank`, etc.).
   * Only applied when `href` is set.
   */
  @Prop() target?: string;

  /**
   * Link relationship (`noopener noreferrer`, etc.).
   * Only applied when `href` is set.
   */
  @Prop() rel?: string;

  render() {
    const { href, target, rel, ariaLabel, size } = this;
    const isLink = Boolean(href);

    const inner = (
      <span class={`wordmark wordmark--${size}`} part="root">
        <span class="wordmark__io" part="io">io</span>
        <span class="wordmark__digital" part="digital">digital</span>
      </span>
    );

    if (isLink) {
      return (
        <Host>
          <style>{getWordmarkStyles()}</style>
          <a
            href={href}
            target={target}
            rel={rel}
            aria-label={ariaLabel}
            class="wordmark-link"
            part="link"
          >
            {inner}
          </a>
        </Host>
      );
    }

    return (
      <Host role="img" aria-label={ariaLabel}>
        <style>{getWordmarkStyles()}</style>
        {inner}
      </Host>
    );
  }
}
