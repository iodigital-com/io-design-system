import { Component, Prop, Event, EventEmitter, Element, Host, Watch, h } from '@stencil/core';
import type { IoTabsUpdateDetail } from './types';
import { getTabsStyles } from './io-tabs-styles';
import { getNextEnabledIndex } from './io-tabs-utils';

/**
 * io-tabs
 * ========
 * Slot-based controlled tabs-bar navigation with full keyboard support.
 * Aligns with the Porsche Tabs Bar API: place <button> children inside the
 * component and control the active tab via activeTabIndex + the update event.
 *
 * Manages roving tabindex (only the active tab is in the tab order).
 * Arrow Left/Right move focus; Enter/Space activate. Home/End jump to edges.
 * Disabled buttons (via the HTML disabled attribute) are skipped automatically.
 *
 * @example
 * <io-tabs active-tab-index="0">
 *   <button type="button">Overview</button>
 *   <button type="button">Details</button>
 *   <button type="button" disabled>Settings</button>
 * </io-tabs>
 */
@Component({
  tag: 'io-tabs',
  shadow: { delegatesFocus: true },
})
export class IoTabs {
  @Element() el!: HTMLElement;

  // ── Props ─────────────────────────────────────────────────────

  /** 0-based index of the active tab (controlled, like Porsche Tabs Bar). */
  @Prop({ mutable: true, reflect: true }) activeTabIndex = 0;

  /** Optional accessible label for the tablist region. */
  @Prop() label?: string;

  // ── Events ────────────────────────────────────────────────────

  /**
   * Fires when the user activates a different tab (click, Enter, or Space).
   * Update your controlled state in the handler:
   *   element.addEventListener('update', e => { myIndex = e.detail.activeTabIndex; });
   */
  @Event() update!: EventEmitter<IoTabsUpdateDetail>;

  // ── Private ───────────────────────────────────────────────────

  private slotEl: HTMLSlotElement | null = null;
  private buttons: HTMLButtonElement[] = [];
  private clickHandlers: Map<HTMLButtonElement, () => void> = new Map();
  private keyHandlers: Map<HTMLButtonElement, (ev: KeyboardEvent) => void> = new Map();

  // ── Lifecycle ─────────────────────────────────────────────────

  componentDidLoad() {
    this.slotEl = this.el.shadowRoot?.querySelector('slot') ?? null;
    this.syncFromSlot();
  }

  disconnectedCallback() {
    this.teardownListeners();
  }

  @Watch('activeTabIndex')
  onActiveTabIndexChange(newIndex: number) {
    this.applyAriaToButtons(this.buttons, newIndex);
  }

  // ── Slot handling ─────────────────────────────────────────────

  private onSlotChange = () => {
    this.syncFromSlot();
  };

  /** Called after slot changes — reads assigned buttons and wires them up. */
  private syncFromSlot() {
    this.teardownListeners();

    const assigned = this.slotEl?.assignedElements() ?? [];
    this.buttons = assigned.filter((el): el is HTMLButtonElement => el.tagName === 'BUTTON');

    // Clamp activeTabIndex if the new slot has fewer tabs
    if (this.buttons.length > 0 && this.activeTabIndex >= this.buttons.length) {
      this.activeTabIndex = 0;
    }

    this.setupListeners();
    this.applyAriaToButtons(this.buttons, this.activeTabIndex);
  }

  private setupListeners() {
    this.buttons.forEach((btn, index) => {
      const clickHandler = () => this.handleTabClick(index);
      const keyHandler = (ev: KeyboardEvent) => this.handleKeyDown(ev, index);
      btn.addEventListener('click', clickHandler);
      btn.addEventListener('keydown', keyHandler);
      this.clickHandlers.set(btn, clickHandler);
      this.keyHandlers.set(btn, keyHandler);
    });
  }

  private teardownListeners() {
    for (const [btn, handler] of this.clickHandlers) {
      btn.removeEventListener('click', handler);
    }
    for (const [btn, handler] of this.keyHandlers) {
      btn.removeEventListener('keydown', handler);
    }
    this.clickHandlers.clear();
    this.keyHandlers.clear();
  }

  private applyAriaToButtons(buttons: HTMLButtonElement[], activeIndex: number) {
    buttons.forEach((btn, index) => {
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', String(index === activeIndex));
      btn.setAttribute('tabindex', String(index === activeIndex ? 0 : -1));
    });
  }

  // ── Handlers ─────────────────────────────────────────────────

  private handleTabClick(index: number) {
    const btn = this.buttons[index];
    if (!btn || btn.disabled) return;
    if (index === this.activeTabIndex) return;

    this.activeTabIndex = index;
    this.update.emit({ activeTabIndex: index });
  }

  private handleKeyDown(ev: KeyboardEvent, index: number) {
    const enabled = this.getEnabledButtons();
    if (enabled.length === 0) return;

    const currentEnabledIndex = enabled.findIndex(item => item.index === index);
    if (currentEnabledIndex < 0) return;

    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      this.handleTabClick(index);
      return;
    }

    const nextEnabledIndex = getNextEnabledIndex(ev.key, currentEnabledIndex, enabled.length);
    if (nextEnabledIndex !== null) {
      ev.preventDefault();
      enabled[nextEnabledIndex].btn.focus();
    }
  }

  private getEnabledButtons(): Array<{ btn: HTMLButtonElement; index: number }> {
    return this.buttons
      .map((btn, index) => ({ btn, index }))
      .filter(({ btn }) => !btn.disabled);
  }

  // ── Render ───────────────────────────────────────────────────

  render() {
    return (
      <Host>
        <style>{getTabsStyles()}</style>
        <div class="tablist" role="tablist" aria-orientation="horizontal" aria-label={this.label || undefined}>
          <slot onSlotchange={this.onSlotChange} />
        </div>
      </Host>
    );
  }
}
