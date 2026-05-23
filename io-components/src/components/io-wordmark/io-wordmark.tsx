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
 * @example
 * <io-wordmark />
 * <io-wordmark size="lg" />
 * <io-wordmark mono />
 */
@Component({
  tag: 'io-wordmark',
  shadow: { delegatesFocus: false },
})
export class IoWordmark {
  /** Size scale controlling the overall font-size of the wordmark */
  @Prop({ reflect: true }) size: IoWordmarkSize = 'md';

  /** Monochrome mode — both "io" and "digital" use current text colour */
  @Prop({ reflect: true }) mono: boolean = false;

  /** Accessible label for the wordmark image */
  @Prop() ariaLabel: string = 'io Digital';

  render() {
    return (
      <Host role="img" aria-label={this.ariaLabel}>
        <style>{getWordmarkStyles()}</style>
        <span class={`wordmark wordmark--${this.size}`} part="root">
          <span class="wordmark__io" part="io">io</span>
          <span class="wordmark__digital" part="digital">digital</span>
        </span>
      </Host>
    );
  }
}
