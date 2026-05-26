import type { IoTextareaResize, IoTextareaSize } from './types';

export function sanitizeNameSegment(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function resolveTextareaId(name: string | undefined, fallbackId: string): string {
  const normalizedName = typeof name === 'string' ? sanitizeNameSegment(name) : '';
  return normalizedName
    ? `io-textarea-${normalizedName}-${fallbackId}`
    : `io-textarea-${fallbackId}`;
}

export function getTextareaWrapperClass(error: boolean, success: boolean, warning: boolean, disabled: boolean): string {
  return [
    'textarea-wrapper',
    error ? 'textarea-wrapper--state-error' : '',
    success ? 'textarea-wrapper--state-success' : '',
    warning ? 'textarea-wrapper--state-warning' : '',
    disabled ? 'textarea-wrapper--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');
}

export function getTextareaFieldClass(resize: IoTextareaResize, size: IoTextareaSize): string {
  return `textarea-field textarea-field--resize-${resize} textarea-field--${size}`;
}
