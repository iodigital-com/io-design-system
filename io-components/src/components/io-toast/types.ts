import type { IoButtonVariant } from '../io-button/types';

export type IoToastVariant = 'neutral' | 'success' | 'error' | 'warning' | 'info';

export type IoToastPosition =
  | 'top-start'
  | 'top-center'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-center'
  | 'bottom-end';

/** A single action item rendered inside a toast notification. */
export interface IoToastAction {
  /** Button or link label text */
  label: string;
  /**
   * When provided, renders the action as an `<a>` pointing to this URL.
   * When omitted, renders as a `<button>` that emits the `action` event.
   */
  href?: string;
  /**
   * Visual variant forwarded to the action button.
   * Mirrors IoButtonVariant — defaults to the component accent color.
   */
  variant?: IoButtonVariant;
  /**
   * Custom click handler. When provided, fires instead of the `action` event.
   * Only applies to button actions (no href).
   */
  onClick?: () => void;
}

export interface IoToastMessage {
  /** The notification text */
  text: string;
  /** Visual style conveying the message type. Defaults to 'neutral'. */
  variant?: IoToastVariant;
  /**
   * Auto-dismiss duration in milliseconds. Defaults to 6000.
   * Set to 0 to keep the toast visible until the user dismisses it.
   */
  duration?: number;
  /**
   * When true the toast will not auto-dismiss and must be manually closed.
   * Error-variant toasts are always persistent.
   */
  persistent?: boolean;
  /**
   * Label for the optional call-to-action button/link rendered beside the text.
   * When omitted, no action is rendered.
   * @deprecated Use `actions` for richer multi-action support.
   */
  actionLabel?: string;
  /**
   * When set alongside `actionLabel`, renders the CTA as an anchor pointing to
   * this href (opens in the same tab). When omitted, the CTA is a button that
   * emits the `action` event on io-toast-item.
   * @deprecated Use `actions` for richer multi-action support.
   */
  actionHref?: string;
  /**
   * Array of up to 2 action items. Supersedes `actionLabel`/`actionHref`.
   * Each entry supports `label`, `href`, `variant`, and a custom `onClick`.
   */
  actions?: IoToastAction[];
  /**
   * When true, renders a countdown progress bar inside the toast item.
   * Has no effect on persistent toasts.
   * @default false
   */
  showProgress?: boolean;
}

export type IoToastEntry = IoToastMessage & { id: number };
