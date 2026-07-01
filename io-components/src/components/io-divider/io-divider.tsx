import { Component, Element, Prop, Host, State, h } from '@stencil/core';

import { getDividerStyles } from './io-divider-styles';

import type { IoDividerColor, IoDividerOrientation } from './types';
import type { BreakpointValue } from '../../utils/breakpoint';
import { parseBreakpoint, buildMediaBlock } from '../../utils/breakpoint';

/**
 * io-divider
 * ==========
 * Visual separator between sections of content.
 *
 * Horizontal (default): renders as `<hr>` (implicit role="separator", no explicit attribute needed).
 * Vertical: renders as `<div role="separator" aria-orientation="vertical">`.
 * With label: renders a flex row with a centered text label flanked by lines.
 *
 * @example
 * <io-divider />
 * <io-divider orientation="vertical" />
 * <io-divider label="or" />
 * <io-divider color="subtle" />
 * <io-divider color="strong" />
 * <io-divider>Custom separator content</io-divider>
 */
@Component({
  tag: 'io-divider',
  shadow: true,
})
export class IoDivider {
  @Element() el!: HTMLElement;

  private bpId?: string;

  // ── Props ─────────────────────────────────────────────────────

  /**
   * Orientation of the separator.
   * `horizontal` (default) renders a horizontal rule.
   * `vertical` renders a vertical line (useful in flex row containers).
   *
   * Accepts a scalar string or a breakpoint object for responsive layouts:
   *   orientation="horizontal"
   *   :orientation="{ base: 'horizontal', l: 'vertical' }"
   *   orientation='{"base":"horizontal","l":"vertical"}'
   *
   * Note: when a `label` prop or slot content is present, the labeled layout
   * always renders horizontally regardless of the resolved orientation.
   */
  @Prop({ reflect: true }) orientation: IoDividerOrientation | BreakpointValue<IoDividerOrientation> = 'horizontal';

  /**
   * Color contrast level for the divider line.
   * - `subtle`  — 50% opacity of the standard border color; very light separation.
   * - `default` — `var(--io-border)` (standard decorative border token; current behavior).
   * - `strong`  — `var(--io-border-hover)` (more prominent separation).
   *
   * Dark mode: all variants resolve automatically via existing semantic tokens.
   */
  @Prop({ reflect: true }) color: IoDividerColor = 'default';

  /**
   * Optional label centered within the divider line.
   * Common use case: "or", "and", date headings.
   * When set, the component uses a flex row layout regardless of orientation.
   * Alternatively, use the default slot for rich content (overrides label prop text).
   */
  @Prop() label: string | undefined;

  // ── State ────────────────────────────────────────────────────

  /**
   * Tracks whether the default slot has content.
   * When true, the slot replaces the label prop text while keeping aria-label.
   */
  @State() private hasSlotContent = false;

  // ── Methods ──────────────────────────────────────────────────

  componentWillLoad() {
    this.bpId = `io-d-${Math.random().toString(36).slice(2, 8)}`;
    if (this.el) this.el.setAttribute('data-bp-id', this.bpId);
  }

  private handleSlotchange = (ev: Event) => {
    const assignedNodes = (ev.target as HTMLSlotElement).assignedNodes({ flatten: true });
    const hasContent = assignedNodes.some(
      (n) => n.nodeType !== Node.TEXT_NODE || (n.textContent?.trim() ?? '') !== '',
    );
    this.hasSlotContent = hasContent;
  };

  private resolveBaseOrientation(): IoDividerOrientation {
    const parsed = parseBreakpoint<IoDividerOrientation>(
      this.orientation as BreakpointValue<IoDividerOrientation>,
      'horizontal',
    );
    if (parsed.isFixed) return parsed.value;
    return parsed.entries.find((e) => e.key === 'base')?.value ?? 'horizontal';
  }

  private buildResponsiveOrientationCSS(selector: string): string {
    const parsed = parseBreakpoint<IoDividerOrientation>(
      this.orientation as BreakpointValue<IoDividerOrientation>,
      'horizontal',
    );
    if (parsed.isFixed) return '';
    return parsed.entries
      .map(({ key, value }) => {
        if (value === 'vertical') {
          // Vertical: inline-flex + align-self: stretch
          return buildMediaBlock(
            key,
            'display: inline-flex; align-self: stretch;',
            selector,
          );
        }
        // Horizontal: block
        return buildMediaBlock(key, 'display: block;', selector);
      })
      .join('\n');
  }

  // ── Render ───────────────────────────────────────────────────

  render() {
    const { label, hasSlotContent } = this;
    const baseOrientation = this.resolveBaseOrientation();
    const isVertical = baseOrientation === 'vertical';
    const parsedOrientation = parseBreakpoint<IoDividerOrientation>(
      this.orientation as BreakpointValue<IoDividerOrientation>,
      'horizontal',
    );
    const isResponsive = !parsedOrientation.isFixed;
    const responsiveCSS = isResponsive && this.bpId
      ? this.buildResponsiveOrientationCSS(`:host([data-bp-id="${this.bpId}"])`)
      : '';

    if (label || hasSlotContent) {
      // The labeled/slotted variant always renders a horizontal flex layout
      // regardless of the orientation prop. aria-orientation is therefore always
      // "horizontal" — setting it to "vertical" here would be misleading to AT.
      return (
        <Host>
          <style>{getDividerStyles()}{responsiveCSS}</style>
          <div
            class="divider divider--labeled"
            role="separator"
            aria-orientation="horizontal"
            aria-label={label || undefined}
          >
            <span class="divider__line" aria-hidden="true" />
            <span class="divider__label">
              <slot onSlotchange={this.handleSlotchange}>
                {!hasSlotContent && label}
              </slot>
            </span>
            <span class="divider__line" aria-hidden="true" />
          </div>
        </Host>
      );
    }

    // Responsive orientation: use div[role=separator] with CSS-driven orientation.
    // This allows the element to switch between horizontal and vertical at breakpoints.
    if (isResponsive) {
      return (
        <Host>
          <style>{getDividerStyles()}{responsiveCSS}</style>
          <div
            class={`divider ${isVertical ? 'divider--vertical' : ''}`}
            role="separator"
            aria-orientation={baseOrientation}
          />
          <div style={{ display: 'none' }}>
            <slot onSlotchange={this.handleSlotchange} />
          </div>
        </Host>
      );
    }

    if (isVertical) {
      return (
        <Host>
          <style>{getDividerStyles()}</style>
          <div
            class="divider divider--vertical"
            role="separator"
            aria-orientation="vertical"
          />
          {/* Hidden slot listener — fires slotchange when consumer projects content */}
          <div style={{ display: 'none' }}>
            <slot onSlotchange={this.handleSlotchange} />
          </div>
        </Host>
      );
    }

    // Default horizontal — use semantic <hr> element.
    // <hr> has an implicit role="separator"; no need for an explicit role attribute.
    return (
      <Host>
        <style>{getDividerStyles()}</style>
        <hr class="divider" />
        {/* Hidden slot listener — fires slotchange when consumer projects content */}
        <div style={{ display: 'none' }}>
          <slot onSlotchange={this.handleSlotchange} />
        </div>
      </Host>
    );
  }
}
