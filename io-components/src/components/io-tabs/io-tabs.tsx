import { Component, Prop, Event, EventEmitter, Element, Host, Watch, h } from '@stencil/core';
import type { IoTabItem, IoTabsUpdateDetail } from './types';
import { getTabsStyles } from './io-tabs-styles';
import { createTabsIdPrefix, getEnabledTabs, getFirstEnabledTabValue, getNextEnabledIndex, getTabClassName, getTabIds } from './io-tabs-utils';

/**
 * io-tabs
 * ========
 * Controlled tabs-bar style navigation with full keyboard support.
 *
 * Manages roving tabindex (only the active tab is in the tab order).
 * Arrow Left/Right move focus; Enter/Space activate. Home/End jump to edges.
 *
 * @example
 * <io-tabs active-tab="overview" active-tab-index="0" tabs='[{"label":"Overview","value":"overview"},{"label":"Details","value":"details"}]'></io-tabs>
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

  /** 0-based index of the active tab (controlled like Porsche Tabs Bar). */
  @Prop({ mutable: true, reflect: true }) activeTabIndex = -1;

  /** Optional accessible label for the tablist region. */
  @Prop() label?: string;

  // ── Events ────────────────────────────────────────────────────

  /** Fires when a tab is activated. Payload is the tab's value. */
  @Event() change!: EventEmitter<string>;

  /** Fires when the active tab changes. Payload includes value + index. */
  @Event() update!: EventEmitter<IoTabsUpdateDetail>;

  // ── Private ───────────────────────────────────────────────────

  private tabIdPrefix!: string;

  private static instanceCount = 0;
  private isSyncingProps = false;

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    this.tabIdPrefix = createTabsIdPrefix(String(++IoTabs.instanceCount));
    this.reconcileActiveState();
  }

  @Watch('tabs')
  onTabsChange() {
    this.reconcileActiveState();
  }

  private reconcileActiveState() {
    if (this.tabs.length === 0) {
      this.activeTab = '';
      this.activeTabIndex = -1;
      return;
    }

    if (this.activeTab) {
      const activeByValueIndex = this.tabs.findIndex(tab => tab.value === this.activeTab && !tab.disabled);
      if (activeByValueIndex >= 0) {
        this.activeTabIndex = activeByValueIndex;
        return;
      }
    }

    if (this.activeTabIndex >= 0 && this.activeTabIndex < this.tabs.length && !this.tabs[this.activeTabIndex].disabled) {
      this.activeTab = this.tabs[this.activeTabIndex].value;
      return;
    }

    const firstEnabled = getFirstEnabledTabValue(this.tabs);
    if (firstEnabled) {
      this.activeTab = firstEnabled;
      this.activeTabIndex = this.tabs.findIndex(tab => tab.value === firstEnabled);
    } else {
      this.activeTab = '';
      this.activeTabIndex = -1;
    }
  }

  @Watch('activeTab')
  onActiveTabChange(newValue: string) {
    if (this.isSyncingProps) return;
    const idx = this.tabs.findIndex(tab => tab.value === newValue && !tab.disabled);
    if (idx >= 0 && idx !== this.activeTabIndex) {
      this.isSyncingProps = true;
      this.activeTabIndex = idx;
      this.isSyncingProps = false;
    }
  }

  @Watch('activeTabIndex')
  onActiveTabIndexChange(newValue: number) {
    if (this.isSyncingProps) return;
    if (newValue < 0 || newValue >= this.tabs.length) return;
    if (this.tabs[newValue].disabled) return;

    const nextValue = this.tabs[newValue].value;
    if (nextValue !== this.activeTab) {
      this.isSyncingProps = true;
      this.activeTab = nextValue;
      this.isSyncingProps = false;
    }
  }

  // ── Handlers ─────────────────────────────────────────────────

  private handleTabClick = (value: string, index: number) => {
    if (this.activeTab !== value) {
      this.activeTab = value;
      this.activeTabIndex = index;
      this.change.emit(value);
      this.update.emit({ activeTab: value, activeTabIndex: index });
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
      this.handleTabClick(this.tabs[index].value, index);
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
    const { tabs, activeTab, tabIdPrefix, label } = this;

    return (
      <Host>
        <style>{getTabsStyles()}</style>
        <div class="tablist" role="tablist" aria-label={label || undefined}>
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
                onClick={() => !tab.disabled && this.handleTabClick(tab.value, index)}
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
