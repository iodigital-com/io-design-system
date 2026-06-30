import { Component, Prop, State, Event, EventEmitter, Element, Host, Watch, h } from '@stencil/core';

let _labelIdCounter = 0;

import { getButtonGroupStyles } from './io-button-group-styles';
import { parseButtonGroupItems, getNextEnabledGroupIndex, getButtonGroupClassList } from './io-button-group-utils';

import type { IoButtonGroupItem, IoButtonGroupChangeDetail, IoButtonGroupDirection, IoButtonGroupVariant, IoButtonGroupType } from './types';

/**
 * io-button-group
 * ================
 * Flexible button group component supporting three distinct interaction patterns:
 *
 * - `type="single"` (default) — segmented control / radiogroup: exactly one item active at a time.
 * - `type="multiple"` — checkbox group: any number of items may be active.
 * - `type="toolbar"` — independent action cluster: no selection model, no roving tabindex.
 *                      Use for Save/Cancel/Delete clusters and icon toolbars.
 *
 * Place `<io-button value="...">Label</io-button>` children inside the component.
 * The group reads their values/labels at load time and renders internal buttons with
 * full styling control, shared-border layout, and roving tabindex keyboard navigation
 * (for single/multiple types only).
 *
 * @example
 * <io-button-group value="week" type="single" label="View period">
 *   <io-button value="day">Day</io-button>
 *   <io-button value="week">Week</io-button>
 *   <io-button value="month">Month</io-button>
 * </io-button-group>
 *
 * @example
 * <io-button-group type="toolbar" label="Document actions">
 *   <io-button value="save">Save</io-button>
 *   <io-button value="cancel">Cancel</io-button>
 *   <io-button value="delete">Delete</io-button>
 * </io-button-group>
 */
@Component({
  tag: 'io-button-group',
  shadow: { delegatesFocus: true },
})
export class IoButtonGroup {
  @Element() el!: HTMLElement;

  // ── Props ─────────────────────────────────────────────

  /**
   * Selection mode for the button group.
   * - `'single'` — single-select (radiogroup): container gets `role="radiogroup"`, items get `role="radio"`.
   * - `'multiple'` — multi-select (checkbox group): container gets `role="group"`, items get `role="checkbox"`.
   * @default 'single'
   */
  @Prop({ reflect: true }) type: IoButtonGroupType = 'single';

  /**
   * Currently selected value(s).
   * In single mode: a single string (or empty string for no selection).
   * In multiple mode: a string[].
   */
  @Prop({ mutable: true }) value: string | string[] = '';

  /** Disables all buttons in the group */
  @Prop({ reflect: true }) disabled = false;

  /** Accessible label for the group container (aria-label) */
  @Prop() label: string | undefined;

  /** Visually hides the label while keeping it accessible to screen readers */
  @Prop({ reflect: true }) hideLabel = false;

  /** Marks the group as required — shows a required asterisk (*) next to the label */
  @Prop() required = false;

  /**
   * Layout direction for the button group.
   * 'row' (default) lays buttons out horizontally.
   * 'column' stacks buttons vertically, full-width.
   */
  @Prop({ reflect: true }) direction: IoButtonGroupDirection = 'row';

  /** Reduces height and padding for toolbar and dense UI contexts. */
  @Prop({ reflect: true }) compact: boolean = false;

  /**
   * Visual variant controlling the active-state color scheme.
   * - `primary` — brand blue fill, white text (navigation tabs, primary controls).
   * - `secondary` — white/surface fill with shadow, dark text (property selectors, toolbar controls).
   * @default 'primary'
   */
  @Prop({ reflect: true }) variant: IoButtonGroupVariant = 'primary';

  // ── Events ────────────────────────────────────────────

  /** Fires when the selection changes. Detail contains the new value or value array. */
  @Event() change!: EventEmitter<IoButtonGroupChangeDetail>;

  // ── State ─────────────────────────────────────────────

  @State() private items: IoButtonGroupItem[] = [];
  @State() private focusIndex = 0;

  // ── Private ───────────────────────────────────────────

  private buttonRefs: Map<number, HTMLButtonElement> = new Map();
  private lateParseTimeout: ReturnType<typeof setTimeout> | undefined;
  private labelId!: string;

  // ── Lifecycle ───────────────────────────────────────────

  componentWillLoad() {
    this.labelId = `io-button-group-label-${++_labelIdCounter}`;
    if (!this.label) {
      console.warn('[io-button-group] A "label" prop is required for accessibility. The group has no accessible name.');
    }
  }

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

  @Watch('type')
  onTypeChange(newType: IoButtonGroupType) {
    if (newType === 'toolbar') {
      // Toolbar has no selection model — clear value and reset focus index
      this.value = '';
      this.initFocusIndex();
      return;
    }
    if (newType === 'single') {
      // Switch from multiple/toolbar to single — keep only the first active value
      const actives = this.getActiveValues();
      this.value = actives.length > 0 ? actives[0] : '';
    } else {
      // Switch from single/toolbar to multiple — wrap string in array
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

    if (this.type === 'toolbar') {
      // Toolbar: emit change with the clicked item value but no selection state
      this.change.emit({ value: item.value });
    } else if (this.type === 'single') {
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

    // Activate on Enter or Space in all modes
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      this.handleItemClick(index);
      return;
    }

    // Toolbar type: no roving tabindex navigation — Tab key handles focus movement natively.
    // Arrow keys are not intercepted in toolbar mode (ARIA toolbar pattern is optional here
    // since each button is independently focusable via Tab).
    if (this.type === 'toolbar') return;

    // Navigation keys (single / multiple modes)
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
        if (this.type === 'single') this.handleItemClick(target.index);
        this.buttonRefs.get(target.index)?.focus();
      }
      return;
    }

    const nextEnabledIndex = getNextEnabledGroupIndex(ev.key, currentEnabledIndex, enabled.length);
    if (nextEnabledIndex !== null) {
      ev.preventDefault();
      const target = enabled[nextEnabledIndex];
      this.focusIndex = target.index;
      // In single (radiogroup) mode, arrow navigation also selects
      if (this.type === 'single') this.handleItemClick(target.index);
      this.buttonRefs.get(target.index)?.focus();
    }
  }

  // ── Render ───────────────────────────────────────────

  /**
   * @slot - Default slot. io-button children whose `value` and label are parsed at load time to build the internal button group.
   */
  render() {
    const { type, disabled, label, hideLabel, required, items, focusIndex } = this;
    // When all items are disabled no item should be in the tab order.
    const hasEnabledItems = this.getEnabledItems().length > 0;
    const labelId = label ? this.labelId : undefined;
    const isToolbar = type === 'toolbar';

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
        {label && (
          <span id={labelId} class={hideLabel ? 'group-label group-label--sr-only' : 'group-label'}>
            {label}
            {required && <span class="group-required" aria-hidden="true"> *</span>}
          </span>
        )}
        <div
          class="group"
          role={type === 'single' ? 'radiogroup' : 'group'}
          aria-labelledby={labelId}
          aria-disabled={disabled ? 'true' : undefined}
        >
          {items.map((item, index) => {
            const active = !isToolbar && this.isActive(item.value);
            const itemDisabled = disabled || !!item.disabled;
            return (
              <button
                key={item.value}
                class={getButtonGroupClassList({ active, disabled: !!item.disabled, groupDisabled: disabled })}
                // role="radio" on <button> is explicitly allowed by the aria-in-html spec
                // (allowed roles list for <button>). The native button provides
                // baseline keyboard and focus semantics; the ARIA role conveys selection
                // semantics to AT. Using <button> instead of <div> is intentional.
                // toolbar type uses the implicit role="button" — no override needed.
                role={isToolbar ? undefined : type === 'single' ? 'radio' : 'checkbox'}
                aria-checked={isToolbar ? undefined : (active ? 'true' : 'false')}
                aria-label={item.ariaLabel || undefined}
                aria-disabled={itemDisabled ? 'true' : undefined}
                // toolbar: each button is individually focusable (tabIndex=0)
                // single/multiple: roving tabindex — only focusIndex is in tab order
                tabIndex={isToolbar ? (itemDisabled ? -1 : 0) : (hasEnabledItems && index === focusIndex ? 0 : -1)}
                disabled={itemDisabled || undefined}
                onClick={() => this.handleItemClick(index)}
                onKeyDown={(ev: KeyboardEvent) => this.handleKeyDown(ev, index)}
                ref={(el?: HTMLButtonElement) => {
                  if (el) this.buttonRefs.set(index, el);
                  else this.buttonRefs.delete(index);
                }}
              >
                {item.icon && <io-icon name={item.icon} size={this.compact ? 'xs' : 'sm'} aria-hidden="true" />}
                {item.label}
              </button>
            );
          })}
        </div>
      </Host>
    );
  }
}
