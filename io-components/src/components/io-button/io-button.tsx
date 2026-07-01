import { AttachInternals, Component, Element, Event, EventEmitter, Host, Method, Prop, State, Watch, h } from '@stencil/core';

import { getButtonStyles } from './io-button-styles';
import { getButtonAriaAttrs, getButtonClassList } from './io-button-utils';
import { applyAriaProp } from '../../utils/aria-prop';
import { LoadingMessage } from '../../utils/common/loading-message';
import type { IoIconName } from '../../utils/icons';
import type { IoIconSize } from '../io-icon/types';

import type { IoButtonVariant, IoButtonColor, IoButtonSize, IoButtonType, IoButtonArrow, IoButtonArrowPlacement, IoButtonIconPosition, IoButtonAriaAttribute } from './types';
import { type BreakpointCustomizable, resolveBreakpoint } from '../../utils/breakpoint';

/** One render tick in ms — used to clear the "Loading finished" announcement. */
const LOADING_FINISHED_CLEAR_MS = 1000;

/** Shared path data for the iO brand arrow SVG — avoids duplication across render sites. */
const BRAND_ARROW_PATH = 'M17.825.575l-1.237 1.238L21.9 7.125H.75v1.75H21.9l-5.312 5.312 1.237 1.237L25.25 8 17.825.575z';

const VALID_VARIANTS: readonly IoButtonVariant[] = ['solid', 'ghost', 'link'];
const VALID_COLORS: readonly IoButtonColor[] = ['blue', 'white', 'black', 'antraciet', 'orange', 'pink', 'rouge', 'yellow', 'beige', 'grey'];
const VALID_SIZES: readonly IoButtonSize[] = ['sm', 'md', 'lg', 'xl'];

const ICON_SIZE_MAP: Record<IoButtonSize, IoIconSize> = {
  sm: 'sm',
  md: 'sm',
  lg: 'md',
  xl: 'lg',
};

let _idCounter = 0;

/**
 * io-button
 * ==========
 * Primary interactive element for io Digital's design system.
 *
 * Supports 9 color themes × 3 variants (solid, ghost, link) × 4 sizes.
 * Renders as <button> by default, or <a> when `href` is provided.
 *
 * Default type is 'button'. Set type="submit" or type="reset" explicitly
 * when placing inside a form — this deviates from the HTML default of 'submit'.
 *
 * @example
 * <io-button color="blue" variant="solid" size="md">Get started</io-button>
 * <io-button color="blue" variant="ghost" size="md">Learn more</io-button>
 * <io-button href="/pricing" color="blue" variant="link">See pricing</io-button>
 * <io-button type="submit" color="blue" variant="solid">Submit form</io-button>
 */
@Component({
  tag: 'io-button',
  shadow: { delegatesFocus: true },
  formAssociated: true,
})
export class IoButton {
  @Element() el!: HTMLElement;
  @AttachInternals() internals!: ElementInternals;

  // ── Props ─────────────────────────────────────────────────────

  /** Visual fill style */
  @Prop({ reflect: true }) variant: IoButtonVariant = 'solid';

  /** Color theme */
  @Prop({ reflect: true }) color: IoButtonColor = 'blue';

  /**
   * Size preset. Accepts a fixed value or a responsive breakpoint map.
   *
   * @example
   * // Fixed scalar
   * <io-button size="md">Button</io-button>
   *
   * // Responsive — sm on mobile, lg on large+ viewports (JS/JSX only)
   * <io-button .size={{ base: 'sm', l: 'lg' }}>Button</io-button>
   */
  @Prop() size: BreakpointCustomizable<IoButtonSize> = 'md';

  /**
   * Native button type.
   * Note: defaults to 'button' (unlike the HTML default of 'submit') — set
   * type="submit" or type="reset" explicitly when placing inside a form.
   * Irrelevant when href is set.
   */
  @Prop() type: IoButtonType = 'button';

  /** Renders the button as an anchor tag with this href */
  @Prop() href: string | undefined;

  /** Link target — only used when href is set */
  @Prop() target: string | undefined = '_self';

  /** Rel attribute — only used when href is set */
  @Prop() rel: string | undefined;

  /**
   * Maps to the native anchor `download` attribute when `href` is set.
   * Pass `true` to prompt save with the server filename, or a string to override the filename.
   * Has no effect in button mode.
   */
  @Prop() download?: string | boolean;

  /** Disables the button and applies reduced opacity */
  @Prop({ reflect: true }) disabled = false;

  /** Shows a loading spinner and disables interaction */
  @Prop({ reflect: true }) loading = false;

  /** Screen-reader announcement while loading. Localizable. Defaults to "Loading". */
  @Prop() loadingDescription = 'Loading';

  /** Screen-reader announcement when loading completes. Localizable. Defaults to "Loading finished". */
  @Prop() loadingFinishedDescription = 'Loading finished';

  /** Stretches button to fill its container width */
  @Prop() fullWidth = false;

  /** Accessible label — required for icon-only buttons */
  @Prop() label: string | undefined;

  /**
   * Submitted as a name/value pair with form data when type="submit".
   * Also used by io-button-group to identify this item.
   */
  @Prop({ reflect: true }) value: string | undefined;

  /**
   * The name submitted as form data when type="submit".
   * Only relevant when button is associated with a form.
   */
  @Prop({ reflect: true }) name: string | undefined;

  /**
   * Associates the button with a form element by its ID.
   * Allows the button to submit/reset a form it is not a descendant of.
   */
  @Prop({ reflect: true }) form: string | undefined;

  /**
   * @deprecated Use `hideLabel` with an `icon` or `iconSource` prop instead.
   * Renders a square icon-only button and suppresses text label rendering.
   * Will be removed in the next minor release after the deprecation period.
   */
  @Prop({ reflect: true, attribute: 'icon-only' }) iconOnly = false;

  /** Direction of the optional animated arrow icon. Omit to hide the arrow. */
  @Prop({ reflect: true }) arrow: IoButtonArrow | undefined;

  /** Side on which the arrow is rendered. Defaults to 'right'. */
  @Prop({ reflect: true }) arrowPlacement: IoButtonArrowPlacement = 'right';

  /** Name of a Lucide icon to render inside the button. */
  @Prop() icon?: IoIconName;

  /** Custom SVG string for a non-library icon (mutually exclusive with `icon`). */
  @Prop() iconSource?: string;

  /**
   * Hides the text label visually (icon-only mode with accessible label via `label` prop).
   * Accepts a fixed boolean or a responsive breakpoint map of 'true'/'false' strings.
   *
   * @example
   * // Always hidden
   * <io-button hide-label>Button</io-button>
   *
   * // Icon-only on mobile, show label on large+ viewports (JS/JSX only)
   * <io-button .hideLabel={{ base: 'true', l: 'false' }}>Button</io-button>
   */
  @Prop() hideLabel: BreakpointCustomizable<'true' | 'false'> | boolean = false;

  /**
   * Side on which the icon is rendered relative to the label. Defaults to 'left'.
   * Accepts a fixed value or a responsive breakpoint map.
   *
   * @example
   * // Always left
   * <io-button icon-position="left">Button</io-button>
   *
   * // Left on mobile, right on large+ viewports (JS/JSX only)
   * <io-button .iconPosition={{ base: 'left', l: 'right' }}>Button</io-button>
   */
  @Prop() iconPosition: BreakpointCustomizable<IoButtonIconPosition> = 'left';

  /**
   * Custom ARIA attributes to inject onto the inner trigger element (`<button>` or `<a>`).
   * Keys should be semantically meaningful for buttons (e.g. `aria-expanded`, `aria-pressed`,
   * `aria-haspopup`, `aria-controls`). Keys may omit or include the `aria-` prefix.
   *
   * @example
   * // Sets aria-expanded="true" on the inner <button>
   * <io-button .aria={{ 'aria-expanded': 'true', 'aria-controls': 'panel-id' }}>Open panel</io-button>
   */
  @Prop() aria?: Partial<Record<IoButtonAriaAttribute, string>>;

  private hasWarnedIconOnlyLabel = false;
  private hasWarnedIconOnlyDeprecated = false;
  private btnEl?: HTMLElement;
  private readonly loadingId: string;
  private _implicitSubmitHandler?: (ev: KeyboardEvent) => void;
  private _implicitSubmitForm?: HTMLFormElement;
  private _loadingFinishedTimer?: ReturnType<typeof setTimeout>;

  /**
   * True once `loading` has transitioned to true at least once after mount.
   * Guards the live-region: prevents a "Loading finished" announcement on initial render.
   */
  @State() private initialLoading = false;

  /** True for one tick after loading transitions true→false, to announce completion to AT. */
  @State() private loadingFinished = false;

  constructor() {
    this.loadingId = `io-btn-loading-${++_idCounter}`;
  }

  // ── Events ────────────────────────────────────────────────────

  /**
   * Fires on user click/Enter/Space activation.
   * Not fired when disabled or loading.
   */
  @Event() click!: EventEmitter<MouseEvent>;

  // ── Methods ───────────────────────────────────────────────────

  /** Programmatically move focus to the button */
  @Method()
  async setFocus(options?: FocusOptions): Promise<void> {
    const inner = this.el.shadowRoot?.querySelector<HTMLElement>('.btn');
    inner?.focus(options);
  }

  // ── Lifecycle ────────────────────────────────────────────────

  componentWillLoad(): void {
    if (this.name !== undefined) {
      this.internals?.setFormValue?.(this.value ?? '');
    }
  }

  componentDidLoad(): void {
    this.attachImplicitSubmitListener();
  }

  componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return newVal !== oldVal;
  }

  disconnectedCallback(): void {
    this.detachImplicitSubmitListener();
    if (this._loadingFinishedTimer !== undefined) {
      clearTimeout(this._loadingFinishedTimer);
      this._loadingFinishedTimer = undefined;
    }
  }

  // ── Watchers ─────────────────────────────────────────────────

  @Watch('value')
  onValueChange(newValue: string | undefined): void {
    if (this.name !== undefined) {
      this.internals?.setFormValue?.(newValue ?? '');
    }
  }

  @Watch('loading')
  onLoadingChange(newVal: boolean): void {
    if (newVal) {
      this.initialLoading = true;
      // Clear any pending "Loading finished" announcement from a previous cycle.
      if (this._loadingFinishedTimer !== undefined) {
        clearTimeout(this._loadingFinishedTimer);
        this._loadingFinishedTimer = undefined;
      }
      this.loadingFinished = false;
    } else if (this.initialLoading) {
      // loading went false after it was true — announce completion.
      this.loadingFinished = true;
      this._loadingFinishedTimer = setTimeout(() => {
        this.loadingFinished = false;
        this._loadingFinishedTimer = undefined;
      }, LOADING_FINISHED_CLEAR_MS);
    }
  }

  @Watch('aria')
  onAriaChange(): void {
    applyAriaProp(this.aria, this.btnEl ?? null);
  }

  @Watch('type')
  onTypeChange(): void {
    this.detachImplicitSubmitListener();
    this.attachImplicitSubmitListener();
  }

  @Watch('href')
  onHrefChange(): void {
    this.detachImplicitSubmitListener();
    this.attachImplicitSubmitListener();
  }

  // ── Form callbacks ───────────────────────────────────────────

  formResetCallback(): void {
    // Buttons have no user-controlled state to reset.
  }

  formAssociatedCallback(_form: HTMLFormElement | null): void {
    this.detachImplicitSubmitListener();
    this.attachImplicitSubmitListener();
  }

  // ── Implicit form submission (Enter key in sibling inputs) ───

  private attachImplicitSubmitListener(): void {
    if (this.href || this.type !== 'submit') return;
    const form = this.internals?.form;
    if (!form) return;
    this._implicitSubmitForm = form;
    this._implicitSubmitHandler = (ev: KeyboardEvent) => {
      if (ev.key !== 'Enter' || ev.isComposing || ev.defaultPrevented) return;
      const target = ev.target as HTMLInputElement;
      // Only intercept text-like inputs — textarea Enter inserts a newline, not a submit
      if (target.tagName !== 'INPUT') return;
      const nonTextTypes = ['submit', 'reset', 'button', 'checkbox', 'radio', 'file', 'image', 'range', 'color'];
      if (nonTextTypes.includes(target.type)) return;
      // Find the first eligible submit control in document order across both native
      // controls (form.elements) and io-button DOM descendants (querySelectorAll).
      // This prevents overriding native implicit submission when a native submit
      // button precedes this io-button, and handles the standard case correctly.
      const nativeSubmitters = Array.from(form.elements).filter((el) => {
        const tag = el.tagName.toLowerCase();
        return (
          (tag === 'button' || tag === 'input') &&
          (el as HTMLButtonElement | HTMLInputElement).type === 'submit'
        );
      });
      const ioSubmitBtns = Array.from(form.querySelectorAll('io-button')).filter((btn) => {
        const el = btn as HTMLElement & { type?: string };
        return el.type === 'submit' || el.getAttribute('type') === 'submit';
      });
      const allSubmitters = [...nativeSubmitters, ...ioSubmitBtns].sort((a, b) => {
        const pos = a.compareDocumentPosition(b);
        return pos & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : pos & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
      });
      if (allSubmitters[0] !== this.el) return;
      ev.preventDefault();
      if (!this.disabled && !this.loading) {
        form.requestSubmit();
      }
    };
    this._implicitSubmitForm.addEventListener('keydown', this._implicitSubmitHandler);
  }

  private detachImplicitSubmitListener(): void {
    if (this._implicitSubmitForm && this._implicitSubmitHandler) {
      this._implicitSubmitForm.removeEventListener('keydown', this._implicitSubmitHandler);
    }
    this._implicitSubmitHandler = undefined;
    this._implicitSubmitForm = undefined;
  }

  // ── Handlers ─────────────────────────────────────────────────

  private handleClick = (ev: MouseEvent) => {
    // Stop native shadow-DOM click from propagating to the host element.
    // Consumers should listen to the Stencil 'click' event emitted below,
    // not the inner button's native click — prevents double-fire in
    // framework wrappers that listen on the host element.
    ev.stopPropagation();
    if (this.disabled || this.loading) {
      ev.preventDefault();
      return;
    }
    this.click.emit(ev);

    // FACE form integration — only for button (not anchor) mode.
    if (!this.href) {
      const form = this.internals?.form;
      if (form) {
        if (this.type === 'submit') {
          form.requestSubmit();
        } else if (this.type === 'reset') {
          form.reset();
        }
      }
    }
  };

  private handleKeyDown = (ev: KeyboardEvent) => {
    if (this.href && (ev.key === 'Enter' || ev.key === ' ')) {
      ev.preventDefault();
      this.handleClick(ev as unknown as MouseEvent);
    }
  };

  private getAccessibleLabel(): string | undefined {
    const hostAriaLabel = this.el.getAttribute('aria-label') ?? undefined;
    return this.label ?? hostAriaLabel;
  }

  private warnIconOnlyDeprecated(): void {
    if (!this.iconOnly || this.hasWarnedIconOnlyDeprecated) return;
    const isStencilProd = (globalThis as { __STENCIL_PROD__?: boolean }).__STENCIL_PROD__ === true;
    if (!isStencilProd) {
      console.warn(
        'io-button: The `iconOnly` prop is deprecated. Use `hideLabel` with an `icon` or `iconSource` prop instead. ' +
        '`iconOnly` will be removed in the next minor release.',
      );
    }
    this.hasWarnedIconOnlyDeprecated = true;
  }

  private warnIconOnlyLabelMissing(): void {
    if (!this.iconOnly) return;
    // Also fire the deprecation warning (once per instance) when iconOnly is in use.
    this.warnIconOnlyDeprecated();

    if (this.hasWarnedIconOnlyLabel || this.getAccessibleLabel()) return;

    const isStencilProd = (globalThis as { __STENCIL_PROD__?: boolean }).__STENCIL_PROD__ === true;
    if (!isStencilProd) {
      console.warn('io-button: icon-only buttons require an accessible label via the label prop or aria-label attribute.');
    }
    this.hasWarnedIconOnlyLabel = true;
  }

  private warnHideLabelNoIcon(resolvedHideLabel: boolean): void {
    if (!resolvedHideLabel || this.iconOnly) return;
    const hasIcon = Boolean(this.icon || this.iconSource);
    if (!hasIcon) {
      const isStencilProd = (globalThis as { __STENCIL_PROD__?: boolean }).__STENCIL_PROD__ === true;
      if (!isStencilProd) {
        console.error('io-button: `hideLabel=true` requires an `icon` or `iconSource` prop so the button remains recognisable. Add an icon.');
      }
    }
  }

  private validatePropValues(resolvedSize: IoButtonSize): void {
    const isStencilProd = (globalThis as { __STENCIL_PROD__?: boolean }).__STENCIL_PROD__ === true;
    if (isStencilProd) return;

    if (!VALID_VARIANTS.includes(this.variant)) {
      console.warn(`io-button: Invalid value "${this.variant}" for prop "variant". Expected: ${VALID_VARIANTS.join(' | ')}.`);
    }
    if (!VALID_COLORS.includes(this.color)) {
      console.warn(`io-button: Invalid value "${this.color}" for prop "color". Expected: ${VALID_COLORS.join(' | ')}.`);
    }
    if (!VALID_SIZES.includes(resolvedSize)) {
      console.warn(`io-button: Invalid resolved value "${resolvedSize}" for prop "size". Expected: ${VALID_SIZES.join(' | ')}.`);
    }
  }

  // ── Render helpers ───────────────────────────────────────────

  private renderIcon(resolvedSize: IoButtonSize) {
    if (!this.icon && !this.iconSource) return null;

    if (this.iconSource) {
      return <span class="btn__icon-wrap" aria-hidden="true" innerHTML={this.iconSource} />;
    }

    return <io-icon name={this.icon!} size={ICON_SIZE_MAP[resolvedSize] ?? 'sm'} aria-hidden="true" />;
  }

  private renderIconOnlyContent(resolvedSize: IoButtonSize) {
    if (this.icon || this.iconSource) {
      return <span class="btn__icon">{this.renderIcon(resolvedSize)}</span>;
    }
    return (
      <span class="btn__icon btn__icon--brand-arrow" aria-hidden="true">
        <svg viewBox="0 0 26 16" fill="currentColor">
          <path d={BRAND_ARROW_PATH} />
        </svg>
      </span>
    );
  }

  render() {
    // Resolve responsive (BreakpointCustomizable) props to their current scalar value.
    const resolvedSize = resolveBreakpoint<IoButtonSize>(
      this.size as BreakpointCustomizable<IoButtonSize>,
      'md',
    );
    const resolvedHideLabel = (() => {
      const raw = this.hideLabel;
      if (typeof raw === 'boolean') return raw;
      // String form from HTML attributes or breakpoint object
      const resolved = resolveBreakpoint<'true' | 'false'>(
        raw as BreakpointCustomizable<'true' | 'false'>,
        'false',
      );
      return resolved === 'true';
    })();
    const resolvedIconPosition = resolveBreakpoint<IoButtonIconPosition>(
      this.iconPosition as BreakpointCustomizable<IoButtonIconPosition>,
      'left',
    );

    const { variant, color, disabled, loading, fullWidth, href, target, rel, type, iconOnly, arrowPlacement } = this;
    const size = resolvedSize;
    const hideLabel = resolvedHideLabel;
    const iconPosition = resolvedIconPosition;

    // 'none' and null are UI sentinels — treat as undefined so no arrow is rendered.
    // null arrives when React explicitly resets the DOM property (vs. deleting the prop).
    const rawArrow = this.arrow as string | null | undefined;
    const arrow = rawArrow === 'none' || rawArrow === null ? undefined : this.arrow;

    this.validatePropValues(size);
    this.warnIconOnlyDeprecated();
    this.warnHideLabelNoIcon(hideLabel);

    // Effective icon-only mode: either the legacy iconOnly prop, or hideLabel + has icon.
    const hasIcon = Boolean(this.icon || this.iconSource);
    const effectiveIconOnly = iconOnly || (hideLabel && hasIcon);

    const ariaAttrs = getButtonAriaAttrs({ disabled, loading, href });
    const classList = getButtonClassList({ variant, color, size, disabled, loading, fullWidth, iconOnly: effectiveIconOnly });
    const accessibleLabel = this.getAccessibleLabel();
    this.warnIconOnlyLabelMissing();

    const Tag = href ? 'a' : 'button';

    const innerProps: Record<string, unknown> = {
      class: `btn btn--${variant} btn--${color} btn--${size}${disabled ? ' btn--disabled' : ''}${loading ? ' btn--loading' : ''}${fullWidth ? ' btn--full-width' : ''}${effectiveIconOnly ? ' btn--icon-only' : ''}`,
      ref: (el?: HTMLElement) => {
        this.btnEl = el;
        applyAriaProp(this.aria, el ?? null);
      },
      onClick: this.handleClick,
      onKeyDown: this.handleKeyDown,
      ...ariaAttrs,
    };

    if (href) {
      innerProps['href'] = disabled || loading ? undefined : href;
      innerProps['target'] = target;
      // Auto-apply noopener noreferrer when target=_blank and rel is not already set,
      // matching io-wordmark behaviour and preventing tabnabbing attacks.
      if (target === '_blank' && !rel) {
        innerProps['rel'] = 'noopener noreferrer';
      } else {
        innerProps['rel'] = rel;
      }
      // download prop: boolean true → empty string (browser uses server filename);
      // string → explicit filename override.
      if (this.download !== undefined && this.download !== false) {
        innerProps['download'] = this.download === true ? '' : this.download;
      }
      // Keep disabled/loading anchors in the tab order so keyboard users can discover them.
      // href is cleared to prevent activation; tabIndex={0} restores focusability.
      if (disabled || loading) {
        innerProps['tabIndex'] = 0;
      }
    } else {
      innerProps['type'] = type;
      innerProps['disabled'] = disabled || loading;
    }

    if (accessibleLabel) {
      innerProps['aria-label'] = accessibleLabel;
    }

    if (loading && this.initialLoading) {
      innerProps['aria-describedby'] = this.loadingId;
    }

    // Determine live-region text:
    // - 'Loading' while loading=true (and has been seen at least once)
    // - 'Loading finished' for one tick after loading goes false
    // - '' otherwise (no spurious announcement)
    let liveRegionText = '';
    if (loading && this.initialLoading) {
      liveRegionText = 'Loading';
    } else if (this.loadingFinished) {
      liveRegionText = 'Loading finished';
    }

    const labelSlot = effectiveIconOnly
      ? this.renderIconOnlyContent(size)
      : (
        <span class={hideLabel ? 'btn__label btn__label--hidden' : 'btn__label'}>
          <slot />
        </span>
      );

    return (
      <Host class={classList}>
        <style>{getButtonStyles()}</style>
        <Tag {...innerProps}>
          {loading && <span class="btn__spinner" aria-hidden="true" />}
          {!effectiveIconOnly && arrow !== undefined && arrowPlacement === 'left' && (
            <span
              class={`btn__arrow${arrow === 'back' ? ' btn__arrow--back' : ''}${arrow === 'down' ? ' btn__arrow--down' : ''}`}
              aria-hidden="true"
            >
              <svg viewBox="0 0 26 16" fill="currentColor">
                <path d={BRAND_ARROW_PATH} />
              </svg>
            </span>
          )}
          {hasIcon && !effectiveIconOnly && iconPosition === 'left' && this.renderIcon(size)}
          {labelSlot}
          {hasIcon && !effectiveIconOnly && iconPosition === 'right' && this.renderIcon(size)}
          {!effectiveIconOnly && arrow !== undefined && arrowPlacement === 'right' && (
            <span
              class={`btn__arrow${arrow === 'back' ? ' btn__arrow--back' : ''}${arrow === 'down' ? ' btn__arrow--down' : ''}`}
              aria-hidden="true"
            >
              <svg viewBox="0 0 26 16" fill="currentColor">
                <path d={BRAND_ARROW_PATH} />
              </svg>
            </span>
          )}
        </Tag>
        {/* Loading live region — sibling to button so it's outside the interactive element's accessible subtree.
            Announces 'Loading' on start and 'Loading finished' once on completion. */}
        <span
          id={this.loadingId}
          role="status"
          aria-live="polite"
          aria-atomic="true"
          class="btn__loading-sr"
        >
          {liveRegionText}
        </span>
      </Host>
    );
  }
}
