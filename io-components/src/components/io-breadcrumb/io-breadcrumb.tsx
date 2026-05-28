import { Component, Element, Host, h } from '@stencil/core';

import { getBreadcrumbStyles } from './io-breadcrumb-styles';

type BreadcrumbItem = Element & { current: boolean };

/**
 * io-breadcrumb
 * =============
 * Breadcrumb navigation for hierarchical orientation.
 * Uses a declarative slot-based API with io-breadcrumb-item sub-components.
 *
 * Separators are inserted programmatically between slotted items via slotchange.
 * The last item automatically receives aria-current="page" if no item has current=true explicitly.
 *
 * @example
 * <io-breadcrumb>
 *   <io-breadcrumb-item href="/">Home</io-breadcrumb-item>
 *   <io-breadcrumb-item href="/services">Services</io-breadcrumb-item>
 *   <io-breadcrumb-item current>Digital Strategy</io-breadcrumb-item>
 * </io-breadcrumb>
 */
@Component({
  tag: 'io-breadcrumb',
  shadow: true,
})
export class IoBreadcrumb {
  @Element() el!: HTMLElement;

  // ── Slot handling ─────────────────────────────────────────────

  private handleSlotChange = () => {
    const items = Array.from(this.el.querySelectorAll('io-breadcrumb-item')) as BreadcrumbItem[];
    if (!items.length) return;

    if (!items.some(it => it.current === true)) {
      items[items.length - 1].current = true;
    }
  };

  // ── Render ───────────────────────────────────────────────────

  render() {
    return (
      <Host>
        <style>{getBreadcrumbStyles()}</style>
        <nav aria-label="Breadcrumb">
          <ol>
            <slot onSlotchange={this.handleSlotChange} />
          </ol>
        </nav>
      </Host>
    );
  }
}
