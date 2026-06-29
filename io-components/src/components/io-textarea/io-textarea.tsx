import { Component, Prop, Event, EventEmitter, Method, State, Element, Host, Watch, AttachInternals, h } from '@stencil/core';

import { getTextareaStyles } from './io-textarea-styles';
import { resolveTextareaId, getTextareaWrapperClass, getTextareaFieldClass } from './io-textarea-utils';
import { applyAriaProp } from '../../utils/aria-prop';
import { syncFormState } from '../../utils/form/sync-form-state';
import { Required } from '../common/required/Required';
import { StateMessage } from '../common/state-message/StateMessage';

import type { IoFieldState } from '../../utils/field-state';
import type { IoTextareaResize, IoTextareaSize, IoTextareaWrap } from './types';

let idCounter = 0;

/**
 * io-textarea
 * ============
 * Multi-line text input with label, helper text, and error state.
 * Uses a full border (not underline-only) for better spatial clarity.
 *
 * @example
 * <io-textarea label="Message" rows={4} />
 * <io-textarea label="Bio" resize="auto" placeholder="Tell us about yourself..." />
 * <io-textarea label="Comments" state="error" message="This field is required" />
 */
@Component({
  tag: 'io-textarea',
  shadow: { delegatesFocus: true },
  formAssociated: true,
})
export class IoTextarea {
  @Element() el!: HTMLElement;
  @AttachInternals() internals!: ElementInternals;

  // ── Props ─────────────────────────────────────────────────────

  /** Label text — required for accessibility */
  @Prop() label!: string;

  /** Textarea name */
  @Prop() name: string | undefined;

  /** Current value */
  @Prop({ mutable: true }) value = '';

  /** Placeholder text shown when empty */
  @Prop() placeholder: string | undefined;

  /** Marks the field as required */
  @Prop() required = false;

  /** Disables the textarea */
  @Prop({ reflect: true }) disabled = false;

  /** Makes the field read-only — value is not editable but the field stays in tab order */
  @Prop({ reflect: true }) readOnly = false;

  /** Validation state — controls border color, icon, and message color */
  @Prop({ reflect: true }) state: IoFieldState = 'none';

  /** Validation message shown below (used for error, success, and warning states) */
  @Prop() message = '';

  /** Helper text shown below (replaced by message when state is set) */
  @Prop() helperText: string | undefined;

  /** Maximum number of characters */
  @Prop() maxLength: number | undefined;

  /** Minimum number of characters; wired to native minlength and FACE tooShort validity */
  @Prop() minLength: number | undefined;

  /** Visible rows (controls initial height) */
  @Prop() rows = 4;

  /** Field size aligned to io-button scale */
  @Prop({ reflect: true }) size: IoTextareaSize = 'md';

  /**
   * Autocomplete attribute.
   * @deprecated Use `autoComplete` (camelCase) instead. This prop will be removed in the next minor release.
   */
  @Prop() autocomplete: string | undefined;

  /** Native autocomplete attribute (e.g. 'on', 'off', 'name'). Canonical camelCase form. */
  @Prop() autoComplete: string | undefined;

  /** Visually hides the label while keeping it accessible to screen readers */
  @Prop({ reflect: true }) hideLabel = false;

  /**
   * Resize behaviour.
   * - 'none':     not resizable
   * - 'vertical': user can drag to resize vertically
   * - 'auto':     textarea grows automatically with content
   */
  @Prop() resize: IoTextareaResize = 'vertical';

  /** Native spellcheck attribute — passed through as-is */
  @Prop() spellCheck: boolean | undefined;

  /** Shows an inline spinner and disables the field while true */
  @Prop() loading = false;

  /** Shows {currentLength} / {maxLength} character counter below the field */
  @Prop() counter = false;

  /** Associates this element with a form by id */
  @Prop() form: string | undefined;

  /** Controls how newlines are submitted — maps to native wrap attribute */
  @Prop() wrap: IoTextareaWrap | undefined;

  /**
   * Supplementary description rendered as a persistent `<p>` below the field.
   * Distinct from `helperText` (which is hidden in error state) and from the
   * `slot="description"` slot (which accepts rich HTML content) — use this prop
   * for plain-text contextual guidance that always remains visible.
   */
  @Prop() description: string | undefined;

  /**
   * Custom ARIA attributes to inject onto the native `<textarea>` element.
   * Keys may omit or include the `aria-` prefix — both forms are accepted.
   *
   * @example
   * // Sets aria-errormessage="error-hint-id" on the native <textarea>
   * <io-textarea .aria={{ errormessage: 'error-hint-id' }} label="Bio" />
   */
  @Prop() aria?: Record<string, string>;

  // ── Events ────────────────────────────────────────────────────

  /** Fires on every keystroke — raw InputEvent */
  @Event() input!: EventEmitter<InputEvent>;

  /** Fires on change — payload is the current string value */
  @Event() change!: EventEmitter<string>;

  /** Fires when the textarea gains focus */
  @Event() focus!: EventEmitter<FocusEvent>;

  /** Fires when the textarea loses focus */
  @Event() blur!: EventEmitter<FocusEvent>;

  // ── Methods ───────────────────────────────────────────────────

  /** Programmatically move focus to the textarea */
  @Method()
  async setFocus(options?: FocusOptions): Promise<void> {
    const textarea = this.el.shadowRoot?.querySelector<HTMLTextAreaElement>('textarea');
    textarea?.focus(options);
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

  /** Tracks FACE form validation invalidity; drives aria-invalid and error UI once field has been touched */
  @State() faceInvalid = false;

  /** True after the user has blurred the field at least once — gates eager FACE error display */
  @State() private touched = false;

  @State() private hasLabelSlot = false;
  @State() private hasDescriptionSlot = false;
  @State() private hasMessageSlot = false;

  @State() private descriptionId = '';

  // ── Private ───────────────────────────────────────────────────

  private fallbackId!: string;
  private fieldId!: string;
  private counterId!: string;
  private defaultValue = '';
  private nativeTextareaEl?: HTMLTextAreaElement;

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    this.fallbackId = Math.random().toString(36).slice(2);
    this.fieldId = resolveTextareaId(this.name, this.fallbackId);
    this.counterId = `io-textarea-counter-${++idCounter}`;
    this.descriptionId = `io-textarea-desc-${this.fallbackId}`;
    this.defaultValue = this.value ?? '';
    this.syncFormValue();
    if (this.hideLabel && !this.label) {
      console.warn('[io-textarea] hideLabel=true requires a non-empty label for accessibility.');
    }
  }

  formResetCallback() {
    this.value = this.defaultValue;
    this.touched = false;
    this.syncFormValue();
    this.faceInvalid = false;
  }

  formDisabledCallback(disabled: boolean): void {
    this.disabled = disabled;
  }

  formStateRestoreCallback(state: string | File | FormData | null): void {
    this.value = typeof state === 'string' ? state : '';
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

  @Watch('maxLength')
  onMaxLengthChange() {
    this.syncFormValue();
  }

  @Watch('minLength')
  onMinLengthChange() {
    this.syncFormValue();
  }

  @Watch('aria')
  onAriaChange() {
    applyAriaProp(this.aria, this.nativeTextareaEl ?? null);
  }

  private syncFormValue() {
    const nativeTextarea = this.el?.shadowRoot?.querySelector<HTMLTextAreaElement>('textarea');
    const { faceInvalid } = syncFormState(this.internals, nativeTextarea, {
      formValue: this.value ?? '',
      required: this.required,
      disabled: this.disabled,
      touched: this.touched,
    });
    this.faceInvalid = faceInvalid;
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

  private handleInput = (ev: InputEvent) => {
    if (this.disabled || this.loading) return;
    ev.stopPropagation();
    ev.stopImmediatePropagation();
    const textarea = ev.target as HTMLTextAreaElement;
    this.value = textarea.value;
    this.input.emit(ev);

    if (this.resize === 'auto') {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  private handleChange = (ev: Event) => {
    if (this.disabled || this.loading) return;
    ev.stopPropagation();
    ev.stopImmediatePropagation();
    this.change.emit((ev.target as HTMLTextAreaElement).value);
  };

  private handleFocus = (ev: FocusEvent) => {
    if (this.disabled || this.loading) return;
    ev.stopPropagation();
    ev.stopImmediatePropagation();
    this.focus.emit(ev);
  };

  private handleBlur = (ev: FocusEvent) => {
    if (this.disabled || this.loading) return;
    ev.stopPropagation();
    ev.stopImmediatePropagation();
    this.touched = true;
    this.syncFormValue();
    this.blur.emit(ev);
  };

  /**
   * Ctrl+Enter (or Cmd+Enter on macOS) in a textarea triggers implicit form submission.
   * Plain Enter inserts a newline — this is intentional and must NOT submit the form.
   */
  private handleKeyDown = (ev: KeyboardEvent) => {
    if (ev.key === 'Enter' && (ev.ctrlKey || ev.metaKey)) {
      // Delegate to implicitSubmit but temporarily swap target tag to 'INPUT'
      // so the textarea guard inside the utility is bypassed.
      // We achieve this by calling the utility logic directly via a synthetic event
      // with ctrlKey/metaKey already handled here rather than inside the utility.
      if (ev.isComposing || ev.defaultPrevented) return;
      if (this.disabled || this.loading) return;
      const form = this.internals?.form;
      if (!form) return;
      ev.preventDefault();

      const ioSubmitBtns = Array.from(form.querySelectorAll('io-button')).filter((btn) => {
        const el = btn as HTMLElement & { type?: string };
        return el.type === 'submit' || el.getAttribute('type') === 'submit';
      });
      const nativeSubmitters = Array.from(form.elements).filter((el) => {
        const tag = el.tagName.toLowerCase();
        return (
          (tag === 'button' || tag === 'input') &&
          (el as HTMLButtonElement | HTMLInputElement).type === 'submit'
        );
      });
      const allSubmitters = [...nativeSubmitters, ...ioSubmitBtns].sort((a, b) => {
        const pos = a.compareDocumentPosition(b);
        if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
        if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
        return 0;
      });

      if (allSubmitters.length > 0) {
        (allSubmitters[0] as HTMLElement).click();
      } else {
        form.requestSubmit();
      }
    }
  };

  // ── Render ───────────────────────────────────────────────────

  /**
   * @slot label - Custom label content. Replaces the plain-text `label` prop when rich markup is needed.
   * @slot message - Validation message content. Replaces the plain-text `message` prop in error state.
   * @slot description - Helper text content. Replaces the plain-text `helperText` prop when not in error state.
   */
  render() {
    const {
      label,
      name,
      value,
      placeholder,
      required,
      disabled,
      readOnly,
      state,
      message,
      helperText,
      description,
      maxLength,
      minLength,
      rows,
      autocomplete,
      autoComplete,
      resize,
      size,
      spellCheck,
      loading,
      counter,
      form,
      wrap,
      hideLabel,
      hasLabelSlot,
      hasDescriptionSlot,
      hasMessageSlot,
    } = this;
    const textareaId = this.fieldId;
    const messageId = `${textareaId}-message`;
    const helperId = `${textareaId}-helper`;

    const isDisabled = disabled || loading;
    const showError = state === 'error' || this.faceInvalid;
    const showSuccess = state === 'success' && !this.faceInvalid;
    const showWarning = state === 'warning' && !this.faceInvalid;
    const hasState = showError || showSuccess || showWarning;
    const showMessage = showError && (hasMessageSlot || message);
    const showDescription = !showError && (hasDescriptionSlot || helperText);
    // #1094: messageId is always referenced so the live-region relationship is
    // established when the textarea receives focus, before any error occurs.
    // The <p> wrapper is rendered unconditionally; only its inner text is gated.
    const describedBy = [
      messageId,
      showDescription ? helperId : '',
      description ? this.descriptionId : '',
    ].filter(Boolean).join(' ') || undefined;

    const showCounter = counter && maxLength != null;
    const currentLength = (value ?? '').length;

    return (
      <Host aria-busy={loading ? 'true' : undefined}>
        <style>{getTextareaStyles()}</style>
        <div class={getTextareaWrapperClass(showError, showSuccess, showWarning, isDisabled, readOnly)} inert={loading ? true : undefined}>
          <textarea
            id={textareaId}
            class={getTextareaFieldClass(resize, size)}
            ref={(el?: HTMLTextAreaElement) => {
              this.nativeTextareaEl = el;
              applyAriaProp(this.aria, el ?? null);
            }}
            name={name}
            placeholder={placeholder ?? ' '}
            value={value}
            required={required}
            disabled={isDisabled}
            readOnly={readOnly}
            maxLength={maxLength}
            minLength={minLength}
            rows={rows}
            autocomplete={autoComplete ?? autocomplete}
            spellcheck={spellCheck}
            form={form}
            wrap={wrap}
            aria-invalid={showError ? 'true' : undefined}
            aria-readonly={readOnly ? 'true' : undefined}
            aria-describedby={describedBy}
            onInput={this.handleInput}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onKeyDown={this.handleKeyDown}
          />
          <label htmlFor={textareaId} class={hideLabel ? 'textarea-label textarea-label--sr-only' : 'textarea-label'}>
            <span class={hasLabelSlot ? 'textarea-label__slot' : 'textarea-label__slot textarea-label__slot--hidden'}>
              <slot name="label" onSlotchange={this.handleLabelSlotChange} />
            </span>
            {!hasLabelSlot && (
              <span>
                {label}
                {required && <Required />}
              </span>
            )}
            {hasLabelSlot && required && <Required />}
          </label>
          {loading && (
            <div class="textarea-wrapper__loading" aria-hidden="true">
              <io-spinner size="sm" />
            </div>
          )}
        </div>
        {(showError || showSuccess || showWarning) && (
          <StateMessage
            state={showError ? 'error' : showSuccess ? 'success' : 'warning'}
            message={message}
            hasSlot={hasMessageSlot}
            messageId={messageId}
            classPrefix="textarea"
            visible={!!(showError ? (hasMessageSlot || message) : message)}
            onSlotChange={this.handleMessageSlotChange}
          />
        )}
        {!hasState && !this.faceInvalid && (
          <p id={helperId} class={`textarea-helper${showDescription ? '' : ' textarea-helper--hidden'}`}>
            <span class={hasDescriptionSlot ? 'textarea-description__slot' : 'textarea-description__slot textarea-description__slot--hidden'}>
              <slot name="description" onSlotchange={this.handleDescriptionSlotChange} />
            </span>
            {!hasDescriptionSlot && helperText}
          </p>
        )}
        {showCounter && (
          <span class="textarea-counter-sr" aria-live="polite" aria-atomic="true">
            {currentLength} of {maxLength} characters
          </span>
        )}
        {showCounter && (
          <div id={this.counterId} class="textarea-counter" aria-hidden="true">
            {currentLength} / {maxLength}
          </div>
        )}
        {description && (
          <p id={this.descriptionId} class="textarea-description">{description}</p>
        )}
      </Host>
    );
  }
}
