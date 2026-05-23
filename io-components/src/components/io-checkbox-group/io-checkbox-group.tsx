import { Component, Prop, Event, EventEmitter, Element, Host, Watch, Listen, h } from '@stencil/core';

import { getCheckboxGroupStyles } from './io-checkbox-group-styles';

import type { IoCheckboxGroupChangeDetail } from './types';

/**
 * io-checkbox-group
 * ==================
 * Wraps io-checkbox items in a semantic fieldset/legend and automatically
 * propagates the `name` and `disabled` props to all slotted children.
 * Emits change with the array of all currently checked values.
 *
 * @example
 * <io-checkbox-group label="Preferred notifications" name="notifications">
 *   <io-checkbox label="Email" value="email" />
 *   <io-checkbox label="SMS" value="sms" />
 *   <io-checkbox label="Push" value="push" />
 * </io-checkbox-group>
 */
@Component({
  tag: 'io-checkbox-group',
  shadow: true,
})
export class IoCheckboxGroup {
  @Element() el!: HTMLElement;

  // ── Props ─────────────────────────────────────────────────────

  /** Legend text — required for accessibility */
  @Prop() label!: string;

  /** Name propagated to all slotted io-checkbox children */
  @Prop() name!: string;

  /** Marks the group as required */
  @Prop() required = false;

  /** Disables the entire group */
  @Prop({ reflect: true }) disabled = false;

  /** Marks the group as invalid */
  @Prop({ reflect: true }) invalid = false;

  /** Helper text shown below the legend */
  @Prop() helperText = '';

  // ── Events ────────────────────────────────────────────────────

  /** Fires when any checkbox in the group changes, with all checked values */
  @Event() change!: EventEmitter<IoCheckboxGroupChangeDetail>;

  // ── Lifecycle ─────────────────────────────────────────────────

  componentDidLoad() {
    this.syncChildren();
  }

  @Watch('name')
  onNameChange() {
    this.syncChildren();
  }

  @Watch('disabled')
  onDisabledChange() {
    this.syncChildren();
  }

  // ── Event Handlers ────────────────────────────────────────────

  /**
   * Listen for 'change' events bubbled from io-checkbox children.
   * Collects all checked values across the group and emits change.
   */
  @Listen('change', { capture: false })
  handleCheckboxChange(ev: Event) {
    const checkbox = ev.target as HTMLElement;
    if (checkbox && checkbox.tagName?.toLowerCase() === 'io-checkbox') {
      const checkedValues = this.getCheckedValues();
      this.change.emit({ checkedValues });
    }
  }

  // ── Private helpers ───────────────────────────────────────────

  private syncChildren = () => {
    const checkboxes = Array.from(
      this.el.querySelectorAll<HTMLElement & { name: string; disabled: boolean; value: string }>('io-checkbox'),
    );
    for (const checkbox of checkboxes) {
      checkbox.name = this.name;
      if (this.disabled) {
        checkbox.disabled = true;
      }
    }
  };

  private getCheckedValues(): string[] {
    const checkboxes = Array.from(
      this.el.querySelectorAll<HTMLElement & { checked: boolean; value: string }>('io-checkbox'),
    );
    return checkboxes
      .filter((cb) => cb.checked)
      .map((cb) => cb.value);
  }

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { label, disabled, helperText } = this;

    return (
      <Host>
        <style>{getCheckboxGroupStyles()}</style>
        <fieldset class="checkbox-group" disabled={disabled}>
          <legend class="checkbox-group__legend">{label}</legend>
          {helperText && (
            <span class="checkbox-group__helper">{helperText}</span>
          )}
          <div class="checkbox-group__options">
            <slot onSlotchange={this.syncChildren} />
          </div>
        </fieldset>
      </Host>
    );
  }
}
