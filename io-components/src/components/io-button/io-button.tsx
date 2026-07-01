import { AttachInternals, Component, Element, Event, EventEmitter, Host, Method, Prop, State, Watch, h } from '@stencil/core';

import { getButtonStyles } from './io-button-styles';
import { getButtonAriaAttrs, getButtonClassList } from './io-button-utils';
import { applyAriaProp } from '../../utils/aria-prop';
import type { IoIconName } from '../../utils/icons';
import type { IoIconSize } from '../io-icon/types';

import type { IoButtonVariant, IoButtonColor, IoButtonSize, IoButtonType, IoButtonArrow, IoButtonArrowPlacement, IoButtonAriaAttribute } from './types';

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

  /** Size preset */
  @Prop({ reflect: true }) size: IoButtonSize = 'md';

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
   * Download attribute for anchor mode.
   * - `true` / empty string → triggers download with server-provided filename
   * - string → triggers download and suggests the given filename
   * - Only applies when `href` is set.
   */
  @Prop() download?: string | boolean;

  /** Disables the button and applies reduced opacity */
  @Prop({ reflect: true }) disabled = false;

  /** Shows a loading spinner and disables interaction */
  @Prop({ reflect: true }) loading = false;

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
   * @deprecated Use `hideLabel` instead — it preserves accessible text via sr-only and
   * renders a square icon-only layout when an icon/iconSource is present.
   * `iconOnly` will be removed in the next minor bump after this deprecation period.
   * Migration: replace `iconOnly` with `hideLabel` and ensure `label` prop is set.
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

  /** Hides the text label visually (icon-only mode with accessible label via `label` prop). */
  @Prop({ reflect: true }) hideLabel = false;

  /** Side on which the icon is rendered relative to the label. Defaults to 'left'. */
  @Prop({ reflect: true }) iconPosition: 'left' | 'right' = 'left';

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

  /** True once `loading` has transitioned to true at least once after mount. Guards live-region announcement. */
  @State() private loadingTransitioned = false;

  /**
   * Tracks the live-region text: 'loading' | 'finished' | 'idle'.
   * 'finished' is held for one tick (200ms) so screen readers can announce it,
   * then cleared to 'idle' to avoid persistent stale text.
   */
  @State() private loadingAnnouncement: 'loading' | 'finished' | 'idle' = 'idle';

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
      // loading started
      this.loadingTransitioned = true;
      if (this._loadingFinishedTimer !== undefined) {
        clearTimeout(this._loadingFinishedTimer);
        this._loadingFinishedTimer = undefined;
      }
      this.loadingAnnouncement = 'loading';
    } else if (this.loadingTransitioned) {
      // loading ended — only announce if we actually showed a loading state
      this.loadingAnnouncement = 'finished';
      this._loadingFinishedTimer = setTimeout(() => {
        this.loadingAnnouncement = 'idle';
        this._loadingFinishedTimer = undefined;
      }, 200);
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

  private warnIconOnlyLabelMissing(): void {
    const isStencilProd = (globalThis as { __STENCIL_PROD__?: boolean }).__STENCIL_PROD__ === true;

    if (this.iconOnly) {
      if (!isStencilProd && !this.hasWarnedIconOnlyDeprecated) {
        console.warn(
          'io-button: `iconOnly` is deprecated. Use `hideLabel` instead — it preserves accessible text ' +
          'and renders as icon-only when an icon or iconSource is present. Remove `iconOnly` and add `hideLabel`.',
        );
        this.hasWarnedIconOnlyDeprecated = true;
      }

      if (!this.hasWarnedIconOnlyLabel && !this.getAccessibleLabel()) {
        if (!isStencilProd) {
          console.warn('io-button: icon-only buttons require an accessible label via the label prop or aria-label attribute.');
        }
        this.hasWarnedIconOnlyLabel = true;
      }
    }
  }

  private validatePropValues(): void {
    const isStencilProd = (globalThis as { __STENCIL_PROD__?: boolean }).__STENCIL_PROD__ === true;
    if (isStencilProd) return;

    if (!VALID_VARIANTS.includes(this.variant)) {
      console.warn(`io-button: Invalid value "${this.variant}" for prop "variant". Expected: ${VALID_VARIANTS.join(' | ')}.`);
    }
    if (!VALID_COLORS.includes(this.color)) {
      console.warn(`io-button: Invalid value "${this.color}" for prop "color". Expected: ${VALID_COLORS.join(' | ')}.`);
    }
    if (!VALID_SIZES.includes(this.size)) {
      console.warn(`io-button: Invalid value "${this.size}" for prop "size". Expected: ${VALID_SIZES.join(' | ')}.`);
    }
  }

  // ── Render helpers ───────────────────────────────────────────

  private renderIcon() {
    if (!this.icon && !this.iconSource) return null;

    const iconSize = ICON_SIZE_MAP[this.size] ?? 'sm';

    if (this.iconSource) {
      // #1043 — iconSource path: wrap raw SVG in a sized span that inherits the
      // same dimensions as io-icon would use (via data-size attribute + CSS).
      // Full URL-based routing through io-icon (which does a fetch) is deferred
      // because io-button.iconSource is a raw SVG string, not a URL.
      return (
        <span
          class="btn__icon-wrap"
          aria-hidden="true"
          data-size={iconSize}
          innerHTML={this.iconSource}
        />
      );
    }

    return <io-icon name={this.icon!} size={iconSize} aria-hidden="true" />;
  }

  private renderIconOnlyContent() {
    if (this.icon || this.iconSource) {
      return <span class="btn__icon">{this.renderIcon()}</span>;
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
    const { variant, color, size, disabled, loading, fullWidth, href, target, rel, type, iconOnly, arrowPlacement, hideLabel, iconPosition } = this;
    // 'none' and null are UI sentinels — treat as undefined so no arrow is rendered.
    // null arrives when React explicitly resets the DOM property (vs. deleting the prop).
    const rawArrow = this.arrow as string | null | undefined;
    const arrow = rawArrow === 'none' || rawArrow === null ? undefined : this.arrow;

    this.validatePropValues();

    // #1047 — hideLabel behaves as icon-only when an icon/iconSource is present.
    // When hideLabel=true AND no icon is set, emit a console.error guidance.
    const hasIcon = Boolean(this.icon || this.iconSource);
    const hideLabelIconOnly = hideLabel && hasIcon && !iconOnly;

    const isStencilProd = (globalThis as { __STENCIL_PROD__?: boolean }).__STENCIL_PROD__ === true;
    if (hideLabel && !hasIcon && !iconOnly && !isStencilProd) {
      console.error('io-button: `hideLabel=true` with no icon/iconSource produces an empty button. Add an `icon` or `iconSource` prop.');
    }

    // Effective icon-only flag — true if iconOnly prop OR hideLabel+icon combo
    const effectiveIconOnly = iconOnly || hideLabelIconOnly;

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

      // #1065 — auto-add rel="noopener noreferrer" when target="_blank" and rel not set.
      // This matches io-wordmark.tsx line 91 and prevents opener/referrer leaks.
      if (target === '_blank' && !rel) {
        innerProps['rel'] = 'noopener noreferrer';
      } else {
        innerProps['rel'] = rel;
      }

      // #1065 — download prop: boolean true → empty attribute; string → filename suggestion.
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

    if (this.loadingAnnouncement !== 'idle') {
      innerProps['aria-describedby'] = this.loadingId;
    }

    // #1047 — hideLabel+icon renders sr-only label span instead of iconOnly path,
    // preserving accessible text (per Porsche / WCAG 2.4.6 pattern).
    const labelSlot = effectiveIconOnly && !hideLabelIconOnly
      ? this.renderIconOnlyContent()
      : hideLabelIconOnly
        ? (
          <span class="btn__label btn__label--hidden">
            <slot />
          </span>
        )
        : (
          <span class={hideLabel ? 'btn__label btn__label--hidden' : 'btn__label'}>
            <slot />
          </span>
        );

    // #1110 — live region text for screen reader announcement
    let liveText = '';
    if (this.loadingAnnouncement === 'loading') liveText = 'Loading';
    else if (this.loadingAnnouncement === 'finished') liveText = 'Loading finished';

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
          {hasIcon && !effectiveIconOnly && iconPosition === 'left' && this.renderIcon()}
          {labelSlot}
          {hasIcon && !effectiveIconOnly && iconPosition === 'right' && this.renderIcon()}
          {hideLabelIconOnly && this.renderIcon()}
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
        {/* Stable live region — persists in DOM so announcements are reliable.
            'Loading' while loading=true; 'Loading finished' for one tick after
            loading transitions true→false; then cleared to prevent stale text. */}
        <span
          id={this.loadingId}
          role="status"
          aria-live="polite"
          aria-atomic="true"
          class="btn__loading-sr"
        >
          {liveText}
        </span>
      </Host>
    );
  }
}
