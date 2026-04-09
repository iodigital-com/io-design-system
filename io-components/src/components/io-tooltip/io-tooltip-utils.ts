import { flip, offset, shift } from '@floating-ui/dom';

const TOOLTIP_ID_PREFIX = 'io-tooltip-';

export function createTooltipId(randomValue: string): string {
  return `${TOOLTIP_ID_PREFIX}${randomValue}`;
}

export function getTooltipMiddleware() {
  return [offset(8), flip(), shift({ padding: 8 })];
}

export function getTooltipPositionStyle(x: number, y: number): { top: string; left: string } {
  return {
    top: `${y}px`,
    left: `${x}px`,
  };
}
