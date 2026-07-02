import { Component, Element, Host, h } from '@stencil/core';

@Component({
  tag: 'io-text-list-item',
  shadow: false,
})
export class IoTextListItem {
  @Element() el!: HTMLElement;

  connectedCallback() {
    const parent = this.el.parentElement;
    if (parent?.tagName.toLowerCase() !== 'io-text-list') {
      console.warn('[io-text-list-item] must be a direct child of <io-text-list>.');
    }
  }

  render() {
    return (
      <Host role="listitem">
        <slot />
      </Host>
    );
  }
}
