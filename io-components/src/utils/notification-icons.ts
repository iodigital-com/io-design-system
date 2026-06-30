/**
 * Shared notification icon map for io-banner and io-inline-notification.
 * Maps severity variant → io-icon name.
 */

export type NotificationVariant = 'info' | 'success' | 'warning' | 'error';

const NOTIFICATION_ICON_MAP: Record<NotificationVariant, string> = {
  info:    'info',
  success: 'check-circle',
  warning: 'alert-triangle',
  error:   'x-circle',
};

/**
 * Returns the icon name for a notification variant.
 * Shared by io-banner and io-inline-notification.
 */
export function getNotificationIconName(variant: NotificationVariant): string {
  return NOTIFICATION_ICON_MAP[variant] ?? NOTIFICATION_ICON_MAP.info;
}
