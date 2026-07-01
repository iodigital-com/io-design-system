import { Component, Prop, Event, EventEmitter, Element, Host, Watch, Listen, h } from '@stencil/core';

import { applyAriaProp } from '../../utils/aria-prop';
import { getCheckboxGroupStyles } from './io-checkbox-group-styles';
import { Required } from '../common/required/Required';

import type { IoFieldState } from '../../utils/field-state';
import type { IoCheckboxGroupChangeDetail, IoCheckboxGroupOrientation } from './types';

/**
 * io-checkbox-group
 * ==================
 * Wraps io-checkbox items in a semantic fieldset/legend and automatically
 * propagates the `name`, `disabled`, and `state` props to all slotted children.
 * Emits change with the array of all currently checked values.
 *
 * ## Presentational-only contract
 *
 * io-checkbox-group is **presentational-only** for form purposes:
 * - It does NOT implement `formAssociated` and has NO ElementInternals / FACE registration.
 * - It does NOT add a FormData entry itself — each child io-checkbox submits its own value.
 * - `required` means "propagate required to all children" — group-level required is
 *   satisfied when each child individually satisfies its own required constraint.
 * - Consumers expecting group-level FormData entry or a single validation anchor
 *   should use io-radio-group (which IS formAssociated) or implement their own wrapper.
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
  @Prop() name: string | undefined;

  /** Marks the group as required */
  @Prop() required = false;

  /** Disables the entire group */
  @Prop({ reflect: true }) disabled = false;

  /**
   * Validation state — controls border/message color.
   * Mirrors the Wave-XI IoFieldState API used by all child io-checkbox components.
   * Propagated to children via syncChildren().
   */
  @Prop({ reflect: true }) state: IoFieldState = 'none';

  /**
   * Validation/helper message shown below the group.
   * Replaces the legacy errorMessage prop when state is set explicitly.
   */
  @Prop() message = '';

  /**
   * @deprecated Use `state="error"` instead.
   * Kept for one minor cycle for backwards compatibility.
   * Puts the group in error state.
   */
  @Prop({ reflect: true }) error = false;

  /**
   * @deprecated Use `message` instead.
   * Kept for one minor cycle for backwards compatibility.
   * Error message shown below the group when error is true.
   */
  @Prop() errorMessage: string | undefined;

  /** Helper text shown below the legend */
  @Prop() helperText = '';

  /** Layout direction of the checkbox options */
  @Prop({ reflect: true }) orientation: IoCheckboxGroupOrientation = 'vertical';

  /** Shows a loading spinner overlay and blocks interaction */
  @Prop({ reflect: true }) loading = false;

  /**
   * Arbitrary ARIA attributes to spread onto the fieldset element.
   * Keys may omit or include the `aria-` prefix — both forms are accepted.
   *
   * Component-managed attributes take precedence:
   * - `aria-invalid` is always controlled by the `error` prop and cannot be overridden.
   * - `aria-describedby` is controlled by the component when `error` is active
   *   (to preserve error-message linkage) and cannot be overridden in that state.
   *
   * @example
   * <io-checkbox-group .aria={{ labelledby: 'external-label' }} label="Options" name="opts" />
   */
  @Prop() aria?: Record<string, string>;

  // ── Private ───────────────────────────────────────────────────

  private errorId!: string;
  private legendId!: string;
  private fieldsetEl?: HTMLFieldSetElement;

  // ── Events ────────────────────────────────────────────────────

  /** Fires when any checkbox in the group changes, with all checked values */
  @Event() change!: EventEmitter<IoCheckboxGroupChangeDetail>;

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    const suffix = Math.random().toString(36).slice(2);
    this.errorId = `io-cg-error-${suffix}`;
    this.legendId = `io-cg-legend-${suffix}`;
  }

  componentDidLoad() {
    this.syncChildren();
    applyAriaProp(this.safeAriaProp(), this.fieldsetEl ?? null);
  }

  @Watch('name')
  onNameChange() {
    this.syncChildren();
  }

  @Watch('disabled')
  onDisabledChange() {
    this.syncChildren();
  }

  @Watch('state')
  onStateChange() {
    this.syncChildren();
  }

  @Watch('error')
  onErrorChange() {
    this.syncChildren();
  }

  @Watch('required')
  onRequiredChange() {
    this.syncChildren();
  }

  @Watch('aria')
  onAriaChange() {
    applyAriaProp(this.safeAriaProp(), this.fieldsetEl ?? null);
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

  /**
   * Returns a filtered copy of `this.aria` that omits component-managed
   * attributes so they cannot be accidentally overridden by consumers.
   *
   * Always blocked (component-managed):
   * - `aria-invalid` — controlled by the `error` prop.
   * - `aria-required` — a fieldset's required state is conveyed via legend
   *   indicator and child props; `aria-required` on `<fieldset>` is not valid.
   * - `role` — the fieldset role is fixed and must not be overridden.
   *
   * Conditionally blocked:
   * - `aria-describedby` is managed by the component when `error` is active
   *   (to preserve the error-message linkage) and cannot be overridden in that state.
   */
  private safeAriaProp(): Record<string, string> | undefined {
    if (!this.aria) return undefined;

    const alwaysBlocked = new Set(['aria-invalid', 'invalid', 'aria-required', 'required', 'role']);
    const effectiveState: IoFieldState = this.state !== 'none' ? this.state : (this.error ? 'error' : 'none');
    const conditionalBlocked = new Set<string>();
    if (effectiveState === 'error') {
      conditionalBlocked.add('aria-describedby');
      conditionalBlocked.add('describedby');
    }

    const isProd = (globalThis as { __STENCIL_PROD__?: boolean }).__STENCIL_PROD__ === true;
    const filtered: Record<string, string> = {};
    for (const [key, value] of Object.entries(this.aria)) {
      const lower = key.toLowerCase();
      if (alwaysBlocked.has(lower)) {
        if (!isProd) {
          console.warn(
            `[io-checkbox-group] aria prop: "${key}" is component-managed and cannot be overridden. ` +
            `Use the component's dedicated props instead.`,
          );
        }
        continue;
      }
      if (conditionalBlocked.has(lower)) {
        if (!isProd) {
          console.warn(
            `[io-checkbox-group] aria prop: "${key}" is managed by the component when error is active ` +
            `and cannot be overridden in that state.`,
          );
        }
        continue;
      }
      filtered[key] = value;
    }
    return Object.keys(filtered).length > 0 ? filtered : undefined;
  }

  private syncChildren = () => {
    const checkboxes = Array.from(
      this.el.querySelectorAll<HTMLElement & { name: string; disabled: boolean; required: boolean; value: string; state: IoFieldState }>('io-checkbox'),
    );
    // Resolve the effective state: explicit state prop takes precedence;
    // legacy error=true maps to 'error' for one-cycle backwards compat.
    const effectiveState: IoFieldState = this.state !== 'none' ? this.state : (this.error ? 'error' : 'none');
    for (const checkbox of checkboxes) {
      if (this.name !== undefined) {
        checkbox.name = this.name;
      }
      checkbox.disabled = this.disabled;
      checkbox.required = this.required;
      // Only override child state when the group has a non-'none' state; preserve per-child state otherwise
      if (effectiveState !== 'none') {
        checkbox.state = effectiveState;
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
    const { label, disabled, loading, helperText, error, errorMessage, required, state, message } = this;
    // Resolve effective error/message: new state API takes precedence over legacy error prop.
    const effectiveError = state === 'error' || error;
    // Legacy errorMessage only shows when error=true (legacy behaviour preserved).
    // New message prop shows when state is not 'none'.
    const effectiveMessage = message || (error ? errorMessage : undefined);
    const messageId = `${this.errorId}-msg`;

    const fieldsetClass = effectiveError ? 'checkbox-group checkbox-group--error' : 'checkbox-group';
    const describedBy = effectiveError && effectiveMessage ? messageId : undefined;

    return (
      <Host aria-busy={loading ? 'true' : undefined}>
        <style>{getCheckboxGroupStyles()}</style>
        <fieldset
          class={fieldsetClass}
          disabled={disabled}
          aria-labelledby={this.legendId}
          aria-invalid={effectiveError ? 'true' : undefined}
          aria-describedby={describedBy}
          ref={(el) => { this.fieldsetEl = el as HTMLFieldSetElement | undefined; }}
        >
          <legend id={this.legendId} class="checkbox-group__legend">
            {label}
            {required && <Required />}
          </legend>
          {helperText && (
            <span class="checkbox-group__helper">{helperText}</span>
          )}
          <div class="checkbox-group__options-wrapper">
            <div class="checkbox-group__options" inert={loading ? true : undefined}>
              <slot onSlotchange={this.syncChildren} />
            </div>
            {loading && (
              <div class="checkbox-group__loading-overlay" aria-hidden="true">
                <io-spinner size="sm" />
              </div>
            )}
          </div>
        </fieldset>
        {effectiveMessage && (
          <p
            id={messageId}
            class={`checkbox-group__error checkbox-group__message--${effectiveError ? 'error' : state}`}
            role={effectiveError ? 'alert' : 'status'}
            aria-atomic="true"
          >
            {effectiveMessage}
          </p>
        )}
      </Host>
    );
  }
}
