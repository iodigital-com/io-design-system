import {
  Component,
  Prop,
  State,
  Event,
  EventEmitter,
  Element,
  Host,
  Watch,
  Listen,
  h,
} from '@stencil/core';
import type { AutoUpdateOptions } from '@floating-ui/dom';
import { autoUpdate } from '@floating-ui/dom';

import { getPopoverStyles } from './io-popover-styles';
import {
  applyFloatingPosition,
  createPopoverLabelId,
  createPopoverPanelId,
  getFirstFocusable,
  getPanelFocusableElements,
  supportsPopoverApi,
} from './io-popover-utils';
import type { IoPopoverPlacement } from './types';

/**
 * io-popover
 * ==========
 * Click-triggered floating content panel with accessible dialog semantics.
 *
 * Uses @floating-ui/dom for viewport-aware positioning (flip, shift, autoUpdate, arrow).
 *
 * @example
 * <io-popover label="Quick actions" placement="bottom">
 *   <io-button slot="trigger">Open</io-button>
 *   <p>Popover body content.</p>
 * </io-popover>
 */
@Component({
  tag: 'io-popover',
  shadow: { delegatesFocus: true },
})
export class IoPopover {
  @Element() el!: HTMLElement;

  private panelEl?: HTMLDivElement;
  private arrowEl?: HTMLDivElement;
  private labelId!: string;
  private panelId!: string;
  private descriptionId!: string;
  private triggerEl?: HTMLElement | null;
  private useNativePopover = false;
  private focusTrapHandler?: (ev: KeyboardEvent) => void;
  private cleanupAutoUpdate?: () => void;

  /**
   * Tracks whether the most recent trigger interaction was keyboard-initiated.
   * Used to decide whether to move focus into the panel on open (#987).
   */
  private _openedByKeyboard = false;

  // ── Props ─────────────────────────────────────────────────────

  /** Preferred placement of the popover panel relative to the trigger */
  @Prop({ reflect: true }) placement: IoPopoverPlacement = 'bottom';

  /** Whether the popover is currently open */
  @Prop({ mutable: true, reflect: true }) open = false;

  /** Close the popover when clicking outside the panel */
  @Prop() closeOnClickOutside = true;

  /** Accessible label for the popover dialog */
  @Prop() label?: string;

  /** Supplementary description shown inside the panel below the heading */
  @Prop() description: string | undefined;

  /** Accessible name for the popover dialog panel when `label` prop is not used. */
  @Prop() ariaLabel: string | undefined;

  /**
   * Whether to render the directional arrow indicator pointing toward the trigger.
   * Defaults to true.
   */
  @Prop() arrow = true;

  // ── State ─────────────────────────────────────────────────────

  @State() private panelStyle: Record<string, string> = {};

  // ── Events ────────────────────────────────────────────────────

  /** Emitted when the popover opens — trigger click while closed, or programmatic open via the open prop */
  @Event({ eventName: 'popoverOpen' }) openEvent!: EventEmitter<void>;

  /** Emitted when the popover closes — Escape key, outside click, or trigger re-click while open */
  @Event({ eventName: 'dismiss' }) dismissEvent!: EventEmitter<void>;

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    const seed = Math.random().toString(36).slice(2);
    this.labelId = createPopoverLabelId(seed);
    this.panelId = createPopoverPanelId(seed);
    this.descriptionId = `io-popover-desc-${seed}`;
    if (!this.label && !this.ariaLabel) {
      console.error('[io-popover] `label` prop is required for accessible dialog naming (WCAG 4.1.2). Alternatively set `ariaLabel` for a non-visible accessible name.');
    }
  }

  componentDidLoad() {
    this.triggerEl = this.el?.shadowRoot
      ?.querySelector<HTMLSlotElement>('.popover__trigger slot')
      ?.assignedElements({ flatten: true })[0] as HTMLElement | null;

    if (this.triggerEl) {
      // Preserve any consumer-authored aria-haspopup (e.g. 'menu') — only default to 'dialog'
      if (!this.triggerEl.hasAttribute('aria-haspopup')) {
        this.triggerEl.setAttribute('aria-haspopup', 'dialog');
      }
      this.triggerEl.setAttribute('aria-expanded', String(this.open));
      this.triggerEl.setAttribute('aria-controls', this.panelId);

      // Mirror all three aria attributes onto the inner focusable control (#979)
      const innerBtn = (this.triggerEl as HTMLElement).shadowRoot?.querySelector<HTMLElement>(
        'button, a, [role="button"]',
      );
      if (innerBtn) {
        if (!innerBtn.hasAttribute('aria-haspopup')) {
          innerBtn.setAttribute('aria-haspopup', this.triggerEl.getAttribute('aria-haspopup') ?? 'dialog');
        }
        innerBtn.setAttribute('aria-expanded', String(this.open));
        innerBtn.setAttribute('aria-controls', this.panelId);
      }

      // Track keyboard vs pointer to determine focus behaviour on open (#987)
      this.triggerEl.addEventListener('mousedown', this._handleTriggerPointerDown);
      this.triggerEl.addEventListener('pointerdown', this._handleTriggerPointerDown);
      this.triggerEl.addEventListener('keydown', this._handleTriggerKeyDown);
    }

    if (this.panelEl) {
      this.useNativePopover = supportsPopoverApi(this.panelEl);
    }

    if (this.open) {
      this.applyOpenState();
    }
  }

  disconnectedCallback(): void {
    this.detachFocusTrap?.();
    this.stopAutoUpdate();

    if (this.triggerEl) {
      this.triggerEl.removeEventListener('mousedown', this._handleTriggerPointerDown);
      this.triggerEl.removeEventListener('pointerdown', this._handleTriggerPointerDown);
      this.triggerEl.removeEventListener('keydown', this._handleTriggerKeyDown);
    }
  }

  // ── Watchers ──────────────────────────────────────────────────

  @Watch('open')
  onOpenChange(newVal: boolean) {
    if (newVal) {
      this.applyOpenState();
    } else {
      this.applyClosedState();
    }

    if (this.triggerEl) {
      this.triggerEl.setAttribute('aria-expanded', String(newVal));

      // Keep inner focusable in sync (#979)
      const innerBtn = (this.triggerEl as HTMLElement).shadowRoot?.querySelector<HTMLElement>(
        'button, a, [role="button"]',
      );
      if (innerBtn) {
        innerBtn.setAttribute('aria-expanded', String(newVal));
      }
    }
  }

  // ── Global listeners ──────────────────────────────────────────

  @Listen('keydown', { target: 'window' })
  handleKeydown(ev: KeyboardEvent) {
    if (!this.open) return;
    if (ev.key === 'Escape') {
      ev.stopPropagation();
      this.close();
    }
  }

  @Listen('click', { target: 'window', capture: true })
  handleWindowClick(ev: MouseEvent) {
    if (!this.open) return;
    if (!this.closeOnClickOutside) return;

    const target = ev.composedPath()[0] as Node;
    const isInsideHost = this.el.contains(target);
    if (!isInsideHost) {
      this.close();
    }
  }

  // ── Private event handlers ────────────────────────────────────

  /**
   * Called on mousedown / pointerdown on the trigger — marks the next open
   * as mouse-initiated so we do NOT move focus into the panel (#987).
   */
  private _handleTriggerPointerDown = () => {
    this._openedByKeyboard = false;
  };

  /**
   * Called on keydown on the trigger — marks the next open as keyboard-
   * initiated so we DO move focus into the panel on Enter/Space (#987).
   */
  private _handleTriggerKeyDown = (ev: KeyboardEvent) => {
    if (ev.key === 'Enter' || ev.key === ' ') {
      this._openedByKeyboard = true;
    }
  };

  // ── Private helpers ───────────────────────────────────────────

  private applyOpenState() {
    if (!this.panelEl) return;

    this.openEvent.emit();

    if (this.useNativePopover) {
      try {
        (this.panelEl as HTMLElement & { showPopover?: () => void }).showPopover?.();
      } catch {
        // Fallback silently if native popover API errors
      }
    }

    this.panelEl.removeAttribute('aria-hidden');

    // Wire autoUpdate — repositions on scroll, resize, and DOM mutations (#988)
    this.startAutoUpdate();

    this.attachFocusTrap();

    // Only move focus into panel when opened by keyboard (#987)
    if (this._openedByKeyboard) {
      requestAnimationFrame(() => {
        const shadow = this.el?.shadowRoot;
        if (!shadow) return;
        const firstFocusable = getFirstFocusable(shadow);
        firstFocusable?.focus();
      });
    }
  }

  private applyClosedState() {
    this.detachFocusTrap();
    this.stopAutoUpdate();

    if (!this.panelEl) return;

    if (this.useNativePopover) {
      try {
        (this.panelEl as HTMLElement & { hidePopover?: () => void }).hidePopover?.();
      } catch {
        // Ignore if panel already hidden
      }
    }

    this.panelEl.setAttribute('aria-hidden', 'true');
    this.panelStyle = {};

    // Return focus to the trigger element
    this.triggerEl?.focus();
  }

  /**
   * Starts floating-ui autoUpdate, which calls positionPanel() whenever
   * the trigger or panel moves (scroll, resize, DOM changes). (#988)
   */
  private startAutoUpdate() {
    if (!this.triggerEl || !this.panelEl) return;
    this.stopAutoUpdate();

    const trigger = this.triggerEl;
    const panel = this.panelEl;

    // autoUpdate requires both elements to be in the DOM.
    // In tests / SSR neither may be attached — guard gracefully.
    const options: Partial<AutoUpdateOptions> = { animationFrame: false };

    try {
      this.cleanupAutoUpdate = autoUpdate(trigger, panel, () => {
        void this.positionPanel();
      }, options);
    } catch {
      // autoUpdate unavailable (e.g. jsdom) — fall back to a single compute
      void this.positionPanel();
    }
  }

  /**
   * Cancels the autoUpdate subscription. Safe to call when no subscription
   * is active.
   */
  private stopAutoUpdate() {
    if (this.cleanupAutoUpdate) {
      this.cleanupAutoUpdate();
      this.cleanupAutoUpdate = undefined;
    }
  }

  /**
   * Computes and applies the panel's floating position via @floating-ui/dom. (#988)
   */
  private async positionPanel(): Promise<void> {
    if (!this.triggerEl || !this.panelEl) return;

    const arrowEl = this.arrow ? this.arrowEl : undefined;
    await applyFloatingPosition(this.triggerEl, this.panelEl, this.placement, arrowEl);
  }

  private attachFocusTrap() {
    if (!this.panelEl) return;
    this.detachFocusTrap();
    this.focusTrapHandler = (ev: KeyboardEvent) => {
      if (ev.key !== 'Tab') return;
      const focusable = getPanelFocusableElements(this.panelEl!);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      // Use document.activeElement — works for both Shadow DOM and slotted light DOM children
      const active = document.activeElement as HTMLElement | null;

      if (ev.shiftKey && active === first) {
        ev.preventDefault();
        last.focus();
      } else if (!ev.shiftKey && active === last) {
        ev.preventDefault();
        first.focus();
      }
    };
    this.panelEl.addEventListener('keydown', this.focusTrapHandler);
  }

  private detachFocusTrap() {
    if (!this.panelEl || !this.focusTrapHandler) return;
    this.panelEl.removeEventListener('keydown', this.focusTrapHandler);
    this.focusTrapHandler = undefined;
  }

  private close() {
    this.open = false;
    this.dismissEvent.emit();
  }

  // ── Handlers ──────────────────────────────────────────────────

  private handleTriggerClick = () => {
    this.open = !this.open;
    if (!this.open) {
      this.dismissEvent.emit();
    }
  };

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { label, labelId, panelId, open, panelStyle, description, arrow: showArrow } = this;
    const ariaHidden = open ? undefined : 'true';

    const panelProps: Record<string, unknown> = {
      id: panelId,
      role: 'dialog',
      'aria-modal': 'true',
      'aria-labelledby': label ? labelId : undefined,
      'aria-label': !label && this.ariaLabel ? this.ariaLabel : undefined,
      'aria-describedby': description ? this.descriptionId : undefined,
      'aria-hidden': ariaHidden,
      class: 'popover__panel',
      style: panelStyle,
      ref: (el: HTMLDivElement) => (this.panelEl = el),
    };

    return (
      <Host>
        <style>{getPopoverStyles()}</style>
        <div class="popover__trigger" onClick={this.handleTriggerClick}>
          <slot name="trigger" />
        </div>
        <div {...panelProps}>
          {label && (
            <span id={labelId} class="popover__label">
              {label}
            </span>
          )}
          {description && (
            <p id={this.descriptionId} class="popover__description">{description}</p>
          )}
          <slot />
          {showArrow && (
            <div
              class="popover__arrow"
              ref={(el: HTMLDivElement) => (this.arrowEl = el)}
              aria-hidden="true"
            />
          )}
        </div>
      </Host>
    );
  }
}
