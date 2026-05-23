export type IoToastVariant = 'neutral' | 'success' | 'error' | 'warning' | 'info';

export type IoToastPosition =
  | 'top-start'
  | 'top-center'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-center'
  | 'bottom-end';

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
  /**
   * When true the toast will not auto-dismiss and must be manually closed.
   * Error-variant toasts are always persistent.
   */
  persistent?: boolean;
}

export type IoToastEntry = IoToastMessage & { id: number };
