import { Component, Prop, Event, EventEmitter, Method, Element, Host, Watch, State, AttachInternals, h } from '@stencil/core';

import { getRadioStyles } from './io-radio-styles';
import { resolveRadioId, getRadioWrapperClass, getRadioCustomClass } from './io-radio-utils';
import { syncFormState } from '../../utils/form/sync-form-state';
import { Required } from '../common/required/Required';
import { StateMessage } from '../common/state-message/StateMessage';

import type { IoFieldState } from '../../utils/field-state';
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
 * <io-radio label="Required" name="req" required state="error" message="Please select an option" />
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
  @Prop({ mutable: true, reflect: true }) disabled = false;

  /** Validation state — controls border color and message color */
  @Prop({ reflect: true }) state: IoFieldState = 'none';

  /** Validation message shown below the radio (used for error, success, and warning states) */
  @Prop() message = '';

  /** Helper text shown below (replaced by error when error=true) */
  @Prop() helperText: string | undefined;

  /** Shows a loading spinner replacing the radio control and disables interaction */
  @Prop({ reflect: true }) loading = false;

  /** Associates this field with a <form> element by ID — enables out-of-DOM form participation */
  @Prop({ reflect: true }) form?: string;

  /** Visually hides the label while keeping it accessible to screen readers */
  @Prop({ reflect: true }) hideLabel = false;

  // ── Events ────────────────────────────────────────────────────

  /** Fires when the checked state changes */
  @Event({ bubbles: true, composed: true }) change!: EventEmitter<IoRadioChangeDetail>;

  /** Fires when the radio loses focus — parity with io-checkbox and io-switch */
  @Event() blur!: EventEmitter<FocusEvent>;

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

  /** Tracks FACE form validation invalidity so aria-invalid reflects both state prop and form state */
  @State() faceInvalid = false;

  @State() private hasLabelSlot = false;
  @State() private hasDescriptionSlot = false;
  @State() private hasMessageSlot = false;

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
    if (this.hideLabel && !this.label) {
      console.warn('[io-radio] hideLabel=true requires a non-empty label for accessibility.');
    }
  }

  componentDidLoad() {
    this.applyExternalLabelAOM();
  }

  /**
   * Support external label wrapping: `<label><io-radio /> Option A</label>`
   * Uses AOM ariaLabelledByElements when available, aria-label text fallback otherwise.
   * Only applied when no label prop or label slot is already present.
   */
  private applyExternalLabelAOM() {
    const hasLabelProp = this.label?.trim();
    const hasLabelSlot = !!this.el.querySelector('[slot="label"]');
    if (hasLabelProp || hasLabelSlot) return;

    const externalLabel = this.el.closest('label');
    if (!externalLabel) return;

    const nativeInput = this.el.shadowRoot?.querySelector<HTMLInputElement>('input');
    if (!nativeInput) return;

    if ('ariaLabelledByElements' in nativeInput) {
      (nativeInput as HTMLInputElement & { ariaLabelledByElements: Element[] }).ariaLabelledByElements = [externalLabel];
    } else {
      const text = externalLabel.textContent?.trim() ?? '';
      if (text) nativeInput.setAttribute('aria-label', text);
    }
  }

  formResetCallback() {
    this.checked = this.defaultChecked;
    this.syncFormValue();

    // Prefer scoped group-level reset to avoid document-wide side effects (#941).
    // When inside an io-radio-group, the group's own formResetCallback handles
    // sibling re-evaluation — no cross-group interference.
    const group = this.el.closest('io-radio-group') as HTMLElement & { formResetCallback?: () => void } | null;
    if (group) {
      // The group owns mutual-exclusion; individual radio reset is sufficient.
      return;
    }

    // Fallback: standalone radios (not inside io-radio-group) still need
    // document-scoped sibling re-evaluation for backwards compatibility.
    if (this.name) {
      const name = this.name;
      // #941: scope sibling lookup to the closest io-radio-group when present so
      // two groups on the same page with the same name do not interfere.
      const scope = this.el.closest('io-radio-group') ?? document;
      scope.querySelectorAll('io-radio').forEach((sibling) => {
        if (sibling !== this.el) {
          const s = sibling as HTMLElement & { name?: string; checked: boolean; syncFormValue?: () => void };
          if (s.name === name) {
            if (this.defaultChecked && s.checked) {
              // Deselect competing checked radio before re-syncing its validity
              s.checked = false;
            }
            // Re-evaluate group validity so stale faceInvalid is cleared on all siblings
            s.syncFormValue?.();
          }
        }
      });
    }
  }

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  formStateRestoreCallback(state: string | null) {
    this.checked = state !== null;
    this.syncFormValue();
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
      // Prefer group-scoped lookup when inside io-radio-group to avoid cross-group
      // interference between unrelated groups with the same name (#941).
      const groupSatisfied = this.name ? this.isGroupSatisfied() : false;
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

  /**
   * Returns true if any sibling radio with the same name is checked.
   * When inside an io-radio-group, only searches within that group to prevent
   * cross-group interference (#941). Falls back to document scope for
   * standalone radios (backwards compat).
   */
  private isGroupSatisfied(): boolean {
    const name = this.name;
    if (!name) return false;
    const group = this.el.closest('io-radio-group');
    const scope: Element = group ?? document.documentElement;
    return Array.from(scope.querySelectorAll('io-radio')).some((r) => {
      const sibling = r as HTMLElement & { name?: string; checked?: boolean };
      return sibling !== this.el && sibling.name === name && sibling.checked === true;
    });
  }

  private handleLabelSlotChange = (ev: Event) => {
    const slot = ev.target as HTMLSlotElement;
    this.hasLabelSlot = slot.assignedElements().length > 0;
  };

  private handleDescriptionSlotChange = (ev: Event) => {
    const slot = ev.target as HTMLSlotElement;
    this.hasDescriptionSlot = slot.assignedElements().length > 0;
  };

  private handleMessageSlotChange = (ev: Event) => {
    const slot = ev.target as HTMLSlotElement;
    this.hasMessageSlot = slot.assignedElements().length > 0;
  };

  // ── Handlers ─────────────────────────────────────────────────

  private handleBlur = (ev: FocusEvent) => {
    if (this.disabled || this.loading) return;
    this.blur.emit(ev);
  };

  private handleChange = (ev: Event) => {
    if (this.disabled || this.loading) return;
    const input = ev.target as HTMLInputElement;
    this.checked = input.checked;
    this.change.emit({ value: this.value });

    // Mutual exclusion: when this radio becomes checked, deselect all other
    // io-radio elements that share the same name.
    // When inside an io-radio-group, scope to the group to prevent two unrelated
    // groups with identical name attributes from interfering (#941).
    // For standalone radios (no ancestor group), fall back to document scope.
    if (input.checked && this.name) {
      const name = this.name;
      const group = this.el.closest('io-radio-group');
      if (group) {
        // Group-scoped: only affect siblings within the same group
        group.querySelectorAll('io-radio').forEach((sibling) => {
          if (sibling !== this.el) {
            const s = sibling as HTMLElement & { name?: string; checked: boolean };
            if (s.name === name && s.checked) {
              s.checked = false;
            }
          }
        });
      } else {
        // Standalone fallback: document-wide (deprecated, kept for backwards compat)
        if (process.env.NODE_ENV !== 'test') {
          console.warn('[io-radio] Using document-wide mutual exclusion for standalone radios. Wrap in io-radio-group for proper scoping.');
        }
        document.querySelectorAll('io-radio').forEach((sibling) => {
          if (sibling !== this.el) {
            const s = sibling as HTMLElement & { name?: string; checked: boolean };
            if (s.name === name && s.checked) {
              s.checked = false;
            }
          }
        });
      }
    }
  };

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { label, name, value, checked, required, disabled, loading, state, message, helperText, form, hideLabel, hasLabelSlot, hasDescriptionSlot, hasMessageSlot } = this;
    const isDisabled = disabled || loading;
    const inputId = this.fieldId;
    const messageId = `${inputId}-message`;
    const helperId = `${inputId}-helper`;
    const faceErrorId = `${inputId}-face-error`;

    const showError = state === 'error' || this.faceInvalid;
    const showSuccess = state === 'success' && !this.faceInvalid;
    const showWarning = state === 'warning' && !this.faceInvalid;
    const hasState = showError || showSuccess || showWarning;
    const showFaceError = this.faceInvalid && state !== 'error';

    // #1094: messageId and faceErrorId are always included in aria-describedby so
    // the live-region relationship is established before any error occurs.
    // The <p> wrappers are rendered unconditionally; only their inner text is gated.
    const describedBy = [
      messageId,
      faceErrorId,
      !hasState && !showFaceError && (hasDescriptionSlot || helperText) ? helperId : null,
    ]
      .filter((id): id is string => Boolean(id))
      .join(' ');

    return (
      <Host aria-busy={loading ? 'true' : undefined}>
        <style>{getRadioStyles()}</style>
        <div class={getRadioWrapperClass(isDisabled, showError, showSuccess, showWarning, loading)}>
          <label class="radio-label" htmlFor={inputId}>
            {loading ? (
              <span class="radio-control radio-control--loading" aria-hidden="true">
                <io-spinner size="sm" />
              </span>
            ) : (
              <span class="radio-control">
                <input
                  id={inputId}
                  class="radio-native"
                  type="radio"
                  name={name}
                  value={value}
                  checked={checked}
                  disabled={isDisabled}
                  required={required}
                  form={form}
                  aria-invalid={showError ? 'true' : undefined}
                  aria-describedby={describedBy || undefined}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                />
                <span class={getRadioCustomClass(checked)} aria-hidden="true">
                  <span class="radio-dot" />
                </span>
              </span>
            )}
            <span class={hideLabel ? 'radio-text radio-text--sr-only' : 'radio-text'}>
              <span class={hasLabelSlot ? 'radio-label__slot' : 'radio-label__slot radio-label__slot--hidden'}>
                <slot name="label" onSlotchange={this.handleLabelSlotChange} />
              </span>
              {!hasLabelSlot && label}
              {required && <Required />}
            </span>
          </label>
        </div>
        {(showError || showSuccess || showWarning) && (
          <StateMessage
            state={showError ? 'error' : showSuccess ? 'success' : 'warning'}
            message={message}
            hasSlot={hasMessageSlot}
            messageId={messageId}
            classPrefix="radio"
            visible={!!(showError ? (hasMessageSlot || message) : message)}
            onSlotChange={this.handleMessageSlotChange}
          />
        )}
        {showFaceError && (
          <p id={faceErrorId} class="radio-message radio-message--error" role="alert">
            Please select an option
          </p>
        )}
        {!hasState && !this.faceInvalid && (
          <p id={helperId} class={`radio-helper${hasDescriptionSlot || helperText ? '' : ' radio-helper--hidden'}`}>
            <span class={hasDescriptionSlot ? 'radio-description__slot' : 'radio-description__slot radio-description__slot--hidden'}>
              <slot name="description" onSlotchange={this.handleDescriptionSlotChange} />
            </span>
            {!hasDescriptionSlot && helperText}
          </p>
        )}
      </Host>
    );
  }
}
