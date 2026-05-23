import type { IoDrawerPlacement, IoDrawerSize } from './types';

const DRAWER_HEADING_ID_PREFIX = 'io-drawer-heading-';

const DRAWER_CLOSE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

export function createDrawerHeadingId(randomValue: string): string {
  return `${DRAWER_HEADING_ID_PREFIX}${randomValue}`;
}

export function getDrawerClass(placement: IoDrawerPlacement, size: IoDrawerSize): string {
  return `drawer--${placement} drawer--${size}`;
}

export function getDrawerCloseIcon(): string {
  return DRAWER_CLOSE_ICON;
}

export function isBackdropClick(rect: DOMRect, clientX: number, clientY: number): boolean {
  return clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom;
}
