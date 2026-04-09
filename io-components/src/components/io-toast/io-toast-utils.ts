import type { IoToastEntry, IoToastMessage, IoToastVariant } from './types';

export function hasToastText(message: IoToastMessage): boolean {
  return Boolean(message.text?.trim());
}

export function createToastEntry(message: IoToastMessage, id: number): IoToastEntry {
  return {
    variant: 'neutral',
    ...message,
    id,
  };
}

export function getToastItemVariant(entry: IoToastEntry): IoToastVariant {
  return entry.variant ?? 'neutral';
}
