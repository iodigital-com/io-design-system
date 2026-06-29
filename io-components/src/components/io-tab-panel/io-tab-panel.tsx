import { Component, Prop, Element, Host, h } from '@stencil/core';

import { getTabPanelStyles } from './io-tab-panel-styles';

/**
 * io-tab-panel
 * ============
 * Companion panel component for io-tabs.
 *
 * Declares a single tab pane with a `label` prop that io-tabs reads to generate
 * the corresponding tab button. Consumers no longer need to manage `panelIds`,
 * `role="tabpanel"`, `hidden`, `tabindex`, or `aria-labelledby` manually.
 *
 * io-tabs scans slotted io-tab-panel children, auto-generates the tab button
 * strip, and wires up all ARIA relationships.
 *
 * When used standalone (outside io-tabs), it renders as a plain tabpanel region.
 * The `hidden` and `labelledBy` props allow direct control when needed.
 *
 * @example — inside io-tabs (recommended)
 * <io-tabs>
 *   <io-tab-panel label="Overview">Overview content</io-tab-panel>
 *   <io-tab-panel label="Details">Details content</io-tab-panel>
 * </io-tabs>
 *
 * @example — standalone (with explicit ARIA wiring)
 * <io-tab-panel label="Overview" labelled-by="tab-overview">
 *   Overview content
 * </io-tab-panel>
 */
@Component({
  tag: 'io-tab-panel',
  shadow: { delegatesFocus: true },
})
export class IoTabPanel {
  @Element() el!: HTMLElement;

  // ── Props ─────────────────────────────────────────────────────

  /**
   * Label for the corresponding tab button.
   * When io-tabs renders the tab strip, this text becomes the button label.
   * Also used as the accessible name of the panel region when labelledBy is not set.
   */
  @Prop() label!: string;

  /**
   * When true, the panel is hidden (display: none).
   * io-tabs sets this automatically based on the active tab index.
   * Consumers can also set it directly when using the panel standalone.
   */
  @Prop({ mutable: true, reflect: true }) hidden = false;

  /**
   * ID of the tab button that controls this panel (aria-labelledby target).
   * Set by io-tabs automatically. Consumers may also set it directly.
   */
  @Prop() labelledBy?: string;

  /**
   * Explicit ID override for the panel element.
   * If not set, io-tabs generates a stable ID for ARIA wiring.
   */
  @Prop() panelId?: string;

  // ── Private ───────────────────────────────────────────────────

  private resolvedId = '';

  componentWillLoad() {
    if (!this.label) {
      console.error('[io-tab-panel] The `label` prop is required.');
    }
    // Generate a stable ID that io-tabs can read and reference as aria-controls.
    this.resolvedId = this.panelId || this.el.id || `io-tab-panel-${Math.random().toString(36).slice(2, 8)}`;
    if (!this.el.id) {
      this.el.id = this.resolvedId;
    }
  }

  // ── Render ───────────────────────────────────────────────────

  /**
   * @slot - Default slot. Content of the tab panel.
   */
  render() {
    return (
      <Host>
        <style>{getTabPanelStyles()}</style>
        <div
          class="tab-panel"
          role="tabpanel"
          id={this.resolvedId}
          aria-label={this.labelledBy ? undefined : this.label}
          aria-labelledby={this.labelledBy || undefined}
          tabindex={0}
        >
          <slot />
        </div>
      </Host>
    );
  }
}
