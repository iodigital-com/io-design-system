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
 * Normalises a raw activeTabIndex value against the current button list.
 * - Clamps to valid range
 * - Skips disabled buttons by falling back to the first enabled button
 */
export function normalizeActiveTabIndex(
  index: number,
  buttons: HTMLButtonElement[],
): number {
  if (buttons.length === 0) return 0;

  const parsed = Number(index);
  const safeIndex = Number.isFinite(parsed) ? Math.floor(parsed) : 0;
  const clamped = Math.max(0, Math.min(safeIndex, buttons.length - 1));

  if (!buttons[clamped]?.disabled) return clamped;

  const firstEnabled = buttons.find((btn) => !btn.disabled);
  return firstEnabled ? buttons.indexOf(firstEnabled) : 0;
}
