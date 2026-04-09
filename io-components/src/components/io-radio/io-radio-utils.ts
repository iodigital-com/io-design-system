export function sanitizeNameSegment(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function resolveRadioId(name: string | undefined, fallbackId: string): string {
  const normalizedName = typeof name === 'string' ? sanitizeNameSegment(name) : '';
  return normalizedName
    ? `io-radio-${normalizedName}-${fallbackId}`
    : `io-radio-${fallbackId}`;
}

export function getRadioWrapperClass(disabled: boolean, error: boolean): string {
  return ['radio-wrapper', disabled ? 'radio-wrapper--disabled' : '', error ? 'radio-wrapper--error' : '']
    .filter(Boolean)
    .join(' ');
}

export function getRadioCustomClass(checked: boolean): string {
  return `radio-custom${checked ? ' radio-custom--checked' : ''}`;
}
