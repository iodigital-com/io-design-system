import { getIconSvg } from '../../utils/icons';

const MODAL_HEADING_ID_PREFIX = 'io-modal-heading-';

export function createModalHeadingId(randomValue: string): string {
  return `${MODAL_HEADING_ID_PREFIX}${randomValue}`;
}

export function getModalCloseIcon(): string {
  return getIconSvg('x', 20);
}
