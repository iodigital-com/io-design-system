/** Union of element types that can serve as tab items inside io-tabs-bar. */
type TabItem = HTMLButtonElement | HTMLAnchorElement;

/** Returns true when a tab item should be treated as disabled. */
function isTabItemDisabled(item: TabItem): boolean {
  if (item instanceof HTMLButtonElement) return item.disabled;
  return item.getAttribute('aria-disabled') === 'true';
}

/**
 * Returns the next enabled index in a list of enabled tabs for keyboard
 * navigation. Returns null when the key is not a navigation key.
 */
export function getNextEnabledIndex(
  key: string,
  currentEnabledIndex: number,
  enabledCount: number,
): number | null {
  if (enabledCount <= 0) return null;
  if (currentEnabledIndex < 0 || currentEnabledIndex >= enabledCount) return null;

  switch (key) {
    case 'ArrowRight':
      return (currentEnabledIndex + 1) % enabledCount;
    case 'ArrowLeft':
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
 * Normalises a raw activeTabIndex value against the current tab item list.
 * - Clamps to valid range
 * - Skips disabled items by falling back to the first enabled item
 */
export function normalizeActiveTabIndex(
  index: number,
  buttons: TabItem[],
): number {
  if (buttons.length === 0) return 0;

  const parsed = Number(index);
  const safeIndex = Number.isFinite(parsed) ? Math.floor(parsed) : 0;
  const clamped = Math.max(0, Math.min(safeIndex, buttons.length - 1));

  if (!isTabItemDisabled(buttons[clamped])) return clamped;

  const firstEnabled = buttons.find((btn) => !isTabItemDisabled(btn));
  return firstEnabled ? buttons.indexOf(firstEnabled) : 0;
}
