/**
 * io-multi-select — pure utility helpers
 *
 * All functions are side-effect-free and unit-tested independently.
 */
import { offset, flip, shift } from '@floating-ui/dom';

import type { IoSelectOption, IoSelectOptionGroup } from './types';

// ── CSS class builders ────────────────────────────────────────────────────────

export function getMultiSelectWrapperClass(state: string, disabled: boolean): string {
  return [
    'multi-select-wrapper',
    state === 'error' ? 'multi-select-wrapper--error' : '',
    state === 'success' ? 'multi-select-wrapper--success' : '',
    disabled ? 'multi-select-wrapper--disabled' : '',
  ]
    .filter(Boolean)
    .join(' ');
}

export function getMultiSelectOptionClass(
  selected: boolean,
  disabled: boolean,
  focused: boolean,
): string {
  return [
    'multi-select-option',
    selected ? 'multi-select-option--selected' : '',
    disabled ? 'multi-select-option--disabled' : '',
    focused ? 'multi-select-option--focused' : '',
  ]
    .filter(Boolean)
    .join(' ');
}

export function getMultiSelectOptionId(listboxId: string, index: number): string {
  return `${listboxId}-option-${index}`;
}

// ── Floating-UI middleware ────────────────────────────────────────────────────

/**
 * Middleware for auto-placement: includes flip() so the dropdown flips to
 * the opposite side when there is insufficient viewport space.
 */
export function getMultiSelectMiddleware() {
  return [offset(4), flip(), shift({ padding: 8 })];
}

/**
 * Middleware for pinned placement (direction='up' or direction='down'):
 * omits flip() to respect the consumer's explicit direction choice.
 */
export function getMultiSelectPinnedMiddleware() {
  return [offset(4), shift({ padding: 8 })];
}

// ── ID helpers ────────────────────────────────────────────────────────────────

export function resolveMultiSelectId(name: string | undefined, fallback: string): string {
  if (!name) return `io-multi-select-${fallback}`;
  const sanitized = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return sanitized
    ? `io-multi-select-${sanitized}-${fallback}`
    : `io-multi-select-${fallback}`;
}

// ── Slot content parsing (mirrors io-select parseSelectContent) ───────────────

function readOption(el: Element): IoSelectOption | null {
  const elAny = el as HTMLElement & {
    value?: unknown;
    label?: unknown;
    disabled?: unknown;
    icon?: unknown;
    description?: unknown;
  };

  const rawValue = (elAny.value !== undefined && elAny.value !== '' && elAny.value !== null)
    ? elAny.value
    : el.getAttribute('value');
  const value: string | number | null =
    typeof rawValue === 'number'
      ? rawValue
      : (typeof rawValue === 'string' && rawValue !== '') ? rawValue : null;

  if (value === null) return null;

  const label =
    (typeof elAny.label === 'string' && elAny.label !== ''
      ? elAny.label
      : el.getAttribute('label')) ??
    el.textContent?.trim() ??
    String(value);

  const disabled =
    typeof elAny.disabled === 'boolean'
      ? elAny.disabled
      : el.hasAttribute('disabled');

  const icon =
    typeof elAny.icon === 'string' && elAny.icon !== '' ? elAny.icon : (el.getAttribute('icon') ?? undefined);

  const description =
    typeof elAny.description === 'string' && elAny.description !== ''
      ? elAny.description
      : (el.getAttribute('description') ?? undefined);

  return {
    value,
    label,
    disabled,
    ...(icon ? { icon } : {}),
    ...(description ? { description } : {}),
  };
}

export function parseMultiSelectContent(host: HTMLElement): {
  groups: IoSelectOptionGroup[];
  flatOptions: IoSelectOption[];
} {
  const groups: IoSelectOptionGroup[] = [];
  const flatOptions: IoSelectOption[] = [];

  for (const child of Array.from(host.children)) {
    const tag = child.tagName.toLowerCase();

    if (tag === 'io-option' || tag === 'option') {
      const opt = readOption(child);
      if (opt) {
        flatOptions.push(opt);
        // Ensure there's an ungrouped group to collect these options
        if (groups.length === 0 || groups[groups.length - 1].label !== undefined) {
          groups.push({ options: [] });
        }
        groups[groups.length - 1].options.push(opt);
      }
    } else if (tag === 'io-optgroup' || tag === 'optgroup') {
      const groupLabel =
        (child as HTMLElement & { label?: unknown }).label ??
        child.getAttribute('label') ??
        undefined;
      const groupDisabled =
        typeof (child as HTMLElement & { disabled?: unknown }).disabled === 'boolean'
          ? (child as HTMLElement & { disabled?: boolean }).disabled
          : child.hasAttribute('disabled');
      const groupOptions: IoSelectOption[] = [];

      for (const optEl of Array.from(child.children)) {
        const optTag = optEl.tagName.toLowerCase();
        if (optTag === 'io-option' || optTag === 'option') {
          const opt = readOption(optEl);
          if (opt) {
            const resolvedOpt: IoSelectOption = {
              ...opt,
              disabled: opt.disabled || (groupDisabled ?? false),
            };
            groupOptions.push(resolvedOpt);
            flatOptions.push(resolvedOpt);
          }
        }
      }

      groups.push({ label: groupLabel as string | undefined, disabled: groupDisabled ?? false, options: groupOptions });
    }
  }

  return { groups, flatOptions };
}

// ── Display text helpers ──────────────────────────────────────────────────────

/**
 * Returns the display text for the trigger button.
 * - 0 selected: returns null (caller should render placeholder)
 * - 1 selected: returns the option's label
 * - 2..maxDisplay selected: returns comma-joined labels
 * - >maxDisplay selected: returns "{N} selected"
 */
export function getMultiSelectDisplayText(
  selectedValues: (string | number)[],
  flatOptions: IoSelectOption[],
  maxDisplay: number,
): string | null {
  if (selectedValues.length === 0) return null;

  if (selectedValues.length === 1) {
    const v = selectedValues[0];
    const label = flatOptions.find(o => o.value === v)?.label ?? String(v);
    return label;
  }

  if (selectedValues.length <= maxDisplay) {
    return selectedValues
      .map(v => flatOptions.find(o => o.value === v)?.label ?? String(v))
      .join(', ');
  }

  return `${selectedValues.length} selected`;
}
