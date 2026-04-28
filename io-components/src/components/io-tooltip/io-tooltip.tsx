import { Component, Prop, Element, Host, State, Listen, Watch, h } from '@stencil/core';
import { computePosition } from '@floating-ui/dom';
import type { IoTooltipPlacement } from './types';
import { getTooltipStyles } from './io-tooltip-styles';
import { createTooltipId, getTooltipMiddleware, getTooltipPositionStyle } from './io-tooltip-utils';

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
  /** Light-DOM hidden span holding tooltip text for aria-describedby */
  private descSpan?: HTMLSpanElement;
  private supportsPopover = typeof HTMLElement !== 'undefined' && 'showPopover' in HTMLElement.prototype;

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
    this.tooltipId = createTooltipId(Math.random().toString(36).slice(2));
  }

  componentDidLoad() {
    if (this.descSpan) return; // guard: prevent duplicate spans on reconnect
    // Create a visually-hidden span in the LIGHT DOM so aria-describedby
    // resolves within the same DOM tree as the slotted trigger element.
    // (ARIA IDREFs cannot cross shadow DOM boundaries.)
    const descId = `${this.tooltipId}-desc`;
    const span = document.createElement('span');
    span.id = descId;
    span.setAttribute('aria-hidden', 'true');
    span.style.cssText =
      'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;';
    span.textContent = this.content;
    this.el.appendChild(span);
    this.descSpan = span;

    // Wire aria-describedby on the slotted trigger to the light-DOM span.
    const trigger = this.el.querySelector(':scope > *:not([id$="-desc"])');
    if (trigger) {
      trigger.setAttribute('aria-describedby', descId);
    }

    // Progressive enhancement: use Popover API for top-layer rendering
    // so overflow:hidden ancestors cannot clip the tooltip.
    if (this.supportsPopover && this.tooltipEl) {
      this.tooltipEl.setAttribute('popover', 'manual');
    }
  }

  // ── Handlers ─────────────────────────────────────────────────

  @Listen('mouseenter')
  async handleMouseEnter() {
    await this.updatePosition();
    this.visible = true;
    if (this.supportsPopover && this.tooltipEl) {
      try { (this.tooltipEl as any).showPopover(); } catch { /* already shown */ }
    }
  }

  @Listen('mouseleave')
  handleMouseLeave() {
    this.visible = false;
    if (this.supportsPopover && this.tooltipEl) {
      try { (this.tooltipEl as any).hidePopover(); } catch { /* already hidden */ }
    }
  }

  @Listen('focusin')
  async handleFocusIn() {
    await this.updatePosition();
    this.visible = true;
    if (this.supportsPopover && this.tooltipEl) {
      try { (this.tooltipEl as any).showPopover(); } catch { /* already shown */ }
    }
  }

  @Listen('focusout')
  handleFocusOut() {
    this.visible = false;
    if (this.supportsPopover && this.tooltipEl) {
      try { (this.tooltipEl as any).hidePopover(); } catch { /* already hidden */ }
    }
  }

  disconnectedCallback() {
    this.descSpan?.remove();
    this.descSpan = undefined;
  }

  /** Keep the light-DOM description span in sync when content prop changes. */
  @Watch('content')
  onContentChange(newContent: string) {
    if (this.descSpan) {
      this.descSpan.textContent = newContent;
    }
  }

  private async updatePosition() {
    if (!this.tooltipEl) return;
    const { x, y } = await computePosition(this.el, this.tooltipEl, {
      placement: this.placement,
      strategy: 'fixed',
      middleware: getTooltipMiddleware(),
    });
    this.x = x;
    this.y = y;
  }

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { visible, x, y, tooltipId, content } = this;
    const style = getTooltipPositionStyle(x, y);

    return (
      <Host>
        <style>{getTooltipStyles()}</style>
        <slot />
        <div
          ref={(el) => (this.tooltipEl = el as HTMLDivElement)}
          id={tooltipId}
          role="tooltip"
          class={{ tooltip: true, 'tooltip--visible': visible }}
          style={style}
        >
          {content}
        </div>
      </Host>
    );
  }
}
