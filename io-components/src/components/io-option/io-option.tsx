import { Component, Prop, State, Event, EventEmitter, Element, Host, h } from '@stencil/core';

import { getOptionStyles } from './io-option-styles';
import { getOptionClass } from './io-option-utils';

import type { IoIconName } from '../../utils/icons';
import type { IoOptionSelectDetail, IoOptionConnectDetail } from './types';

/**
 * io-option
 * ==========
 * Individual option item for the custom combobox mode of io-select.
 * Must be a direct child of io-select[custom] (slotted into the listbox).
 *
 * Supports two content modes:
 * 1. Prop-based: `<io-option value="us" label="United States" icon="flag-us"></io-option>`
 * 2. Slot-based (rich HTML): `<io-option value="us">United States</io-option>`
 *    When slotted content is present it replaces the `label` prop display.
 *
 * @example
 * <io-option value="alice" label="Alice Smith"></io-option>
 * <io-option value="us" icon="flag-us">United States</io-option>
 */
@Component({
  tag: 'io-option',
  shadow: true,
})
export class IoOption {
  @Element() el!: HTMLElement;

  /** The value submitted on selection */
  @Prop() value = '';

  /** Display text — used when no slotted content is provided */
  @Prop() label!: string;

  /** Prevents selection */
  @Prop({ reflect: true }) disabled = false;

  /** Whether currently selected (set by parent io-select) */
  @Prop({ reflect: true }) selected = false;

  /** Checked state used in multiple mode (set by parent) */
  @Prop({ reflect: true }) checked = false;

  /** When true, renders a checkbox visual */
  @Prop() multipleMode = false;

  /** Visual keyboard-focus indicator (driven by parent's activeIndex) */
  @Prop({ reflect: true }) focused = false;

  /**
   * Optional icon name rendered before the label text via `<io-icon>`.
   * Accepts any valid `IoIconName` value.
   * @example
   * <io-option value="us" icon="flag-us">United States</io-option>
   */
  @Prop() icon?: string;

  /** Whether the default slot has any assigned content. */
  @State() private hasSlotContent = false;

  /** Fires when the option is activated (click or keyboard Enter/Space from parent) */
  @Event() optionSelect!: EventEmitter<IoOptionSelectDetail>;

  /**
   * Fires when this option connects to the DOM, enabling the parent io-select /
   * io-multi-select to register it without a setTimeout polling hack.
   * Composed and bubbles so it crosses the parent's Shadow DOM boundary.
   */
  @Event({ bubbles: true, composed: true }) optionConnect!: EventEmitter<IoOptionConnectDetail>;

  connectedCallback() {
    // Notify parent io-select / io-multi-select that this option is available.
    // The event bubbles and is composed so it escapes any Shadow DOM boundary
    // between this element and the nearest io-select / io-multi-select ancestor.
    this.optionConnect.emit({ value: this.value, label: this.label, disabled: this.disabled, icon: this.icon });
  }

  private handleClick = () => {
    if (this.disabled) return;
    this.optionSelect.emit({ value: this.value, label: this.label });
  };

  private handleSlotChange = (ev: Event) => {
    const slot = ev.target as HTMLSlotElement;
    this.hasSlotContent = slot.assignedNodes({ flatten: true }).length > 0;
  };

  render() {
    const optClass = getOptionClass(this.selected, this.disabled, this.focused, this.multipleMode);

    return (
      <Host
        role="option"
        aria-selected={String(this.selected)}
        aria-disabled={this.disabled ? 'true' : undefined}
        aria-checked={this.multipleMode ? String(this.checked) : undefined}
        onClick={this.handleClick}
      >
        <style>{getOptionStyles()}</style>
        <div class={optClass}>
          {this.multipleMode && (
            <span class="option__checkbox" aria-hidden="true">
              {this.checked && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              )}
            </span>
          )}
          {this.icon && (
            <span class="option__icon" aria-hidden="true">
              <io-icon name={this.icon as IoIconName} />
            </span>
          )}
          <span class="option__label">
            <slot onSlotchange={this.handleSlotChange}>
              {!this.hasSlotContent && this.label}
            </slot>
          </span>
          {!this.multipleMode && this.selected && (
            <span class="option__check" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7l3 3 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          )}
        </div>
      </Host>
    );
  }
}
