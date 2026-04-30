import type { IoButtonGroupItem } from './types';

/**
 * Parses `<io-button>` children of a host element into structured item definitions.
 * Items with an empty or missing `value` attribute are filtered out.
 */
export function parseButtonGroupItems(hostEl: HTMLElement): IoButtonGroupItem[] {
  // Use direct children only — avoids accidentally picking up io-button elements
  // that are nested inside other components within the slot.
  const elements = Array.from(hostEl.children).filter(
    (el): el is Element => el.tagName.toLowerCase() === 'io-button',
  );
  return elements
    .map(el => ({
      value: el.getAttribute('value') ?? '',
      label: el.textContent?.trim() ?? '',
      disabled: el.hasAttribute('disabled'),
    }))
    .filter(item => item.value !== '');
}

/**
 * Returns the next index in the enabled-only list for keyboard navigation,
 * or null if the key is not a navigation key.
 *
 * Handles both horizontal (ArrowRight/ArrowLeft) and vertical (ArrowDown/ArrowUp)
 * arrows, plus Home/End. Matches the ARIA APG keyboard interaction model for
 * both radiogroup (exclusive) and group (multi-select) patterns.
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
