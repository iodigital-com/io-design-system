import { Component, Prop, Element, Host, State, Listen, h } from '@stencil/core';
import { computePosition, flip, offset, shift } from '@floating-ui/dom';
import type { IoTooltipPlacement } from './types';
import { getTooltipStyles } from './io-tooltip-styles';

/**
 * io-tooltip
 * ===========
 * Wraps any trigger element via the default slot. Shows a floating tooltip
 * label on hover and focus. Uses @floating-ui/dom for viewport-aware
 * positioning with automatic flip and shift.
 *
 * @example
 * <io-tooltip content="More information">
 *   <io-button>Info</io-button>
 * </io-tooltip>
 */
@Component({
  tag: 'io-tooltip',
  shadow: true,
})
export class IoTooltip {
  @Element() el!: HTMLElement;

  private tooltipEl?: HTMLDivElement;
  private tooltipId!: string;

  // ── Props ─────────────────────────────────────────────────────

  /** Tooltip text content */
  @Prop() content = '';

  /** Preferred placement of the tooltip relative to the trigger */
  @Prop() placement: IoTooltipPlacement = 'top';

  // ── State ─────────────────────────────────────────────────────

  @State() visible = false;
  @State() x = 0;
  @State() y = 0;

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    this.tooltipId = `io-tooltip-${Math.random().toString(36).slice(2)}`;
  }

  componentDidLoad() {
    // Inject aria-describedby on the first slotted child so assistive
    // technology announces the tooltip text when the trigger is focused.
    const trigger = this.el.querySelector(':scope > *');
    if (trigger) {
      trigger.setAttribute('aria-describedby', this.tooltipId);
    }
  }

  // ── Handlers ─────────────────────────────────────────────────

  @Listen('mouseenter')
  async handleMouseEnter() {
    await this.updatePosition();
    this.visible = true;
  }

  @Listen('mouseleave')
  handleMouseLeave() {
    this.visible = false;
  }

  @Listen('focusin')
  async handleFocusIn() {
    await this.updatePosition();
    this.visible = true;
  }

  @Listen('focusout')
  handleFocusOut() {
    this.visible = false;
  }

  private async updatePosition() {
    if (!this.tooltipEl) return;
    const { x, y } = await computePosition(this.el, this.tooltipEl, {
      placement: this.placement,
      strategy: 'fixed',
      middleware: [
        offset(8),
        flip(),
        shift({ padding: 8 }),
      ],
    });
    this.x = x;
    this.y = y;
  }

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { visible, x, y, tooltipId, content } = this;

    return (
      <Host>
        <style>{getTooltipStyles()}</style>
        <slot />
        <div
          ref={(el) => (this.tooltipEl = el as HTMLDivElement)}
          id={tooltipId}
          role="tooltip"
          class={{ tooltip: true, 'tooltip--visible': visible }}
          style={{ top: `${y}px`, left: `${x}px` }}
        >
          {content}
        </div>
      </Host>
    );
  }
}
