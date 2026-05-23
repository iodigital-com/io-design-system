import { Component, Prop, Element, Host, Watch, h } from '@stencil/core';

import { getFormFieldStyles } from './io-form-field-styles';

/**
 * io-form-field
 * ==============
 * Auto-wires label + input + helper-text accessibility attributes.
 * Wraps a single io-input, io-select, io-textarea, io-checkbox, or io-radio
 * and generates a unique ID to link the label via htmlFor/id, and sets
 * aria-describedby / aria-invalid on the slotted element.
 *
 * @example
 * <io-form-field label="Email address" helper-text="We will never share your email.">
 *   <io-input name="email" type="email" />
 * </io-form-field>
 *
 * <io-form-field label="Username" invalid error-text="Username is taken.">
 *   <io-input name="username" />
 * </io-form-field>
 */
@Component({
  tag: 'io-form-field',
  shadow: true,
})
export class IoFormField {
  @Element() el!: HTMLElement;

  // ── Props ─────────────────────────────────────────────────────

  /** Label text shown above the slotted input */
  @Prop() label!: string;

  /** Helper/description text shown below the control */
  @Prop() helperText = '';

  /** Validation error text shown when invalid is true */
  @Prop() errorText = '';

  /** Marks the field as invalid — shows errorText and sets aria-invalid on the child */
  @Prop({ reflect: true }) invalid = false;

  /** Marks the label as required (adds asterisk) */
  @Prop() required = false;

  // ── Private ───────────────────────────────────────────────────

  private inputId!: string;
  private helperId!: string;
  private errorId!: string;

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    const suffix = Math.random().toString(36).slice(2);
    this.inputId = `io-ff-${suffix}`;
    this.helperId = `io-ff-helper-${suffix}`;
    this.errorId = `io-ff-error-${suffix}`;
  }

  componentDidLoad() {
    this.syncChildAttributes();
  }

  @Watch('invalid')
  onInvalidChange() {
    this.syncChildAttributes();
  }

  @Watch('helperText')
  onHelperTextChange() {
    this.syncChildAttributes();
  }

  @Watch('errorText')
  onErrorTextChange() {
    this.syncChildAttributes();
  }

  // ── Private helpers ───────────────────────────────────────────

  /**
   * Finds the first supported child component and syncs ARIA attributes.
   * Queries the light DOM (outside Shadow DOM) for the slotted element.
   */
  private syncChildAttributes() {
    const child = this.el.querySelector<HTMLElement & Record<string, unknown>>(
      'io-input, io-select, io-textarea, io-checkbox, io-radio',
    );
    if (!child) return;

    // Set the ID so the label's htmlFor can reference it
    child.setAttribute('id', this.inputId);

    // Build aria-describedby from helper or error IDs
    const describedBy = this.buildDescribedBy();
    if (describedBy) {
      child.setAttribute('aria-describedby', describedBy);
    } else {
      child.removeAttribute('aria-describedby');
    }

    // Set aria-invalid
    if (this.invalid) {
      child.setAttribute('aria-invalid', 'true');
    } else {
      child.removeAttribute('aria-invalid');
    }
  }

  private buildDescribedBy(): string {
    const ids: string[] = [];
    if (!this.invalid && this.helperText) ids.push(this.helperId);
    if (this.invalid && this.errorText) ids.push(this.errorId);
    return ids.join(' ');
  }

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { label, helperText, errorText, invalid, required } = this;
    const labelClass = required ? 'form-field__label form-field__label--required' : 'form-field__label';

    return (
      <Host>
        <style>{getFormFieldStyles()}</style>
        <div class="form-field">
          <label htmlFor={this.inputId} class={labelClass}>
            {label}
          </label>
          <div class="form-field__control">
            <slot />
          </div>
          {!invalid && helperText && (
            <span id={this.helperId} class="form-field__helper">
              {helperText}
            </span>
          )}
          {invalid && errorText && (
            <span id={this.errorId} class="form-field__error" aria-live="polite">
              {errorText}
            </span>
          )}
        </div>
      </Host>
    );
  }
}
