/**
 * syncFormState
 * =============
 * Shared FACE helper that centralises the boilerplate of syncing a form-associated
 * custom element's value and validity into `ElementInternals`.
 *
 * ## Motivation
 *
 * Every form-field component (io-input, io-textarea, io-checkbox, io-radio,
 * io-select, io-switch, io-multi-select, io-pin-code) duplicates the same three
 * steps:
 *   1. Call `internals.setFormValue()` with the current value.
 *   2. Derive validity — either from the native element's `.validity` object (for
 *      text-like fields) or from component-specific logic (for checkboxes, selects,
 *      etc.).
 *   3. Call `internals.setValidity()` with the result.
 *
 * Additionally, when a field is `disabled`, the browser refuses to focus it during
 * constraint validation (throwing "An invalid form control with name='...' is not
 * focusable"). The fix is to skip `setValidity` for disabled controls — they are
 * excluded from constraint validation entirely.
 *
 * ## Usage patterns
 *
 * ### 1. Native-element delegation (io-input, io-textarea)
 *
 * Pass the native `<input>` or `<textarea>` element.  The utility reads its
 * `.validity` / `.validationMessage` so all native constraints (maxlength, min,
 * max, step, typeMismatch …) are reflected automatically.
 *
 * ```ts
 * // In syncFormValue():
 * const { faceInvalid } = syncFormState(
 *   this.internals,
 *   this.el?.shadowRoot?.querySelector<HTMLInputElement>('input'),
 *   {
 *     formValue: this.value ?? '',
 *     required: this.required,
 *     disabled: this.disabled,
 *     touched: this.touched,
 *   },
 * );
 * this.faceInvalid = faceInvalid;
 * ```
 *
 * ### 2. Boolean-field delegation (io-checkbox, io-switch)
 *
 * No native element — pass `null` and supply the pre-computed `validity` and
 * `validationMessage` directly.
 *
 * ```ts
 * const { faceInvalid } = syncFormState(
 *   this.internals,
 *   null,
 *   {
 *     formValue: this.checked ? this.value : null,
 *     validity: this.required && !this.checked
 *       ? { valueMissing: true }
 *       : {},
 *     validationMessage: this.required && !this.checked
 *       ? 'Please check this box'
 *       : '',
 *     disabled: this.disabled,
 *   },
 * );
 * this.faceInvalid = faceInvalid;
 * ```
 *
 * Component-specific logic (radio group mutual exclusion, multi-value FormData,
 * pin completeness) stays local — only the internals wiring is centralised here.
 */

/** Options accepted by syncFormState */
export interface SyncFormStateOptions {
  /**
   * Value to pass to `internals.setFormValue()`.
   * Pass `null` to exclude the control from form submission (unchecked checkbox/radio).
   * Pass a `FormData` instance for multi-value fields.
   */
  formValue: string | File | FormData | null;

  /**
   * Pre-computed `ValidityStateFlags` — used when no `nativeEl` is provided.
   * An empty object `{}` means the field is valid.
   */
  validity?: ValidityStateFlags;

  /**
   * Validation message to associate with the `validity` flags above.
   * Ignored when `validity` is `{}` or when `nativeEl` is supplied.
   */
  validationMessage?: string;

  /**
   * Whether the field is currently `required`.
   * Used as a fallback validity check when `nativeEl` is `null` and
   * no explicit `validity` flags are provided.
   */
  required?: boolean;

  /**
   * Whether the field is disabled.
   *
   * Disabled form controls are excluded from constraint validation per the HTML
   * spec (§4.10.18.5).  Calling `setValidity` with invalid flags on a disabled
   * field causes browsers to throw "An invalid form control with name='...' is
   * not focusable" when the form is submitted.  This utility skips `setValidity`
   * (and treats the field as valid) when `disabled` is `true`.
   */
  disabled?: boolean;

  /**
   * Whether the field has been "touched" (blurred at least once).
   *
   * When `true`, `faceInvalid` mirrors the FACE validity state so the component
   * can show validation UI.
   *
   * When `false` (default), `faceInvalid` is `false` even if the field is
   * technically invalid — this prevents eager error display before the user has
   * interacted with the field.
   *
   * Components that do NOT gate on touch (io-checkbox, io-switch) should omit
   * this option or pass `true`.
   */
  touched?: boolean;
}

/** Return value of syncFormState */
export interface SyncFormStateResult {
  /**
   * Mirrors the FACE validity state for use as a `@State()` property.
   * Assign this to `this.faceInvalid` to trigger a re-render when validation
   * state changes (required for WCAG 4.1.3).
   */
  faceInvalid: boolean;
}

/**
 * Synchronise a form-associated custom element's value and validity into
 * `ElementInternals`.
 *
 * @param internals  The `ElementInternals` instance (from `@AttachInternals()`).
 *                   Double-optional-chaining is used internally so the function
 *                   is safe in unit tests where `internals` may be a partial stub.
 * @param nativeEl   The native `<input>` / `<textarea>` element inside the shadow
 *                   root, or `null` when no native element is used for validation.
 * @param options    See {@link SyncFormStateOptions}.
 * @returns          A {@link SyncFormStateResult} whose `faceInvalid` should be
 *                   assigned to the component's `@State() faceInvalid`.
 */
export function syncFormState(
  internals: ElementInternals | undefined,
  nativeEl: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null | undefined,
  options: SyncFormStateOptions,
): SyncFormStateResult {
  const {
    formValue,
    validity: explicitValidity,
    validationMessage: explicitMessage = '',
    required = false,
    disabled = false,
    touched = true,
  } = options;

  // Always sync the form value — disabled fields still report their value for
  // programmatic access even though they are excluded from FormData submission.
  (internals as ElementInternals | undefined)?.setFormValue?.(formValue);

  // Disabled controls are barred from constraint validation (HTML spec §4.10.18.5).
  // Calling setValidity with invalid flags on a disabled field triggers a browser
  // error during form submission.  Clear validity and return valid.
  if (disabled) {
    (internals as ElementInternals | undefined)?.setValidity?.({});
    return { faceInvalid: false };
  }

  // ── Native-element delegation path ────────────────────────────────────────
  // When a native element is provided, read its .validity object directly.  This
  // automatically covers maxlength, minlength, min, max, step, typeMismatch, etc.
  if (nativeEl) {
    if (!nativeEl.checkValidity()) {
      (internals as ElementInternals | undefined)?.setValidity?.(
        nativeEl.validity,
        nativeEl.validationMessage,
        nativeEl,
      );
      return { faceInvalid: touched };
    }
    (internals as ElementInternals | undefined)?.setValidity?.({});
    return { faceInvalid: false };
  }

  // ── Explicit validity flags path ───────────────────────────────────────────
  // When validity flags were passed explicitly (checkbox, switch, radio, select,
  // multi-select, pin-code …) use them directly.
  if (explicitValidity && Object.keys(explicitValidity).length > 0) {
    (internals as ElementInternals | undefined)?.setValidity?.(explicitValidity, explicitMessage);
    return { faceInvalid: touched };
  }

  // ── Required-only fallback ─────────────────────────────────────────────────
  // Neither a native element nor explicit flags — use the required prop to derive
  // a valueMissing flag.  This covers the jsdom path in unit tests (shadow root
  // is unavailable) or a simple required-only component.
  if (required && !formValue) {
    (internals as ElementInternals | undefined)?.setValidity?.(
      { valueMissing: true },
      'Please fill in this field',
    );
    return { faceInvalid: touched };
  }

  (internals as ElementInternals | undefined)?.setValidity?.({});
  return { faceInvalid: false };
}
