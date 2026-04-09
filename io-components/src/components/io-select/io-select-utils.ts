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
