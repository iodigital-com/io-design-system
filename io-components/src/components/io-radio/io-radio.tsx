import { Component, Prop, Event, EventEmitter, Method, Element, Host, Watch, State, AttachInternals, h } from '@stencil/core';

import { getRadioStyles } from './io-radio-styles';
import { resolveRadioId, getRadioWrapperClass, getRadioCustomClass } from './io-radio-utils';

import type { IoRadioChangeDetail } from './types';

/**
 * io-radio
 * =========
 * Custom-styled radio button with label, helper text, and error state.
 * Use multiple io-radio components with the same `name` to form a radio group.
 *
 * @example
 * <io-radio label="Option A" name="choice" value="a" />
 * <io-radio label="Option B" name="choice" value="b" checked />
 * <io-radio label="Required" name="req" required error error-message="Please select an option" />
 */
@Component({
  tag: 'io-radio',
  shadow: { delegatesFocus: true },
  formAssociated: true,
})
export class IoRadio {
  @Element() el!: HTMLElement;
  @AttachInternals() internals!: ElementInternals;

  // ── Props ─────────────────────────────────────────────────────

  /** Label text — required for accessibility */
  @Prop() label!: string;

  /** Input name — share across radio group */
  @Prop() name: string | undefined;

  /** Value submitted with the form */
  @Prop() value = '';

  /** Checked state */
  @Prop({ mutable: true, reflect: true }) checked = false;

  /** Marks the field as required */
  @Prop() required = false;

  /** Disables the radio button */
  @Prop({ reflect: true }) disabled = false;

  /** Puts the radio in error state */
  @Prop({ reflect: true }) error = false;

  /** Error message shown below the radio */
  @Prop() errorMessage: string | undefined;

  /** Helper text shown below (replaced by error when error=true) */
  @Prop() helperText: string | undefined;

  // ── Events ────────────────────────────────────────────────────

  /** Fires when the checked state changes */
  @Event() change!: EventEmitter<IoRadioChangeDetail>;

  // ── Methods ───────────────────────────────────────────────────

  /** Programmatically move focus to the radio */
  @Method()
  async setFocus(options?: FocusOptions): Promise<void> {
    const input = this.el.shadowRoot?.querySelector<HTMLInputElement>('input');
    input?.focus(options);
  }

  /** Check validity without showing browser validation UI. Returns true if valid. */
  @Method()
  async checkValidity(): Promise<boolean> {
    return this.internals?.checkValidity?.() ?? true;
  }

  /** Check validity and show browser validation UI if invalid. Returns true if valid. */
  @Method()
  async reportValidity(): Promise<boolean> {
    return this.internals?.reportValidity?.() ?? true;
  }

  // ── State ─────────────────────────────────────────────────────

  /** Tracks FACE form validation invalidity so aria-invalid reflects both error prop and form state */
  @State() faceInvalid = false;

  // ── Private ───────────────────────────────────────────────────

  private fallbackId!: string;
  private fieldId!: string;
  private defaultChecked = false;

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    this.fallbackId = Math.random().toString(36).slice(2);
    this.fieldId = resolveRadioId(this.name, this.fallbackId);
    this.defaultChecked = this.checked;
    this.syncFormValue();
  }

  formResetCallback() {
    this.checked = this.defaultChecked;
    this.syncFormValue();

    if (this.name) {
      const name = this.name;
      document.querySelectorAll('io-radio').forEach((sibling) => {
        if (sibling !== this.el) {
          const s = sibling as HTMLElement & { name?: string; checked: boolean };
          if (s.name === name) {
            if (this.defaultChecked && s.checked) {
              // Deselect competing checked radio before re-syncing its validity
              s.checked = false;
            }
            // Re-evaluate group validity so stale faceInvalid is cleared on all siblings
            (s as any).syncFormValue?.();
          }
        }
      });
    }
  }

  @Watch('checked')
  onCheckedChange() {
    this.syncFormValue();
  }

  @Watch('value')
  onValueChange() {
    this.syncFormValue();
  }

  @Watch('required')
  onRequiredChange() {
    this.syncFormValue();
  }

  private syncFormValue() {
    // Unchecked radio: null = excluded from FormData (matches native radio behaviour)
    this.internals?.setFormValue?.(this.checked ? this.value : null);
    if (this.required && !this.checked) {
      // For a radio group, required is satisfied when *any* radio sharing the same
      // name is checked — not just this one. Without this check, form.checkValidity()
      // fails even when another radio in the group is selected.
      const groupSatisfied = this.name
        ? Array.from(document.querySelectorAll('io-radio')).some((r) => {
            const sibling = r as HTMLElement & { name?: string; checked?: boolean };
            return sibling !== this.el && sibling.name === this.name && sibling.checked === true;
          })
        : false;
      if (!groupSatisfied) {
        this.internals?.setValidity?.({ valueMissing: true }, 'Please select an option');
        this.faceInvalid = true;
      } else {
        this.internals?.setValidity?.({});
        this.faceInvalid = false;
      }
    } else {
      this.internals?.setValidity?.({});
      this.faceInvalid = false;
    }
  }

  // ── Handlers ─────────────────────────────────────────────────

  private handleChange = (ev: Event) => {
    if (this.disabled) return;
    const input = ev.target as HTMLInputElement;
    this.checked = input.checked;
    this.change.emit({ checked: input.checked, value: this.value });

    // Mutual exclusion: when this radio becomes checked, deselect all other
    // io-radio elements in the document that share the same name. Native
    // <input type="radio"> handles this automatically within a single tree,
    // but Shadow DOM boundaries prevent cross-component grouping.
    if (input.checked && this.name) {
      const name = this.name;
      document.querySelectorAll('io-radio').forEach((sibling) => {
        if (sibling !== this.el) {
          const s = sibling as HTMLElement & { name?: string; checked: boolean };
          if (s.name === name && s.checked) {
            s.checked = false;
          }
        }
      });
    }
  };

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { label, name, value, checked, required, disabled, error, errorMessage, helperText } = this;
    const inputId = this.fieldId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;
    const faceErrorId = `${inputId}-face-error`;
    const showFaceError = this.faceInvalid && !error;
    const describedBy = [
      !error && !showFaceError && helperText ? helperId : null,
      error && errorMessage ? errorId : null,
      showFaceError ? faceErrorId : null,
    ]
      .filter((value): value is string => Boolean(value))
      .join(' ');

    return (
      <Host>
        <style>{getRadioStyles()}</style>
        <div class={getRadioWrapperClass(disabled, error || this.faceInvalid)}>
          <label class="radio-label" htmlFor={inputId}>
            <span class="radio-control">
              <input
                id={inputId}
                class="radio-native"
                type="radio"
                name={name}
                value={value}
                checked={checked}
                disabled={disabled}
                required={required}
                aria-invalid={(error || this.faceInvalid) ? 'true' : undefined}
                aria-describedby={describedBy || undefined}
                onChange={this.handleChange}
              />
              <span
                class={getRadioCustomClass(checked)}
                aria-hidden="true"
              >
                <span class="radio-dot" />
              </span>
            </span>
            <span class="radio-text">
              {label}
              {required && (
                <span class="radio-required" aria-hidden="true">
                  {' *'}
                </span>
              )}
            </span>
          </label>
        </div>
        {error && errorMessage && (
          <p id={errorId} class="radio-error" role="alert">
            {errorMessage}
          </p>
        )}
        {showFaceError && (
          <p id={faceErrorId} class="radio-error" role="alert">
            Please select an option
          </p>
        )}
        {!error && !this.faceInvalid && helperText && (
          <p id={helperId} class="radio-helper">
            {helperText}
          </p>
        )}
      </Host>
    );
  }
}
