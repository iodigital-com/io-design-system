export function sanitizeNameSegment(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function resolveSelectId(name: string | undefined, fallbackId: string): string {
  const normalizedName = typeof name === 'string' ? sanitizeNameSegment(name) : '';
  return normalizedName
    ? `io-select-${normalizedName}-${fallbackId}`
    : `io-select-${fallbackId}`;
}

export function getSelectWrapperClass(error: boolean, disabled: boolean): string {
  return ['select-wrapper', error ? 'select-wrapper--error' : '', disabled ? 'select-wrapper--disabled' : '']
    .filter(Boolean)
    .join(' ');
}

import { offset, flip, shift } from '@floating-ui/dom';

export function getComboboxMiddleware() {
  return [offset(4), flip(), shift({ padding: 8 })];
}

export function getComboboxOptionId(listboxId: string, index: number): string {
  return `${listboxId}-option-${index}`;
}

export function getComboboxWrapperClass(error: boolean, disabled: boolean): string {
  return ['select-wrapper', 'select-wrapper--custom', error ? 'select-wrapper--error' : '', disabled ? 'select-wrapper--disabled' : '']
    .filter(Boolean)
    .join(' ');
}

export function getComboboxOptionClass(selected: boolean, disabled: boolean, focused: boolean, multipleMode: boolean): string {
  return [
    'combobox-option',
    selected ? 'combobox-option--selected' : '',
    disabled ? 'combobox-option--disabled' : '',
    focused ? 'combobox-option--focused' : '',
    multipleMode ? 'combobox-option--multiple' : '',
  ].filter(Boolean).join(' ');
}
