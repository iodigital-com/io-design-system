import { Component, Prop, Element, Host, h } from '@stencil/core';

import { getFieldsetStyles } from './io-fieldset-styles';
import { normaliseAria } from './io-fieldset-utils';

import type { IoFieldsetAriaRecord } from './types';

/**
 * io-fieldset
 * ===========
 * Generic fieldset primitive for grouping mixed form controls or content sections.
 * Renders a semantic <fieldset> / <legend> pair with full ARIA customisation support.
 *
 * Use io-fieldset when you need to group heterogeneous controls (e.g. a mix of
 * io-input + io-checkbox) that io-checkbox-group or io-radio-group do not cover.
 *
 * io-fieldset is **non-interactive and non-form-associated**:
 * - It renders no native form controls itself.
 * - It does NOT implement `formAssociated` — each slotted child manages its own value.
 * - It does NOT emit custom events.
 *
 * @example
 * <io-fieldset label="Shipping address" required>
 *   <io-input label="Street" name="street" required />
 *   <io-input label="City" name="city" required />
 * </io-fieldset>
 *
 * @example
 * <io-fieldset label="Notification preferences" .aria={{ role: 'group' }}>
 *   <io-checkbox label="Email" name="notif" value="email" />
 *   <io-checkbox label="SMS" name="notif" value="sms" />
 * </io-fieldset>
 */
@Component({
  tag: 'io-fieldset',
  shadow: { delegatesFocus: true },
})
export class IoFieldset {
  @Element() el!: HTMLElement;

  // ── Private IDs ────────────────────────────────────────────────
  private componentId!: string;

  // ── Props ──────────────────────────────────────────────────────

  /** Legend text — required for accessibility. Reflected so CSS selectors can target it. */
  @Prop({ reflect: true }) label!: string;

  /** Marks the group as required. Reflected. */
  @Prop({ reflect: true }) required = false;

  /**
   * Puts the fieldset in error state.
   * Use the io-DS standard `error` prop name.
   * Reflected so `:host([error])` CSS selectors work.
   */
  @Prop({ reflect: true }) error = false;

  /**
   * Error message shown when `error=true`.
   * An empty or undefined value suppresses the error text node while
   * leaving error styling active.
   */
  @Prop() errorMessage: string | undefined;

  /**
   * Arbitrary ARIA attributes to spread onto the inner <fieldset> element.
   * Keys may include or omit the `aria-` prefix — both forms are accepted.
   * The special key `role` is passed through as-is (e.g. `{ role: 'radiogroup' }`).
   *
   * @example
   * <io-fieldset .aria={{ role: 'radiogroup' }} label="Delivery type">
   *   ...
   * </io-fieldset>
   */
  @Prop() aria?: IoFieldsetAriaRecord;

  // ── Lifecycle ──────────────────────────────────────────────────

  componentWillLoad() {
    this.componentId = `io-fs-${Math.random().toString(36).slice(2, 9)}`;
  }

  // ── Render ─────────────────────────────────────────────────────

  render() {
    const { label, required, error, errorMessage, aria } = this;
    const errorId = `${this.componentId}-error`;
    const showError = error && errorMessage;

    const spreadAria = aria ? normaliseAria(aria) : {};

    return (
      <Host>
        <style>{getFieldsetStyles()}</style>
        <fieldset
          class="fieldset"
          aria-describedby={showError ? errorId : undefined}
          {...spreadAria}
        >
          <legend class="fieldset__legend">
            {label}
            {required && <span class="fieldset__required" aria-hidden="true"> *</span>}
          </legend>
          <div class="fieldset__body">
            <slot />
          </div>
          {showError && (
            <p id={errorId} class="fieldset__error" role="alert">
              {errorMessage}
            </p>
          )}
        </fieldset>
      </Host>
    );
  }
}
