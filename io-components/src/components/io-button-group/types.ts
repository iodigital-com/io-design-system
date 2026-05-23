/** Size preset for the button group — propagated to all slotted io-button children. */
export type IoButtonGroupSize = 'sm' | 'md' | 'lg';

/** A single option within the button group. */
export interface IoButtonGroupItem {
  /** Unique identifier — matched against the group's value prop. */
  value: string;
  /** Visible label rendered inside the button. */
  label: string;
  /** When true, this individual item cannot be interacted with. */
  disabled?: boolean;
}

/** Detail emitted by the `change` event. */
export interface IoButtonGroupChangeDetail {
  /** In exclusive mode: the newly selected single value. In multi-select: the full updated array. */
  value: string | string[];
}
