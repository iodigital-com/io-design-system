/**
 * input-base.tsx
 * ==============
 * Shared render helpers and utilities used by io-input, io-input-password,
 * io-input-search, and io-input-date.
 *
 * These are pure helper functions — not a Stencil component. They return
 * VNode fragments that each component embeds directly in its render() tree.
 *
 * No public prop API is changed by using these helpers. Each component still
 * owns its own @State, @Prop, and render() method — this file only DRYs up
 * the repeated SVG icons and below-the-field message/helper tree.
 */
import { h } from '@stencil/core';
import type { VNode } from '@stencil/core';
import type { IoFieldState } from './field-state';

// ── State icons ───────────────────────────────────────────────────────────────

/**
 * The error state icon — a circled "i" warning symbol.
 * Rendered as aria-hidden; the error text conveys the meaning.
 */
export function renderErrorIcon(): VNode {
  return (
    <div class="input-state-icon input-state-icon--error" aria-hidden="true">
      <svg
        width="1.25rem"
        height="1.25rem"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" x2="12" y1="8" y2="12" />
        <line x1="12" x2="12.01" y1="16" y2="16" />
      </svg>
    </div>
  );
}

/**
 * The success state icon — a circled checkmark.
 */
export function renderSuccessIcon(): VNode {
  return (
    <div class="input-state-icon input-state-icon--success" aria-hidden="true">
      <svg
        width="1.25rem"
        height="1.25rem"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    </div>
  );
}

/**
 * The warning state icon — a triangle exclamation.
 */
export function renderWarningIcon(): VNode {
  return (
    <div class="input-state-icon input-state-icon--warning" aria-hidden="true">
      <svg
        width="1.25rem"
        height="1.25rem"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    </div>
  );
}

// ── Class builders ────────────────────────────────────────────────────────────

/**
 * Builds the outer wrapper element's CSS class string.
 *
 * @param state       - Validation state ('none' | 'error' | 'success' | 'warning')
 * @param faceInvalid - FACE validation invalidity flag
 * @param disabled    - Whether the field is disabled (includes loading-disabled)
 * @param readonly    - Whether the field is read-only
 * @param extra       - Additional classes to append (optional)
 */
export function buildInputWrapperClass(
  state: IoFieldState,
  faceInvalid: boolean,
  disabled: boolean,
  readonly: boolean,
  extra?: string,
): string {
  const showError = state === 'error' || faceInvalid;
  const showSuccess = state === 'success' && !faceInvalid;
  const showWarning = state === 'warning' && !faceInvalid;

  return [
    'input-wrapper',
    showError ? 'input-wrapper--state-error' : '',
    showSuccess ? 'input-wrapper--state-success' : '',
    showWarning ? 'input-wrapper--state-warning' : '',
    disabled ? 'input-wrapper--disabled' : '',
    readonly ? 'input-wrapper--readonly' : '',
    extra ?? '',
  ]
    .filter(Boolean)
    .join(' ');
}

/**
 * Builds the `aria-describedby` value for the native input.
 *
 * @param errorId       - ID of the message element (shown in error/success/warning states)
 * @param helperId      - ID of the helper-text element
 * @param faceErrorId   - ID of the FACE error element (when faceInvalid and no explicit error state)
 * @param showMessage   - Whether the state message is currently visible
 * @param showDescription - Whether the helper text is currently visible
 * @param showFaceError - Whether the FACE error paragraph is currently rendered
 * @param extraIds      - Any additional IDs to append (e.g. counter sr-id)
 */
export function buildInputDescribedBy(
  errorId: string,
  helperId: string,
  faceErrorId: string,
  showMessage: boolean,
  showDescription: boolean,
  showFaceError: boolean,
  extraIds?: string[],
): string | undefined {
  return [
    showMessage ? errorId : '',
    showDescription ? helperId : '',
    showFaceError ? faceErrorId : '',
    ...(extraIds ?? []),
  ]
    .filter(Boolean)
    .join(' ') || undefined;
}

// ── Below-field message tree ──────────────────────────────────────────────────

export interface InputMessageTreeProps {
  /** ID of the error/success/warning paragraph */
  errorId: string;
  /** ID of the helper text paragraph */
  helperId: string;
  /** Whether to show an error paragraph */
  showError: boolean;
  /** Whether to show a success paragraph */
  showSuccess: boolean;
  /** Whether to show a warning paragraph */
  showWarning: boolean;
  /** Whether the message paragraph has visible text/content */
  showMessage: boolean;
  /** Plain-text message for state messages */
  message: string;
  /** Whether the helper-text paragraph is visible */
  showDescription: boolean;
  /** Plain-text helper text */
  helperText: string | undefined;
  /** Whether to render the FACE error paragraph */
  showFaceError: boolean;
  /** ID attribute for the FACE error paragraph */
  faceErrorId: string;
  /** Error message text for FACE errors */
  faceErrorMessage: string;
}

/**
 * Renders the below-field message tree: state messages, FACE error, and helper text.
 *
 * Components that also support message/description *slots* (io-input) should NOT
 * use this function for those elements — they manage the slot-aware variants
 * themselves. This helper is for the simpler slot-less variants (io-input-password,
 * io-input-search, io-input-date).
 */
export function renderInputMessageTree(props: InputMessageTreeProps): VNode[] {
  const nodes: VNode[] = [];

  if (props.showError) {
    nodes.push(
      <p
        id={props.errorId}
        class={`input-message input-message--error${props.showMessage ? '' : ' input-error--hidden'}`}
        role="alert"
      >
        {props.message}
      </p>,
    );
  }

  if (props.showSuccess) {
    nodes.push(
      <p
        id={props.errorId}
        class={`input-message input-message--success${props.showMessage ? '' : ' input-error--hidden'}`}
        role="status"
      >
        {props.message}
      </p>,
    );
  }

  if (props.showWarning) {
    nodes.push(
      <p
        id={props.errorId}
        class={`input-message input-message--warning${props.showMessage ? '' : ' input-error--hidden'}`}
        role="status"
      >
        {props.message}
      </p>,
    );
  }

  if (props.showFaceError) {
    nodes.push(
      <p id={props.faceErrorId} class="input-message input-message--error" role="alert">
        {props.faceErrorMessage}
      </p>,
    );
  }

  nodes.push(
    <p id={props.helperId} class={`input-helper${props.showDescription ? '' : ' input-helper--hidden'}`}>
      {props.helperText}
    </p>,
  );

  return nodes;
}
