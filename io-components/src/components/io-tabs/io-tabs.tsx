import { Component, Prop, Event, EventEmitter, Element, Host, h } from '@stencil/core';
import type { IoTabItem } from './types';
import { getTabsStyles } from './io-tabs-styles';

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
  shadow: true,
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
  @Event() ioChange!: EventEmitter<string>;

  // ── Private ───────────────────────────────────────────────────

  private tabIdPrefix!: string;

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    this.tabIdPrefix = `io-tabs-${Math.random().toString(36).slice(2)}`;
    // Default to first enabled tab if activeTab is not set
    if (!this.activeTab && this.tabs.length > 0) {
      const first = this.tabs.find(t => !t.disabled);
      if (first) this.activeTab = first.value;
    }
  }

  // ── Handlers ─────────────────────────────────────────────────

  private handleTabClick = (value: string) => {
    if (this.activeTab !== value) {
      this.activeTab = value;
      this.ioChange.emit(value);
    }
  };

  private handleKeyDown = (ev: KeyboardEvent, index: number) => {
    const enabledTabs = this.tabs
      .map((t, i) => ({ tab: t, index: i }))
      .filter(({ tab }) => !tab.disabled);

    const currentEnabledIndex = enabledTabs.findIndex(({ index: i }) => i === index);

    let nextEnabledIndex: number | null = null;

    switch (ev.key) {
      case 'ArrowRight':
        ev.preventDefault();
        nextEnabledIndex = (currentEnabledIndex + 1) % enabledTabs.length;
        break;
      case 'ArrowLeft':
        ev.preventDefault();
        nextEnabledIndex = (currentEnabledIndex - 1 + enabledTabs.length) % enabledTabs.length;
        break;
      case 'Home':
        ev.preventDefault();
        nextEnabledIndex = 0;
        break;
      case 'End':
        ev.preventDefault();
        nextEnabledIndex = enabledTabs.length - 1;
        break;
      case 'Enter':
      case ' ':
        ev.preventDefault();
        this.handleTabClick(this.tabs[index].value);
        return;
    }

    if (nextEnabledIndex !== null) {
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
            const tabId = `${tabIdPrefix}-tab-${tab.value}`;
            const panelId = `${tabIdPrefix}-panel-${tab.value}`;

            return (
              <button
                key={tab.value}
                id={tabId}
                class={[
                  'tab',
                  isActive ? 'tab--active' : '',
                  tab.disabled ? 'tab--disabled' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                role="tab"
                aria-selected={String(isActive)}
                aria-controls={panelId}
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
