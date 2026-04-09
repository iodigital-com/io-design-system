import type { IoTextareaResize } from './types';

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

export function getTextareaWrapperClass(error: boolean, disabled: boolean): string {
  return ['textarea-wrapper', error ? 'textarea-wrapper--error' : '', disabled ? 'textarea-wrapper--disabled' : '']
    .filter(Boolean)
    .join(' ');
}

export function getTextareaFieldClass(resize: IoTextareaResize): string {
  return `textarea-field textarea-field--resize-${resize}`;
}
