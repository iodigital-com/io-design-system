/**
 * implicitSubmit
 * ==============
 * Handles implicit form submission triggered by pressing Enter inside a text-like
 * input that is form-associated via the FACE API.
 *
 * Shadow DOM breaks native HTML5 implicit submission: a keypress inside a shadow
 * root does not propagate to the host form's submit handler. This utility restores
 * that behaviour by walking the associated form's submit controls, preferring the
 * first submit control in document order (native <button type="submit">, native
 * <input type="submit">, or <io-button type="submit">), then falling back to
 * `form.requestSubmit()` when no eligible submit control is found.
 *
 * Usage:
 *   Wire into the native input's `onKeyDown` handler and pass the component's
 *   internals and the disabled/loading flags:
 *
 *   onKeyDown={(ev) => implicitSubmit(ev, this.internals, { disabled: this.disabled, loading: this.loading })}
 *
 * Rules:
 *   - Only fires on Enter (not Shift+Enter, not composing IME)
 *   - No-op when the field is disabled, loading, or not inside a form
 *   - Does NOT apply to textarea inputs (Enter inserts newline)
 */

export interface ImplicitSubmitOptions {
  /** Whether the owning component is currently disabled */
  disabled?: boolean;
  /** Whether the owning component is currently in a loading state */
  loading?: boolean;
}

/**
 * Input types for which Enter should NOT trigger implicit form submission.
 * These are either non-text controls or buttons that have their own Enter semantics.
 */
const BLOCKED_INPUT_TYPES = new Set([
  'submit',
  'reset',
  'button',
  'checkbox',
  'radio',
  'file',
  'image',
  'range',
  'color',
]);

/**
 * Trigger implicit form submission when the user presses Enter in a text-like
 * form field that is associated with a form via ElementInternals.
 *
 * @param ev - The KeyboardEvent fired on the native input element
 * @param internals - The ElementInternals instance from @AttachInternals (double-optional-chained by callers)
 * @param options - disabled / loading flags from the owning component
 */
export function implicitSubmit(
  ev: KeyboardEvent,
  internals: ElementInternals | undefined | null,
  options: ImplicitSubmitOptions = {},
): void {
  // Only handle Enter, skip IME composition, skip already-handled events
  if (ev.key !== 'Enter' || ev.isComposing || ev.defaultPrevented) return;

  const { disabled = false, loading = false } = options;
  if (disabled || loading) return;

  // Use the FACE-associated form; if there is none, no-op
  const form = internals?.form;
  if (!form) return;

  const target = ev.target as HTMLElement;

  // Textarea: Enter inserts a newline — do not submit
  if (target.tagName === 'TEXTAREA') return;

  // For input elements, block non-text types
  if (target.tagName === 'INPUT') {
    const inputEl = target as HTMLInputElement;
    if (BLOCKED_INPUT_TYPES.has(inputEl.type)) return;
  }

  // Find the first eligible submit control in document order.
  // We check both native form controls (via form.elements) and io-button elements
  // (which are not enumerated in form.elements because they live in Shadow DOM).
  const nativeSubmitters = Array.from(form.elements).filter((el) => {
    const tag = el.tagName.toLowerCase();
    return (
      (tag === 'button' || tag === 'input') &&
      (el as HTMLButtonElement | HTMLInputElement).type === 'submit'
    );
  });

  const ioSubmitBtns = Array.from(form.querySelectorAll('io-button')).filter((btn) => {
    const el = btn as HTMLElement & { type?: string };
    return el.type === 'submit' || el.getAttribute('type') === 'submit';
  });

  const allSubmitters = [...nativeSubmitters, ...ioSubmitBtns].sort((a, b) => {
    const pos = a.compareDocumentPosition(b);
    // DOCUMENT_POSITION_FOLLOWING means b comes after a → a is first
    if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
    if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
    return 0;
  });

  ev.preventDefault();

  if (allSubmitters.length > 0) {
    // Click the first submit control — this preserves submit-button semantics
    // (e.g. disabled state, value submission) for both native and io-button controls.
    (allSubmitters[0] as HTMLElement).click();
  } else {
    // No submit control found — fall back to requesting submit directly
    form.requestSubmit();
  }
}
