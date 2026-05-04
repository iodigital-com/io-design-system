import { Component, Prop, State, Watch, Event, EventEmitter, Method, Element, Host, AttachInternals, h } from '@stencil/core';
import { computePosition } from '@floating-ui/dom';

import { getSelectStyles } from './io-select-styles';
import {
  resolveSelectId,
  getSelectWrapperClass,
  getComboboxMiddleware,
  getComboboxOptionId,
  getComboboxWrapperClass,
  getComboboxOptionClass,
  parseSelectContent,
} from './io-select-utils';

import type { IoSelectOption, IoSelectOptionGroup, IoSelectSize } from './types';

/**
 * io-select
 * ==========
 * Styled native select with floating label — companion to io-input.
 * With `custom` prop: switches to a fully accessible ARIA combobox/listbox.
 *
 * Options are defined as slotted `<io-option>` children. Groups are wrapped
 * in `<io-optgroup>` elements.
 *
 * @example
 * <io-select label="Country">
 *   <io-option value="nl" label="Netherlands"></io-option>
 *   <io-option value="be" label="Belgium"></io-option>
 * </io-select>
 *
 * <io-select label="Assign to" custom multiple filter>
 *   <io-optgroup label="Leadership">
 *     <io-option value="alice" label="Alice Smith"></io-option>
 *   </io-optgroup>
 * </io-select>
 */
@Component({
  tag: 'io-select',
  shadow: { delegatesFocus: true },
  formAssociated: true,
})
export class IoSelect {
  @Element() el!: HTMLElement;
  @AttachInternals() internals!: ElementInternals;

  // ── Props ─────────────────────────────────────────────────────

  /** Label text — required for accessibility */
  @Prop() label!: string;

  /** Input name */
  @Prop() name: string | undefined;

  /** Selected value (single mode) */
  @Prop({ mutable: true }) value = '';

  /** Field size aligned to io-button scale */
  @Prop({ reflect: true }) size: IoSelectSize = 'md';

  /** Placeholder option shown when no value is selected */
  @Prop() placeholder: string | undefined;

  /** Marks the field as required */
  @Prop() required = false;

  /** Disables the select */
  @Prop({ reflect: true }) disabled = false;

  /** Puts the select in error state */
  @Prop({ reflect: true }) error = false;

  /** Error message shown below */
  @Prop() errorMessage: string | undefined;

  /** Helper text shown below (replaced by error when error=true) */
  @Prop() helperText: string | undefined;

  /** Switches to ARIA combobox/listbox implementation */
  @Prop({ reflect: true }) custom = false;

  /** Multi-value selection (custom mode only) */
  @Prop() multiple = false;

  /** Adds a search input inside the dropdown (custom mode only) */
  @Prop() filter = false;

  // ── State ─────────────────────────────────────────────────────

  /** Parsed option groups — drives rendering in both modes */
  @State() private groups: IoSelectOptionGroup[] = [];

  /** Flat ordered option list — drives keyboard navigation, filtering, display value */
  @State() private flatOptions: IoSelectOption[] = [];

  // ── State (custom mode) ───────────────────────────────────────

  @State() private isOpen = false;
  @State() private activeIndex = -1;
  @State() private filterQuery = '';
  @State() private selectedValues: string[] = [];

  // ── Events ────────────────────────────────────────────────────

  /** Fires when the selected value changes. */
  @Event() change!: EventEmitter<string | string[]>;

  /** Fires when the select gains focus */
  @Event() focus!: EventEmitter<FocusEvent>;

  /** Fires when the select loses focus */
  @Event() blur!: EventEmitter<FocusEvent>;

  // ── Methods ───────────────────────────────────────────────────

  /** Check validity without showing browser validation UI. Returns true if valid. */
  @Method()
  async checkValidity(): Promise<boolean> {
    return this.internals?.checkValidity() ?? true;
  }

  /** Check validity and show browser validation UI if invalid. Returns true if valid. */
  @Method()
  async reportValidity(): Promise<boolean> {
    return this.internals?.reportValidity() ?? true;
  }

  /** Programmatically move focus to the select */
  @Method()
  async setFocus(options?: FocusOptions): Promise<void> {
    if (this.custom) {
      this.triggerEl?.focus(options);
    } else {
      const select = this.el.shadowRoot?.querySelector<HTMLSelectElement>('select');
      select?.focus(options);
    }
  }

  // ── Private fields ────────────────────────────────────────────

  private fallbackId!: string;
  private fieldId!: string;
  private triggerEl?: HTMLButtonElement;
  private dropdownEl?: HTMLDivElement;
  private filterInputEl?: HTMLInputElement;
  private clickOutsideHandler?: (ev: PointerEvent) => void;
  private lateParseTimeout: ReturnType<typeof setTimeout> | undefined;

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    this.fallbackId = Math.random().toString(36).slice(2);
    this.fieldId = resolveSelectId(this.name, this.fallbackId);
    this.syncFormValue();
  }

  @Watch('value')
  onValueChange() {
    if (!this.multiple) this.syncFormValue();
  }

  @Watch('selectedValues')
  onSelectedValuesChange() {
    if (this.multiple) this.syncFormValue();
  }

  private syncFormValue() {
    if (this.multiple) {
      // Use FormData to submit multiple values under the same name
      if (this.selectedValues.length === 0) {
        this.internals?.setFormValue(null);
      } else {
        const fd = new FormData();
        const key = this.name ?? this.fieldId;
        this.selectedValues.forEach(v => fd.append(key, v));
        this.internals?.setFormValue(fd);
      }
    } else {
      this.internals?.setFormValue(this.value ?? '');
    }
    if (this.required && (this.multiple ? this.selectedValues.length === 0 : !this.value)) {
      this.internals?.setValidity({ valueMissing: true }, 'Please select an option');
    } else {
      this.internals?.setValidity({});
    }
  }

  componentDidLoad() {
    const parsed = parseSelectContent(this.el);
    this.groups = parsed.groups;
    this.flatOptions = parsed.flatOptions;

    // Guard against the SSR/hydration race: when Stencil's beforeInteractive script
    // upgrades elements before React has run, <io-option> children have no value
    // property yet (React ref callbacks haven't fired). Re-parse after one macro-task
    // tick to give React time to commit and fire its ref callbacks.
    if (this.flatOptions.length === 0 && this.el.children.length > 0) {
      this.lateParseTimeout = setTimeout(() => {
        const late = parseSelectContent(this.el);
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

  // ── Watchers ─────────────────────────────────────────────────

  @Watch('isOpen')
  onIsOpenChange(newVal: boolean) {
    if (newVal) {
      this.attachClickOutside();
      void this.positionDropdown();
      if (this.filter) {
        setTimeout(() => this.filterInputEl?.focus(), 0);
      } else {
        const firstSelected = this.multiple
          ? this.filteredOptions.findIndex(o => this.selectedValues.includes(o.value))
          : this.filteredOptions.findIndex(o => o.value === this.value);
        // Fall back to the first enabled option so aria-activedescendant never
        // points to a disabled option on initial open.
        const firstEnabled = this.filteredOptions.findIndex(o => !o.disabled);
        this.activeIndex = firstSelected >= 0 ? firstSelected : Math.max(firstEnabled, -1);
      }
    } else {
      this.removeClickOutside();
      this.activeIndex = -1;
      this.filterQuery = '';
      setTimeout(() => this.triggerEl?.focus(), 0);
    }
  }

  // ── Computed ──────────────────────────────────────────────────

  private get filteredOptions(): IoSelectOption[] {
    if (!this.filter || !this.filterQuery) return this.flatOptions;
    const q = this.filterQuery.toLowerCase();
    return this.flatOptions.filter(o => o.label.toLowerCase().includes(q));
  }

  private get displayValue(): string {
    if (this.multiple) {
      if (this.selectedValues.length === 0) return '';
      if (this.selectedValues.length === 1) {
        return this.flatOptions.find(o => o.value === this.selectedValues[0])?.label ?? this.selectedValues[0];
      }
      return `${this.selectedValues.length} selected`;
    }
    // Return '' when no value is matched so the placeholder span in the trigger
    // template is reached via the falsy branch (|| <span class="...placeholder">).
    return this.flatOptions.find(o => o.value === this.value)?.label ?? '';
  }

  private isSelected(value: string): boolean {
    return this.multiple ? this.selectedValues.includes(value) : this.value === value;
  }

  // ── Private helpers ───────────────────────────────────────────

  private async positionDropdown(): Promise<void> {
    if (!this.triggerEl || !this.dropdownEl) return;
    const { x, y } = await computePosition(this.triggerEl, this.dropdownEl, {
      middleware: getComboboxMiddleware(),
      placement: 'bottom-start',
      strategy: 'absolute',
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

  private selectOption(opt: IoSelectOption) {
    if (opt.disabled) return;
    if (this.multiple) {
      if (this.selectedValues.includes(opt.value)) {
        this.selectedValues = this.selectedValues.filter(v => v !== opt.value);
      } else {
        this.selectedValues = [...this.selectedValues, opt.value];
      }
      this.change.emit([...this.selectedValues]);
      // keep dropdown open in multiple mode
    } else {
      this.value = opt.value;
      this.change.emit(this.value);
      this.isOpen = false;
    }
  }

  private moveActive(delta: number) {
    const opts = this.filteredOptions;
    if (opts.length === 0) return;
    let next = this.activeIndex + delta;
    if (next < 0) next = opts.length - 1;
    if (next >= opts.length) next = 0;
    // skip disabled
    let attempts = opts.length;
    while (opts[next]?.disabled && attempts-- > 0) {
      next = next + delta;
      if (next < 0) next = opts.length - 1;
      if (next >= opts.length) next = 0;
    }
    if (!opts[next]?.disabled) {
      this.activeIndex = next;
    }
  }

  // ── Handlers (native mode) ────────────────────────────────────

  private handleChange = (ev: Event) => {
    if (this.disabled) return;
    this.value = (ev.target as HTMLSelectElement).value;
    this.change.emit(this.value);
  };

  private handleFocus = (ev: FocusEvent) => {
    if (this.disabled) return;
    this.focus.emit(ev);
  };

  private handleBlur = (ev: FocusEvent) => {
    if (this.disabled) return;
    this.blur.emit(ev);
  };

  // ── Handlers (combobox mode) ──────────────────────────────────

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
      case 'Home':
        ev.preventDefault();
        this.activeIndex = this.filteredOptions.findIndex(o => !o.disabled);
        break;
      case 'End': {
        ev.preventDefault();
        const opts = this.filteredOptions;
        for (let i = opts.length - 1; i >= 0; i--) {
          if (!opts[i].disabled) { this.activeIndex = i; break; }
        }
        break;
      }
      case 'Enter':
      case ' ': {
        ev.preventDefault();
        const opt = this.filteredOptions[this.activeIndex];
        if (opt) this.selectOption(opt);
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
        if (opt) this.selectOption(opt);
        break;
      }
    }
  };

  // ── Render helpers ────────────────────────────────────────────

  private renderComboboxOption(opt: IoSelectOption, flatIndex: number) {
    const sel = this.isSelected(opt.value);
    const { multiple, activeIndex } = this;
    const listboxId = `${this.fieldId}-listbox`;
    return (
      <li
        key={opt.value}
        id={getComboboxOptionId(listboxId, flatIndex)}
        role="option"
        aria-selected={String(sel)}
        aria-disabled={opt.disabled ? 'true' : undefined}
        aria-checked={multiple ? String(sel) : undefined}
        class={getComboboxOptionClass(sel, opt.disabled ?? false, flatIndex === activeIndex, multiple)}
        onClick={opt.disabled ? undefined : () => this.selectOption(opt)}
      >
        {multiple && (
          <span class="combobox-option__checkbox" aria-hidden="true">
            {sel && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            )}
          </span>
        )}
        <span class="combobox-option__label">{opt.label}</span>
        {!multiple && sel && (
          <span class="combobox-option__check" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7l3 3 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        )}
      </li>
    );
  }

  private renderListboxItems() {
    const isFiltering = this.filter && this.filterQuery.length > 0;

    if (isFiltering) {
      // Flat list when actively filtering — group headers would be confusing mid-search
      return this.filteredOptions.map((opt, i) => this.renderComboboxOption(opt, i));
    }

    // Grouped rendering: walk groups in DOM order; use flatOptions index for ARIA
    const items: ReturnType<typeof this.renderComboboxOption>[] = [];
    let flatIdx = 0;

    for (const group of this.groups) {
      if (group.label) {
        const groupHeadingId = `${this.fieldId}-group-${flatIdx}`;
        const groupItems = group.options.map(opt => {
          const el = this.renderComboboxOption(opt, flatIdx++);
          return el;
        });
        items.push(
          <li role="presentation" class="combobox-group">
            <span id={groupHeadingId} class="combobox-group__label" aria-hidden="true">{group.label}</span>
            {groupItems}
          </li>
        );
      } else {
        for (const opt of group.options) {
          items.push(this.renderComboboxOption(opt, flatIdx++));
        }
      }
    }

    return items;
  }

  // ── Render ───────────────────────────────────────────────────

  render() {
    if (this.custom) {
      return this.renderCombobox();
    }
    return this.renderNativeSelect();
  }

  private renderNativeSelect() {
    const { label, name, value, placeholder, required, disabled, error, errorMessage, helperText, size, groups } = this;
    const selectId = this.fieldId;
    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;
    const describedBy = [
      error && errorMessage ? errorId : '',
      !error && helperText ? helperId : '',
    ].filter(Boolean).join(' ') || undefined;

    return (
      <Host>
        <style>{getSelectStyles()}</style>
        {/* Hidden slot — io-option/io-optgroup children are parsed in componentDidLoad
            and rendered as internal <option>/<optgroup> elements. The originals are
            visually hidden so the native select controls the displayed value. */}
        <slot />
        <div class={getSelectWrapperClass(error, disabled)}>
          <select
            id={selectId}
            class={`select-field select-field--${size}`}
            name={name}
            disabled={disabled}
            required={required}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={describedBy}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          >
            {placeholder && (
              <option value="" disabled selected={value === ''}>{placeholder}</option>
            )}
            {groups.map(group =>
              group.label
                ? (
                  <optgroup key={group.label} label={group.label} disabled={group.disabled}>
                    {group.options.map(opt => (
                      <option key={opt.value} value={opt.value} disabled={opt.disabled} selected={opt.value === value}>
                        {opt.label}
                      </option>
                    ))}
                  </optgroup>
                )
                : group.options.map(opt => (
                  <option key={opt.value} value={opt.value} disabled={opt.disabled} selected={opt.value === value}>
                    {opt.label}
                  </option>
                ))
            )}
          </select>
          <label htmlFor={selectId} class="select-label">
            {label}
            {required && <span class="select-required" aria-hidden="true">{' *'}</span>}
          </label>
          <span class="select-chevron" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </div>
        {error && errorMessage && <p id={`${selectId}-error`} class="select-error" role="alert">{errorMessage}</p>}
        {!error && helperText && <p id={`${selectId}-helper`} class="select-helper">{helperText}</p>}
      </Host>
    );
  }

  private renderCombobox() {
    const { label, required, disabled, error, errorMessage, helperText, size, isOpen, activeIndex, filterQuery } = this;
    const selectId = this.fieldId;
    const labelId = `${selectId}-label`;
    const triggerId = `${selectId}-trigger`;
    const listboxId = `${selectId}-listbox`;
    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;

    const describedBy = [
      error && errorMessage ? errorId : '',
      !error && helperText ? helperId : '',
    ].filter(Boolean).join(' ') || undefined;

    const activeOptId = activeIndex >= 0 ? getComboboxOptionId(listboxId, activeIndex) : undefined;
    const opts = this.filteredOptions;

    return (
      <Host>
        <style>{getSelectStyles()}</style>
        {/* Hidden slot — io-option/io-optgroup children are parsed and rendered
            as internal listbox items. The originals are visually hidden. */}
        <slot />
        <div class={getComboboxWrapperClass(error, disabled)}>
          <label id={labelId} class="select-label" aria-hidden="true">
            {label}
            {required && <span class="select-required" aria-hidden="true">{' *'}</span>}
          </label>

          <button
            type="button"
            id={triggerId}
            ref={el => { this.triggerEl = el as HTMLButtonElement; }}
            class={`combobox-trigger combobox-trigger--${size}`}
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={String(isOpen)}
            aria-labelledby={labelId}
            aria-controls={listboxId}
            aria-activedescendant={activeOptId}
            aria-required={required ? 'true' : undefined}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={describedBy}
            disabled={disabled}
            onClick={this.handleTriggerClick}
            onKeyDown={this.handleTriggerKeyDown}
          >
            <span class="combobox-trigger__text">{this.displayValue || <span class="combobox-trigger__placeholder">{this.placeholder}</span>}</span>
            <span class="combobox-trigger__chevron" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </button>

          <div
            ref={el => { this.dropdownEl = el as HTMLDivElement; }}
            class="combobox-dropdown"
            data-open={isOpen ? 'true' : undefined}
          >
            {this.filter && (
              <div class="combobox-filter">
                <input
                  ref={el => { this.filterInputEl = el as HTMLInputElement; }}
                  type="text"
                  class="combobox-filter__input"
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

            <ul
              id={listboxId}
              role="listbox"
              aria-labelledby={labelId}
              aria-multiselectable={this.multiple ? 'true' : undefined}
              class="combobox-listbox"
            >
              {this.renderListboxItems()}
              {opts.length === 0 && (
                <li class="combobox-empty" role="option" aria-disabled="true">No options</li>
              )}
            </ul>
          </div>
        </div>

        {error && errorMessage && <p id={errorId} class="select-error" role="alert">{errorMessage}</p>}
        {!error && helperText && <p id={helperId} class="select-helper">{helperText}</p>}
      </Host>
    );
  }
}
