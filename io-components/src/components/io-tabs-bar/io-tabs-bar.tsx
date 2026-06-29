import { Component, Prop, Event, EventEmitter, Element, State, Host, Watch, h } from '@stencil/core';

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
 * and ARIA semantics.
 *
 * Place <button> or <a> children inside the component. The component detects
 * the child type and automatically applies the correct ARIA pattern:
 * - <button> children: role="tablist" container, role="tab" + aria-selected on each button
 * - <a> children: <nav> landmark wrapper, aria-current="page" on the active anchor
 *
 * Control the active tab via the activeTabIndex prop and respond to the update event.
 *
 * Keyboard: Arrow Left/Right move focus; Enter/Space activate; Home/End jump.
 * Disabled buttons (via the HTML disabled attribute) are skipped.
 * Disabled anchors (via aria-disabled="true") are skipped.
 *
 * @example — button tablist pattern (in-page tab switching)
 * <io-tabs-bar active-tab-index="0" label="Main navigation">
 *   <button type="button">Overview</button>
 *   <button type="button">Details</button>
 *   <button type="button" disabled>Settings</button>
 * </io-tabs-bar>
 *
 * @example — anchor navigation pattern (route navigation)
 * <io-tabs-bar active-tab-index="0" label="Site navigation">
 *   <a href="/overview">Overview</a>
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

  /** Optional accessible label for the tablist / nav region. */
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

  // ── State ─────────────────────────────────────────────────────

  /** True when slotted children are <a> anchors (navigation mode). False for button tablist mode. */
  @State() private isNavMode = false;

  /** True when the scroll container has overflowed content before the visible start. */
  @State() private isFadeStart = false;

  /** True when the scroll container has overflowed content beyond the visible end. */
  @State() private isFadeEnd = false;

  // ── Private ───────────────────────────────────────────────────

  private slotEl: HTMLSlotElement | null = null;
  private indicatorEl: HTMLElement | null = null;
  private tablistEl: HTMLElement | null = null;
  private buttons: TabItem[] = [];
  private clickHandlers: Map<TabItem, () => void> = new Map();
  private keyHandlers: Map<TabItem, EventListener> = new Map();
  private resizeObserver?: ResizeObserver;
  private sentinelStart: HTMLElement | null = null;
  private sentinelEnd: HTMLElement | null = null;
  private intersectionObserver?: IntersectionObserver;

  // ── Lifecycle ─────────────────────────────────────────────────

  componentDidLoad() {
    this.slotEl = this.el.shadowRoot?.querySelector('slot') ?? null;
    this.indicatorEl = this.el.shadowRoot?.querySelector('.indicator') ?? null;
    this.tablistEl = this.el.shadowRoot?.querySelector('.tablist') ?? null;
    this.sentinelStart = this.el.shadowRoot?.querySelector('.sentinel-start') ?? null;
    this.sentinelEnd = this.el.shadowRoot?.querySelector('.sentinel-end') ?? null;
    this.syncFromSlot();
    this.setupResizeObserver();
    this.setupIntersectionObserver();
  }

  disconnectedCallback() {
    this.teardownListeners();
    this.resizeObserver?.disconnect();
    this.intersectionObserver?.disconnect();
  }

  // ── ResizeObserver (issue #968) ────────────────────────────────

  private setupResizeObserver() {
    if (typeof ResizeObserver === 'undefined') return;
    if (!this.tablistEl) return;
    this.resizeObserver = new ResizeObserver(() => {
      this.scrollActiveTabIntoView(this.buttons, this.activeTabIndex);
      this.updateFadeState();
    });
    this.resizeObserver.observe(this.tablistEl);
  }

  // ── IntersectionObserver / edge-fade (issue #961) ─────────────

  private setupIntersectionObserver() {
    if (typeof IntersectionObserver === 'undefined') return;
    if (!this.tablistEl || !this.sentinelStart || !this.sentinelEnd) return;

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === this.sentinelStart) {
            this.isFadeStart = !entry.isIntersecting;
          } else if (entry.target === this.sentinelEnd) {
            this.isFadeEnd = !entry.isIntersecting;
          }
        }
      },
      { root: this.tablistEl, threshold: 0.01 },
    );

    this.intersectionObserver.observe(this.sentinelStart);
    this.intersectionObserver.observe(this.sentinelEnd);
  }

  private updateFadeState() {
    if (!this.tablistEl) return;
    const el = this.tablistEl;
    this.isFadeStart = el.scrollLeft > 1;
    this.isFadeEnd = el.scrollLeft + el.clientWidth < el.scrollWidth - 1;
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

    // Detect mode: if ALL tab items are <a> elements → navigation mode (#978).
    // Mixed or all-button → tablist mode.
    this.isNavMode =
      this.buttons.length > 0 && this.buttons.every((item) => item.tagName === 'A');

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
    if (this.isNavMode) {
      // Navigation mode (#978): <a> children — use <nav> landmark + aria-current
      buttons.forEach((item, index) => {
        const isActive = index === activeIndex && !isTabItemDisabled(item);
        // Remove tablist-specific attributes that don't belong on nav links
        item.removeAttribute('role');
        item.removeAttribute('aria-selected');
        // aria-current="page" on the active link; remove on others
        if (isActive) {
          item.setAttribute('aria-current', 'page');
        } else {
          item.removeAttribute('aria-current');
        }
        // Roving tabindex still applies for keyboard nav
        item.setAttribute('tabindex', String(isActive ? 0 : -1));
      });
    } else {
      // Tablist mode: <button> (or mixed) children — standard tablist + aria-selected
      buttons.forEach((btn, index) => {
        const isActive = index === activeIndex && !isTabItemDisabled(btn);
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-selected', String(isActive));
        btn.setAttribute('tabindex', String(isActive ? 0 : -1));
        // Clean up any nav-mode attributes from a previous mode
        btn.removeAttribute('aria-current');
      });
    }
    this.scrollActiveTabIntoView(buttons, activeIndex);
    // Position indicator without animation on initial sync
    if (!this.isNavMode) {
      this.animateIndicator(activeIndex);
    }
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
    const ariaLabel = this.labelledBy ? undefined : (this.label || undefined);
    const ariaLabelledBy = this.labelledBy || undefined;

    const tablistClass = {
      tablist: true,
      'tablist--fade-start': this.isFadeStart,
      'tablist--fade-end': this.isFadeEnd,
    };

    if (this.isNavMode) {
      // Navigation mode (#978): wrap in <nav> landmark; no tablist role.
      return (
        <Host>
          <style>{getTabsBarStyles()}</style>
          <nav
            class={tablistClass}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
          >
            <span class="sentinel-start" aria-hidden="true" />
            <slot onSlotchange={this.onSlotChange} />
            <span class="sentinel-end" aria-hidden="true" />
          </nav>
        </Host>
      );
    }

    // Tablist mode (default): standard role="tablist" with sliding indicator.
    return (
      <Host>
        <style>{getTabsBarStyles()}</style>
        <div
          class={tablistClass}
          role="tablist"
          aria-orientation="horizontal"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
        >
          <span class="sentinel-start" aria-hidden="true" />
          <slot onSlotchange={this.onSlotChange} />
          <span class="sentinel-end" aria-hidden="true" />
          <span class="indicator" aria-hidden="true" />
        </div>
      </Host>
    );
  }
}
