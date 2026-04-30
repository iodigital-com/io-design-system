export function resolveOptionId(value: string, fallbackId: string): string {
  const safe = value.trim().toLowerCase().replace(/[^a-z0-9_-]+/g, '-').replace(/^-+|-+$/g, '') || fallbackId;
  return `io-option-${safe}-${fallbackId}`;
}

export function getOptionClass(selected: boolean, disabled: boolean, focused: boolean, multipleMode: boolean): string {
  return [
    'option',
    selected ? 'option--selected' : '',
    disabled ? 'option--disabled' : '',
    focused ? 'option--focused' : '',
    multipleMode ? 'option--multiple' : '',
  ].filter(Boolean).join(' ');
}
