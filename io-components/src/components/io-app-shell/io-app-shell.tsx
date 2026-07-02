import {
  Component,
  Prop,
  Event,
  EventEmitter,
  Element,
  Host,
  Watch,
  Listen,
  h,
} from '@stencil/core';

import { getAppShellStyles } from './io-app-shell-styles';
import { getShellFocusableElements } from './io-app-shell-utils';
import type {
  IoAppShellSidebarStartUpdateDetail,
  IoAppShellSidebarEndDismissDetail,
} from './types';

const MAIN_CONTENT_ID = 'io-app-shell-main';

let _focusTrapHandler: ((e: KeyboardEvent) => void) | null = null;

/**
 * io-app-shell
 * ============
 * Reusable full-page application shell with sticky header, collapsible
 * sidebar navigation, optional secondary sidebar, and main content area.
 *
 * Reuses focus-trap and scroll-lock patterns from io-flyout.
 * The sidebar-start panel becomes a modal overlay on mobile (< lg breakpoint).
 *
 * @slot header-start  - Brand logo, wordmark, hamburger toggle.
 * @slot title         - Page or app title in the header centre.
 * @slot header-end    - User menu, notifications, theme toggle.
 * @slot sidebar-start - Primary navigation sidebar.
 * @slot             - Main content area (default slot).
 * @slot sidebar-end   - Optional secondary panel (properties, inspector).
 * @slot footer        - Sticky footer.
 * @slot background    - Hero media behind the entire shell (fixed).
 *
 * @example
 * <io-app-shell sidebar-start-open>
 *   <nav slot="sidebar-start">Navigation</nav>
 *   <main>Page content</main>
 * </io-app-shell>
 */
@Component({
  tag: 'io-app-shell',
  shadow: { delegatesFocus: true },
})
export class IoAppShell {
  @Element() el!: HTMLElement;

  private sidebarStartEl: HTMLElement | undefined;
  private prevActiveEl: HTMLElement | null = null;

  // ── Props ─────────────────────────────────────────────────────

  /** Whether the sidebar-start panel is open. */
  @Prop({ mutable: true, reflect: true }) sidebarStartOpen = false;

  /** Whether the sidebar-end panel is open. */
  @Prop({ mutable: true, reflect: true }) sidebarEndOpen = false;

  /** Height of the sticky header bar. Used as CSS variable. */
  @Prop() headerHeight: string | undefined;

  // ── Events ────────────────────────────────────────────────────

  /** Emitted when the user requests to open or close the sidebar-start. */
  @Event() sidebarStartUpdate!: EventEmitter<IoAppShellSidebarStartUpdateDetail>;

  /** Emitted when the user dismisses the sidebar-end. */
  @Event() sidebarEndDismiss!: EventEmitter<IoAppShellSidebarEndDismissDetail>;

  // ── Lifecycle ─────────────────────────────────────────────────

  componentWillLoad() {
    // intentionally empty — IDs not needed here
  }

  componentDidLoad() {
    if (this.sidebarStartOpen) {
      this.handleSidebarStartOpen();
    }
  }

  disconnectedCallback() {
    this.detachFocusTrap();
    document.body.style.overflow = '';
  }

  // ── Watchers ──────────────────────────────────────────────────

  @Watch('sidebarStartOpen')
  onSidebarStartOpenChange(open: boolean) {
    if (open) {
      this.handleSidebarStartOpen();
    } else {
      this.handleSidebarStartClose();
    }
  }

  @Watch('sidebarEndOpen')
  onSidebarEndOpenChange(open: boolean) {
    if (!open) {
      this.sidebarEndDismiss.emit({ reason: 'close-button' });
    }
  }

  // ── Event listeners ───────────────────────────────────────────

  @Listen('keydown', { target: 'document' })
  onDocumentKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      if (this.sidebarStartOpen) {
        this.closeSidebarStart('escape');
      } else if (this.sidebarEndOpen) {
        this.sidebarEndOpen = false;
        this.sidebarEndDismiss.emit({ reason: 'escape' });
      }
    }
  }

  // ── Helpers ───────────────────────────────────────────────────

  private handleSidebarStartOpen() {
    this.prevActiveEl = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      this.sidebarStartEl = this.el.shadowRoot?.querySelector<HTMLElement>('.shell__sidebar-start') ?? undefined;
      this.detachFocusTrap();
      if (this.sidebarStartEl) {
        this.attachFocusTrap(this.sidebarStartEl);
        const first = getShellFocusableElements(this.sidebarStartEl)[0];
        first?.focus();
      }
    });
  }

  private handleSidebarStartClose() {
    this.detachFocusTrap();
    document.body.style.overflow = '';
    this.prevActiveEl?.focus();
    this.prevActiveEl = null;
  }

  private closeSidebarStart(reason: 'backdrop' | 'escape' | 'close-button') {
    this.sidebarStartOpen = false;
    this.sidebarStartUpdate.emit({ open: false });
    if (reason === 'backdrop') {
      this.sidebarEndDismiss.emit({ reason: 'backdrop' });
    }
  }

  private attachFocusTrap(container: HTMLElement) {
    _focusTrapHandler = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const focusable = getShellFocusableElements(container);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement;

      if (e.shiftKey) {
        if (active === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', _focusTrapHandler);
  }

  private detachFocusTrap() {
    if (_focusTrapHandler) {
      document.removeEventListener('keydown', _focusTrapHandler);
      _focusTrapHandler = null;
    }
  }

  // ── Handlers ─────────────────────────────────────────────────

  private handleBackdropClick = () => {
    this.closeSidebarStart('backdrop');
  };

  // ── Render ────────────────────────────────────────────────────

  render() {
    const hostStyle: Record<string, string> = {};
    if (this.headerHeight) {
      hostStyle['--io-app-shell-header-height'] = this.headerHeight;
    }

    const showBackdrop = this.sidebarStartOpen;

    return (
      <Host style={hostStyle}>
        <style>{getAppShellStyles()}</style>

        {/* Skip to main content — WCAG 2.4.1 */}
        <a
          class="shell__skip-link"
          href={`#${MAIN_CONTENT_ID}`}
        >
          Skip to main content
        </a>

        {/* Background media */}
        <div class="shell__background" aria-hidden="true">
          <slot name="background" />
        </div>

        {/* Header */}
        <header class="shell__header" role="banner">
          <div class="shell__header-start">
            <slot name="header-start" />
          </div>
          <div class="shell__header-title">
            <slot name="title" />
          </div>
          <div class="shell__header-end">
            <slot name="header-end" />
          </div>
        </header>

        {/* Backdrop for mobile sidebar-start */}
        {showBackdrop && (
          <div
            class={`shell__backdrop${showBackdrop ? ' shell__backdrop--visible' : ''}`}
            aria-hidden="true"
            onClick={this.handleBackdropClick}
          />
        )}

        {/* Body */}
        <div class="shell__body">
          {/* Sidebar start */}
          <aside
            class={`shell__sidebar-start${!this.sidebarStartOpen ? ' shell__sidebar-start--closed' : ''}`}
            aria-label="Primary navigation"
            aria-hidden={!this.sidebarStartOpen ? 'true' : undefined}
          >
            <slot name="sidebar-start" />
          </aside>

          {/* Main */}
          <main
            id={MAIN_CONTENT_ID}
            class="shell__main"
            tabIndex={-1}
          >
            <slot />
          </main>

          {/* Sidebar end */}
          {this.sidebarEndOpen && (
            <aside
              class={`shell__sidebar-end${!this.sidebarEndOpen ? ' shell__sidebar-end--closed' : ''}`}
              aria-label="Secondary panel"
            >
              <slot name="sidebar-end" />
            </aside>
          )}
        </div>

        {/* Footer */}
        <footer class="shell__footer">
          <slot name="footer" />
        </footer>
      </Host>
    );
  }
}
