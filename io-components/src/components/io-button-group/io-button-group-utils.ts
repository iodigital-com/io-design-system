import type { IoIconName } from '../../utils/icons';
import type { IoButtonGroupItem } from './types';

/**
 * Parses `<io-button>` children of a host element into structured item definitions.
 * Items with an empty or missing `value` attribute are filtered out.
 *
 * Checks the JS property first, then falls back to the HTML attribute.
 * This handles two distinct usage patterns:
 *   1. Static HTML / framework bindings — `value` is an HTML attribute set
 *      before the element upgrades (`getAttribute` works).
 *   2. Storefront generator — properties are applied via a ref callback
 *      (`el.value = 'day'`) before Stencil upgrades the children, so the
 *      attribute does not exist yet but the JS property is already present.
 */
export function parseButtonGroupItems(hostEl: HTMLElement): IoButtonGroupItem[] {
  // Use direct children only — avoids accidentally picking up io-button elements
  // that are nested inside other components within the slot.
  const elements = Array.from(hostEl.children).filter(
    (el): el is Element => el.tagName.toLowerCase() === 'io-button',
  );
  return elements
    .map(el => {
      const elAny = el as HTMLElement & { value?: unknown; disabled?: unknown; icon?: unknown; label?: unknown };
      const value =
        (typeof elAny.value === 'string' && elAny.value !== ''
          ? elAny.value
          : el.getAttribute('value')) ?? '';
      const disabled =
        typeof elAny.disabled === 'boolean' ? elAny.disabled : el.hasAttribute('disabled');
      const label = el.textContent?.trim() ?? '';
      // Read icon from JS property first (io-button does not reflect icon to an attribute),
      // then fall back to the HTML attribute. Trim and treat empty string as absent so that
      // storefront sentinel values like '' and whitespace-only strings never reach io-icon.
      const iconRaw =
        typeof elAny.icon === 'string' && elAny.icon !== ''
          ? elAny.icon.trim()
          : (el.getAttribute('icon') ?? '').trim() || undefined;
      const icon = (iconRaw || undefined) as IoIconName | undefined;
      // aria-label > io-button label prop (not reflected) > label attribute fallback
      const labelProp =
        typeof elAny.label === 'string' ? elAny.label.trim() || undefined : undefined;
      const ariaLabelAttr = (el.getAttribute('aria-label') ?? '').trim() || undefined;
      const labelAttr = (el.getAttribute('label') ?? '').trim() || undefined;
      const ariaLabel = ariaLabelAttr ?? labelProp ?? labelAttr;
      return { value, label, ariaLabel, disabled, icon };
    })
    .filter(item => item.value !== '');
}

/**
 * Returns the next index in the enabled-only list for keyboard navigation,
 * or null if the key is not a navigation key.
 *
 * Handles both horizontal (ArrowRight/ArrowLeft) and vertical (ArrowDown/ArrowUp)
 * arrows, plus Home/End. Matches the ARIA APG keyboard interaction model for
 * both radiogroup (single) and group (multiple) patterns.
 */
export function getNextEnabledGroupIndex(
  key: string,
  currentEnabledIndex: number,
  enabledCount: number,
): number | null {
  if (enabledCount <= 0) return null;
  if (currentEnabledIndex < 0 || currentEnabledIndex >= enabledCount) return null;

  switch (key) {
    case 'ArrowRight':
    case 'ArrowDown':
      return (currentEnabledIndex + 1) % enabledCount;
    case 'ArrowLeft':
    case 'ArrowUp':
      return (currentEnabledIndex - 1 + enabledCount) % enabledCount;
    case 'Home':
      return 0;
    case 'End':
      return enabledCount - 1;
    default:
      return null;
  }
}

/**
 * Builds the CSS class string for an individual group button.
 */
export function getButtonGroupClassList(opts: {
  active: boolean;
  disabled: boolean;
  groupDisabled: boolean;
}): string {
  const classes = ['group-btn'];
  if (opts.active) classes.push('group-btn--active');
  if (opts.disabled || opts.groupDisabled) classes.push('group-btn--disabled');
  return classes.join(' ');
}
