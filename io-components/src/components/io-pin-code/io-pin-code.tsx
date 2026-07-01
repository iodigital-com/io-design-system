import { Component, Prop, Event, EventEmitter, Method, Element, Host, Watch, State, AttachInternals, h } from '@stencil/core';

import { getPinCodeStyles } from './io-pin-code-styles';
import { splitDigits, joinDigits, buildDigitLabel, isPinComplete } from './io-pin-code-utils';

import type { IoPinCodeLength, IoPinCodeType, IoPinCodeMode, IoPinCodeState, IoPinCodeChangeDetail } from './types';

/**
 * io-pin-code
 * ===========
 * Multi-slot PIN / OTP entry component with keyboard navigation,
 * auto-advance, backspace-to-previous, and clipboard paste support.
 * Participates in native HTML forms via the FACE (Form-Associated
 * Custom Elements) API.
 *
 * @example
 * <io-pin-code label="Enter PIN" name="pin" length="4" />
 * <io-pin-code label="OTP Code" length="6" type="password" required />
 */
@Component({
  tag: 'io-pin-code',
  shadow: { delegatesFocus: true },
  formAssociated: true,
})
export class IoPinCode {
  @Element() el!: HTMLElement;
  @AttachInternals() internals!: ElementInternals;

  // ── Private fields ────────────────────────────────────────────

  private inputRefs: (HTMLInputElement | null)[] = [];
  private digitLabels: string[] = [];
  private labelId!: string;
  private messageId!: string;
  private descriptionId!: string;
  private defaultValue = '';

  // ── State ─────────────────────────────────────────────────────

  /** Internal digits array — one entry per slot */
  @State() private digits: string[] = [];

  /** Tracks FACE form validation invalidity; drives aria-invalid and error UI once field has been touched */
  @State() faceInvalid = false;

  /** True after the user has blurred any slot at least once — gates eager FACE error display */
  @State() private touched = false;

  // ── Props ─────────────────────────────────────────────────────

  /** Accessible label displayed above the PIN slots */
  @Prop() label: string | undefined;

  /** Hides the visible label and collapses its space; aria-label is set on the group when a label value is provided */
  @Prop({ reflect: true }) hideLabel = false;

  /** Number of digit slots */
  @Prop() length: IoPinCodeLength = 4;

  /** Input display mode: 'number' shows digits, 'password' masks them */
  @Prop() type: IoPinCodeType = 'number';

  /** Character mode: 'numeric' (default) accepts only digits; 'alphanumeric' accepts letters and digits */
  @Prop() mode: IoPinCodeMode = 'numeric';

  /** Current PIN value — all filled digits concatenated */
  @Prop({ mutable: true }) value = '';

  /** HTML form field name */
  @Prop() name: string | undefined;

  /** Marks the field as required */
  @Prop() required = false;

  /** Disables all inputs */
  @Prop({ mutable: true, reflect: true }) disabled = false;

  /** Disables all inputs and shows a loading spinner — use while verifying the OTP on the server */
  @Prop({ reflect: true }) loading = false;

  /** Associates this field with a <form> element by ID — enables out-of-DOM form participation */
  @Prop({ reflect: true }) form?: string;

  /** Visual validation state — aligns with other io form-field components */
  @Prop({ reflect: true }) state: IoPinCodeState = 'none';

  /** Helper / validation message displayed below the slots */
  @Prop() message: string | undefined;

  /** Optional contextual description rendered between the label and the slots (e.g. "We sent a code to ja***@example.com"). Wired into aria-describedby. */
  @Prop() description: string | undefined;

  /** Override the default required-field validation message. When not set the built-in default is used. */
  @Prop() validationMessage: string | undefined;

  // ── Events ────────────────────────────────────────────────────

  /** Fires on every digit change with current value and completion status */
  @Event() change!: EventEmitter<IoPinCodeChangeDetail>;

  /** Fires when focus leaves the component (relatedTarget not in any slot) */
  @Event({ bubbles: false }) blur!: EventEmitter<FocusEvent>;

  // ── Methods ───────────────────────────────────────────────────

  /** Programmatically focus the first empty slot (or the last slot if complete) */
  @Method()
  async setFocus(options?: FocusOptions): Promise<void> {
    const firstEmpty = this.digits.findIndex((d) => !d);
    const targetIndex = firstEmpty === -1 ? this.length - 1 : firstEmpty;
    this.inputRefs[targetIndex]?.focus(options);
  }

  /** Check validity without showing browser validation UI. Returns true if valid. */
  @Method()
  async checkValidity(): Promise<boolean> {
    return this.internals?.checkValidity?.() ?? true;
  }

  /** Check validity and trigger browser validation UI if invalid. Returns true if valid. */
  @Method()
  async reportValidity(): Promise<boolean> {
    return this.internals?.reportValidity?.() ?? true;
  }

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    const suffix = Math.random().toString(36).slice(2);
    this.labelId = `io-pin-code-label-${suffix}`;
    this.messageId = `io-pin-code-msg-${suffix}`;
    this.descriptionId = `io-pin-code-desc-${suffix}`;

    this.defaultValue = this.value ?? '';
    this.digits = splitDigits(this.value ?? '', this.length, this.mode === 'alphanumeric');
    this.digitLabels = Array.from({ length: this.length }, (_, i) =>
      buildDigitLabel(i, this.length),
    );
    this.inputRefs = new Array(this.length).fill(null);
    this.syncFormValue();
    if (this.hideLabel && !this.label) {
      const hostAriaLabel = this.el.getAttribute('aria-label');
      const hostAriaLabelledBy = this.el.getAttribute('aria-labelledby');
      if (!hostAriaLabel && !hostAriaLabelledBy) {
        console.warn('[io-pin-code] hideLabel=true requires a non-empty label for accessibility.');
      }
    }
  }

  formResetCallback() {
    this.value = this.defaultValue;
    this.digits = splitDigits(this.defaultValue, this.length, this.mode === 'alphanumeric');
    this.touched = false;
    this.syncFormValue();
    // Reset visual invalidity indicator after form reset — users shouldn't see
    // errors before re-interacting, even if the field is required and empty.
    this.faceInvalid = false;
  }

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  @Watch('value')
  onValueChange(newValue: string) {
    this.digits = splitDigits(newValue ?? '', this.length, this.mode === 'alphanumeric');
    this.syncFormValue();
  }

  @Watch('required')
  onRequiredChange() {
    this.syncFormValue();
  }

  @Watch('length')
  onLengthChange() {
    this.digits = splitDigits(this.value ?? '', this.length, this.mode === 'alphanumeric');
    this.digitLabels = Array.from({ length: this.length }, (_, i) =>
      buildDigitLabel(i, this.length),
    );
    this.inputRefs = new Array(this.length).fill(null);
    this.syncFormValue();
  }

  // ── Private helpers ───────────────────────────────────────────

  private syncFormValue() {
    const pinValue = joinDigits(this.digits);
    const isComplete = isPinComplete(this.digits);
    this.internals?.setFormValue?.(pinValue || null);
    const isValid = !this.required || isComplete;

    if (!isValid) {
      const msg = this.validationMessage ?? 'Please complete the PIN';
      this.internals?.setValidity?.({ valueMissing: true }, msg);
      this.faceInvalid = this.touched;
    } else {
      this.internals?.setValidity?.({});
      this.faceInvalid = false;
    }
  }

  private updateDigit(index: number, digit: string) {
    const updated = [...this.digits];
    updated[index] = digit;
    this.digits = updated;

    const pinValue = joinDigits(updated);
    this.value = pinValue;
    this.syncFormValue();

    this.change.emit({
      value: pinValue,
      isComplete: isPinComplete(updated),
    });
  }

  // ── Event handlers ────────────────────────────────────────────

  private handleKeydown = (ev: KeyboardEvent, index: number) => {
    if (this.disabled || this.loading) return;

    const key = ev.key;

    // Submit parent form on Enter (#1050)
    if (key === 'Enter') {
      const form = this.internals?.form;
      if (form) {
        ev.preventDefault();
        form.requestSubmit();
      }
      return;
    }

    // Recover from Dead/Process keys (DE/FR keyboards, IME) (#1064)
    if (key === 'Dead' || key === 'Process') {
      const input = ev.target as HTMLInputElement;
      input.blur();
      requestAnimationFrame(() => input.focus());
      return;
    }

    if (key === 'Backspace') {
      ev.preventDefault();
      if (this.digits[index]) {
        this.updateDigit(index, '');
      } else if (index > 0) {
        this.updateDigit(index - 1, '');
        this.inputRefs[index - 1]?.focus();
      }
      return;
    }

    if (key === 'ArrowLeft') {
      ev.preventDefault();
      if (index > 0) this.inputRefs[index - 1]?.focus();
      return;
    }

    if (key === 'ArrowRight') {
      ev.preventDefault();
      if (index < this.length - 1) this.inputRefs[index + 1]?.focus();
      return;
    }

    if (key === 'Delete') {
      ev.preventDefault();
      this.updateDigit(index, '');
      return;
    }

    if (key === 'Tab') {
      // Allow natural tab behaviour
      return;
    }

    // Accept single character matching the configured mode (#1052)
    const isAllowed = this.mode === 'alphanumeric' ? /^[A-Za-z0-9]$/.test(key) : /^[0-9]$/.test(key);
    if (isAllowed) {
      ev.preventDefault();
      this.updateDigit(index, key);
      if (index < this.length - 1) {
        this.inputRefs[index + 1]?.focus();
      }
    } else if (key.length === 1) {
      // Block disallowed printable characters
      ev.preventDefault();
    }
  };

  private handleInput = (ev: InputEvent, index: number) => {
    if (this.disabled || this.loading) return;
    const input = ev.target as HTMLInputElement;
    const raw = input.value;
    const isAlpha = this.mode === 'alphanumeric';
    const sanitized = isAlpha ? raw.replace(/[^A-Za-z0-9]/g, '') : raw.replace(/\D/g, '');

    // SMS autofill / paste via input event — distribute bulk input across slots (#1059)
    if (sanitized.length > 1) {
      const chars = sanitized.slice(0, this.length - index).split('');
      const updated = [...this.digits];
      chars.forEach((ch, i) => {
        const slot = index + i;
        if (slot < this.length) updated[slot] = ch;
      });
      this.digits = updated;
      const pinValue = joinDigits(updated);
      this.value = pinValue;
      this.syncFormValue();
      this.change.emit({ value: pinValue, isComplete: isPinComplete(updated) });
      // Focus first empty or last slot
      const firstEmpty = updated.findIndex((d) => !d);
      const focusIndex = firstEmpty === -1 ? this.length - 1 : firstEmpty;
      this.inputRefs[focusIndex]?.focus();
      return;
    }

    // Single character — handles mobile virtual keyboards
    const char = sanitized.slice(-1);
    // Reset to current stored char if invalid
    input.value = char || '';
    if (char) {
      this.updateDigit(index, char);
      if (index < this.length - 1) {
        this.inputRefs[index + 1]?.focus();
      }
    } else {
      this.updateDigit(index, '');
    }
  };

  private handlePaste = (ev: ClipboardEvent, startIndex: number) => {
    if (this.disabled || this.loading) return;
    ev.preventDefault();
    const text = ev.clipboardData?.getData('text') ?? '';
    const isAlpha = this.mode === 'alphanumeric';
    const digits = (isAlpha ? text.replace(/[^A-Za-z0-9]/g, '') : text.replace(/\D/g, '')).slice(0, this.length - startIndex).split('');
    if (!digits.length) return;

    const updated = [...this.digits];
    digits.forEach((d, i) => {
      const slot = startIndex + i;
      if (slot < this.length) updated[slot] = d;
    });
    this.digits = updated;

    const pinValue = joinDigits(updated);
    this.value = pinValue;
    this.syncFormValue();
    this.change.emit({ value: pinValue, isComplete: isPinComplete(updated) });

    // Focus the slot after the last pasted character, or the last slot
    const nextIndex = Math.min(startIndex + digits.length, this.length - 1);
    this.inputRefs[nextIndex]?.focus();
  };

  private handleFocus = (ev: FocusEvent) => {
    const input = ev.target as HTMLInputElement;
    // Select existing content so typing replaces it naturally
    input.select();
  };

  private handleBlur = (ev: FocusEvent) => {
    if (this.inputRefs.includes(ev.relatedTarget as HTMLInputElement)) return;
    this.touched = true;
    this.syncFormValue();
    this.blur?.emit?.(ev);
  };

  // ── Render ───────────────────────────────────────────────────

  private getSlotClass(index: number): string {
    const filled = !!this.digits[index];
    const isError = this.state === 'error' || this.faceInvalid;
    const classes = ['pin-code__slot'];
    if (filled) classes.push('pin-code__slot--filled');
    if (isError) {
      classes.push('pin-code__slot--error');
    } else if (this.state === 'success') {
      classes.push('pin-code__slot--success');
    } else if (this.state === 'warning') {
      classes.push('pin-code__slot--warning');
    }
    return classes.join(' ');
  }

  private getMessageClass(): string {
    const isError = this.state === 'error' || this.faceInvalid;
    const classes = ['pin-code__message'];
    if (isError) {
      classes.push('pin-code__message--error');
    } else if (this.state === 'success') {
      classes.push('pin-code__message--success');
    } else if (this.state === 'warning') {
      classes.push('pin-code__message--warning');
    }
    return classes.join(' ');
  }

  render() {
    const { label, type, mode, disabled, loading, form, required, message, description, validationMessage, length, hideLabel } = this;
    const isDisabled = disabled || loading;
    const isError = this.state === 'error' || this.faceInvalid;
    const showFaceError = this.faceInvalid && !message;
    const faceErrorId = `${this.messageId}-face-error`;
    const faceErrorMsg = validationMessage ?? 'Please complete the PIN';

    const showLabel = !hideLabel && !!label;
    const ariaLabelledBy = showLabel ? this.labelId : undefined;
    const ariaLabel = hideLabel && label ? label : undefined;
    const ariaDescribedBy = [
      description ? this.descriptionId : null,
      message ? this.messageId : null,
      showFaceError ? faceErrorId : null,
    ]
      .filter(Boolean)
      .join(' ') || undefined;

    const isAlpha = mode === 'alphanumeric';
    const inputMode = isAlpha ? 'text' : 'numeric';
    const pattern = isAlpha ? '[A-Za-z0-9]*' : '[0-9]*';

    return (
      <Host
        role="group"
        aria-labelledby={ariaLabelledBy}
        aria-label={ariaLabel}
        aria-disabled={isDisabled ? 'true' : undefined}
        aria-busy={loading ? 'true' : undefined}
      >
        <style>{getPinCodeStyles()}</style>

        {showLabel && (
          <span id={this.labelId} class="pin-code__label" aria-hidden="true">
            {label}
            {required && (
              <span class="pin-code__required" aria-hidden="true">
                {' *'}
              </span>
            )}
          </span>
        )}

        {description && (
          <p id={this.descriptionId} class="pin-code__description">
            {description}
          </p>
        )}

        <div class="pin-code__slots-wrapper">
          <div class="pin-code__slots" aria-describedby={ariaDescribedBy}>
            {Array.from({ length }).map((_, i) => (
              <input
                key={i}
                ref={(el) => { this.inputRefs[i] = el as HTMLInputElement | null; }}
                class={this.getSlotClass(i)}
                type={type === 'password' ? 'password' : 'text'}
                inputMode={inputMode}
                pattern={pattern}
                maxLength={1}
                value={this.digits[i] ?? ''}
                disabled={isDisabled}
                form={form}
                autoComplete="one-time-code"
                aria-label={this.digitLabels[i]}
                aria-invalid={isError ? 'true' : undefined}
                onKeyDown={(e) => this.handleKeydown(e as KeyboardEvent, i)}
                onInput={(e) => this.handleInput(e as InputEvent, i)}
                onPaste={(e) => this.handlePaste(e, i)}
                onFocus={this.handleFocus}
                onBlur={(e) => this.handleBlur(e as FocusEvent)}
              />
            ))}
          </div>
          {loading && <io-spinner class="pin-code__spinner" aria-hidden="true" />}
        </div>

        {message && (
          <p
            id={this.messageId}
            class={this.getMessageClass()}
            role={isError ? 'alert' : 'status'}
            aria-live={isError ? undefined : 'polite'}
            aria-atomic={isError ? undefined : 'true'}
          >
            {message}
          </p>
        )}
        {showFaceError && (
          <p id={faceErrorId} class="pin-code__message pin-code__message--error" role="alert">
            {faceErrorMsg}
          </p>
        )}
      </Host>
    );
  }
}
