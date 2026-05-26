export function sanitizeNameSegment(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function resolveCheckboxId(name: string | undefined, fallbackId: string): string {
  const normalizedName = typeof name === 'string' ? sanitizeNameSegment(name) : '';
  return normalizedName
    ? `io-checkbox-${normalizedName}-${fallbackId}`
    : `io-checkbox-${fallbackId}`;
}

export function getCheckboxWrapperClass(disabled: boolean, error: boolean, success: boolean, warning: boolean): string {
  return [
    'checkbox-wrapper',
    disabled ? 'checkbox-wrapper--disabled' : '',
    error ? 'checkbox-wrapper--state-error' : '',
    success ? 'checkbox-wrapper--state-success' : '',
    warning ? 'checkbox-wrapper--state-warning' : '',
  ]
    .filter(Boolean)
    .join(' ');
}

export function getCheckboxCustomClass(checked: boolean, indeterminate: boolean): string {
  return ['checkbox-custom', checked ? 'checkbox-custom--checked' : '', indeterminate ? 'checkbox-custom--indeterminate' : '']
    .filter(Boolean)
    .join(' ');
}
