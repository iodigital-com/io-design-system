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
 */
export type IoMultiSelectState = 'none' | 'error' | 'success';

/** Payload emitted via the `change` event. */
export type IoMultiSelectChangeDetail = {
  value: string[];
  name: string;
};
