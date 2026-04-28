import type { IoTabItem } from './types';

export function createTabsIdPrefix(randomId: string): string {
  return `io-tabs-${randomId}`;
}

export function getFirstEnabledTabValue(tabs: IoTabItem[]): string | undefined {
  return tabs.find(tab => !tab.disabled)?.value;
}

export function getEnabledTabs(tabs: IoTabItem[]): Array<{ tab: IoTabItem; index: number }> {
  return tabs
    .map((tab, index) => ({ tab, index }))
    .filter(({ tab }) => !tab.disabled);
}

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

export function getTabIds(prefix: string, value: string): { tabId: string } {
  return {
    tabId: `${prefix}-tab-${value}`,
  };
}

export function getTabClassName(isActive: boolean, disabled: boolean): string {
  return [
    'tab',
    isActive ? 'tab--active' : '',
    disabled ? 'tab--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');
}
