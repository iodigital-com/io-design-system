/**
 * io-multi-select — Exported type unions
 *
 * Re-uses IoSelectOption and IoSelectOptionGroup from io-select for
 * consistent option data shape across both components.
 */
export type { IoSelectOption, IoSelectOptionGroup } from '../io-select/types';

/**
 * Allowed dropdown direction values for io-multi-select.
 * 'auto' lets the component compute the best position with floating-ui.
 */
export type IoMultiSelectDirection = 'auto' | 'up' | 'down';

/**
 * Field validation / visual state aligned with C-03 convention.
 * - 'none'    — default, no state indicator
 * - 'error'   — error border + message
 * - 'success' — success border + message
 * - 'warning' — warning border + message (amber)
 */
export type IoMultiSelectState = 'none' | 'error' | 'success' | 'warning';

/** Payload emitted via the `change` event. */
export type IoMultiSelectChangeDetail = {
  /**
   * The selected values. Preserves original string | number types set on each option.
   * Note: FormData submission always serialises values to strings.
   */
  value: (string | number)[];
  name: string;
};

/** Payload emitted via the `limitreached` event when maxSelections cap is hit. */
export type IoMultiSelectLimitReachedDetail = {
  /** The configured maximum number of selections. */
  max: number;
  /** The value the user attempted to add when the limit was already reached. */
  attempted: string;
};
