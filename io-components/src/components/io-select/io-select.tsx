import { Component, Prop, State, Watch, Event, EventEmitter, Method, Element, Host, AttachInternals, Listen, h } from '@stencil/core';
import { computePosition, autoUpdate } from '@floating-ui/dom';

import { getSelectStyles } from './io-select-styles';
import {
  resolveSelectId,
  getSelectWrapperClass,
  getComboboxMiddleware,
  getComboboxOptionId,
  getComboboxWrapperClass,
  getComboboxOptionClass,
  parseSelectContent,
  getMatchingOptionIndex,
} from './io-select-utils';
import { applyAriaProp } from '../../utils/aria-prop';
import { syncFormState } from '../../utils/form/sync-form-state';
import { Required } from '../common/required/Required';
import { StateMessage } from '../common/state-message/StateMessage';

import type { IoIconName } from '../../utils/icons';
import type { IoFieldState } from '../../utils/field-state';
import type { IoSelectOption, IoSelectOptionGroup, IoSelectSize, IoSelectChangeDetail, IoSelectToggleDetail } from './types';

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
 *
 * @deprecated The `multiple` + `custom` mode on io-select is deprecated as of v2.x.
 *   Migrate to `io-multi-select` for dedicated multi-value selection with removable chips,
 *   optional search filter, and full FACE form participation.
 *   The single-select native and custom modes are NOT deprecated.
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

  /**
   * Selected value (single mode).
   * Accepts string or number. Numeric values are preserved in the `change` event
   * but serialised to string by the browser's FormData API on form submission.
   */
  @Prop({ mutable: true }) value: string | number | null = '';

  /** Field size aligned to io-button scale */
  @Prop({ reflect: true }) size: IoSelectSize = 'md';

  /** Placeholder option shown when no value is selected */
  @Prop() placeholder: string | undefined;

  /** Marks the field as required */
  @Prop() required = false;

  /** Disables the select */
  @Prop({ mutable: true, reflect: true }) disabled = false;

  /** Validation state — controls border color, icon, and message color */
  @Prop({ reflect: true }) state: IoFieldState = 'none';

  /** Validation message shown below (used for error, success, and warning states) */
  @Prop() message = '';

  /** Helper text shown below (replaced by error when error=true) */
  @Prop() helperText: string | undefined;

  /** Switches to ARIA combobox/listbox implementation */
  @Prop({ reflect: true }) custom = false;

  /** Multi-value selection (custom mode only) */
  @Prop() multiple = false;

  /** Adds a search input inside the dropdown (custom mode only) */
  @Prop() filter = false;

  /**
   * Custom ARIA attributes to inject onto the trigger element.
   * In native mode, applies to the `<select>` element.
   * In custom (combobox) mode, applies to the `<button>` trigger.
   * Keys may omit or include the `aria-` prefix — both forms are accepted.
   *
   * @example
   * // Sets aria-controls="description-panel" on the native <select>
   * <io-select .aria={{ controls: 'description-panel' }} label="Role" />
   */
  @Prop() aria?: Record<string, string>;

  /** Shows a loading spinner replacing the chevron and disables interaction */
  @Prop({ reflect: true }) loading = false;

  /** Associates this field with a <form> element by ID — enables out-of-DOM form participation */
  @Prop({ reflect: true }) form?: string;

  /** Visually hides the label while keeping it accessible to screen readers */
  @Prop({ reflect: true }) hideLabel = false;

  /**
   * Supplementary description rendered as a persistent `<p>` below the field.
   * Distinct from `helperText` (which is hidden in error state) and from the
   * `slot="description"` slot (which accepts rich HTML content) — use this prop
   * for plain-text contextual guidance that always remains visible.
   */
  @Prop() description: string | undefined;

  // ── State ─────────────────────────────────────────────────────

  /** Tracks FACE form validation invalidity; drives aria-invalid and error UI once field has been touched */
  @State() faceInvalid = false;

  /** True after the user has blurred the field at least once — gates eager FACE error display */
  @State() private touched = false;

  @State() private hasLabelSlot = false;
  @State() private hasDescriptionSlot = false;
  @State() private hasMessageSlot = false;
  @State() private hasSelectedSlot = false;

  @State() private descriptionId = '';

  /** Parsed option groups — drives rendering in both modes */
  @State() private groups: IoSelectOptionGroup[] = [];

  /** Flat ordered option list — drives keyboard navigation, filtering, display value */
  @State() private flatOptions: IoSelectOption[] = [];

  // ── State (custom mode) ───────────────────────────────────────

  @State() private isOpen = false;
  @State() private activeIndex = -1;
  @State() private filterQuery = '';
  @State() private selectedValues: (string | number)[] = [];

  // ── Events ────────────────────────────────────────────────────

  /** Fires when the selected value changes. */
  @Event({ bubbles: true, composed: true }) change!: EventEmitter<IoSelectChangeDetail>;

  /** Fires when the select gains focus */
  @Event({ bubbles: false, composed: false }) focus!: EventEmitter<FocusEvent>;

  /** Fires when the select loses focus */
  @Event({ bubbles: false, composed: false }) blur!: EventEmitter<FocusEvent>;

  /** Fires when the custom-mode dropdown opens or closes. Not emitted in native mode. */
  @Event({ bubbles: false }) toggle!: EventEmitter<IoSelectToggleDetail>;

  // ── Methods ───────────────────────────────────────────────────

  /** Check validity without showing browser validation UI. Returns true if valid. */
  @Method()
  async checkValidity(): Promise<boolean> {
    return this.internals?.checkValidity?.() ?? true;
  }

  /** Check validity and show browser validation UI if invalid. Returns true if valid. */
  @Method()
  async reportValidity(): Promise<boolean> {
    // Force touched so FACE error UI surfaces even before the user has blurred
    // the field — matches native <select> behaviour where reportValidity() always
    // shows the validation state regardless of interaction history.
    this.touched = true;
    this.syncFormValue();
    return this.internals?.reportValidity?.() ?? true;
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
  private defaultValue: string | number | null = '';
  private defaultSelectedValues: (string | number)[] = [];
  private nativeSelectEl?: HTMLSelectElement;
  private triggerEl?: HTMLButtonElement;
  private dropdownEl?: HTMLDivElement;
  private filterInputEl?: HTMLInputElement;
  private clickOutsideHandler?: (ev: PointerEvent) => void;
  /** Typeahead: buffered key presses cleared after TYPEAHEAD_TIMEOUT ms of inactivity */
  private typeaheadBuffer = '';
  private typeaheadTimer: ReturnType<typeof setTimeout> | undefined;
  /** autoUpdate cleanup function for popover positioning */
  private autoUpdateCleanup?: () => void;
  /** True when browser supports native Popover API */
  private readonly hasPopoverSupport = typeof HTMLElement !== 'undefined' && 'popover' in HTMLElement.prototype;

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    this.fallbackId = Math.random().toString(36).slice(2);
    this.fieldId = resolveSelectId(this.name, this.fallbackId);
    this.descriptionId = `io-select-desc-${this.fallbackId}`;
    this.defaultValue = this.value ?? '';
    this.defaultSelectedValues = [...this.selectedValues];
    this.syncFormValue();
    if (this.hideLabel && !this.label) {
      console.warn('[io-select] hideLabel=true requires a non-empty label for accessibility.');
    }
  }

  connectedCallback() {
    const hasLabelProp = this.label?.trim();
    const hasAriaLabel = this.el.getAttribute('aria-label')?.trim();
    const hasAriaLabelledBy = this.el.getAttribute('aria-labelledby')?.trim();
    const hasLabelSlot = !!this.el.querySelector('[slot="label"]');
    if (!hasLabelProp && !hasAriaLabel && !hasAriaLabelledBy && !hasLabelSlot) {
      console.error(`[io-select] Missing accessible label. Provide label prop, aria-label, aria-labelledby, or slot="label".`);
    }
  }

  componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return newVal !== oldVal;
  }

  formResetCallback() {
    if (this.multiple) {
      this.selectedValues = [...this.defaultSelectedValues];
    } else {
      this.value = this.defaultValue;
    }
    this.touched = false;
    this.syncFormValue();
    this.faceInvalid = false;
  }

  formStateRestoreCallback(state: string | null, _mode: 'restore' | 'autocomplete'): void {
    this.value = typeof state === 'string' ? state : null;
    this.touched = false;
    this.faceInvalid = false;
    this.syncFormValue();
  }

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
  }

  @Watch('value')
  onValueChange() {
    if (!this.multiple) this.syncFormValue();
  }

  @Watch('selectedValues')
  onSelectedValuesChange() {
    if (this.multiple) this.syncFormValue();
  }

  @Watch('name')
  onNameChange() {
    this.syncFormValue();
  }

  @Watch('required')
  onRequiredChange() {
    this.syncFormValue();
  }

  @Watch('aria')
  onAriaChange() {
    const target = this.custom ? (this.triggerEl ?? null) : (this.nativeSelectEl ?? null);
    applyAriaProp(this.aria, target);
  }

  private syncFormValue() {
    // Use FormData to submit multiple values under the same name.
    // Only submit when name is set — unnamed controls are not successful (matches native behaviour).
    let formValue: string | FormData | null;
    if (this.multiple) {
      // Use FormData to submit multiple values under the same name.
      // Only submit when name is set — unnamed controls are not successful (matches native behaviour).
      formValue = !this.name || this.selectedValues.length === 0
        ? null
        : (() => { const fd = new FormData(); this.selectedValues.forEach(v => fd.append(this.name!, String(v))); return fd; })();
    } else {
      // FormData serialises to string; numeric values become e.g. "42".
      formValue = this.value != null ? String(this.value) : '';
    }
    const isInvalid = this.required && (this.multiple ? this.selectedValues.length === 0 : !this.value);
    const { faceInvalid } = syncFormState(this.internals, null, {
      formValue,
      validity: isInvalid ? { valueMissing: true } : {},
      validationMessage: isInvalid ? 'Please select an option' : '',
      disabled: this.disabled,
      touched: this.touched,
    });
    this.faceInvalid = faceInvalid;
  }

  componentDidLoad() {
    const parsed = parseSelectContent(this.el);
    this.groups = parsed.groups;
    this.flatOptions = parsed.flatOptions;
    // Note: late-arriving options (SSR/hydration race) are now handled by the
    // @Listen('optionConnect') handler below rather than a setTimeout fallback.
  }

  /**
   * Handles the `optionConnect` event dispatched by io-option in connectedCallback.
   * This replaces the fragile setTimeout SSR-race hack: when a child io-option
   * connects after componentDidLoad (e.g. React ref callbacks firing late), this
   * listener fires and re-parses the option list.
   *
   * The event bubbles and is composed so it reaches this host regardless of
   * whether options are in a Shadow DOM sub-tree.
   */
  @Listen('optionConnect')
  handleOptionConnect() {
    const parsed = parseSelectContent(this.el);
    this.groups = parsed.groups;
    this.flatOptions = parsed.flatOptions;
  }

  disconnectedCallback() {
    this.removeClickOutside();
    this.autoUpdateCleanup?.();
    this.autoUpdateCleanup = undefined;
    if (this.typeaheadTimer !== undefined) {
      clearTimeout(this.typeaheadTimer);
      this.typeaheadTimer = undefined;
    }
  }

  // ── Watchers ─────────────────────────────────────────────────

  @Watch('isOpen')
  onIsOpenChange(newVal: boolean) {
    if (!this.custom) return;
    this.toggle.emit({ open: newVal });
    if (newVal) {
      // Show dropdown — native Popover API when supported, otherwise manual positioning
      if (this.hasPopoverSupport && this.dropdownEl) {
        (this.dropdownEl as HTMLDivElement & { showPopover?: () => void }).showPopover?.();
        // autoUpdate: continuously reposition on scroll/resize
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
        const firstSelected = this.multiple
          ? this.filteredOptions.findIndex(o => this.selectedValues.includes(o.value))
          : this.filteredOptions.findIndex(o => o.value === this.value);
        // Fall back to the first enabled option so aria-activedescendant never
        // points to a disabled option on initial open.
        const firstEnabled = this.filteredOptions.findIndex(o => !o.disabled);
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
      if (this.typeaheadTimer !== undefined) {
        clearTimeout(this.typeaheadTimer);
        this.typeaheadTimer = undefined;
      }
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
        const v = this.selectedValues[0];
        return this.flatOptions.find(o => o.value === v)?.label ?? String(v);
      }
      return `${this.selectedValues.length} selected`;
    }
    // Return '' when no value is matched so the placeholder span in the trigger
    // template is reached via the falsy branch (|| <span class="...placeholder">).
    return this.flatOptions.find(o => o.value === this.value)?.label ?? '';
  }

  private isSelected(value: string | number): boolean {
    return this.multiple ? this.selectedValues.includes(value) : this.value === value;
  }

  // ── Private helpers ───────────────────────────────────────────

  private async positionDropdown(): Promise<void> {
    if (!this.triggerEl || !this.dropdownEl) return;
    // Use 'fixed' strategy when rendering in the top-layer (native Popover API),
    // 'absolute' for the legacy inline-positioned fallback.
    const strategy = this.hasPopoverSupport ? 'fixed' : 'absolute';
    const { x, y } = await computePosition(this.triggerEl, this.dropdownEl, {
      middleware: getComboboxMiddleware(),
      placement: 'bottom-start',
      strategy,
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
      this.change.emit({ value: [...this.selectedValues], name: this.name });
      // keep dropdown open in multiple mode
    } else {
      this.value = opt.value;
      this.change.emit({ value: this.value!, name: this.name });
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

  /**
   * PageUp / PageDown: move active index by `pageSize` (clamped to list bounds).
   * Skips disabled options by linear scan toward the target boundary.
   */
  private moveActiveByPage(pageSize: number) {
    const opts = this.filteredOptions;
    if (opts.length === 0) return;
    const current = this.activeIndex < 0 ? 0 : this.activeIndex;
    const raw = current + pageSize;
    const clamped = Math.max(0, Math.min(opts.length - 1, raw));
    // Scan from the clamped index back toward current to find a non-disabled option
    const direction = pageSize > 0 ? -1 : 1;
    let candidate = clamped;
    let attempts = Math.abs(pageSize) + 1;
    while (opts[candidate]?.disabled && attempts-- > 0) {
      candidate += direction;
      if (candidate < 0 || candidate >= opts.length) break;
    }
    if (candidate >= 0 && candidate < opts.length && !opts[candidate]?.disabled) {
      this.activeIndex = candidate;
    }
  }

  /**
   * Typeahead: accumulate pressed characters; after TYPEAHEAD_TIMEOUT ms of
   * inactivity the buffer resets. Jumps to the first non-disabled option whose
   * label starts with the current buffer (case-insensitive).
   */
  private handleTypeahead(char: string) {
    const TYPEAHEAD_TIMEOUT = 500;
    if (this.typeaheadTimer !== undefined) {
      clearTimeout(this.typeaheadTimer);
    }
    this.typeaheadBuffer += char.toLowerCase();
    this.typeaheadTimer = setTimeout(() => {
      this.typeaheadBuffer = '';
      this.typeaheadTimer = undefined;
    }, TYPEAHEAD_TIMEOUT);

    const idx = getMatchingOptionIndex(this.filteredOptions, this.typeaheadBuffer, this.activeIndex);
    if (idx >= 0) {
      this.activeIndex = idx;
    }
  }

  private handleLabelSlotChange = (ev: Event) => {
    const slot = ev.target as HTMLSlotElement;
    this.hasLabelSlot = slot.assignedElements().length > 0;
  };

  private handleDescriptionSlotChange = (ev: Event) => {
    const slot = ev.target as HTMLSlotElement;
    this.hasDescriptionSlot = slot.assignedElements().length > 0;
  };

  private handleMessageSlotChange = (ev: Event) => {
    const slot = ev.target as HTMLSlotElement;
    this.hasMessageSlot = slot.assignedElements().length > 0;
  };

  private handleSelectedSlotChange = (ev: Event) => {
    const slot = ev.target as HTMLSlotElement;
    this.hasSelectedSlot = slot.assignedElements().length > 0;
  };

  // ── Handlers (native mode) ────────────────────────────────────

  private handleChange = (ev: Event) => {
    if (this.disabled) return;
    this.value = (ev.target as HTMLSelectElement).value;
    this.change.emit({ value: this.value, name: this.name });
  };

  private handleFocus = (ev: FocusEvent) => {
    if (this.disabled) return;
    this.focus.emit(ev);
  };

  private handleBlur = (ev: FocusEvent) => {
    if (this.disabled) return;
    if (this.custom && this.el.shadowRoot?.contains(ev.relatedTarget as Node)) return;
    this.touched = true;
    this.syncFormValue();
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
      case 'PageDown':
        ev.preventDefault();
        this.moveActiveByPage(10);
        break;
      case 'PageUp':
        ev.preventDefault();
        this.moveActiveByPage(-10);
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
      default:
        // Typeahead: single printable character → buffer and jump to matching option
        if (ev.key.length === 1 && !ev.ctrlKey && !ev.altKey && !ev.metaKey) {
          ev.preventDefault();
          this.handleTypeahead(ev.key);
        }
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
        {opt.icon && (
          <span class="combobox-option__icon" aria-hidden="true">
            <io-icon name={opt.icon as IoIconName} />
          </span>
        )}
        <span class="combobox-option__content">
          <span class="combobox-option__label">{opt.label}</span>
          {opt.description && (
            <span class="combobox-option__description">{opt.description}</span>
          )}
        </span>
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
            <span id={groupHeadingId} class="combobox-group__label">{group.label}</span>
            <ul role="group" aria-labelledby={groupHeadingId} class="combobox-group__list">
              {groupItems}
            </ul>
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

  /**
   * @slot - Default slot. io-option and io-optgroup children parsed at load time to build the option list.
   * @slot label - Custom label content. Replaces the plain-text `label` prop when rich markup is needed.
   * @slot message - Validation message content. Replaces the plain-text `message` prop in error state.
   * @slot description - Helper text content. Replaces the plain-text `helperText` prop when not in error state.
   * @slot selected - Custom selected-value content rendered inside the combobox trigger (custom mode only). When slotted, replaces the default display value text.
   */
  render() {
    if (this.custom) {
      return this.renderCombobox();
    }
    return this.renderNativeSelect();
  }

  private renderNativeSelect() {
    const { label, name, value, placeholder, required, disabled, loading, state, message, helperText, description, size, groups, form, hideLabel, hasLabelSlot, hasDescriptionSlot, hasMessageSlot } = this;
    const isDisabled = disabled || loading;
    const showError = state === 'error' || this.faceInvalid;
    const showSuccess = state === 'success' && !this.faceInvalid;
    const showWarning = state === 'warning' && !this.faceInvalid;
    const selectId = this.fieldId;
    const messageId = `${selectId}-message`;
    const helperId = `${selectId}-helper`;
    const showMessage = showError && (hasMessageSlot || message);
    const showDescription = !showError && (hasDescriptionSlot || helperText);
    const describedBy = [
      showMessage ? messageId : '',
      showDescription ? helperId : '',
      description ? this.descriptionId : '',
    ].filter(Boolean).join(' ') || undefined;

    return (
      <Host aria-busy={loading ? 'true' : undefined}>
        <style>{getSelectStyles()}</style>
        {/* Hidden slot — io-option/io-optgroup children are parsed in componentDidLoad
            and rendered as internal <option>/<optgroup> elements. The originals are
            visually hidden so the native select controls the displayed value. */}
        <slot />
        <div class={getSelectWrapperClass(showError, showSuccess, showWarning, isDisabled, loading)}>
          <select
            id={selectId}
            class={`select-field select-field--${size}`}
            ref={(el?: HTMLSelectElement) => {
              this.nativeSelectEl = el;
              applyAriaProp(this.aria, el ?? null);
            }}
            name={name}
            disabled={isDisabled}
            required={required}
            form={form}
            aria-invalid={showError ? 'true' : undefined}
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
          <label htmlFor={selectId} class={hideLabel ? 'select-label select-label--sr-only' : 'select-label'}>
            <span class={hasLabelSlot ? 'select-label__slot' : 'select-label__slot select-label__slot--hidden'}>
              <slot name="label" onSlotchange={this.handleLabelSlotChange} />
            </span>
            {!hasLabelSlot && (
              <span>
                {label}
                {required && <Required />}
              </span>
            )}
            {hasLabelSlot && required && <Required />}
          </label>
          {loading ? (
            <span class="select-chevron select-loading-indicator" aria-hidden="true">
              <io-spinner size="sm" />
            </span>
          ) : (
            <span class="select-chevron" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          )}
        </div>
        {(showError || showSuccess || showWarning) && (
          <StateMessage
            state={showError ? 'error' : showSuccess ? 'success' : 'warning'}
            message={message}
            hasSlot={hasMessageSlot}
            messageId={messageId}
            classPrefix="select"
            visible={!!(showError ? (hasMessageSlot || message) : message)}
            onSlotChange={this.handleMessageSlotChange}
          />
        )}
        {!showError && (
          <p id={helperId} class={`select-helper${showDescription ? '' : ' select-helper--hidden'}`}>
            <span class={hasDescriptionSlot ? 'select-description__slot' : 'select-description__slot select-description__slot--hidden'}>
              <slot name="description" onSlotchange={this.handleDescriptionSlotChange} />
            </span>
            {!hasDescriptionSlot && helperText}
          </p>
        )}
        {description && (
          <p id={this.descriptionId} class="select-description">{description}</p>
        )}
      </Host>
    );
  }

  private renderCombobox() {
    const { label, required, disabled, loading, state, message, helperText, description, size, isOpen, activeIndex, filterQuery, hideLabel, hasLabelSlot, hasDescriptionSlot, hasMessageSlot } = this;
    const isDisabled = disabled || loading;
    const showError = state === 'error' || this.faceInvalid;
    const showSuccess = state === 'success' && !this.faceInvalid;
    const showWarning = state === 'warning' && !this.faceInvalid;
    const selectId = this.fieldId;
    const labelId = `${selectId}-label`;
    const triggerId = `${selectId}-trigger`;
    const listboxId = `${selectId}-listbox`;
    const messageId = `${selectId}-message`;
    const helperId = `${selectId}-helper`;

    const showMessage = showError && (hasMessageSlot || message);
    const showDescription = !showError && (hasDescriptionSlot || helperText);
    const describedBy = [
      showMessage ? messageId : '',
      showDescription ? helperId : '',
      description ? this.descriptionId : '',
    ].filter(Boolean).join(' ') || undefined;

    const activeOptId = activeIndex >= 0 ? getComboboxOptionId(listboxId, activeIndex) : undefined;
    const opts = this.filteredOptions;

    return (
      <Host aria-busy={loading ? 'true' : undefined}>
        <style>{getSelectStyles()}</style>
        {/* Hidden slot — io-option/io-optgroup children are parsed and rendered
            as internal listbox items. The originals are visually hidden. */}
        <slot />
        <div class={getComboboxWrapperClass(showError, showSuccess, showWarning, isDisabled, loading)}>
          <label id={labelId} class={hideLabel ? 'select-label select-label--sr-only' : 'select-label'} aria-hidden="true">
            <span class={hasLabelSlot ? 'select-label__slot' : 'select-label__slot select-label__slot--hidden'}>
              <slot name="label" onSlotchange={this.handleLabelSlotChange} />
            </span>
            {!hasLabelSlot && (
              <span>
                {label}
                {required && <Required />}
              </span>
            )}
            {hasLabelSlot && required && <Required />}
          </label>

          <button
            type="button"
            id={triggerId}
            ref={(el?: HTMLButtonElement) => {
              this.triggerEl = el;
              applyAriaProp(this.aria, el ?? null);
            }}
            class={`combobox-trigger combobox-trigger--${size}`}
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={String(isOpen)}
            aria-labelledby={labelId}
            aria-controls={listboxId}
            aria-activedescendant={activeOptId}
            aria-required={required ? 'true' : undefined}
            aria-invalid={showError ? 'true' : undefined}
            aria-describedby={describedBy}
            disabled={isDisabled}
            onClick={this.handleTriggerClick}
            onKeyDown={this.handleTriggerKeyDown}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          >
            <span class="combobox-trigger__text">
              <span class={this.hasSelectedSlot ? 'combobox-trigger__selected-slot' : 'combobox-trigger__selected-slot combobox-trigger__selected-slot--hidden'}>
                <slot name="selected" onSlotchange={this.handleSelectedSlotChange} />
              </span>
              {!this.hasSelectedSlot && (this.displayValue || <span class="combobox-trigger__placeholder">{this.placeholder}</span>)}
            </span>
            {loading ? (
              <span class="combobox-trigger__chevron select-loading-indicator" aria-hidden="true">
                <io-spinner size="sm" />
              </span>
            ) : (
              <span class="combobox-trigger__chevron" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            )}
          </button>

          <div
            ref={el => { this.dropdownEl = el as HTMLDivElement; }}
            class="combobox-dropdown"
            data-open={isOpen ? 'true' : undefined}
            {...(this.hasPopoverSupport ? { popover: 'manual' } : {})}
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

        {(showError || showSuccess || showWarning) && (
          <StateMessage
            state={showError ? 'error' : showSuccess ? 'success' : 'warning'}
            message={message}
            hasSlot={hasMessageSlot}
            messageId={messageId}
            classPrefix="select"
            visible={!!(showError ? (hasMessageSlot || message) : message)}
            onSlotChange={this.handleMessageSlotChange}
          />
        )}
        {!showError && (
          <p id={helperId} class={`select-helper${showDescription ? '' : ' select-helper--hidden'}`}>
            <span class={hasDescriptionSlot ? 'select-description__slot' : 'select-description__slot select-description__slot--hidden'}>
              <slot name="description" onSlotchange={this.handleDescriptionSlotChange} />
            </span>
            {!hasDescriptionSlot && helperText}
          </p>
        )}
        {description && (
          <p id={this.descriptionId} class="select-description">{description}</p>
        )}
      </Host>
    );
  }
}
