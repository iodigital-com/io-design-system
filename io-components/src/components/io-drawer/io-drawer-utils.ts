import type { IoDrawerPlacement, IoDrawerSize } from './types';
import { getIconSvg } from '../../utils/icons';

const DRAWER_HEADING_ID_PREFIX = 'io-drawer-heading-';

export function createDrawerHeadingId(randomValue: string): string {
  return `${DRAWER_HEADING_ID_PREFIX}${randomValue}`;
}

export function getDrawerClass(placement: IoDrawerPlacement, size: IoDrawerSize): string {
  return `drawer--${placement} drawer--${size}`;
}

export function getDrawerCloseIcon(): string {
  return getIconSvg('x', 20);
}

export function isBackdropClick(rect: DOMRect, clientX: number, clientY: number): boolean {
  return clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom;
}
