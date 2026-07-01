import { FunctionalComponent, h } from '@stencil/core';

export type StateIconState = 'error' | 'success' | 'warning';

export interface StateIconProps {
  /** The validation state to render an icon for. */
  state: StateIconState;
}

/**
 * StateIcon — shared validation state icon functional component.
 *
 * Renders a 20px SVG icon for the given validation state:
 *   - 'error'   → circled "i" warning symbol
 *   - 'success' → circled checkmark
 *   - 'warning' → triangle exclamation
 *
 * All icons are aria-hidden; the associated state message conveys meaning to
 * screen readers. Used by io-input, io-input-password, io-input-search, and
 * io-input-date to eliminate duplicated SVG markup.
 *
 * @example
 * {showError && <StateIcon state="error" />}
 * {showSuccess && <StateIcon state="success" />}
 * {showWarning && <StateIcon state="warning" />}
 */
export const StateIcon: FunctionalComponent<StateIconProps> = ({ state }) => {
  if (state === 'error') {
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

  if (state === 'success') {
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

  // state === 'warning'
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
};
