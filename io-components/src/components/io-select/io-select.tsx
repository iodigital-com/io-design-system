import { Component, Prop, State, Watch, Event, EventEmitter, Method, Element, Host, h } from '@stencil/core';
import { computePosition } from '@floating-ui/dom';

import { getSelectStyles } from './io-select-styles';
import { resolveSelectId, getSelectWrapperClass, getComboboxMiddleware, getComboboxOptionId, getComboboxWrapperClass, getComboboxOptionClass } from './io-select-utils';

import type { IoSelectOption, IoSelectSize } from './types';

/**
 * io-select
 * ==========
 * Styled native select with floating label — companion to io-input.
 * With `custom` prop: switches to a fully accessible ARIA combobox/listbox.
 *
 * @example
 * <io-select label="Country" :options="[{ label: 'Netherlands', value: 'nl' }]" />
 * <io-select label="Assign to" custom multiple filter :options="myOptions" />
 */
@Component({
  tag: 'io-select',
  shadow: { delegatesFocus: true },
})
export class IoSelect {
  @Element() el!: HTMLElement;

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

  /** List of options */
  @Prop() options: IoSelectOption[] = [];

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

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    this.fallbackId = Math.random().toString(36).slice(2);
    this.fieldId = resolveSelectId(this.name, this.fallbackId);
  }

  disconnectedCallback() {
    this.removeClickOutside();
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
        this.activeIndex = firstSelected >= 0 ? firstSelected : 0;
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
    if (!this.filter || !this.filterQuery) return this.options;
    const q = this.filterQuery.toLowerCase();
    return this.options.filter(o => o.label.toLowerCase().includes(q));
  }

  private get displayValue(): string {
    if (this.multiple) {
      if (this.selectedValues.length === 0) return this.placeholder ?? '';
      if (this.selectedValues.length === 1) {
        return this.options.find(o => o.value === this.selectedValues[0])?.label ?? this.selectedValues[0];
      }
      return `${this.selectedValues.length} selected`;
    }
    return this.options.find(o => o.value === this.value)?.label ?? this.placeholder ?? '';
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

  // ── Render ───────────────────────────────────────────────────

  render() {
    if (this.custom) {
      return this.renderCombobox();
    }
    return this.renderNativeSelect();
  }

  private renderNativeSelect() {
    const { label, name, value, placeholder, options, required, disabled, error, errorMessage, helperText, size } = this;
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
            {options.map(opt => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled} selected={opt.value === value}>
                {opt.label}
              </option>
            ))}
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
              {opts.map((opt, i) => {
                const sel = this.isSelected(opt.value);
                return (
                  <li
                    key={opt.value}
                    id={getComboboxOptionId(listboxId, i)}
                    role="option"
                    aria-selected={String(sel)}
                    aria-disabled={opt.disabled ? 'true' : undefined}
                    aria-checked={this.multiple ? String(sel) : undefined}
                    class={getComboboxOptionClass(sel, opt.disabled ?? false, i === activeIndex, this.multiple)}
                    onClick={opt.disabled ? undefined : () => this.selectOption(opt)}
                  >
                    {this.multiple && (
                      <span class="combobox-option__checkbox" aria-hidden="true">
                        {sel && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                        )}
                      </span>
                    )}
                    <span class="combobox-option__label">{opt.label}</span>
                    {!this.multiple && sel && (
                      <span class="combobox-option__check" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M2.5 7l3 3 6-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                      </span>
                    )}
                  </li>
                );
              })}
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
