import { FunctionalComponent, h } from '@stencil/core';

import type { IoFieldState } from '../../../utils/field-state';

export interface StateMessageProps {
  /** The validation state — controls role, color class, and visibility. */
  state: IoFieldState;
  /** The text message to render (used when no slot content is available). */
  message: string;
  /** Whether a slotted message element is present (overrides `message` text). */
  hasSlot: boolean;
  /** The id attribute wired to the owning control's aria-describedby. */
  messageId: string;
  /** CSS class prefix for BEM-style class names (e.g. 'input', 'checkbox'). */
  classPrefix: string;
  /** Whether the message is visible (false → apply hidden class). */
  visible: boolean;
  /**
   * CSS class to apply when the message is hidden.
   * Defaults to `${classPrefix}-message--hidden`.
   * Override this to preserve legacy CSS class names (e.g. 'input-error--hidden').
   */
  hiddenClass?: string;
  /** Slot change handler (optional — wire to `<slot name="message">`). */
  onSlotChange?: (ev: Event) => void;
}

/**
 * StateMessage — shared validation message functional component.
 *
 * Renders a `<p>` with consistent role mapping:
 *   - 'error'   → role="alert"   (assertive — user is blocked)
 *   - 'warning' → role="status"  (polite — advisory, user may continue)
 *   - 'success' → role="status"  (polite — confirmatory)
 *
 * Used by io-input, io-textarea, io-checkbox, io-radio, io-select to
 * eliminate duplicated message rendering code.
 *
 * @example
 * <StateMessage
 *   state={state}
 *   message={message}
 *   hasSlot={hasMessageSlot}
 *   messageId={errorId}
 *   classPrefix="input"
 *   visible={showMessage}
 * />
 */
export const StateMessage: FunctionalComponent<StateMessageProps> = ({
  state,
  message,
  hasSlot,
  messageId,
  classPrefix,
  visible,
  hiddenClass,
  onSlotChange,
}) => {
  const role = state === 'error' ? 'alert' : 'status';
  const stateClass = `${classPrefix}-message--${state}`;
  const effectiveHiddenClass = !visible
    ? ` ${hiddenClass ?? `${classPrefix}-message--hidden`}`
    : '';
  const slotClass = hasSlot
    ? `${classPrefix}-message__slot`
    : `${classPrefix}-message__slot ${classPrefix}-message__slot--hidden`;

  return (
    <p id={messageId} class={`${classPrefix}-message ${stateClass}${effectiveHiddenClass}`} role={role}>
      <span class={slotClass}>
        <slot name="message" onSlotchange={onSlotChange} />
      </span>
      {!hasSlot && message}
    </p>
  );
};
