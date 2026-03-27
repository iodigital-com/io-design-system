export type IoToastVariant = 'neutral' | 'success' | 'error' | 'warning' | 'info';

export interface IoToastMessage {
  /** The notification text */
  text: string;
  /** Visual style conveying the message type. Defaults to 'neutral'. */
  variant?: IoToastVariant;
  /**
   * Auto-dismiss duration in milliseconds. Defaults to 6000.
   * Set to 0 to keep the toast visible until the user dismisses it.
   */
  duration?: number;
}

export type IoToastEntry = IoToastMessage & { id: number };
