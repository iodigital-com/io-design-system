/**
 * io-fieldset utilities
 * =====================
 * Minimal helper for spreading arbitrary ARIA attributes onto a native element.
 */

/**
 * Converts a Record<string, string> of ARIA attributes into a flat object suitable
 * for JSX spreading. Keys that already start with "aria-" are passed through as-is;
 * keys without the prefix have "aria-" prepended.
 *
 * @example
 * normaliseAria({ role: 'radiogroup', labelledby: 'my-legend' })
 * // → { role: 'radiogroup', 'aria-labelledby': 'my-legend' }
 */
export function normaliseAria(aria: Record<string, string>): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(aria)) {
    if (key === 'role') {
      result['role'] = value;
    } else if (key.startsWith('aria-')) {
      result[key] = value;
    } else {
      result[`aria-${key}`] = value;
    }
  }
  return result;
}
