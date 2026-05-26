/**
 * Shared validation state type for all io form-field components.
 *
 * - 'none':    No validation state — default appearance
 * - 'error':   Field has a validation error — red border + icon
 * - 'success': Field passed validation — green border + icon
 * - 'warning': Field has a non-blocking warning — amber border + icon
 */
export type IoFieldState = 'none' | 'error' | 'success' | 'warning';
