import { getIconSvg } from '../../utils/icons';

const MODAL_HEADING_ID_PREFIX = 'io-modal-heading-';

export function createModalHeadingId(randomValue: string): string {
  return `${MODAL_HEADING_ID_PREFIX}${randomValue}`;
}

export function isBackdropClick(rect: DOMRect, clientX: number, clientY: number): boolean {
  return clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom;
}

export function getModalCloseIcon(): string {
  return getIconSvg('x', 20);
}
