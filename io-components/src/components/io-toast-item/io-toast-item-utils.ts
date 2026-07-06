import type { IoToastItemVariant } from './types';
import { getIconSvg } from '../../utils/icons';

const VARIANT_ICONS: Record<IoToastItemVariant, string> = {
  neutral: getIconSvg('info', 16),
  success: getIconSvg('check-circle', 16),
  error: getIconSvg('x-circle', 16),
  warning: getIconSvg('alert-triangle', 16),
  info: getIconSvg('info', 16),
};

export function getToastVariantIcon(variant: IoToastItemVariant): string {
  return VARIANT_ICONS[variant] ?? VARIANT_ICONS.neutral;
}

export function getToastCloseIcon(): string {
  return getIconSvg('x', 20);
}
