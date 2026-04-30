import { Component, Prop, Element, Host, h } from '@stencil/core';

import { getOptgroupStyles } from './io-optgroup-styles';
import { getOptgroupClass } from './io-optgroup-utils';

/**
 * io-optgroup
 * ============
 * Groups related io-option elements inside a custom io-select combobox.
 *
 * @example
 * <io-optgroup label="Leadership">
 *   <io-option value="charlie" label="Charlie Brown"></io-option>
 * </io-optgroup>
 */
@Component({
  tag: 'io-optgroup',
  shadow: true,
})
export class IoOptgroup {
  @Element() el!: HTMLElement;

  /** Group heading text */
  @Prop() label!: string;

  /** Disables all child io-option elements visually */
  @Prop({ reflect: true }) disabled = false;

  render() {
    return (
      <Host role="group" aria-label={this.label} aria-disabled={this.disabled ? 'true' : undefined}>
        <style>{getOptgroupStyles()}</style>
        <div class={getOptgroupClass(this.disabled)}>
          <span class="optgroup__label" aria-hidden="true">{this.label}</span>
          <slot />
        </div>
      </Host>
    );
  }
}
