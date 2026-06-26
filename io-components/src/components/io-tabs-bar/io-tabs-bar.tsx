import { Component, Prop, Event, EventEmitter, Element, Host, Watch, h } from '@stencil/core';

import { getTabsBarStyles } from './io-tabs-bar-styles';
import { computeIndicatorKeyframes, getNextEnabledIndex, normalizeActiveTabIndex } from './io-tabs-bar-utils';

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

  /** ID of an existing element that labels the tablist (alternative to label prop). When set, aria-labelledby is used instead of aria-label. */
  @Prop() labelledBy?: string;

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
  private indicatorEl: HTMLElement | null = null;
  private buttons: TabItem[] = [];
  private clickHandlers: Map<TabItem, () => void> = new Map();
  private keyHandlers: Map<TabItem, EventListener> = new Map();

  // ── Lifecycle ─────────────────────────────────────────────────

  componentDidLoad() {
    this.slotEl = this.el.shadowRoot?.querySelector('slot') ?? null;
    this.indicatorEl = this.el.shadowRoot?.querySelector('.indicator') ?? null;
    this.syncFromSlot();
  }

  disconnectedCallback() {
    this.teardownListeners();
  }

  @Watch('activeTabIndex')
  onActiveTabIndexChange(newIndex: number, oldIndex: number) {
    const normalized = normalizeActiveTabIndex(newIndex, this.buttons);
    if (normalized !== newIndex) {
      this.activeTabIndex = normalized;
      return;
    }
    this.applyAriaToButtons(this.buttons, normalized);
    this.animateIndicator(normalized, oldIndex);
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
      btn.addEventListener('keydown', keyHandler as EventListener);
      this.clickHandlers.set(btn, clickHandler);
      this.keyHandlers.set(btn, keyHandler as EventListener);
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
    this.scrollActiveTabIntoView(buttons, activeIndex);
    // Position indicator without animation on initial sync
    this.animateIndicator(activeIndex);
  }

  private scrollActiveTabIntoView(buttons: TabItem[], activeIndex: number) {
    const activeBtn = buttons[activeIndex];
    if (!activeBtn) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    activeBtn.scrollIntoView?.({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'nearest',
      inline: 'nearest',
    });
  }

  animateIndicator(toIndex: number, fromIndex?: number) {
    const indicator = this.indicatorEl;
    if (!indicator) return;

    const tablistEl = this.el.shadowRoot?.querySelector('.tablist');
    if (!tablistEl) return;

    const toBtn = this.buttons[toIndex];
    if (!toBtn) return;

    const scrollLeft = (tablistEl as HTMLElement).scrollLeft;
    const listRect = tablistEl.getBoundingClientRect();
    const toRect = toBtn.getBoundingClientRect();
    const toLeft = toRect.left - listRect.left + scrollLeft;
    const toWidth = toRect.width;

    let fromLeft = toLeft;
    let fromWidth = toWidth;
    const fromBtn = fromIndex !== undefined ? this.buttons[fromIndex] : undefined;
    if (fromBtn) {
      const fromRect = fromBtn.getBoundingClientRect();
      fromLeft = fromRect.left - listRect.left + scrollLeft;
      fromWidth = fromRect.width;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const style = getComputedStyle(this.el);
    const durationRaw = style.getPropertyValue('--io-tabs-bar-indicator-duration').trim();
    const easing = style.getPropertyValue('--io-tabs-bar-indicator-easing').trim() || 'ease-out';
    const duration = prefersReducedMotion ? 0 : (parseFloat(durationRaw) || 250);

    indicator.style.left = `${toLeft}px`;
    indicator.style.width = `${toWidth}px`;

    if (fromIndex !== undefined && !prefersReducedMotion && (fromLeft !== toLeft || fromWidth !== toWidth)) {
      indicator.animate(
        computeIndicatorKeyframes(fromLeft, fromWidth, toLeft, toWidth),
        { duration, easing, fill: 'forwards' },
      );
    }
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

    if (ev.key === ' ') {
      // Space: always prevent scroll and activate
      ev.preventDefault();
      this.handleTabClick(index);
      return;
    }

    if (ev.key === 'Enter') {
      // Enter on anchor: let the browser follow the link natively
      const isAnchor = (ev.target as HTMLElement | null)?.tagName === 'A';
      if (!isAnchor) {
        ev.preventDefault();
        this.handleTabClick(index);
      }
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
          aria-label={this.labelledBy ? undefined : (this.label || undefined)}
          aria-labelledby={this.labelledBy || undefined}
        >
          <slot onSlotchange={this.onSlotChange} />
          <span class="indicator" aria-hidden="true" />
        </div>
      </Host>
    );
  }
}
