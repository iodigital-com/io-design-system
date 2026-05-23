import { Component, Element, Host, h } from '@stencil/core';

import { getBreadcrumbStyles } from './io-breadcrumb-styles';

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
    const ol = this.el.shadowRoot?.querySelector('ol');
    if (!ol) return;

    // Remove all existing separators before re-inserting to prevent duplicates
    ol.querySelectorAll('.breadcrumb__separator').forEach(s => s.remove());

    const items = Array.from(ol.querySelectorAll('io-breadcrumb-item'));

    items.forEach((item, i) => {
      if (i < items.length - 1) {
        const sep = document.createElement('span');
        sep.className = 'breadcrumb__separator';
        sep.setAttribute('aria-hidden', 'true');
        item.after(sep);
      }

      // Set current=true on last item if none has it explicitly
      if (i === items.length - 1 && !items.some(it => (it as any).current === true)) {
        (item as any).current = true;
      }
    });
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
