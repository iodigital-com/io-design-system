import {
  Component,
  Prop,
  State,
  Watch,
  Event,
  EventEmitter,
  Method,
  Element,
  Host,
  AttachInternals,
  Listen,
  h,
} from '@stencil/core';
import { computePosition, autoUpdate } from '@floating-ui/dom';

import { getMultiSelectStyles } from './io-multi-select-styles';
import {
  resolveMultiSelectId,
  getMultiSelectWrapperClass,
  getMultiSelectMiddleware,
  getMultiSelectPinnedMiddleware,
  getMultiSelectOptionId,
  getMultiSelectOptionClass,
  parseMultiSelectContent,
  getMultiSelectDisplayText,
} from './io-multi-select-utils';
import { syncFormState } from '../../utils/form/sync-form-state';

import type { IoIconName } from '../../utils/icons';
import type {
  IoSelectOption,
  IoSelectOptionGroup,
  IoMultiSelectDirection,
  IoMultiSelectState,
  IoMultiSelectChangeDetail,
  IoMultiSelectLimitReachedDetail,
} from './types';

/**
 * io-multi-select
 * ===============
 * Dedicated multi-value select component with removable chips, optional
 * search filter, and full ARIA combobox / listbox pattern.
 *
 * Options are defined as slotted `<io-option>` (or `<io-optgroup>`) children.
 * FACE-enabled: participates in native HTML forms via ElementInternals.
 *
 * @example
 * <io-multi-select name="countries" label="Countries">
 *   <io-option value="nl" label="Netherlands"></io-option>
 *   <io-option value="be" label="Belgium"></io-option>
 *   <io-option value="de" label="Germany"></io-option>
 * </io-multi-select>
 *
 * @deprecated io-select[multiple] — use io-multi-select instead.
 *   Migration: replace `<io-select multiple custom label="…">` with
 *   `<io-multi-select label="…">` and the same child io-option elements.
 */
@Component({
  tag: 'io-multi-select',
  shadow: { delegatesFocus: true },
  formAssociated: true,
})
export class IoMultiSelect {
  @Element() el!: HTMLElement;
  @AttachInternals() internals!: ElementInternals;

  // ── Props ─────────────────────────────────────────────────────────────────

  /** Label text — required for accessibility */
  @Prop() label!: string;

  /** Hides the visible label and collapses its space; aria-label is set on the trigger/listbox when a label value is provided */
  @Prop({ reflect: true }) hideLabel = false;

  /** HTML name attribute (required for form submission) */
  @Prop() name!: string;

  /**
   * Currently selected values. Mutable — updated internally on user selection.
   */
  @Prop({ mutable: true }) value: string[] = [];

  /** Placeholder shown in the trigger when nothing is selected. */
  @Prop() placeholder = 'Select options';

  /** Marks the field as required. */
  @Prop({ reflect: true }) required = false;

  /** Disables the multi-select. */
  @Prop({ mutable: true, reflect: true }) disabled = false;

  /**
   * Visual / validation state.
   * - 'none'    — default
   * - 'error'   — error border + red message
   * - 'success' — success border + green message
   * - 'warning' — warning border + amber message
   */
  @Prop({ reflect: true }) state: IoMultiSelectState = 'none';

  /** Message text shown below the trigger (error, success, warning, or helper). */
  @Prop() message: string | undefined;

  /**
   * Helper text shown below the trigger. Hidden in error state; replaced by the
   * `slot="description"` slot when that slot has content.
   */
  @Prop() helperText: string | undefined;

  /**
   * Supplementary description rendered as a persistent `<p>` below the field.
   * Always visible — not hidden in error state. Also settable via `slot="description"`.
   */
  @Prop() description: string | undefined;

  /**
   * When true, shows a search input inside the dropdown to filter options.
   * @default false
   */
  @Prop({ reflect: true }) filter = false;

  /**
   * Dropdown opening direction.
   * - 'auto' uses floating-ui to compute the best position.
   * - 'up' / 'down' pin the dropdown above or below the trigger.
   * @default 'auto'
   */
  @Prop() dropdownDirection: IoMultiSelectDirection = 'auto';

  /**
   * Maximum number of selected labels to show before switching to "{N} selected".
   * @default 3
   */
  @Prop() maxDisplay = 3;

  /**
   * When true, shows a "Select all" button paired with "Clear all" in the dropdown footer.
   * With an active filter, selects only visible filtered options.
   * Respects maxSelections when set.
   * @default false
   */
  @Prop() selectAll = false;

  /**
   * Maximum number of selections allowed.
   * When a user tries to add a value beyond this cap, the selection is blocked
   * and a `limitreached` event is emitted.
   * Unset (undefined) means no limit.
   */
  @Prop() maxSelections: number | undefined;

  // ── State ─────────────────────────────────────────────────────────────────

  /** Mirrors FACE invalidity so the component re-renders on form validation. */
  @State() faceInvalid = false;

  /** Parsed option groups from slotted content. */
  @State() private groups: IoSelectOptionGroup[] = [];

  /** Flat ordered option list — drives keyboard navigation and filtering. */
  @State() private flatOptions: IoSelectOption[] = [];

  /** Whether the dropdown is open. */
  @State() private isOpen = false;

  /** Keyboard-focused option index within filteredOptions. */
  @State() private activeIndex = -1;

  /** Current filter query string. */
  @State() private filterQuery = '';

  /** Whether the description slot has content. */
  @State() private hasDescriptionSlot = false;

  // ── Events ────────────────────────────────────────────────────────────────

  /**
   * Fires when the selection changes.
   * Detail: `{ value: (string | number)[], name: string }`
   */
  @Event() change!: EventEmitter<IoMultiSelectChangeDetail>;

  /**
   * Fires when the trigger button loses focus and the dropdown is closed.
   * Useful for touched/dirty tracking in form libraries.
   */
  @Event() blur!: EventEmitter<FocusEvent>;

  /**
   * Fires whenever the dropdown opens or closes.
   * Detail: `{ open: boolean }`
   */
  @Event({ bubbles: false }) toggle!: EventEmitter<{ open: boolean }>;

  /**
   * Fires when the user tries to add a selection beyond `maxSelections`.
   * Detail: `{ max: number, attempted: string | number }`
   */
  @Event({ bubbles: false }) limitreached!: EventEmitter<IoMultiSelectLimitReachedDetail>;

  // ── Public methods ────────────────────────────────────────────────────────

  /** Returns true when the field value satisfies all constraints. */
  @Method()
  async checkValidity(): Promise<boolean> {
    return this.internals?.checkValidity?.() ?? true;
  }

  /** Triggers browser validation UI and returns validity state. */
  @Method()
  async reportValidity(): Promise<boolean> {
    return this.internals?.reportValidity?.() ?? true;
  }

  /** Programmatically moves focus to the trigger button. */
  @Method()
  async setFocus(options?: FocusOptions): Promise<void> {
    this.triggerEl?.focus(options);
  }

  // ── Private fields ────────────────────────────────────────────────────────

  private fallbackId!: string;
  private fieldId!: string;
  private defaultValue: string[] = [];
  private triggerEl?: HTMLButtonElement;
  private dropdownEl?: HTMLDivElement;
  private filterInputEl?: HTMLInputElement;
  private clickOutsideHandler?: (ev: PointerEvent) => void;
  /** Typeahead: buffered key presses cleared after 500ms of inactivity */
  private typeaheadBuffer = '';
  private typeaheadTimeout: ReturnType<typeof setTimeout> | undefined;
  /** SSR/hydration guard: re-parse timeout for late-arriving option children */
  private lateParseTimeout: ReturnType<typeof setTimeout> | undefined;
  /** autoUpdate cleanup function for popover positioning */
  private autoUpdateCleanup?: () => void;
  /** True when browser supports native Popover API */
  private readonly hasPopoverSupport = typeof HTMLElement !== 'undefined' && 'popover' in HTMLElement.prototype;

  /** How many options PageUp/PageDown skips at a time. */
  private static readonly PAGE_SIZE = 10;

  // ── Lifecycle ─────────────────────────────────────────────────────────────

  componentWillLoad() {
    this.fallbackId = Math.random().toString(36).slice(2);
    this.fieldId = resolveMultiSelectId(this.name, this.fallbackId);
    this.defaultValue = [...(this.value ?? [])];
    this.syncFormValue();
    if (this.hideLabel && !this.label) {
      const hostAriaLabel = this.el.getAttribute('aria-label');
      const hostAriaLabelledBy = this.el.getAttribute('aria-labelledby');
      if (!hostAriaLabel && !hostAriaLabelledBy) {
        console.warn('[io-multi-select] hideLabel=true requires a non-empty label for accessibility.');
      }
    }
  }

  componentDidLoad() {
    const parsed = parseMultiSelectContent(this.el);
    this.groups = parsed.groups;
    this.flatOptions = parsed.flatOptions;
    // Note: late-arriving options are now handled by @Listen('optionConnect').
  }

  /**
   * Handles the `optionConnect` event dispatched by io-option in connectedCallback.
   * Replaces the fragile setTimeout SSR-race hack.
   */
  @Listen('optionConnect')
  handleOptionConnect() {
    const parsed = parseMultiSelectContent(this.el);
    this.groups = parsed.groups;
    this.flatOptions = parsed.flatOptions;
  }

  disconnectedCallback() {
    this.removeClickOutside();
    this.autoUpdateCleanup?.();
    this.autoUpdateCleanup = undefined;
    if (this.lateParseTimeout !== undefined) {
      clearTimeout(this.lateParseTimeout);
      this.lateParseTimeout = undefined;
    }
    if (this.typeaheadTimeout !== undefined) {
      clearTimeout(this.typeaheadTimeout);
      this.typeaheadTimeout = undefined;
    }
  }

  formResetCallback() {
    this.value = [...this.defaultValue];
    this.syncFormValue();
    this.faceInvalid = false;
  }

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  formStateRestoreCallback(state: string | File | FormData | null): void {
    if (state === null) {
      this.value = [];
    } else if (typeof state === 'string') {
      // FormData serialised to string — values are always strings on restore
      this.value = state ? state.split(',').filter(Boolean) : [];
    } else if (state instanceof FormData) {
      this.value = (state.getAll(this.name ?? '') as string[]).filter(v => typeof v === 'string');
    }
    this.syncFormValue?.();
  }

  // ── Watchers ──────────────────────────────────────────────────────────────

  @Watch('value')
  onValueChange() {
    this.syncFormValue();
  }

  @Watch('name')
  onNameChange() {
    this.fieldId = resolveMultiSelectId(this.name, this.fallbackId);
    this.syncFormValue();
  }

  @Watch('required')
  onRequiredChange() {
    this.syncFormValue();
  }

  @Watch('isOpen')
  onIsOpenChange(newVal: boolean) {
    this.toggle.emit({ open: newVal });

    if (newVal) {
      // Show dropdown — native Popover API when supported, otherwise manual positioning
      if (this.hasPopoverSupport && this.dropdownEl) {
        (this.dropdownEl as HTMLDivElement & { showPopover?: () => void }).showPopover?.();
        if (this.triggerEl && this.dropdownEl) {
          this.autoUpdateCleanup = autoUpdate(this.triggerEl, this.dropdownEl, () => {
            void this.positionDropdown();
          });
        }
      } else {
        this.attachClickOutside();
        void this.positionDropdown();
      }

      if (this.filter) {
        setTimeout(() => this.filterInputEl?.focus(), 0);
      } else {
        const opts = this.filteredOptions;
        const firstSelected = opts.findIndex(o => (this.value ?? []).includes(String(o.value)));
        const firstEnabled = opts.findIndex(o => !o.disabled);
        this.activeIndex = firstSelected >= 0 ? firstSelected : Math.max(firstEnabled, -1);
      }
    } else {
      // Hide dropdown
      if (this.hasPopoverSupport && this.dropdownEl) {
        (this.dropdownEl as HTMLDivElement & { hidePopover?: () => void }).hidePopover?.();
        this.autoUpdateCleanup?.();
        this.autoUpdateCleanup = undefined;
      } else {
        this.removeClickOutside();
      }
      this.activeIndex = -1;
      this.filterQuery = '';
      this.typeaheadBuffer = '';
      if (this.typeaheadTimeout !== undefined) {
        clearTimeout(this.typeaheadTimeout);
        this.typeaheadTimeout = undefined;
      }
      setTimeout(() => this.triggerEl?.focus(), 0);
    }
  }

  // ── FACE ──────────────────────────────────────────────────────────────────

  private syncFormValue() {
    const values = this.value ?? [];
    const formValue = !this.name || values.length === 0
      ? null
      : (() => { const fd = new FormData(); values.forEach(v => fd.append(this.name, String(v))); return fd; })();
    const isInvalid = this.required && values.length === 0;
    const { faceInvalid } = syncFormState(this.internals, null, {
      formValue,
      validity: isInvalid ? { valueMissing: true } : {},
      validationMessage: isInvalid ? 'Please select at least one option' : '',
      disabled: this.disabled,
    });
    this.faceInvalid = faceInvalid;
  }

  // ── Computed ──────────────────────────────────────────────────────────────

  private get filteredOptions(): IoSelectOption[] {
    if (!this.filter || !this.filterQuery) return this.flatOptions;
    const q = this.filterQuery.toLowerCase();
    return this.flatOptions.filter(o => o.label.toLowerCase().includes(q));
  }

  // ── Private helpers ───────────────────────────────────────────────────────

  private async positionDropdown(): Promise<void> {
    if (!this.triggerEl || !this.dropdownEl) return;

    const isAuto = this.dropdownDirection === 'auto';
    const placement =
      this.dropdownDirection === 'up'
        ? 'top-start'
        : 'bottom-start';

    // Use 'fixed' strategy for both popover (top-layer) and legacy modes;
    // multi-select always used 'fixed' for its overlay panel.
    const { x, y } = await computePosition(this.triggerEl, this.dropdownEl, {
      middleware: isAuto ? getMultiSelectMiddleware() : getMultiSelectPinnedMiddleware(),
      placement,
      strategy: 'fixed',
    });

    Object.assign(this.dropdownEl.style, {
      left: `${x}px`,
      top: `${y}px`,
      width: `${this.triggerEl.getBoundingClientRect().width}px`,
    });
  }

  private attachClickOutside() {
    this.clickOutsideHandler = (ev: PointerEvent) => {
      if (!ev.composedPath().includes(this.el)) {
        this.isOpen = false;
      }
    };
    document.addEventListener('pointerdown', this.clickOutsideHandler, true);
  }

  private removeClickOutside() {
    if (this.clickOutsideHandler) {
      document.removeEventListener('pointerdown', this.clickOutsideHandler, true);
      this.clickOutsideHandler = undefined;
    }
  }

  private toggleOption(opt: IoSelectOption) {
    if (opt.disabled) return;
    const current = this.value ?? [];
    const optValueStr = String(opt.value);
    const isSelected = current.includes(optValueStr);

    if (!isSelected && this.maxSelections !== undefined && current.length >= this.maxSelections) {
      this.limitreached.emit({ max: this.maxSelections, attempted: optValueStr });
      return;
    }

    const next = isSelected
      ? current.filter(v => v !== optValueStr)
      : [...current, optValueStr];
    this.value = next;
    this.change.emit({ value: [...next], name: this.name });
  }

  private removeChip(value: string | number) {
    const valueStr = String(value);
    const next = (this.value ?? []).filter(v => v !== valueStr);
    this.value = next;
    this.change.emit({ value: [...next], name: this.name });
  }

  private clearAll() {
    this.value = [];
    this.change.emit({ value: [], name: this.name });
  }

  private selectAllVisible() {
    const candidates = this.filteredOptions.filter(o => !o.disabled);
    const current = this.value ?? [];
    const next = [...current];
    for (const opt of candidates) {
      const optValueStr = String(opt.value);
      if (next.includes(optValueStr)) continue;
      if (this.maxSelections !== undefined && next.length >= this.maxSelections) {
        this.limitreached.emit({ max: this.maxSelections, attempted: optValueStr });
        break;
      }
      next.push(optValueStr);
    }
    this.value = next;
    this.change.emit({ value: [...next], name: this.name });
  }

  private moveActive(delta: number) {
    const opts = this.filteredOptions;
    if (opts.length === 0) return;
    let next = this.activeIndex + delta;
    if (next < 0) next = opts.length - 1;
    if (next >= opts.length) next = 0;
    let attempts = opts.length;
    while (opts[next]?.disabled && attempts-- > 0) {
      next += delta;
      if (next < 0) next = opts.length - 1;
      if (next >= opts.length) next = 0;
    }
    if (!opts[next]?.disabled) {
      this.activeIndex = next;
    }
  }

  private movePage(direction: 1 | -1) {
    const opts = this.filteredOptions;
    if (opts.length === 0) return;
    const pageSize = IoMultiSelect.PAGE_SIZE;
    let next = this.activeIndex + direction * pageSize;
    next = Math.max(0, Math.min(next, opts.length - 1));
    // Skip disabled options toward the target direction
    while (opts[next]?.disabled && next > 0 && next < opts.length - 1) {
      next += direction;
    }
    if (!opts[next]?.disabled) {
      this.activeIndex = next;
    }
  }

  private handleTypeahead(char: string) {
    const opts = this.filteredOptions;
    if (opts.length === 0) return;

    if (this.typeaheadTimeout !== undefined) {
      clearTimeout(this.typeaheadTimeout);
    }
    this.typeaheadBuffer += char.toLowerCase();
    this.typeaheadTimeout = setTimeout(() => {
      this.typeaheadBuffer = '';
      this.typeaheadTimeout = undefined;
    }, 500);

    const buf = this.typeaheadBuffer;
    const start = this.activeIndex >= 0 ? this.activeIndex : -1;

    // Search from item after current through wrapping
    for (let i = 1; i <= opts.length; i++) {
      const idx = (start + i) % opts.length;
      const opt = opts[idx];
      if (!opt.disabled && opt.label.toLowerCase().startsWith(buf)) {
        this.activeIndex = idx;
        return;
      }
    }
  }

  // ── Handlers ──────────────────────────────────────────────────────────────

  private handleTriggerClick = () => {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
  };

  private handleTriggerBlur = (ev: FocusEvent): void => {
    if (this.isOpen) return;
    this.blur.emit(ev);
  };

  private handleTriggerKeyDown = (ev: KeyboardEvent) => {
    if (this.disabled) return;

    if (!this.isOpen) {
      if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(ev.key)) {
        ev.preventDefault();
        this.isOpen = true;
        if (ev.key === 'ArrowUp') {
          this.activeIndex = this.filteredOptions.length - 1;
        }
      } else if (ev.key === 'Backspace' && (this.value ?? []).length > 0) {
        // Backspace on closed trigger removes the last selected chip
        ev.preventDefault();
        const current = this.value ?? [];
        const last = current[current.length - 1];
        if (last !== undefined) this.removeChip(last);
      }
      return;
    }

    switch (ev.key) {
      case 'Escape':
        ev.stopPropagation();
        this.isOpen = false;
        break;
      case 'ArrowDown':
        ev.preventDefault();
        this.moveActive(1);
        break;
      case 'ArrowUp':
        ev.preventDefault();
        this.moveActive(-1);
        break;
      case 'PageDown':
        ev.preventDefault();
        this.movePage(1);
        break;
      case 'PageUp':
        ev.preventDefault();
        this.movePage(-1);
        break;
      case 'Home': {
        ev.preventDefault();
        this.activeIndex = this.filteredOptions.findIndex(o => !o.disabled);
        break;
      }
      case 'End': {
        ev.preventDefault();
        const opts = this.filteredOptions;
        for (let i = opts.length - 1; i >= 0; i--) {
          if (!opts[i].disabled) {
            this.activeIndex = i;
            break;
          }
        }
        break;
      }
      case 'Enter':
      case ' ': {
        ev.preventDefault();
        const opt = this.filteredOptions[this.activeIndex];
        if (opt) this.toggleOption(opt);
        break;
      }
      case 'Tab':
        this.isOpen = false;
        break;
      default: {
        // Typeahead: printable single characters while filter input is not active
        if (!this.filter && ev.key.length === 1 && !ev.ctrlKey && !ev.metaKey && !ev.altKey) {
          ev.preventDefault();
          this.handleTypeahead(ev.key);
        }
        break;
      }
    }
  };

  private handleFilterInput = (ev: Event) => {
    this.filterQuery = (ev.target as HTMLInputElement).value;
    this.activeIndex = this.filteredOptions.length > 0 ? 0 : -1;
  };

  private handleFilterKeyDown = (ev: KeyboardEvent) => {
    switch (ev.key) {
      case 'Escape':
        ev.stopPropagation();
        this.isOpen = false;
        break;
      case 'ArrowDown':
        ev.preventDefault();
        this.moveActive(1);
        break;
      case 'ArrowUp':
        ev.preventDefault();
        this.moveActive(-1);
        break;
      case 'Enter': {
        ev.preventDefault();
        const opt = this.filteredOptions[this.activeIndex];
        if (opt) this.toggleOption(opt);
        break;
      }
    }
  };

  private handleDescriptionSlotChange = (ev: Event) => {
    const slot = ev.target as HTMLSlotElement;
    this.hasDescriptionSlot = slot.assignedNodes({ flatten: true }).length > 0;
  };

  // ── Render helpers ────────────────────────────────────────────────────────

  private renderOption(opt: IoSelectOption, flatIndex: number, atLimit = false) {
    const isSelected = (this.value ?? []).includes(String(opt.value));
    const isFocused = flatIndex === this.activeIndex;
    const listboxId = `${this.fieldId}-listbox`;
    // Unselected options become aria-disabled when maxSelections cap is reached
    const effectivelyDisabled = opt.disabled || (atLimit && !isSelected);

    return (
      <li
        key={opt.value}
        id={getMultiSelectOptionId(listboxId, flatIndex)}
        role="option"
        aria-selected={String(isSelected)}
        aria-disabled={effectivelyDisabled ? 'true' : undefined}
        class={getMultiSelectOptionClass(isSelected, effectivelyDisabled, isFocused)}
        onClick={effectivelyDisabled ? undefined : () => this.toggleOption(opt)}
      >
        <span class="multi-select-option__checkbox" aria-hidden="true">
          {isSelected && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path
                d="M2 6l3 3 5-5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          )}
        </span>
        {opt.icon && (
          <span class="multi-select-option__icon" aria-hidden="true">
            <io-icon name={opt.icon as IoIconName} />
          </span>
        )}
        <span class="multi-select-option__content">
          <span class="multi-select-option__label">{opt.label}</span>
          {opt.description && (
            <span class="multi-select-option__description">{opt.description}</span>
          )}
        </span>
      </li>
    );
  }

  private renderListboxItems() {
    const isFiltering = this.filter && this.filterQuery.length > 0;
    const selectedCount = (this.value ?? []).length;
    const atLimit = this.maxSelections !== undefined && selectedCount >= this.maxSelections;

    if (isFiltering) {
      return this.filteredOptions.map((opt, i) => this.renderOption(opt, i, atLimit));
    }

    const items: ReturnType<typeof this.renderOption>[] = [];
    let flatIdx = 0;

    for (const group of this.groups) {
      if (group.label) {
        const groupId = `${this.fieldId}-group-${flatIdx}`;
        const groupItems = group.options.map(opt => {
          const el = this.renderOption(opt, flatIdx++, atLimit);
          return el;
        });
        items.push(
          <li role="presentation" class="multi-select-group">
            <span id={groupId} class="multi-select-group__label">
              {group.label}
            </span>
            <ul role="group" aria-labelledby={groupId} class="multi-select-group__list">
              {groupItems}
            </ul>
          </li>,
        );
      } else {
        for (const opt of group.options) {
          items.push(this.renderOption(opt, flatIdx++, atLimit));
        }
      }
    }

    return items;
  }

  // ── Render ────────────────────────────────────────────────────────────────

  /**
   * @slot - Default slot. io-option and io-optgroup children parsed at load time to build the option list.
   * @slot description - Helper text content (rich HTML). Replaces `helperText` when present.
   */
  render() {
    const {
      label,
      required,
      disabled,
      state,
      message,
      helperText,
      description,
      isOpen,
      activeIndex,
      filterQuery,
      faceInvalid,
      hideLabel,
      hasDescriptionSlot,
    } = this;

    const showError = state === 'error' || faceInvalid;
    const showSuccess = state === 'success' && !showError;
    const showWarning = state === 'warning' && !showError;

    const messageClass = [
      'multi-select-message',
      showError ? 'multi-select-message--error' : '',
      showSuccess ? 'multi-select-message--success' : '',
      showWarning ? 'multi-select-message--warning' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const fieldId = this.fieldId;
    const labelId = `${fieldId}-label`;
    const triggerId = `${fieldId}-trigger`;
    const listboxId = `${fieldId}-listbox`;
    const messageId = `${fieldId}-message`;
    const descriptionId = `${fieldId}-description`;

    const activeOptId =
      activeIndex >= 0 ? getMultiSelectOptionId(listboxId, activeIndex) : undefined;

    const opts = this.filteredOptions;
    const selectedValues = this.value ?? [];

    const displayText = getMultiSelectDisplayText(
      selectedValues,
      this.flatOptions,
      this.maxDisplay,
    );

    // Build aria-label for trigger when selection exists (e.g. "2 selected: Netherlands, Belgium")
    const selectedLabels = selectedValues
      .map(v => this.flatOptions.find(o => o.value === v)?.label ?? String(v));
    const triggerAriaLabel = hideLabel && label
      ? label
      : selectedValues.length > 0
        ? `${label}: ${selectedLabels.join(', ')}`
        : undefined;

    const faceErrorId = `${fieldId}-face-error`;
    const showFaceError = faceInvalid && state !== 'error' && !message;

    // maxSelections helper text: "X of Y selected"
    const showMaxHelper = this.maxSelections !== undefined && selectedValues.length > 0;
    const maxHelperId = `${fieldId}-max-helper`;

    const describedByParts = [
      message ? messageId : '',
      showFaceError ? faceErrorId : '',
      description ? descriptionId : '',
      showMaxHelper ? maxHelperId : '',
    ].filter(Boolean);
    const describedBy = describedByParts.length > 0 ? describedByParts.join(' ') : undefined;

    const wrapperClass = getMultiSelectWrapperClass(
      showError ? 'error' : showSuccess ? 'success' : showWarning ? 'warning' : 'none',
      disabled,
    );

    // showDescription: show helperText/description slot when not in error state
    const showDescription = !showError && (hasDescriptionSlot || helperText);

    return (
      <Host>
        <style>{getMultiSelectStyles()}</style>
        {/* Hidden slot — io-option/io-optgroup children parsed in componentDidLoad */}
        <slot onSlotchange={() => {
          const parsed = parseMultiSelectContent(this.el);
          this.groups = parsed.groups;
          this.flatOptions = parsed.flatOptions;
        }} />

        <div class={wrapperClass}>
          {/* Label — hidden via conditional render when hideLabel=true */}
          {!hideLabel && (
            <label id={labelId} class="multi-select-label">
              {label}
              {required && (
                <span class="multi-select-required" aria-hidden="true">
                  {' *'}
                </span>
              )}
            </label>
          )}

          {/* Selected chips — rendered outside the combobox trigger to preserve valid ARIA structure.
              Remove buttons use tabIndex=-1 so they are not in the sequential tab order;
              chip removal is accessible via the trigger's Backspace handler (removes last chip)
              or by mouse-clicking the × button. Screen readers hear the chip list via the
              trigger's aria-label which includes the selected count. */}
          {selectedValues.length > 0 && (
            <div class="multi-select-chips" role="group" aria-label="Selected options" aria-live="polite" aria-atomic="false">
              {selectedValues.map(v => {
                const chipLabel = this.flatOptions.find(o => o.value === v)?.label ?? String(v);
                return (
                  <span key={String(v)} class="multi-select-chip">
                    <span class="multi-select-chip__label" title={chipLabel}>
                      {chipLabel}
                    </span>
                    <button
                      type="button"
                      class="multi-select-chip__remove"
                      aria-label={`Remove ${chipLabel}`}
                      tabIndex={-1}
                      onClick={e => {
                        e.stopPropagation();
                        this.removeChip(v);
                        // Return focus to trigger after chip removal
                        setTimeout(() => this.triggerEl?.focus(), 0);
                      }}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M1.5 1.5l7 7M8.5 1.5l-7 7"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </svg>
                    </button>
                  </span>
                );
              })}
            </div>
          )}

          {/* Trigger button */}
          <button
            type="button"
            id={triggerId}
            ref={el => {
              this.triggerEl = el as HTMLButtonElement;
            }}
            class="multi-select-trigger"
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={String(isOpen)}
            aria-labelledby={hideLabel ? undefined : labelId}
            aria-label={triggerAriaLabel}
            aria-controls={listboxId}
            aria-activedescendant={activeOptId}
            aria-required={required ? 'true' : undefined}
            aria-invalid={(showError) ? 'true' : undefined}
            aria-describedby={describedBy}
            disabled={disabled}
            onClick={this.handleTriggerClick}
            onKeyDown={this.handleTriggerKeyDown}
            onBlur={this.handleTriggerBlur}
          >
            <span class="multi-select-trigger__text">
              {displayText ?? (
                <span class="multi-select-trigger__placeholder">{this.placeholder}</span>
              )}
            </span>
            {/* Inline clear button — visible when selection is non-empty and not disabled (#1111) */}
            {selectedValues.length > 0 && !disabled && (
              <button
                type="button"
                class="multi-select-trigger__clear"
                aria-label="Clear selection"
                onClick={e => {
                  e.stopPropagation();
                  this.clearAll();
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M4 4l8 8M12 4l-8 8"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            )}
            <span class="multi-select-trigger__chevron" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M4 6l4 4 4-4"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </button>

          {/* Dropdown */}
          <div
            ref={el => {
              this.dropdownEl = el as HTMLDivElement;
            }}
            class="multi-select-dropdown"
            data-open={isOpen ? 'true' : undefined}
            {...(this.hasPopoverSupport ? { popover: 'manual' } : {})}
          >
            {/* Filter input */}
            {this.filter && (
              <div class="multi-select-filter">
                <input
                  ref={el => {
                    this.filterInputEl = el as HTMLInputElement;
                  }}
                  type="text"
                  class="multi-select-filter__input"
                  aria-label="Filter options"
                  aria-autocomplete="list"
                  aria-controls={listboxId}
                  aria-activedescendant={activeOptId}
                  value={filterQuery}
                  onInput={this.handleFilterInput}
                  onKeyDown={this.handleFilterKeyDown}
                />
              </div>
            )}

            {/* Listbox */}
            <ul
              id={listboxId}
              role="listbox"
              aria-labelledby={hideLabel ? undefined : labelId}
              aria-label={hideLabel && label ? label : undefined}
              aria-multiselectable="true"
              class="multi-select-listbox"
            >
              {this.renderListboxItems()}
              {opts.length === 0 && (
                <li class="multi-select-empty" role="option" aria-disabled="true">
                  No options
                </li>
              )}
            </ul>

            {/* Footer: select all + clear all + limit helper (#1069, #1070) */}
            {(selectedValues.length > 0 || this.selectAll) && (
              <div class="multi-select-footer">
                {this.selectAll && (
                  <button
                    type="button"
                    class="multi-select-select-all-btn"
                    aria-label={`Select all ${this.label} options`}
                    onClick={() => this.selectAllVisible()}
                  >
                    Select all
                  </button>
                )}
                {selectedValues.length > 0 && (
                  <button
                    type="button"
                    class="multi-select-clear-btn"
                    aria-label={`Clear all ${this.label} selections`}
                    onClick={() => this.clearAll()}
                  >
                    Clear all
                  </button>
                )}
              </div>
            )}
            {/* maxSelections helper text */}
            {this.maxSelections !== undefined && selectedValues.length > 0 && (
              <div class="multi-select-limit-text" aria-live="polite" aria-atomic="true">
                {selectedValues.length} of {this.maxSelections} selected
              </div>
            )}
          </div>
        </div>

        {/* Message (error / success / warning / helper) */}
        {message && (
          <p id={messageId} class={messageClass} role={showError ? 'alert' : 'status'}>
            {message}
          </p>
        )}

        {/* FACE error (when faceInvalid but no state='error' and no message) */}
        {showFaceError && (
          <p id={faceErrorId} class="multi-select-message multi-select-message--error" role="alert">
            Please select at least one option
          </p>
        )}

        {/* Helper text / description slot — hidden in error state */}
        {showDescription && (
          <span class="multi-select-description">
            <span class={hasDescriptionSlot ? 'multi-select-description__slot' : 'multi-select-description__slot multi-select-description__slot--hidden'}>
              <slot name="description" onSlotchange={this.handleDescriptionSlotChange} />
            </span>
            {!hasDescriptionSlot && helperText}
          </span>
        )}
        {!showDescription && (
          <span class="multi-select-description__slot multi-select-description__slot--hidden" aria-hidden="true">
            <slot name="description" onSlotchange={this.handleDescriptionSlotChange} />
          </span>
        )}

        {/* Persistent description — always visible */}
        {description && (
          <p id={descriptionId} class="multi-select-description multi-select-description--persistent">
            {description}
          </p>
        )}

        {/* maxSelections helper text: "X of Y selected" */}
        {showMaxHelper && (
          <p id={maxHelperId} class="multi-select-message multi-select-message--limit" aria-live="polite">
            {selectedValues.length} of {this.maxSelections} selected
          </p>
        )}
      </Host>
    );
  }
}
