import type { IoBreadcrumbItem } from './types';

export function parseItems(raw: string): IoBreadcrumbItem[] {
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is IoBreadcrumbItem =>
        typeof item === 'object' && item !== null && typeof item.label === 'string',
    );
  } catch {
    return [];
  }
}

export function getVisibleItems(
  items: IoBreadcrumbItem[],
  maxVisible: number | undefined,
  expanded: boolean,
): { visible: IoBreadcrumbItem[]; hasCollapsed: boolean; collapsedCount: number } {
  if (!maxVisible || expanded || items.length <= maxVisible) {
    return { visible: items, hasCollapsed: false, collapsedCount: 0 };
  }
  // Always show first and last; collapse middle
  const first = items[0];
  const last = items[items.length - 1];
  return {
    visible: [first, last],
    hasCollapsed: true,
    collapsedCount: items.length - 2,
  };
}
