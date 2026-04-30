/** A single option in the select list */
export type IoSelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

/** Visual size scale aligned with io-button sizing tokens */
export type IoSelectSize = 'sm' | 'md' | 'lg';
