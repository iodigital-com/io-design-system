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

import { getPopoverStyles } from './io-popover-styles';
import {
  createPopoverLabelId,
  createPopoverPanelId,
  computeFallbackPosition,
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
 * Uses the native Popover API (`popover="auto"`) where available, falling back
 * to manual absolute positioning. No runtime positioning library required.
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
  private labelId!: string;
  private panelId!: string;
  private descriptionId!: string;
  private triggerEl?: HTMLElement | null;
  private useNativePopover = false;
  private focusTrapHandler?: (ev: KeyboardEvent) => void;
  private _scrollRafId?: number;

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

  // ── State ─────────────────────────────────────────────────────

  @State() private panelStyle: Record<string, string> = {};

  // ── Events ────────────────────────────────────────────────────

  /** Emitted when the popover opens — trigger click while closed, or programmatic open via the open prop */
  @Event({ eventName: 'open' }) openEvent!: EventEmitter<void>;

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
      this.triggerEl.setAttribute('aria-haspopup', 'dialog');
      this.triggerEl.setAttribute('aria-expanded', String(this.open));
      this.triggerEl.setAttribute('aria-controls', this.panelId);

      // Also set on the inner focusable control if it's a custom element with shadowRoot
      const innerBtn = (this.triggerEl as HTMLElement).shadowRoot?.querySelector(
        'button, a, [role="button"]',
      );
      if (innerBtn) {
        innerBtn.setAttribute('aria-haspopup', 'dialog');
      }
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
    if (this._scrollRafId) {
      cancelAnimationFrame(this._scrollRafId);
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

  @Listen('scroll', { target: 'window', capture: true })
  handleWindowScroll() {
    if (this._scrollRafId) return;
    this._scrollRafId = requestAnimationFrame(() => {
      this._scrollRafId = undefined;
      if (this.open) {
        this.repositionPanel();
      }
    });
  }

  @Listen('resize', { target: 'window' })
  handleWindowResize() {
    if (!this.open) return;
    this.repositionPanel();
  }

  // ── Private helpers ───────────────────────────────────────────

  private applyOpenState() {
    if (!this.panelEl) return;

    this.openEvent.emit();

    if (this.useNativePopover) {
      try {
        (this.panelEl as HTMLElement & { showPopover?: () => void }).showPopover?.();
        this.positionNativePanel();
      } catch {
        // Fallback silently if native popover API errors
        this.applyFallbackOpen();
      }
    } else {
      this.applyFallbackOpen();
    }

    this.attachFocusTrap();

    requestAnimationFrame(() => {
      const shadow = this.el?.shadowRoot;
      if (!shadow) return;
      const firstFocusable = getFirstFocusable(shadow);
      firstFocusable?.focus();
    });
  }

  private applyClosedState() {
    this.detachFocusTrap();
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

  private applyFallbackOpen() {
    if (!this.panelEl) return;
    this.panelEl.removeAttribute('aria-hidden');

    const triggerEl = this.el?.shadowRoot
      ?.querySelector<HTMLSlotElement>('.popover__trigger slot')
      ?.assignedElements({ flatten: true })[0] as HTMLElement | null;

    if (!triggerEl) return;

    const triggerRect = triggerEl.getBoundingClientRect();
    const panelRect = this.panelEl.getBoundingClientRect();

    const { top, left } = computeFallbackPosition(
      triggerRect,
      panelRect.width || 200,
      panelRect.height || 100,
      this.placement,
    );

    this.panelStyle = {
      position: 'fixed',
      top: `${top}px`,
      left: `${left}px`,
    };
  }

  private positionNativePanel() {
    if (!this.panelEl) return;

    const triggerEl = this.el?.shadowRoot
      ?.querySelector<HTMLSlotElement>('.popover__trigger slot')
      ?.assignedElements({ flatten: true })[0] as HTMLElement | null;

    if (!triggerEl) return;

    const triggerRect = triggerEl.getBoundingClientRect();
    const panelRect = this.panelEl.getBoundingClientRect();

    const { top, left } = computeFallbackPosition(
      triggerRect,
      panelRect.width || 200,
      panelRect.height || 100,
      this.placement,
    );

    this.panelEl.style.top = `${top}px`;
    this.panelEl.style.left = `${left}px`;
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

  private repositionPanel() {
    if (this.useNativePopover) {
      this.positionNativePanel();
    } else {
      this.applyFallbackOpen();
    }
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
    const { label, labelId, panelId, open, panelStyle, description } = this;
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
        </div>
      </Host>
    );
  }
}
