import { Component, Prop, Event, EventEmitter, Element, Host, Watch, h } from '@stencil/core';

import { getTabsBarStyles } from './io-tabs-bar-styles';
import { getNextEnabledIndex, normalizeActiveTabIndex } from './io-tabs-bar-utils';

import type { IoTabsBarUpdateDetail } from './types';

/**
 * io-tabs-bar
 * ===========
 * Standalone decorative tab navigation bar — no panel management.
 *
 * Use this component when the tab content is managed externally by a router
 * (e.g. Next.js App Router, Angular Router) rather than through slot-based
 * panel switching. The consumer owns route/content transitions; io-tabs-bar
 * provides the visual tab strip with active indicator, keyboard navigation,
 * and ARIA tablist semantics.
 *
 * Place <button> children inside the component. The component applies
 * role="tab", aria-selected, and tabindex automatically. Control the
 * active tab via the activeTabIndex prop and respond to the update event.
 *
 * Keyboard: Arrow Left/Right move focus; Enter/Space activate; Home/End jump.
 * Disabled buttons (via the HTML disabled attribute) are skipped.
 *
 * @example
 * <io-tabs-bar active-tab-index="0" label="Main navigation">
 *   <button type="button">Overview</button>
 *   <button type="button">Details</button>
 *   <button type="button" disabled>Settings</button>
 * </io-tabs-bar>
 */
@Component({
  tag: 'io-tabs-bar',
  shadow: { delegatesFocus: true },
})
export class IoTabsBar {
  @Element() el!: HTMLElement;

  // ── Props ─────────────────────────────────────────────────────

  /** 0-based index of the active tab (controlled). */
  @Prop({ mutable: true, reflect: true }) activeTabIndex = 0;

  /** Optional accessible label for the tablist region. */
  @Prop() label?: string;

  // ── Events ────────────────────────────────────────────────────

  /**
   * Fires when the user activates a different tab (click, Enter, or Space).
   * Update your controlled state in the handler:
   *   element.addEventListener('update', e => { myIndex = e.detail.activeTabIndex; });
   */
  @Event() update!: EventEmitter<IoTabsBarUpdateDetail>;

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
    const normalized = normalizeActiveTabIndex(newIndex, this.buttons);
    if (normalized !== newIndex) {
      this.activeTabIndex = normalized;
      return;
    }
    this.applyAriaToButtons(this.buttons, normalized);
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

    const normalized = normalizeActiveTabIndex(this.activeTabIndex, this.buttons);
    if (normalized !== this.activeTabIndex) {
      this.activeTabIndex = normalized;
    }

    this.setupListeners();
    this.applyAriaToButtons(this.buttons, normalized);
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
      const isActive = index === activeIndex && !btn.disabled;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', String(isActive));
      btn.setAttribute('tabindex', String(isActive ? 0 : -1));
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

    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      this.handleTabClick(index);
      return;
    }

    const currentEnabledIndex = enabled.findIndex((item) => item.index === index);
    if (currentEnabledIndex < 0) {
      const fallbackIndex =
        ev.key === 'ArrowLeft' || ev.key === 'End'
          ? enabled.length - 1
          : ev.key === 'ArrowRight' || ev.key === 'Home'
            ? 0
            : null;

      if (fallbackIndex !== null) {
        ev.preventDefault();
        enabled[fallbackIndex].btn.focus();
      }
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
        <style>{getTabsBarStyles()}</style>
        <div
          class="tablist"
          role="tablist"
          aria-orientation="horizontal"
          aria-label={this.label || undefined}
        >
          <slot onSlotchange={this.onSlotChange} />
        </div>
      </Host>
    );
  }
}
