import { getIconSvg } from '../../utils/icons';

const MODAL_HEADING_ID_PREFIX = 'io-modal-heading-';

export function createModalHeadingId(randomValue: string): string {
  return `${MODAL_HEADING_ID_PREFIX}${randomValue}`;
}

export function getModalCloseIcon(): string {
  return getIconSvg('x', 20);
}

/**
 * Returns true when the click coordinates land outside the dialog's bounding
 * rectangle — i.e. on the backdrop area — rather than on dialog content.
 */
export function isBackdropClick(rect: DOMRect, clientX: number, clientY: number): boolean {
  return clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom;
}
