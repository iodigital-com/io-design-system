import { Component, Prop, State, Event, EventEmitter, Element, Host, Watch, h } from '@stencil/core';

import { getButtonGroupStyles } from './io-button-group-styles';
import { parseButtonGroupItems, getNextEnabledGroupIndex, getButtonGroupClassList } from './io-button-group-utils';

import type { IoButtonGroupItem, IoButtonGroupChangeDetail } from './types';

/**
 * io-button-group
 * ================
 * Segmented control for single-select (radiogroup) and multi-select (checkbox group) patterns.
 *
 * Place `<io-button value="...">Label</io-button>` children inside the component.
 * The group reads their values/labels at load time and renders internal buttons with
 * full styling control, shared-border layout, and roving tabindex keyboard navigation.
 *
 * @example
 * <io-button-group value="week" exclusive label="View period">
 *   <io-button value="day">Day</io-button>
 *   <io-button value="week">Week</io-button>
 *   <io-button value="month">Month</io-button>
 * </io-button-group>
 */
@Component({
  tag: 'io-button-group',
  shadow: { delegatesFocus: true },
})
export class IoButtonGroup {
  @Element() el!: HTMLElement;

  // ── Props ─────────────────────────────────────────────────────

  /**
   * Exclusive (single-select) mode.
   * When true: container gets `role="radiogroup"`, items get `role="radio"`.
   * When false: container gets `role="group"`, items get `role="checkbox"`.
   */
  @Prop({ reflect: true }) exclusive = false;

  /**
   * Currently selected value(s).
   * In exclusive mode: a single string (or empty string for no selection).
   * In multi-select mode: a string[].
   */
  @Prop({ mutable: true }) value: string | string[] = '';

  /** Disables all buttons in the group */
  @Prop({ reflect: true }) disabled = false;

  /** Accessible label for the group container (aria-label) */
  @Prop() label: string | undefined;

  // ── Events ────────────────────────────────────────────────────

  /** Fires when the selection changes. Detail contains the new value or value array. */
  @Event() change!: EventEmitter<IoButtonGroupChangeDetail>;

  // ── State ─────────────────────────────────────────────────────

  @State() private items: IoButtonGroupItem[] = [];
  @State() private focusIndex = 0;

  // ── Private ───────────────────────────────────────────────────

  private buttonRefs: Map<number, HTMLButtonElement> = new Map();
  private lateParseTimeout: ReturnType<typeof setTimeout> | undefined;

  // ── Lifecycle ─────────────────────────────────────────────────

  componentDidLoad() {
    this.items = parseButtonGroupItems(this.el);
    this.initFocusIndex();

    // Guard against the SSR/hydration race: when Stencil's beforeInteractive
    // script upgrades elements before React has run, child <io-button> elements
    // have no `value` property yet (React ref callbacks haven't fired) so
    // parseButtonGroupItems returns []. Re-parse after one macro-task tick to
    // give React time to commit and fire its ref callbacks.
    if (this.items.length === 0 && this.el.children.length > 0) {
      this.lateParseTimeout = setTimeout(() => {
        this.items = parseButtonGroupItems(this.el);
        this.initFocusIndex();
      }, 0);
    }
  }

  disconnectedCallback() {
    if (this.lateParseTimeout !== undefined) {
      clearTimeout(this.lateParseTimeout);
      this.lateParseTimeout = undefined;
    }
  }

  @Watch('value')
  onValueChange() {
    this.initFocusIndex();
  }

  @Watch('exclusive')
  onExclusiveChange(newExclusive: boolean) {
    if (newExclusive) {
      // Switch from multi to exclusive — keep only the first active value
      const actives = this.getActiveValues();
      this.value = actives.length > 0 ? actives[0] : '';
    } else {
      // Switch from exclusive to multi — wrap string in array
      const current = this.value;
      this.value = typeof current === 'string' && current !== '' ? [current] : [];
    }
    this.initFocusIndex();
  }

  @Watch('disabled')
  onDisabledChange() {
    this.initFocusIndex();
  }

  // ── Private helpers ───────────────────────────────────────────

  private getActiveValues(): string[] {
    const v = this.value;
    if (Array.isArray(v)) return v;
    if (typeof v === 'string' && v !== '') return [v];
    return [];
  }

  private isActive(itemValue: string): boolean {
    return this.getActiveValues().includes(itemValue);
  }

  private getEnabledItems(): Array<{ item: IoButtonGroupItem; index: number }> {
    return this.items
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => !item.disabled && !this.disabled);
  }

  private initFocusIndex() {
    const enabled = this.getEnabledItems();
    if (enabled.length === 0) {
      this.focusIndex = 0;
      return;
    }
    // Prefer the first active enabled item
    const active = enabled.find(({ item }) => this.isActive(item.value));
    this.focusIndex = active ? active.index : enabled[0].index;
  }

  private handleItemClick(index: number) {
    const item = this.items[index];
    if (!item || item.disabled || this.disabled) return;

    if (this.exclusive) {
      this.value = item.value;
      this.change.emit({ value: item.value });
    } else {
      const current = this.getActiveValues();
      const next = current.includes(item.value)
        ? current.filter(v => v !== item.value)
        : [...current, item.value];
      this.value = next;
      this.change.emit({ value: next });
    }

    this.focusIndex = index;
  }

  private handleKeyDown(ev: KeyboardEvent, index: number) {
    const enabled = this.getEnabledItems();
    if (enabled.length === 0) return;

    // Activate on Enter or Space in both modes
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      this.handleItemClick(index);
      return;
    }

    // Navigation keys
    const currentEnabledIndex = enabled.findIndex(e => e.index === index);
    const fallbackIndex = (() => {
      if (currentEnabledIndex >= 0) return null; // handled by getNextEnabledGroupIndex
      switch (ev.key) {
        case 'ArrowLeft': case 'ArrowUp': case 'End': return enabled.length - 1;
        case 'ArrowRight': case 'ArrowDown': case 'Home': return 0;
        default: return null;
      }
    })();

    if (fallbackIndex !== null) {
      ev.preventDefault();
      const target = enabled[fallbackIndex];
      if (target) {
        this.focusIndex = target.index;
        if (this.exclusive) this.handleItemClick(target.index);
        this.buttonRefs.get(target.index)?.focus();
      }
      return;
    }

    const nextEnabledIndex = getNextEnabledGroupIndex(ev.key, currentEnabledIndex, enabled.length);
    if (nextEnabledIndex !== null) {
      ev.preventDefault();
      const target = enabled[nextEnabledIndex];
      this.focusIndex = target.index;
      // In exclusive (radiogroup) mode, arrow navigation also selects
      if (this.exclusive) this.handleItemClick(target.index);
      this.buttonRefs.get(target.index)?.focus();
    }
  }

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { exclusive, disabled, label, items, focusIndex } = this;
    // When all items are disabled no item should be in the tab order.
    const hasEnabledItems = this.getEnabledItems().length > 0;

    return (
      <Host>
        <style>{getButtonGroupStyles()}</style>
        {/*
          Hidden slot — only used so Stencil does not warn about unrendered
          slotted content. The io-button children are parsed in componentDidLoad
          via querySelectorAll and then re-rendered as internal shadow buttons.
          ::slotted(*) { display: none } in the shadow styles hides the originals.
        */}
        <slot />
        <div
          class="group"
          role={exclusive ? 'radiogroup' : 'group'}
          aria-label={label || undefined}
          aria-disabled={disabled ? 'true' : undefined}
        >
          {items.map((item, index) => {
            const active = this.isActive(item.value);
            const itemDisabled = disabled || !!item.disabled;
            return (
              <button
                key={item.value}
                class={getButtonGroupClassList({ active, disabled: !!item.disabled, groupDisabled: disabled })}
                // role="radio" on <button> is explicitly allowed by the aria-in-html spec
                // (allowed roles list for <button>). The native button provides
                // baseline keyboard and focus semantics; the ARIA role conveys selection
                // semantics to AT. Using <button> instead of <div> is intentional.
                role={exclusive ? 'radio' : 'checkbox'}
                aria-checked={active ? 'true' : 'false'}
                aria-disabled={itemDisabled ? 'true' : undefined}
                tabIndex={hasEnabledItems && index === focusIndex ? 0 : -1}
                disabled={itemDisabled || undefined}
                onClick={() => this.handleItemClick(index)}
                onKeyDown={(ev: KeyboardEvent) => this.handleKeyDown(ev, index)}
                ref={(el?: HTMLButtonElement) => { if (el) this.buttonRefs.set(index, el); }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </Host>
    );
  }
}
