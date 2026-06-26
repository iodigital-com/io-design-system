import { Component, Element, Host, Prop, State, Watch, h } from '@stencil/core';

import { getBreadcrumbStyles } from './io-breadcrumb-styles';

type BreadcrumbItem = Element & { current: boolean };

/**
 * io-breadcrumb
 * =============
 * Breadcrumb navigation for hierarchical orientation.
 * Uses a declarative slot-based API with io-breadcrumb-item sub-components.
 *
 * Separators are rendered by each io-breadcrumb-item in its own shadow DOM.
 * The slotchange handler only infers current=true on the last item when no item sets it explicitly.
 *
 * @example
 * <io-breadcrumb>
 *   <io-breadcrumb-item href="/">Home</io-breadcrumb-item>
 *   <io-breadcrumb-item href="/services">Services</io-breadcrumb-item>
 *   <io-breadcrumb-item current>Digital Strategy</io-breadcrumb-item>
 * </io-breadcrumb>
 */
@Component({
  tag: 'io-breadcrumb',
  shadow: true,
})
export class IoBreadcrumb {
  @Element() el!: HTMLElement;

  // ── Private fields ─────────────────────────────────────────
  private expandLi: HTMLLIElement | null = null;

  // ── State ─────────────────────────────────────────────────────

  /** Whether intermediate items are currently collapsed */
  @State() collapsed = true;

  /** Number of slotted io-breadcrumb-item elements */
  @State() itemCount = 0;

  // ── Props ─────────────────────────────────────────────────────

  /**
   * Accessible label for the nav landmark. Override for non-English UIs or when
   * multiple breadcrumbs appear on the same page (WCAG 2.4.6 / 4.1.2).
   */
  @Prop() label = 'Breadcrumb';

  /**
   * Maximum visible items before collapsing intermediate items into an expand button.
   * When set and the item count exceeds this value, items between the first and
   * last (maxItems − 1) are hidden. Activating the expand button reveals all items.
   * Screen readers receive a descriptive label on the expand button indicating how
   * many items are hidden (WCAG 1.3.1).
   */
  @Prop() maxItems?: number;

  // ── Watchers ──────────────────────────────────────────────────

  @Watch('collapsed')
  @Watch('maxItems')
  onCollapseChange() {
    this.applyVisibility();
  }

  // ── Lifecycle ─────────────────────────────────────────────────

  disconnectedCallback() {
    this.removeExpandButton();
  }

  // ── Slot handling ─────────────────────────────────────────────

  private handleSlotChange = () => {
    const items = Array.from(this.el.querySelectorAll('io-breadcrumb-item')) as BreadcrumbItem[];
    if (!items.length) return;

    if (!items.some(it => it.current === true)) {
      items[items.length - 1].current = true;
    }

    this.itemCount = items.length;
    this.collapsed = true;
    this.applyVisibility();
  };

  private removeExpandButton() {
    if (this.expandLi) {
      this.expandLi.remove();
      this.expandLi = null;
    }
  }

  private applyVisibility() {
    const items = Array.from(this.el.querySelectorAll('io-breadcrumb-item')) as HTMLElement[];
    const total = items.length;

    this.removeExpandButton();

    if (!this.maxItems || !this.collapsed || total <= this.maxItems) {
      items.forEach(item => {
        item.style.display = '';
        item.removeAttribute('aria-hidden');
      });
      return;
    }

    const showLastCount = Math.max(this.maxItems - 1, 1);
    const hideStart = 1;
    const hideEnd = total - showLastCount;
    const hiddenCount = hideEnd - hideStart;

    items.forEach((item, i) => {
      if (i >= hideStart && i < hideEnd) {
        item.style.display = 'none';
        item.setAttribute('aria-hidden', 'true');
      } else {
        item.style.display = '';
        item.removeAttribute('aria-hidden');
      }
    });

    // Inject expand button into light DOM after first item so slot projects it in correct position
    if (hiddenCount > 0 && items[0]) {
      this.expandLi = document.createElement('li');
      this.expandLi.className = 'breadcrumb__expand-item';
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('aria-label', `Show ${hiddenCount} hidden breadcrumb item${hiddenCount !== 1 ? 's' : ''}`);
      btn.textContent = '…';
      btn.style.cssText = [
        'background:transparent',
        'border:none',
        'cursor:pointer',
        'padding:0 var(--io-space-1,4px)',
        'font-family:var(--io-font-primary,inherit)',
        'font-size:var(--io-font-size-base,1rem)',
        'color:var(--io-text-secondary)',
        'line-height:1',
        'display:inline-flex',
        'align-items:center',
      ].join(';');
      btn.addEventListener('click', this.handleExpand);
      this.expandLi.appendChild(btn);
      items[0].insertAdjacentElement('afterend', this.expandLi);
    }
  }

  private handleExpand = () => {
    this.collapsed = false;
  };

  // ── Render ───────────────────────────────────────────────────

  render() {
    return (
      <Host>
        <style>{getBreadcrumbStyles()}</style>
        <nav aria-label={this.label}>
          <ol>
            <slot onSlotchange={this.handleSlotChange} />
          </ol>
        </nav>
      </Host>
    );
  }
}
