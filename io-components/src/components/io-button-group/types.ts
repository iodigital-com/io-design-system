/**
 * Visual variant controlling the active-state color scheme.
 * - `primary` — active button uses the brand primary color (blue fill, white text). Use for navigation and primary selection controls.
 * - `secondary` — active button uses a neutral white/surface fill with a subtle shadow. Use for property selectors and toolbar controls.
 */
export type IoButtonGroupVariant = 'primary' | 'secondary';

/**
 * Selection mode for the button group.
 * - `'single'` — single-select (radiogroup): exactly one item active at a time. Container gets `role="radiogroup"`, items get `role="radio"`.
 * - `'multiple'` — multi-select (checkbox group): any number of items may be active. Container gets `role="group"`, items get `role="checkbox"`.
 */
export type IoButtonGroupType = 'single' | 'multiple';

/** Layout direction for the button group. 'row' stacks buttons horizontally (default); 'column' stacks them vertically. */
export type IoButtonGroupDirection = 'row' | 'column';

/** A single option within the button group. */
export interface IoButtonGroupItem {
  /** Unique identifier — matched against the group's value prop. */
  value: string;
  /** Visible label rendered inside the button. */
  label: string;
  /** Accessible name for icon-only buttons where label is empty. Propagated from the declarative io-button's aria-label attribute. */
  ariaLabel?: string;
  /** When true, this individual item cannot be interacted with. */
  disabled?: boolean;
}

/** Detail emitted by the `change` event. */
export interface IoButtonGroupChangeDetail {
  /** In single mode: the newly selected single value. In multiple mode: the full updated array. */
  value: string | string[];
}
