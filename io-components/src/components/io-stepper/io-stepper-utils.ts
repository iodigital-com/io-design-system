import type { IoStepStatus } from './types';

/**
 * Returns the CSS class modifier for a step based on its status.
 */
export function getStepClass(status: IoStepStatus): string {
  return `step--${status}`;
}

/**
 * Returns a screen-reader-friendly label for a step.
 * Format: "Step {index}: {label}, {status}"
 */
export function getStepAriaLabel(index: number, label: string, status: IoStepStatus): string {
  const statusLabel =
    status === 'complete' ? 'complete' :
    status === 'current'  ? 'current'  :
    status === 'warning'  ? 'warning'  :
    'upcoming';
  return `Step ${index}: ${label}, ${statusLabel}`;
}
