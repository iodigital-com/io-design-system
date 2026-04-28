/**
 * Returns the next index in the enabled-only list for keyboard navigation,
 * or null if the key is not a navigation key.
 */
export function getNextEnabledIndex(key: string, currentEnabledIndex: number, enabledCount: number): number | null {
  if (enabledCount <= 0) {
    return null;
  }

  if (currentEnabledIndex < 0 || currentEnabledIndex >= enabledCount) {
    return null;
  }

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
