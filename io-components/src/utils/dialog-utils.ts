/**
 * dialog-utils.ts
 * ===============
 * Shared utilities used by io-modal, io-drawer, io-flyout, and io-sheet.
 *
 * All functions are pure helpers — no Stencil component is created.
 * Each dialog component uses its own @State and @Prop; these utilities
 * only eliminate duplicated imperative logic.
 *
 * No public component APIs are changed by using these utilities.
 */

// ── Focusable element selectors ───────────────────────────────────────────────

/**
 * CSS selector that matches all standard keyboard-focusable elements,
 * excluding explicitly removed ones (tabindex="-1", disabled).
 */
export const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * Returns all focusable elements inside a panel element, including both
 * shadow DOM elements and slotted light-DOM elements.
 *
 * Uses `document.activeElement` semantics — works correctly with Shadow DOM
 * and slotted content. `shadowRoot.activeElement` returns the slot host, not
 * the focused node, and must not be used for focus comparison.
 *
 * @param panelEl - The container element to search within.
 */
export function getPanelFocusableElements(panelEl: HTMLElement): HTMLElement[] {
  const shadowFocusable = Array.from(
    panelEl.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS),
  );

  const slots = Array.from(panelEl.querySelectorAll('slot')) as HTMLSlotElement[];
  const slottedFocusable = slots.flatMap((slot) =>
    Array.from(slot.assignedElements({ flatten: true })).flatMap((el) => {
      const matches: HTMLElement[] = [];
      if ((el as HTMLElement).matches(FOCUSABLE_SELECTORS)) {
        matches.push(el as HTMLElement);
      }
      matches.push(...Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)));
      return matches;
    }),
  );

  return [...shadowFocusable, ...slottedFocusable];
}

// ── Scroll lock ───────────────────────────────────────────────────────────────

/**
 * Prevents the document body from scrolling.
 * Call when an overlay opens.
 */
export function lockBodyScroll(): void {
  document.body.style.overflow = 'hidden';
}

/**
 * Restores the document body scroll state.
 * Call when an overlay closes.
 *
 * @param savedOverflow - The overflow value captured before locking
 *   (default: '' which removes the inline style).
 */
export function unlockBodyScroll(savedOverflow = ''): void {
  document.body.style.overflow = savedOverflow;
}

// ── Inert siblings ────────────────────────────────────────────────────────────

/**
 * Applies the `inert` attribute to all sibling elements of `hostEl`
 * (excluding script/style tags) so that screen readers and keyboard
 * navigation cannot reach background content while an overlay is open.
 *
 * Returns the list of elements that had `inert` applied so they can be
 * restored later via `removeDialogInert()`.
 *
 * @param hostEl - The overlay host element (e.g. the `<io-modal>` element).
 * @param filter - Optional extra filter function. Return `false` to skip a sibling.
 */
export function applyDialogInert(
  hostEl: HTMLElement,
  filter?: (el: Element) => boolean,
): Element[] {
  const parent = hostEl.parentElement;
  if (!parent) return [];

  const inerted: Element[] = [];
  Array.from(parent.children).forEach((sibling) => {
    if (sibling === hostEl) return;
    if (['SCRIPT', 'STYLE'].includes(sibling.tagName)) return;
    if (filter && !filter(sibling)) return;
    if (!(sibling as HTMLElement).hasAttribute('inert')) {
      (sibling as HTMLElement).setAttribute('inert', '');
      inerted.push(sibling);
    }
  });
  return inerted;
}

/**
 * Removes the `inert` attribute from elements previously inerted by
 * `applyDialogInert()`.
 *
 * @param inertedElements - The array returned by `applyDialogInert()`.
 *   The array is cleared after removal.
 */
export function removeDialogInert(inertedElements: Element[]): void {
  inertedElements.forEach((el) => (el as HTMLElement).removeAttribute('inert'));
  inertedElements.length = 0;
}

// ── Focus trap ────────────────────────────────────────────────────────────────

/**
 * Options for `attachDialogFocusTrap`.
 */
export interface FocusTrapOptions {
  /**
   * Custom function to resolve the currently focused element.
   * Defaults to `document.activeElement`.
   *
   * Override when the component needs to perform its own
   * shadow-root `:focus` fallback (e.g. io-sheet).
   */
  getActiveElement?: () => HTMLElement | null;
}

/**
 * Attaches a keyboard focus trap to `panelEl`.
 *
 * The trap intercepts `Tab` / `Shift+Tab` keydowns and cycles focus
 * between the first and last focusable elements returned by
 * `getFocusable()`. If only one focusable element exists the trap is a
 * no-op (browser default focus behaviour is fine with one element).
 *
 * Always call `detachDialogFocusTrap()` before calling this function to
 * avoid listener leaks on re-open (CLAUDE.md convention).
 *
 * @param panelEl       - The dialog / panel element that receives the listener.
 * @param getFocusable  - Function returning current focusable elements.
 * @param options       - Optional overrides (see `FocusTrapOptions`).
 * @returns             The handler function — pass it to `detachDialogFocusTrap`.
 */
export function attachDialogFocusTrap(
  panelEl: HTMLElement,
  getFocusable: () => HTMLElement[],
  options: FocusTrapOptions = {},
): (ev: KeyboardEvent) => void {
  const handler = (ev: KeyboardEvent) => {
    if (ev.key !== 'Tab') return;
    const focusable = getFocusable();
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const active: HTMLElement | null = options.getActiveElement
      ? options.getActiveElement()
      : (document.activeElement as HTMLElement | null);

    if (ev.shiftKey && active === first) {
      ev.preventDefault();
      last.focus();
    } else if (!ev.shiftKey && active === last) {
      ev.preventDefault();
      first.focus();
    }
  };

  panelEl.addEventListener('keydown', handler);
  return handler;
}

/**
 * Detaches a focus trap listener previously attached by `attachDialogFocusTrap`.
 *
 * @param panelEl - The element the listener was attached to.
 * @param handler - The handler returned by `attachDialogFocusTrap`.
 */
export function detachDialogFocusTrap(
  panelEl: HTMLElement | undefined,
  handler: ((ev: KeyboardEvent) => void) | undefined,
): void {
  if (!panelEl || !handler) return;
  panelEl.removeEventListener('keydown', handler);
}
