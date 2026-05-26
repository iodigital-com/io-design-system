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
  computeFallbackPosition,
  getFirstFocusable,
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
  private triggerEl?: HTMLElement | null;
  private useNativePopover = false;

  // ── Props ─────────────────────────────────────────────────────

  /** Preferred placement of the popover panel relative to the trigger */
  @Prop({ reflect: true }) placement: IoPopoverPlacement = 'bottom';

  /** Whether the popover is currently open */
  @Prop({ mutable: true, reflect: true }) open = false;

  /** Close the popover when clicking outside the panel */
  @Prop() closeOnClickOutside = true;

  /** Accessible label for the popover dialog */
  @Prop() label?: string;

  // ── State ─────────────────────────────────────────────────────

  @State() private panelStyle: Record<string, string> = {};

  // ── Events ────────────────────────────────────────────────────

  /** Emitted when the popover closes (Escape key or outside click) */
  @Event({ eventName: 'dismiss' }) dismissEvent!: EventEmitter<void>;

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    this.labelId = createPopoverLabelId(Math.random().toString(36).slice(2));
  }

  componentDidLoad() {
    this.triggerEl = this.el?.shadowRoot
      ?.querySelector<HTMLSlotElement>('.popover__trigger slot')
      ?.assignedElements({ flatten: true })[0] as HTMLElement | null;

    if (this.triggerEl) {
      this.triggerEl.setAttribute('aria-expanded', String(this.open));
    }

    if (this.panelEl) {
      this.useNativePopover = supportsPopoverApi(this.panelEl);
    }

    if (this.open) {
      this.applyOpenState();
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

  // ── Private helpers ───────────────────────────────────────────

  private applyOpenState() {
    if (!this.panelEl) return;

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

    requestAnimationFrame(() => {
      const shadow = this.el?.shadowRoot;
      if (!shadow) return;
      const firstFocusable = getFirstFocusable(shadow);
      firstFocusable?.focus();
    });
  }

  private applyClosedState() {
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
    const { label, labelId, open, panelStyle } = this;
    const ariaHidden = open ? undefined : 'true';

    const panelProps: Record<string, unknown> = {
      role: 'dialog',
      'aria-modal': 'true',
      'aria-labelledby': label ? labelId : undefined,
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
          <slot />
        </div>
      </Host>
    );
  }
}
