/** A single option in the select list */
export type IoSelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
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
export type IoSelectChangeDetail = { value: string | string[]; name?: string };
