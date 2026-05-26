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
  h,
} from '@stencil/core';
import { computePosition } from '@floating-ui/dom';

import { getMultiSelectStyles } from './io-multi-select-styles';
import {
  resolveMultiSelectId,
  getMultiSelectWrapperClass,
  getMultiSelectMiddleware,
  getMultiSelectOptionId,
  getMultiSelectOptionClass,
  parseMultiSelectContent,
  getMultiSelectDisplayText,
} from './io-multi-select-utils';

import type {
  IoSelectOption,
  IoSelectOptionGroup,
  IoMultiSelectDirection,
  IoMultiSelectState,
  IoMultiSelectChangeDetail,
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

  /** HTML name attribute (required for form submission) */
  @Prop() name!: string;

  /** Currently selected values. Mutable — updated internally on user selection. */
  @Prop({ mutable: true }) value: string[] = [];

  /** Placeholder shown in the trigger when nothing is selected. */
  @Prop() placeholder = 'Select options';

  /** Marks the field as required. */
  @Prop({ reflect: true }) required = false;

  /** Disables the multi-select. */
  @Prop({ reflect: true }) disabled = false;

  /**
   * Visual / validation state.
   * - 'none'    — default
   * - 'error'   — error border + red message
   * - 'success' — success border + green message
   */
  @Prop({ reflect: true }) state: IoMultiSelectState = 'none';

  /** Message text shown below the trigger (error or helper). */
  @Prop() message: string | undefined;

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

  // ── Events ────────────────────────────────────────────────────────────────

  /**
   * Fires when the selection changes.
   * Detail: `{ value: string[], name: string }`
   */
  @Event() change!: EventEmitter<IoMultiSelectChangeDetail>;

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
  private lateParseTimeout: ReturnType<typeof setTimeout> | undefined;

  // ── Lifecycle ─────────────────────────────────────────────────────────────

  componentWillLoad() {
    this.fallbackId = Math.random().toString(36).slice(2);
    this.fieldId = resolveMultiSelectId(this.name, this.fallbackId);
    this.defaultValue = [...(this.value ?? [])];
    this.syncFormValue();
  }

  componentDidLoad() {
    const parsed = parseMultiSelectContent(this.el);
    this.groups = parsed.groups;
    this.flatOptions = parsed.flatOptions;

    // SSR/hydration guard: re-parse after one tick when children not yet upgraded.
    if (this.flatOptions.length === 0 && this.el.children.length > 0) {
      this.lateParseTimeout = setTimeout(() => {
        const late = parseMultiSelectContent(this.el);
        this.groups = late.groups;
        this.flatOptions = late.flatOptions;
      }, 0);
    }
  }

  disconnectedCallback() {
    this.removeClickOutside();
    if (this.lateParseTimeout !== undefined) {
      clearTimeout(this.lateParseTimeout);
      this.lateParseTimeout = undefined;
    }
  }

  formResetCallback() {
    this.value = [...this.defaultValue];
    this.syncFormValue();
    this.faceInvalid = false;
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
    if (newVal) {
      this.attachClickOutside();
      void this.positionDropdown();

      if (this.filter) {
        setTimeout(() => this.filterInputEl?.focus(), 0);
      } else {
        const opts = this.filteredOptions;
        const firstSelected = opts.findIndex(o => (this.value ?? []).includes(o.value));
        const firstEnabled = opts.findIndex(o => !o.disabled);
        this.activeIndex = firstSelected >= 0 ? firstSelected : Math.max(firstEnabled, -1);
      }
    } else {
      this.removeClickOutside();
      this.activeIndex = -1;
      this.filterQuery = '';
      setTimeout(() => this.triggerEl?.focus(), 0);
    }
  }

  // ── FACE ──────────────────────────────────────────────────────────────────

  private syncFormValue() {
    const values = this.value ?? [];

    if (!this.name || values.length === 0) {
      this.internals?.setFormValue?.(null);
    } else {
      const fd = new FormData();
      values.forEach(v => fd.append(this.name, v));
      this.internals?.setFormValue?.(fd);
    }

    if (this.required && values.length === 0) {
      this.internals?.setValidity?.({ valueMissing: true }, 'Please select at least one option');
      this.faceInvalid = true;
    } else {
      this.internals?.setValidity?.({});
      this.faceInvalid = false;
    }
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

    const placement =
      this.dropdownDirection === 'up'
        ? 'top-start'
        : this.dropdownDirection === 'down'
          ? 'bottom-start'
          : 'bottom-start';

    const { x, y } = await computePosition(this.triggerEl, this.dropdownEl, {
      middleware: getMultiSelectMiddleware(),
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
    const next = current.includes(opt.value)
      ? current.filter(v => v !== opt.value)
      : [...current, opt.value];
    this.value = next;
    this.change.emit({ value: [...next], name: this.name });
  }

  private removeChip(value: string) {
    const next = (this.value ?? []).filter(v => v !== value);
    this.value = next;
    this.change.emit({ value: [...next], name: this.name });
  }

  private clearAll() {
    this.value = [];
    this.change.emit({ value: [], name: this.name });
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

  // ── Handlers ──────────────────────────────────────────────────────────────

  private handleTriggerClick = () => {
    if (this.disabled) return;
    this.isOpen = !this.isOpen;
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

  // ── Render helpers ────────────────────────────────────────────────────────

  private renderOption(opt: IoSelectOption, flatIndex: number) {
    const isSelected = (this.value ?? []).includes(opt.value);
    const isFocused = flatIndex === this.activeIndex;
    const listboxId = `${this.fieldId}-listbox`;

    return (
      <li
        key={opt.value}
        id={getMultiSelectOptionId(listboxId, flatIndex)}
        role="option"
        aria-selected={String(isSelected)}
        aria-disabled={opt.disabled ? 'true' : undefined}
        aria-checked={String(isSelected)}
        class={getMultiSelectOptionClass(isSelected, opt.disabled ?? false, isFocused)}
        onClick={opt.disabled ? undefined : () => this.toggleOption(opt)}
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
        <span class="multi-select-option__label">{opt.label}</span>
      </li>
    );
  }

  private renderListboxItems() {
    const isFiltering = this.filter && this.filterQuery.length > 0;

    if (isFiltering) {
      return this.filteredOptions.map((opt, i) => this.renderOption(opt, i));
    }

    const items: ReturnType<typeof this.renderOption>[] = [];
    let flatIdx = 0;

    for (const group of this.groups) {
      if (group.label) {
        const groupId = `${this.fieldId}-group-${flatIdx}`;
        const groupItems = group.options.map(opt => {
          const el = this.renderOption(opt, flatIdx++);
          return el;
        });
        items.push(
          <li role="presentation" class="multi-select-group">
            <span id={groupId} class="multi-select-group__label" aria-hidden="true">
              {group.label}
            </span>
            {groupItems}
          </li>,
        );
      } else {
        for (const opt of group.options) {
          items.push(this.renderOption(opt, flatIdx++));
        }
      }
    }

    return items;
  }

  // ── Render ────────────────────────────────────────────────────────────────

  render() {
    const {
      label,
      required,
      disabled,
      state,
      message,
      isOpen,
      activeIndex,
      filterQuery,
      faceInvalid,
    } = this;

    const showError = state === 'error' || faceInvalid;
    const showSuccess = state === 'success' && !showError;
    const messageClass = [
      'multi-select-message',
      showError ? 'multi-select-message--error' : '',
      showSuccess ? 'multi-select-message--success' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const fieldId = this.fieldId;
    const labelId = `${fieldId}-label`;
    const triggerId = `${fieldId}-trigger`;
    const listboxId = `${fieldId}-listbox`;
    const messageId = `${fieldId}-message`;

    const activeOptId =
      activeIndex >= 0 ? getMultiSelectOptionId(listboxId, activeIndex) : undefined;

    const opts = this.filteredOptions;
    const selectedValues = this.value ?? [];

    const displayText = getMultiSelectDisplayText(
      selectedValues,
      this.flatOptions,
      this.maxDisplay,
    );

    const describedBy = message ? messageId : undefined;
    const wrapperClass = getMultiSelectWrapperClass(
      showError ? 'error' : showSuccess ? 'success' : 'none',
      disabled,
    );

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
          {/* Label */}
          <label id={labelId} class="multi-select-label" aria-hidden="true">
            {label}
            {required && (
              <span class="multi-select-required" aria-hidden="true">
                {' *'}
              </span>
            )}
          </label>

          {/* Selected chips */}
          {selectedValues.length > 0 && (
            <div class="multi-select-chips" aria-label="Selected options">
              {selectedValues.map(v => {
                const chipLabel = this.flatOptions.find(o => o.value === v)?.label ?? v;
                return (
                  <span key={v} class="multi-select-chip">
                    <span class="multi-select-chip__label" title={chipLabel}>
                      {chipLabel}
                    </span>
                    <button
                      type="button"
                      class="multi-select-chip__remove"
                      aria-label={`Remove ${chipLabel}`}
                      onClick={e => {
                        e.stopPropagation();
                        this.removeChip(v);
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
            aria-labelledby={labelId}
            aria-controls={listboxId}
            aria-activedescendant={activeOptId}
            aria-required={required ? 'true' : undefined}
            aria-invalid={(showError) ? 'true' : undefined}
            aria-describedby={describedBy}
            disabled={disabled}
            onClick={this.handleTriggerClick}
            onKeyDown={this.handleTriggerKeyDown}
          >
            <span class="multi-select-trigger__text">
              {displayText ?? (
                <span class="multi-select-trigger__placeholder">{this.placeholder}</span>
              )}
            </span>
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
              aria-labelledby={labelId}
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

            {/* Footer clear all */}
            {selectedValues.length > 0 && (
              <div class="multi-select-footer">
                <button
                  type="button"
                  class="multi-select-clear-btn"
                  onClick={() => this.clearAll()}
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Message (error / success / helper) */}
        {message && (
          <p id={messageId} class={messageClass} role={showError ? 'alert' : undefined}>
            {message}
          </p>
        )}

        {/* FACE error (when faceInvalid but no state='error' and no message) */}
        {faceInvalid && state !== 'error' && !message && (
          <p id={`${fieldId}-face-error`} class="multi-select-message multi-select-message--error" role="alert">
            Please select at least one option
          </p>
        )}
      </Host>
    );
  }
}
