import { Component, Prop, Event, EventEmitter, Element, Host, Watch, h } from '@stencil/core';

import { getTabsBarStyles } from './io-tabs-bar-styles';
import { getNextEnabledIndex, normalizeActiveTabIndex } from './io-tabs-bar-utils';

import type { IoTabsBarUpdateDetail } from './types';

/** Union of element types that can serve as tab items inside io-tabs-bar. */
type TabItem = HTMLButtonElement | HTMLAnchorElement;

/** Returns true when a tab item should be treated as disabled. */
function isTabItemDisabled(item: TabItem): boolean {
  if (item instanceof HTMLButtonElement) return item.disabled;
  // Anchor elements use aria-disabled attribute for disabled state
  return item.getAttribute('aria-disabled') === 'true';
}

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
 * Place <button> or <a> children inside the component. The component applies
 * role="tab", aria-selected, and tabindex automatically. Control the
 * active tab via the activeTabIndex prop and respond to the update event.
 *
 * Use <a> elements for navigation tab patterns where each tab is a route link.
 * Use <button> elements for in-page tab switching.
 *
 * Keyboard: Arrow Left/Right move focus; Enter/Space activate; Home/End jump.
 * Disabled buttons (via the HTML disabled attribute) are skipped.
 * Disabled anchors (via aria-disabled="true") are skipped.
 *
 * @example
 * <io-tabs-bar active-tab-index="0" label="Main navigation">
 *   <button type="button">Overview</button>
 *   <button type="button">Details</button>
 *   <button type="button" disabled>Settings</button>
 * </io-tabs-bar>
 *
 * @example — anchor navigation pattern
 * <io-tabs-bar active-tab-index="0" label="Site navigation">
 *   <a href="/overview" aria-current="page">Overview</a>
 *   <a href="/details">Details</a>
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

  /** When true, applies a compact layout with reduced padding. */
  @Prop({ reflect: true }) compact = false;

  // ── Events ────────────────────────────────────────────────────

  /**
   * Fires when the user activates a different tab (click, Enter, or Space).
   * Update your controlled state in the handler:
   *   element.addEventListener('update', e => { myIndex = e.detail.activeTabIndex; });
   */
  @Event() update!: EventEmitter<IoTabsBarUpdateDetail>;

  // ── Private ───────────────────────────────────────────────────

  private slotEl: HTMLSlotElement | null = null;
  private buttons: TabItem[] = [];
  private clickHandlers: Map<TabItem, () => void> = new Map();
  private keyHandlers: Map<TabItem, (ev: KeyboardEvent) => void> = new Map();

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

  /** Called after slot changes — reads assigned buttons/anchors and wires them up. */
  private syncFromSlot() {
    this.teardownListeners();

    const assigned = this.slotEl?.assignedElements() ?? [];
    this.buttons = assigned.filter(
      (el): el is TabItem => el.tagName === 'BUTTON' || el.tagName === 'A',
    );

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

  private applyAriaToButtons(buttons: TabItem[], activeIndex: number) {
    buttons.forEach((btn, index) => {
      const isActive = index === activeIndex && !isTabItemDisabled(btn);
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', String(isActive));
      btn.setAttribute('tabindex', String(isActive ? 0 : -1));
    });
  }

  // ── Handlers ─────────────────────────────────────────────────

  private handleTabClick(index: number) {
    const btn = this.buttons[index];
    if (!btn || isTabItemDisabled(btn)) return;
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

  private getEnabledButtons(): Array<{ btn: TabItem; index: number }> {
    return this.buttons
      .map((btn, index) => ({ btn, index }))
      .filter(({ btn }) => !isTabItemDisabled(btn));
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
