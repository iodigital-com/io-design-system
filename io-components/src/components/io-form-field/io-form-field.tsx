import { Component, Prop, Element, Host, Watch, h } from '@stencil/core';

import type { IoFieldState } from '../../utils/field-state';

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
 * <io-form-field label="Username" state="error" message="Username is taken.">
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

  /** Validation message shown when state is not 'none' */
  @Prop() message = '';

  /** Validation state — propagates to child via aria-invalid and controls message display */
  @Prop({ reflect: true }) state: IoFieldState = 'none';

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

  @Watch('state')
  onStateChange() {
    this.syncChildAttributes();
  }

  @Watch('helperText')
  onHelperTextChange() {
    this.syncChildAttributes();
  }

  @Watch('message')
  onMessageChange() {
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

    // Set aria-invalid when state is error
    if (this.state === 'error') {
      child.setAttribute('aria-invalid', 'true');
    } else {
      child.removeAttribute('aria-invalid');
    }
  }

  private buildDescribedBy(): string {
    const ids: string[] = [];
    const hasState = this.state !== 'none';
    if (!hasState && this.helperText) ids.push(this.helperId);
    if (hasState && this.message) ids.push(this.errorId);
    return ids.join(' ');
  }

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { label, helperText, message, state, required } = this;
    const labelClass = required ? 'form-field__label form-field__label--required' : 'form-field__label';
    const hasState = state !== 'none';

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
          {!hasState && helperText && (
            <span id={this.helperId} class="form-field__helper">
              {helperText}
            </span>
          )}
          {hasState && message && (
            <span id={this.errorId} class={`form-field__message form-field__message--${state}`} aria-live="polite">
              {message}
            </span>
          )}
        </div>
      </Host>
    );
  }
}
