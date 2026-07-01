export function sanitizeNameSegment(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function resolveSwitchId(name: string | undefined, fallbackId: string): string {
  const normalizedName = typeof name === 'string' ? sanitizeNameSegment(name) : '';
  return normalizedName
    ? `io-switch-${normalizedName}-${fallbackId}`
    : `io-switch-${fallbackId}`;
}

export function getSwitchWrapperClass(disabled: boolean, error: boolean, alignLabel: 'start' | 'end' = 'end', stretch = false): string {
  return [
    'switch-wrapper',
    disabled ? 'switch-wrapper--disabled' : '',
    error ? 'switch-wrapper--error' : '',
    alignLabel === 'start' ? 'switch-wrapper--label-start' : '',
    stretch ? 'switch-wrapper--stretch' : '',
  ]
    .filter(Boolean)
    .join(' ');
}

export function getSwitchTrackClass(checked: boolean): string {
  return ['switch-track', checked ? 'switch-track--checked' : '']
    .filter(Boolean)
    .join(' ');
}
