/**
 * Shared utility for the `aria?: Record<string, string>` prop pattern.
 *
 * Components that accept arbitrary ARIA attribute injection use this utility
 * to normalise keys (strip redundant `aria-` prefix), validate keys against
 * the known ARIA attribute list, and apply the resulting attributes to the
 * target native element inside the Shadow DOM.
 *
 * @example
 * // In component watch handler:
 * @Watch('aria')
 * onAriaChange() {
 *   applyAriaProp(this.aria, this.nativeEl);
 * }
 */

/**
 * Known valid WAI-ARIA attributes (excluding the `aria-` prefix).
 * Source: https://www.w3.org/TR/wai-aria-1.2/#state_prop_def
 */
const KNOWN_ARIA_ATTRS = new Set([
  'activedescendant',
  'atomic',
  'autocomplete',
  'braillelabel',
  'brailleroledescription',
  'busy',
  'checked',
  'colcount',
  'colindex',
  'colindextext',
  'colspan',
  'controls',
  'current',
  'describedby',
  'description',
  'details',
  'disabled',
  'dropeffect',
  'errormessage',
  'expanded',
  'flowto',
  'grabbed',
  'haspopup',
  'hidden',
  'invalid',
  'keyshortcuts',
  'label',
  'labelledby',
  'level',
  'live',
  'modal',
  'multiline',
  'multiselectable',
  'orientation',
  'owns',
  'placeholder',
  'posinset',
  'pressed',
  'readonly',
  'relevant',
  'required',
  'roledescription',
  'rowcount',
  'rowindex',
  'rowindextext',
  'rowspan',
  'selected',
  'setsize',
  'sort',
  'valuemax',
  'valuemin',
  'valuenow',
  'valuetext',
]);

/**
 * Normalises an aria prop entry key.
 *
 * - `'controls'` → `'aria-controls'`
 * - `'aria-controls'` → `'aria-controls'`
 *
 * Returns `null` if the key is not a recognised ARIA attribute.
 */
export function normaliseAriaKey(rawKey: string): string | null {
  const stripped = rawKey.startsWith('aria-') ? rawKey.slice(5) : rawKey;
  if (!KNOWN_ARIA_ATTRS.has(stripped.toLowerCase())) {
    return null;
  }
  return `aria-${stripped.toLowerCase()}`;
}

/**
 * Applies the entries of an `aria` prop object to a native DOM element.
 * Unknown keys are logged as `console.warn` in non-production environments.
 *
 * @param ariaProp - The `aria` prop value from the Stencil component.
 * @param targetEl - The native element (e.g. `<button>`, `<input>`, `<dialog>`) to apply attributes to.
 */
export function applyAriaProp(
  ariaProp: Record<string, string> | undefined,
  targetEl: HTMLElement | null | undefined,
): void {
  if (!ariaProp || !targetEl) return;

  const isProd = (globalThis as { __STENCIL_PROD__?: boolean }).__STENCIL_PROD__ === true;

  for (const [rawKey, value] of Object.entries(ariaProp)) {
    const normalised = normaliseAriaKey(rawKey);
    if (!normalised) {
      if (!isProd) {
        console.warn(
          `[io-design-system] aria prop: unknown ARIA attribute key "${rawKey}". ` +
          `Only valid WAI-ARIA attributes are accepted.`,
        );
      }
      continue;
    }
    targetEl.setAttribute(normalised, value);
  }
}
