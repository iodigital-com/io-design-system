import { Component, Element, Host, Prop, State, Watch, h } from '@stencil/core';

import { getBreadcrumbStyles } from './io-breadcrumb-styles';

type BreadcrumbItem = Element & { current: boolean };

/** Shape of a single BreadcrumbList itemListElement entry. */
interface JsonLdItem {
  '@type': 'ListItem';
  position: number;
  name: string;
  item?: string;
}

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
 *
 * @example SEO with JSON-LD
 * <io-breadcrumb seo>
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
  private popoverEl: HTMLIoPopoverElement | null = null;
  private triggerBtn: HTMLButtonElement | null = null;

  // ── State ─────────────────────────────────────────────────────

  /** Whether intermediate items are currently collapsed */
  @State() collapsed = true;

  /** Number of slotted io-breadcrumb-item elements */
  @State() itemCount = 0;

  /** Generated JSON-LD string for schema.org BreadcrumbList */
  @State() jsonLd = '';

  /** Whether the hidden-items popover is open */
  @State() popoverOpen = false;

  // ── Props ─────────────────────────────────────────────────────

  /**
   * Accessible label for the nav landmark. Override for non-English UIs or when
   * multiple breadcrumbs appear on the same page (WCAG 2.4.6 / 4.1.2).
   */
  @Prop() label = 'Breadcrumb';

  /**
   * Maximum visible items before collapsing intermediate items into an expand button.
   * When set and the item count exceeds this value, items between the first and
   * last (maxItems − 1) are hidden. Activating the expand button reveals hidden
   * items via a popover menu (no layout shift).
   * Screen readers receive a descriptive label on the expand button (WCAG 1.3.1).
   */
  @Prop() maxItems?: number;

  /**
   * When true, renders a <script type="application/ld+json"> child containing a
   * schema.org BreadcrumbList graph. Defaults to false to avoid duplicate JSON-LD
   * when consumers manage their own structured data.
   * Guard with SSG safety: the script is only injected client-side.
   */
  @Prop() seo = false;

  // ── Watchers ──────────────────────────────────────────────────

  @Watch('collapsed')
  @Watch('maxItems')
  onCollapseChange() {
    this.applyVisibility();
  }

  @Watch('seo')
  onSeoChange() {
    this.regenerateJsonLd();
  }

  // ── Lifecycle ─────────────────────────────────────────────────

  disconnectedCallback() {
    this.removeExpandButton();
    this.detachPopoverListeners();
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
    this.regenerateJsonLd();
  };

  private removeExpandButton() {
    if (this.expandLi) {
      this.expandLi.remove();
      this.expandLi = null;
    }
    this.detachPopoverListeners();
    if (this.popoverEl) {
      this.popoverEl.remove();
      this.popoverEl = null;
    }
    this.triggerBtn = null;
  }

  // ── JSON-LD generation (#969) ──────────────────────────────────

  private regenerateJsonLd() {
    if (typeof document === 'undefined') return; // SSG guard
    if (!this.seo) {
      this.jsonLd = '';
      return;
    }

    const items = Array.from(this.el.querySelectorAll('io-breadcrumb-item')) as Array<HTMLElement & { href?: string; current?: boolean }>;
    const listElements: JsonLdItem[] = items.map((item, i) => {
      const name = item.textContent?.trim() ?? '';
      const href = item.getAttribute('href') ?? '';
      const entry: JsonLdItem = {
        '@type': 'ListItem',
        position: i + 1,
        name,
      };
      // Only set `item` (URL) for non-current items that have an href
      if (href && !item.hasAttribute('current')) {
        entry.item = href.startsWith('http') ? href : `${window.location.origin}${href}`;
      }
      return entry;
    });

    const graph = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: listElements,
    };

    this.jsonLd = JSON.stringify(graph);
  }

  // ── Popover for hidden items (#960) ────────────────────────────

  private detachPopoverListeners() {
    if (this.triggerBtn) {
      this.triggerBtn.removeEventListener('click', this.handleTriggerClick);
    }
  }

  private handleTriggerClick = () => {
    if (!this.popoverEl) return;
    this.popoverOpen = !this.popoverOpen;
    this.triggerBtn?.setAttribute('aria-expanded', String(this.popoverOpen));
    if (this.popoverOpen) {
      (this.popoverEl as any).open = true;
    } else {
      (this.popoverEl as any).open = false;
    }
  };

  private handlePopoverClose = () => {
    this.popoverOpen = false;
    this.triggerBtn?.setAttribute('aria-expanded', 'false');
    this.triggerBtn?.focus();
  };

  private applyVisibility() {
    const items = Array.from(this.el.querySelectorAll('io-breadcrumb-item')) as HTMLElement[];
    const total = items.length;

    this.removeExpandButton();

    if (!this.maxItems || !this.collapsed || total <= this.maxItems) {
      items.forEach(item => {
        item.classList.remove('breadcrumb-item--hidden');
      });
      return;
    }

    const showLastCount = Math.max(this.maxItems - 1, 1);
    const hideStart = 1;
    const hideEnd = total - showLastCount;
    const hiddenCount = hideEnd - hideStart;

    const hiddenItems: HTMLElement[] = [];

    items.forEach((item, i) => {
      if (i >= hideStart && i < hideEnd) {
        item.classList.add('breadcrumb-item--hidden');
        hiddenItems.push(item);
      } else {
        item.classList.remove('breadcrumb-item--hidden');
      }
    });

    // Inject popover trigger into light DOM after first item
    if (hiddenCount > 0 && items[0]) {
      this.expandLi = document.createElement('li');
      this.expandLi.className = 'breadcrumb__expand-item';

      // Build the trigger button
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('aria-label', `Show ${hiddenCount} hidden breadcrumb item${hiddenCount !== 1 ? 's' : ''}`);
      btn.setAttribute('aria-haspopup', 'menu');
      btn.setAttribute('aria-expanded', 'false');
      btn.textContent = '…'; // …
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

      // Build popover with hidden items as links
      const popover = document.createElement('io-popover') as HTMLIoPopoverElement & { open?: boolean };
      popover.setAttribute('placement', 'bottom-start');
      (popover as any).triggerEl = btn;

      // Build a menu list of the hidden items
      const menu = document.createElement('ul');
      menu.setAttribute('role', 'menu');
      menu.style.cssText = [
        'list-style:none',
        'margin:0',
        'padding:var(--io-space-1,4px) 0',
        'min-width:8rem',
      ].join(';');

      hiddenItems.forEach(hiddenItem => {
        const liEl = document.createElement('li');
        liEl.setAttribute('role', 'menuitem');
        const href = hiddenItem.getAttribute('href') ?? '';
        const text = hiddenItem.textContent?.trim() ?? '';
        if (href) {
          const anchor = document.createElement('a');
          anchor.href = href;
          anchor.textContent = text;
          anchor.style.cssText = [
            'display:block',
            'padding:var(--io-space-2,8px) var(--io-space-3,12px)',
            'color:var(--io-text-primary)',
            'text-decoration:none',
            'font-family:var(--io-font-primary,inherit)',
            'font-size:var(--io-font-size-base,1rem)',
          ].join(';');
          liEl.appendChild(anchor);
        } else {
          const span = document.createElement('span');
          span.textContent = text;
          span.style.cssText = [
            'display:block',
            'padding:var(--io-space-2,8px) var(--io-space-3,12px)',
            'color:var(--io-text-secondary)',
            'font-family:var(--io-font-primary,inherit)',
            'font-size:var(--io-font-size-base,1rem)',
          ].join(';');
          liEl.appendChild(span);
        }
        menu.appendChild(liEl);
      });

      popover.appendChild(menu);

      // Wire events
      btn.addEventListener('click', this.handleTriggerClick);
      popover.addEventListener('ioPopoverClose' as any, this.handlePopoverClose);

      this.triggerBtn = btn;
      this.popoverEl = popover as HTMLIoPopoverElement;
      this.expandLi.appendChild(btn);
      this.expandLi.appendChild(popover);
      items[0].insertAdjacentElement('afterend', this.expandLi);
    }
  }

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
        {this.seo && this.jsonLd && (
          <script type="application/ld+json" innerHTML={this.jsonLd}></script>
        )}
      </Host>
    );
  }
}
