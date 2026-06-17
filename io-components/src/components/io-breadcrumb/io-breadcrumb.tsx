import { Component, Element, Host, Prop, h } from '@stencil/core';

import { getBreadcrumbStyles } from './io-breadcrumb-styles';

type BreadcrumbItem = Element & { current: boolean };

/**
 * io-breadcrumb
 * =============
 * Breadcrumb navigation for hierarchical orientation.
 * Uses a declarative slot-based API with io-breadcrumb-item sub-components.
 *
 * Separators are rendered by each io-breadcrumb-item in its own shadow DOM.
 * The slotchange handler only infers current=true on the last item when no item sets it explicitly.
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

  // ── Props ─────────────────────────────────────────────────────

  /**
   * Accessible label for the nav landmark. Override for non-English UIs or when
   * multiple breadcrumbs appear on the same page (WCAG 2.4.6 / 4.1.2).
   */
  @Prop() label = 'Breadcrumb';

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
        <nav aria-label={this.label}>
          <ol>
            <slot onSlotchange={this.handleSlotChange} />
          </ol>
        </nav>
      </Host>
    );
  }
}
