import { Component, Prop, Host, h } from '@stencil/core';

import { getTextListStyles } from './io-text-list-styles';
import { resolveTextListColor, resolveTextListFontSize } from './io-text-list-utils';
import type { IoTextListColor, IoTextListSize, IoTextListTag } from './types';

/**
 * io-text-list
 * ============
 * Token-driven list typography primitive for ordered and unordered lists.
 * Renders a semantic <ul> or <ol> with consistent font size, weight, and
 * color from the io design token system.
 *
 * Slot `<li>` items directly — the component applies spacing and inherited
 * typography styles.
 *
 * @example
 * <io-text-list>
 *   <li>First item</li>
 *   <li>Second item</li>
 * </io-text-list>
 *
 * @example — ordered list with custom size
 * <io-text-list tag="ol" size="sm" color="secondary">
 *   <li>Step one</li>
 *   <li>Step two</li>
 * </io-text-list>
 */
@Component({
  tag: 'io-text-list',
  shadow: { delegatesFocus: true },
})
export class IoTextList {
  /** HTML list tag to render */
  @Prop({ reflect: true }) tag: IoTextListTag = 'ul';

  /** Font size using --io-font-size-* tokens */
  @Prop({ reflect: true }) size: IoTextListSize = 'base';

  /** Text color using semantic --io-text-* tokens */
  @Prop({ reflect: true }) color: IoTextListColor = 'primary';

  render() {
    const Tag = this.tag;
    const style: Record<string, string> = {
      fontSize: resolveTextListFontSize(this.size),
      color: resolveTextListColor(this.color),
    };

    return (
      <Host>
        <style>{getTextListStyles()}</style>
        <Tag class="text-list" style={style}>
          <slot />
        </Tag>
      </Host>
    );
  }
}
