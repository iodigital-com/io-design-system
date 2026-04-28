import { Component, Prop, Event, EventEmitter, Element, Host, h } from '@stencil/core';
import type { IoTabItem } from './types';
import { getTabsStyles } from './io-tabs-styles';
import { createTabsIdPrefix, getEnabledTabs, getFirstEnabledTabValue, getNextEnabledIndex, getTabClassName, getTabIds } from './io-tabs-utils';

/**
 * io-tabs
 * ========
 * Accessible tabbed navigation with full keyboard support.
 *
 * Manages roving tabindex (only the active tab is in the tab order).
 * Arrow Left/Right move focus; Enter/Space activate. Home/End jump to edges.
 *
 * @example
 * <io-tabs
 *   active-tab="overview"
 *   tabs='[{"label":"Overview","value":"overview"},{"label":"Details","value":"details"}]'
 * ></io-tabs>
 */
@Component({
  tag: 'io-tabs',
  shadow: { delegatesFocus: true },
})
export class IoTabs {
  @Element() el!: HTMLElement;

  // ── Props ─────────────────────────────────────────────────────

  /** Array of tab definitions */
  @Prop() tabs: IoTabItem[] = [];

  /** Value of the currently active tab */
  @Prop({ mutable: true, reflect: true }) activeTab = '';

  // ── Events ────────────────────────────────────────────────────

  /** Fires when a tab is activated. Payload is the tab's value. */
  @Event() change!: EventEmitter<string>;

  // ── Private ───────────────────────────────────────────────────

  private tabIdPrefix!: string;

  private static instanceCount = 0;

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    this.tabIdPrefix = createTabsIdPrefix(String(++IoTabs.instanceCount));
    // Default to first enabled tab if activeTab is not set
    if (!this.activeTab && this.tabs.length > 0) {
      const firstEnabled = getFirstEnabledTabValue(this.tabs);
      if (firstEnabled) this.activeTab = firstEnabled;
    }
  }

  // ── Handlers ─────────────────────────────────────────────────

  private handleTabClick = (value: string) => {
    if (this.activeTab !== value) {
      this.activeTab = value;
      this.change.emit(value);
    }
  };

  private handleKeyDown = (ev: KeyboardEvent, index: number) => {
    const enabledTabs = getEnabledTabs(this.tabs);

    if (enabledTabs.length === 0) {
      return;
    }

    const currentEnabledIndex = enabledTabs.findIndex(item => item.index === index);
    if (currentEnabledIndex < 0) {
      return;
    }

    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      this.handleTabClick(this.tabs[index].value);
      return;
    }

    const nextEnabledIndex = getNextEnabledIndex(ev.key, currentEnabledIndex, enabledTabs.length);

    if (nextEnabledIndex !== null) {
      ev.preventDefault();
      const targetIndex = enabledTabs[nextEnabledIndex].index;
      const tabEl = this.el.shadowRoot?.querySelectorAll<HTMLButtonElement>('.tab')[targetIndex];
      tabEl?.focus();
    }
  };

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { tabs, activeTab, tabIdPrefix } = this;

    return (
      <Host>
        <style>{getTabsStyles()}</style>
        <div class="tablist" role="tablist">
          {tabs.map((tab, index) => {
            const isActive = tab.value === activeTab;
            const { tabId } = getTabIds(tabIdPrefix, tab.value);

            return (
              <button
                key={tab.value}
                id={tabId}
                class={getTabClassName(isActive, !!tab.disabled)}
                role="tab"
                aria-selected={String(isActive)}
                aria-controls={tab.panelId || undefined}
                aria-disabled={tab.disabled ? 'true' : undefined}
                tabIndex={isActive ? 0 : -1}
                disabled={tab.disabled}
                onClick={() => !tab.disabled && this.handleTabClick(tab.value)}
                onKeyDown={(ev: KeyboardEvent) => this.handleKeyDown(ev, index)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </Host>
    );
  }
}
