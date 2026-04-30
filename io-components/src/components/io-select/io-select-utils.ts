import { offset, flip, shift } from '@floating-ui/dom';

import type { IoSelectOption, IoSelectOptionGroup } from './types';

export function sanitizeNameSegment(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function resolveSelectId(name: string | undefined, fallbackId: string): string {
  const normalizedName = typeof name === 'string' ? sanitizeNameSegment(name) : '';
  return normalizedName
    ? `io-select-${normalizedName}-${fallbackId}`
    : `io-select-${fallbackId}`;
}

export function getSelectWrapperClass(error: boolean, disabled: boolean): string {
  return ['select-wrapper', error ? 'select-wrapper--error' : '', disabled ? 'select-wrapper--disabled' : '']
    .filter(Boolean)
    .join(' ');
}

export function getComboboxMiddleware() {
  return [offset(4), flip(), shift({ padding: 8 })];
}

export function getComboboxOptionId(listboxId: string, index: number): string {
  return `${listboxId}-option-${index}`;
}

export function getComboboxWrapperClass(error: boolean, disabled: boolean): string {
  return ['select-wrapper', 'select-wrapper--custom', error ? 'select-wrapper--error' : '', disabled ? 'select-wrapper--disabled' : '']
    .filter(Boolean)
    .join(' ');
}

export function getComboboxOptionClass(selected: boolean, disabled: boolean, focused: boolean, multipleMode: boolean): string {
  return [
    'combobox-option',
    selected ? 'combobox-option--selected' : '',
    disabled ? 'combobox-option--disabled' : '',
    focused ? 'combobox-option--focused' : '',
    multipleMode ? 'combobox-option--multiple' : '',
  ].filter(Boolean).join(' ');
}

// ── Slot-based option parsing ────────────────────────────────────────────────

function readOption(el: Element): IoSelectOption | null {
  const elAny = el as HTMLElement & { value?: unknown; label?: unknown; disabled?: unknown };
  const value =
    (typeof elAny.value === 'string' && elAny.value !== ''
      ? elAny.value
      : el.getAttribute('value')) ?? '';
  if (value === '') return null;

  const label =
    (typeof elAny.label === 'string' && elAny.label !== ''
      ? elAny.label
      : el.getAttribute('label')) ?? (el as HTMLElement).textContent?.trim() ?? '';

  const disabled =
    typeof elAny.disabled === 'boolean' ? elAny.disabled : el.hasAttribute('disabled');

  return { value, label, ...(disabled ? { disabled: true } : {}) };
}

/**
 * Parses the light-DOM children of an io-select host element into a structured
 * form that io-select can use for rendering and keyboard navigation.
 *
 * Handles:
 *  - Direct <io-option> children → added to the last ungrouped group
 *  - <io-optgroup> children      → added as a named group; their disabled state
 *                                   propagates to child options
 *
 * Returns:
 *  - groups:      for rendering (native <optgroup> / combobox group headings)
 *  - flatOptions: for keyboard navigation, filter, and display-value resolution
 */
export function parseSelectContent(host: HTMLElement): {
  groups: IoSelectOptionGroup[];
  flatOptions: IoSelectOption[];
} {
  const groups: IoSelectOptionGroup[] = [];
  const flatOptions: IoSelectOption[] = [];

  for (const child of Array.from(host.children)) {
    const tag = child.tagName.toLowerCase();

    if (tag === 'io-option') {
      const opt = readOption(child);
      if (!opt) continue;
      flatOptions.push(opt);
      // Merge into the last ungrouped batch or start one
      const last = groups[groups.length - 1];
      if (last && last.label === undefined) {
        last.options.push(opt);
      } else {
        groups.push({ options: [opt] });
      }
    } else if (tag === 'io-optgroup') {
      const elAny = child as HTMLElement & { label?: unknown; disabled?: unknown };
      const groupLabel =
        (typeof elAny.label === 'string' && elAny.label !== ''
          ? elAny.label
          : child.getAttribute('label')) ?? '';
      const groupDisabled =
        typeof elAny.disabled === 'boolean' ? elAny.disabled : child.hasAttribute('disabled');

      const groupOpts: IoSelectOption[] = [];
      for (const optChild of Array.from(child.children)) {
        if (optChild.tagName.toLowerCase() !== 'io-option') continue;
        const opt = readOption(optChild);
        if (!opt) continue;
        const finalOpt: IoSelectOption = groupDisabled
          ? { ...opt, disabled: true }
          : opt;
        groupOpts.push(finalOpt);
        flatOptions.push(finalOpt);
      }

      if (groupOpts.length > 0) {
        groups.push({
          label: groupLabel || undefined,
          disabled: groupDisabled || undefined,
          options: groupOpts,
        });
      }
    }
  }

  return { groups, flatOptions };
}
