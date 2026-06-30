/**
 * Shared notification icon map for io-banner and io-inline-notification.
 * Maps severity variant → io-icon name.
 */

import type { IoIconName } from './icons';

export type NotificationVariant = 'info' | 'success' | 'warning' | 'error';

const NOTIFICATION_ICON_MAP: Record<NotificationVariant, IoIconName> = {
  info:    'info',
  success: 'check-circle',
  warning: 'alert-triangle',
  error:   'x-circle',
};

/**
 * Returns the icon name for a notification variant.
 * Shared by io-banner and io-inline-notification.
 */
export function getNotificationIconName(variant: NotificationVariant): IoIconName {
  return NOTIFICATION_ICON_MAP[variant] ?? NOTIFICATION_ICON_MAP.info;
}
