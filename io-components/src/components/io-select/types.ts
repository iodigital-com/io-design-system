/** A single option in the select list */
export type IoSelectOption = {
  label: string;
  /**
   * Option value. Accepts string or number.
   *
   * NOTE: When submitted via a native HTML form, numeric values are serialised to
   * strings by the browser's FormData API (e.g. `42` → `"42"`). The original
   * numeric type is preserved on the `value` prop and in the `change` event detail,
   * but consumers should be aware of the stringification when reading FormData entries.
   */
  value: string | number;
  disabled?: boolean;
  /**
   * Optional icon name rendered left of the label via `<io-icon>`.
   * Rendered in both the listbox option and the trigger display value.
   */
  icon?: string;
  /**
   * Optional secondary description text rendered below the label.
   * Visible in the listbox option only; not reflected in the trigger.
   */
  description?: string;
};

/** A group of options (maps to <optgroup> in native, group heading in combobox) */
export type IoSelectOptionGroup = {
  /** Group heading. undefined = ungrouped direct children */
  label?: string;
  disabled?: boolean;
  options: IoSelectOption[];
};

/** Visual size scale aligned with io-button sizing tokens */
export type IoSelectSize = 'sm' | 'md' | 'lg';

/** Payload emitted by the io-select change event */
export type IoSelectChangeDetail = {
  /**
   * The selected value(s). Preserves the original string | number type set on the option.
   * Note: FormData submission always serialises values to strings.
   */
  value: string | number | (string | number)[];
  name?: string;
};

/** Payload emitted by the io-select toggle event when the dropdown opens or closes */
export type IoSelectToggleDetail = { open: boolean };
