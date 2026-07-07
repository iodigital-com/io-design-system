import { Component, Prop, Event, EventEmitter, Element, Host, Watch, h } from '@stencil/core';

import { getTabsStyles } from './io-tabs-styles';
import { getNextEnabledIndex } from './io-tabs-utils';

import type { IoTabsUpdateDetail, IoTabsSize, IoTabsCloseDetail } from './types';

/**
 * io-tabs
 * ========
 * Slot-based controlled tabs-bar navigation with full keyboard support.
 * Place <button> children inside the component and control the active tab
 * via activeTabIndex + the update event.
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

  /** 0-based index of the active tab (controlled). */
  @Prop({ mutable: true, reflect: true }) activeTabIndex = 0;

  /** Optional accessible label for the tablist region. */
  @Prop() label?: string;

  /** Size scale for the tab buttons. Drives typography and padding via design tokens (`--io-font-size-sm` for 'small', `--io-font-size-base` for 'medium', `--io-font-size-xs` + reduced padding for 'compact'). */
  @Prop() size: IoTabsSize = 'small';

  /** ID of an element that labels the tablist (ARIA 4.1.2). Applied as aria-labelledby on the tablist div. */
  @Prop() labelledby?: string;

  /**
   * Panel element IDs that map 1:1 to slotted buttons (index-matched).
   * When provided, each tab button receives aria-controls pointing to its associated panel.
   */
  @Prop() panelIds?: string[];

  /**
   * When true, every tab renders an inline close (dismiss) button.
   * Individual tabs can also opt in via the `data-closeable` attribute
   * without setting this prop (per-tab opt-in).
   * Fires a `tabClose` event with `{ index }` when clicked or activated via Enter/Space.
   */
  @Prop({ reflect: true }) closeable = false;

  // ── Events ────────────────────────────────────────────────────

  /**
   * Fires when the user activates a different tab (click, Enter, or Space).
   * Does NOT fire when activeTabIndex is changed programmatically — only on direct user interaction.
   * Update your controlled state in the handler:
   *   element.addEventListener('update', e => { myIndex = e.detail.activeTabIndex; });
   */
  @Event() update!: EventEmitter<IoTabsUpdateDetail>;

  /**
   * Fires when a close button is clicked on a closeable tab.
   * Payload: `{ index }` — 0-based index of the closed tab.
   * The consumer is responsible for removing the tab from their data and
   * updating `activeTabIndex` if needed.
   */
  @Event() tabClose!: EventEmitter<IoTabsCloseDetail>;

  // ── Private ───────────────────────────────────────────────────

  private slotEl: HTMLSlotElement | null = null;
  private buttons: HTMLButtonElement[] = [];
  private clickHandlers: Map<HTMLButtonElement, () => void> = new Map();
  private keyHandlers: Map<HTMLButtonElement, (ev: KeyboardEvent) => void> = new Map();
  /** Tracks injected close button elements and their event handlers. */
  private closeButtons: Map<HTMLButtonElement, HTMLButtonElement> = new Map();
  private closeClickHandlers: Map<HTMLButtonElement, (ev: MouseEvent) => void> = new Map();
  private closeKeyHandlers: Map<HTMLButtonElement, (ev: KeyboardEvent) => void> = new Map();

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
    const normalized = this.normalizeActiveTabIndex(newIndex);
    if (normalized !== newIndex) {
      this.activeTabIndex = normalized;
      return;
    }
    this.applyAriaToButtons(this.buttons, normalized);
  }

  @Watch('panelIds')
  onPanelIdsChange() {
    this.applyAriaToButtons(this.buttons, this.activeTabIndex);
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

    const normalized = this.normalizeActiveTabIndex(this.activeTabIndex);
    if (normalized !== this.activeTabIndex) {
      this.activeTabIndex = normalized;
    }

    this.setupListeners();
    this.applyAriaToButtons(this.buttons, normalized);
  }

  private normalizeActiveTabIndex(index: number): number {
    if (this.buttons.length === 0) return 0;

    const parsed = Number(index);
    const safeIndex = Number.isFinite(parsed) ? Math.floor(parsed) : 0;
    const clamped = Math.max(0, Math.min(safeIndex, this.buttons.length - 1));

    if (!this.buttons[clamped]?.disabled) {
      return clamped;
    }

    const firstEnabled = this.getEnabledButtons()[0];
    return firstEnabled ? firstEnabled.index : 0;
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
    // Teardown close button listeners and remove injected close buttons
    for (const [closeBtn, handler] of this.closeClickHandlers) {
      closeBtn.removeEventListener('click', handler);
    }
    for (const [closeBtn, handler] of this.closeKeyHandlers) {
      closeBtn.removeEventListener('keydown', handler);
    }
    this.closeClickHandlers.clear();
    this.closeKeyHandlers.clear();
    // Remove injected close button elements from their parent tabs
    for (const [, closeBtn] of this.closeButtons) {
      closeBtn.parentElement?.removeChild(closeBtn);
    }
    this.closeButtons.clear();
  }

  private applyAriaToButtons(buttons: HTMLButtonElement[], activeIndex: number) {
    buttons.forEach((btn, index) => {
      const isActive = index === activeIndex && !btn.disabled;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', String(isActive));
      btn.setAttribute('tabindex', String(isActive ? 0 : -1));

      // aria-controls: link each tab to its associated panel when panelIds provided.
      const panelId = this.panelIds?.[index];
      if (panelId) {
        btn.setAttribute('aria-controls', panelId);
      } else {
        btn.removeAttribute('aria-controls');
      }

      // Icon-only tabs: preserve the author-supplied aria-label (already set by consumer).
      // Tabs with badge children: strip badge text so screen readers don't announce counts
      // as part of the tab name. Consumers mark badge elements with data-slot="badge".
      const badgeEl = btn.querySelector('[data-slot="badge"]');
      if (badgeEl) {
        const visibleText = Array.from(btn.childNodes)
          .filter((node) => node !== badgeEl)
          .map((node) => node.textContent ?? '')
          .join('')
          .trim();
        if (visibleText && !btn.hasAttribute('aria-label')) {
          btn.setAttribute('aria-label', visibleText);
        }
      }

      // Closeable tabs (issue #949): inject a close button if closeable prop is true
      // or the tab has data-closeable attribute.
      const isCloseable = this.closeable || btn.hasAttribute('data-closeable');
      const existingClose = this.closeButtons.get(btn);
      if (isCloseable && !existingClose) {
        this.injectCloseButton(btn, index);
      } else if (!isCloseable && existingClose) {
        // Remove previously injected close button if no longer closeable
        const clickH = this.closeClickHandlers.get(existingClose);
        const keyH = this.closeKeyHandlers.get(existingClose);
        if (clickH) existingClose.removeEventListener('click', clickH);
        if (keyH) existingClose.removeEventListener('keydown', keyH);
        this.closeClickHandlers.delete(existingClose);
        this.closeKeyHandlers.delete(existingClose);
        existingClose.parentElement?.removeChild(existingClose);
        this.closeButtons.delete(btn);
      }
    });
  }

  private injectCloseButton(tab: HTMLButtonElement, index: number) {
    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'tab-close-btn';
    const tabLabel = tab.getAttribute('aria-label') || tab.textContent?.trim() || `Tab ${index + 1}`;
    closeBtn.setAttribute('aria-label', `Close ${tabLabel}`);
    closeBtn.setAttribute('tabindex', '-1');
    // Use a simple × character as the icon; styled to match io-tag-dismissible pattern
    closeBtn.innerHTML = `<svg aria-hidden="true" focusable="false" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L9 9M9 1L1 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;

    const clickHandler = (ev: MouseEvent) => {
      ev.stopPropagation();
      this.handleTabClose(index);
    };
    const keyHandler = (ev: KeyboardEvent) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        ev.stopPropagation();
        this.handleTabClose(index);
      }
    };

    closeBtn.addEventListener('click', clickHandler);
    closeBtn.addEventListener('keydown', keyHandler);
    this.closeClickHandlers.set(closeBtn, clickHandler);
    this.closeKeyHandlers.set(closeBtn, keyHandler);
    this.closeButtons.set(tab, closeBtn);

    tab.appendChild(closeBtn);
  }

  // ── Handlers ─────────────────────────────────────────────────

  private handleTabClick(index: number) {
    const btn = this.buttons[index];
    if (!btn || btn.disabled) return;
    if (index === this.activeTabIndex) return;

    this.activeTabIndex = index;
    this.update.emit({ activeTabIndex: index });
  }

  private handleTabClose(index: number) {
    this.tabClose.emit({ index });
    // Move focus to adjacent enabled tab if the closed tab was active
    if (index === this.activeTabIndex) {
      const enabled = this.getEnabledButtons().filter(({ index: i }) => i !== index);
      if (enabled.length > 0) {
        // Prefer the tab after, fall back to the tab before
        const next = enabled.find(({ index: i }) => i > index) ?? enabled[enabled.length - 1];
        next.btn.focus();
      }
    }
  }

  private handleKeyDown(ev: KeyboardEvent, index: number) {
    const enabled = this.getEnabledButtons();
    if (enabled.length === 0) return;

    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      this.handleTabClick(index);
      return;
    }

    const currentEnabledIndex = enabled.findIndex(item => item.index === index);
    if (currentEnabledIndex < 0) {
      const fallbackIndex = ev.key === 'ArrowLeft' || ev.key === 'End'
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

  /**
   * @slot - Default slot. `<button>` elements representing each tab. Keyboard navigation and ARIA are applied automatically.
   */
  render() {
    const tablistClass = {
      tablist: true,
      [`tabs--size-${this.size}`]: true,
    };

    return (
      <Host>
        <style>{getTabsStyles()}</style>
        <div
          class={tablistClass}
          role="tablist"
          aria-orientation="horizontal"
          aria-labelledby={this.labelledby || undefined}
          aria-label={!this.labelledby ? (this.label || undefined) : undefined}
        >
          <slot onSlotchange={this.onSlotChange} />
        </div>
      </Host>
    );
  }
}
