import { computePosition } from '@floating-ui/dom';

import { getTooltipMiddleware } from '../components/io-tooltip/io-tooltip-utils';

import type { IoTooltipPlacement } from '../components/io-tooltip/types';

const TOOLTIP_ATTR = 'io-tooltip';
const TOOLTIP_PLACEMENT_ATTR = 'io-tooltip-placement';
const TOOLTIP_THEME_ATTR = 'io-tooltip-theme';
const TOOLTIP_SELECTOR = `[${TOOLTIP_ATTR}]`;
const TOOLTIP_ID = 'io-tooltip-attribute-overlay';
const DESCRIBEDBY_BACKUP_ATTR = 'data-io-tooltip-prev-describedby';

// Cross-module-instance guard. The Stencil bundle and the storefront may each
// import this module as separate instances (different module specifiers). The
// module-level `listenersBound` flag prevents double-registration within one
// instance; this window flag coordinates across instances so only one set of
// listeners and one overlay element is created in a given browsing context.
const WIN_INIT_FLAG = '__io_tooltip_attr_init';
type WinWithFlag = typeof globalThis & { [WIN_INIT_FLAG]?: boolean };

// Fallback delay values — actual values are read from CSS custom properties
// on :root to honour --io-tooltip-show-delay and --io-tooltip-hide-delay tokens.
// DEFAULT_SHOW_DELAY_MS is 0 so that when the CSS token is absent (e.g. in tests
// without a full CSS environment) show is immediate. The CSS token sets the real
// browser default to 500ms.
const DEFAULT_SHOW_DELAY_MS = 0;
const DEFAULT_HIDE_DELAY_MS = 150;

// Long-press threshold for touch devices (matches --io-tooltip-show-delay default).
const LONG_PRESS_MS = 500;

let activeTrigger: HTMLElement | null = null;
let tooltipEl: HTMLDivElement | null = null;
let listenersBound = false;
let hideTimer: ReturnType<typeof setTimeout> | null = null;
let showTimer: ReturnType<typeof setTimeout> | null = null;
let longPressTimer: ReturnType<typeof setTimeout> | null = null;
let longPressTarget: HTMLElement | null = null;

let pointerOverHandler: ((ev: PointerEvent) => void) | null = null;
let pointerOutHandler: ((ev: PointerEvent) => void) | null = null;
let pointerDownHandler: ((ev: PointerEvent) => void) | null = null;
let pointerUpHandler: ((ev: PointerEvent) => void) | null = null;
let focusInHandler: ((ev: FocusEvent) => void) | null = null;
let focusOutHandler: ((ev: FocusEvent) => void) | null = null;
let keyDownHandler: ((ev: KeyboardEvent) => void) | null = null;
let clickOutsideHandler: ((ev: MouseEvent) => void) | null = null;

/**
 * Read a CSS custom property integer/ms value from the document root.
 * Falls back to the provided default when the property is absent or unparseable.
 */
function readCssDelayMs(propertyName: string, fallback: number): number {
  if (typeof getComputedStyle === 'undefined') return fallback;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(propertyName).trim();
  if (!raw) return fallback;
  if (raw.endsWith('ms')) {
    const n = parseFloat(raw);
    return isNaN(n) ? fallback : n;
  }
  if (raw.endsWith('s')) {
    const n = parseFloat(raw);
    return isNaN(n) ? fallback : n * 1000;
  }
  const n = parseFloat(raw);
  return isNaN(n) ? fallback : n;
}

function isPlacement(value: string | null): value is IoTooltipPlacement {
  return (
    value === 'top' ||
    value === 'top-start' ||
    value === 'top-end' ||
    value === 'bottom' ||
    value === 'bottom-start' ||
    value === 'bottom-end' ||
    value === 'left' ||
    value === 'left-start' ||
    value === 'left-end' ||
    value === 'right' ||
    value === 'right-start' ||
    value === 'right-end'
  );
}

function cancelHideTimer(): void {
  if (hideTimer !== null) {
    clearTimeout(hideTimer);
    hideTimer = null;
  }
}

function cancelShowTimer(): void {
  if (showTimer !== null) {
    clearTimeout(showTimer);
    showTimer = null;
  }
}

function cancelLongPressTimer(): void {
  if (longPressTimer !== null) {
    clearTimeout(longPressTimer);
    longPressTimer = null;
  }
  longPressTarget = null;
}

function scheduleHide(): void {
  cancelHideTimer();
  const delayMs = readCssDelayMs('--io-tooltip-hide-delay', DEFAULT_HIDE_DELAY_MS);
  hideTimer = setTimeout(() => {
    hideTimer = null;
    hideTooltip();
  }, delayMs);
}

function scheduleShow(trigger: HTMLElement): void {
  cancelShowTimer();
  const delayMs = readCssDelayMs('--io-tooltip-show-delay', DEFAULT_SHOW_DELAY_MS);
  if (delayMs <= 0) {
    // No delay — show immediately (keeps async test flushing predictable).
    void showTooltip(trigger);
    return;
  }
  showTimer = setTimeout(() => {
    showTimer = null;
    void showTooltip(trigger);
  }, delayMs);
}

function resolvePlacement(trigger: HTMLElement): IoTooltipPlacement {
  const value = trigger.getAttribute(TOOLTIP_PLACEMENT_ATTR);
  return isPlacement(value) ? value : 'top';
}

function resolveTheme(trigger: HTMLElement): string | null {
  return trigger.getAttribute(TOOLTIP_THEME_ATTR);
}

function getTooltipText(trigger: HTMLElement): string {
  return (trigger.getAttribute(TOOLTIP_ATTR) ?? '').trim();
}

function ensureTooltipElement(): HTMLDivElement {
  if (tooltipEl) return tooltipEl;

  const el = document.createElement('div');
  el.id = TOOLTIP_ID;
  el.className = 'io-tooltip-overlay';
  el.setAttribute('role', 'tooltip');
  el.setAttribute('aria-hidden', 'true');

  document.body.appendChild(el);
  tooltipEl = el;
  return el;
}

function setDescribedBy(trigger: HTMLElement, describedById: string): void {
  const current = trigger.getAttribute('aria-describedby') ?? '';
  const ids = current.split(/\s+/).filter(Boolean);
  if (ids.includes(describedById)) return;

  if (!trigger.hasAttribute(DESCRIBEDBY_BACKUP_ATTR)) {
    trigger.setAttribute(DESCRIBEDBY_BACKUP_ATTR, current);
  }

  const next = [...ids, describedById].join(' ');
  trigger.setAttribute('aria-describedby', next);
}

function clearDescribedBy(trigger: HTMLElement, describedById: string): void {
  const previous = trigger.getAttribute(DESCRIBEDBY_BACKUP_ATTR);
  const current = trigger.getAttribute('aria-describedby') ?? '';

  if (previous !== null) {
    if (previous) {
      trigger.setAttribute('aria-describedby', previous);
    } else {
      trigger.removeAttribute('aria-describedby');
    }
    trigger.removeAttribute(DESCRIBEDBY_BACKUP_ATTR);
    return;
  }

  const next = current
    .split(/\s+/)
    .filter(Boolean)
    .filter(id => id !== describedById)
    .join(' ');

  if (next) {
    trigger.setAttribute('aria-describedby', next);
  } else {
    trigger.removeAttribute('aria-describedby');
  }
}

async function positionTooltip(trigger: HTMLElement): Promise<void> {
  const el = ensureTooltipElement();
  const placement = resolvePlacement(trigger);
  // Reset to origin before computing — floating-ui measures the element's current
  // position when calculating available space; an off-origin starting point causes
  // flip() to fire incorrectly and produces wrong placement.
  el.style.left = '0';
  el.style.top = '0';
  const { x, y } = await computePosition(trigger, el, {
    placement,
    strategy: 'fixed',
    middleware: getTooltipMiddleware(),
  });
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
}

async function showTooltip(trigger: HTMLElement): Promise<void> {
  const text = getTooltipText(trigger);
  if (!text) return;

  const el = ensureTooltipElement();

  if (activeTrigger && activeTrigger !== trigger) {
    clearDescribedBy(activeTrigger, TOOLTIP_ID);
  }

  activeTrigger = trigger;
  el.textContent = text;

  // Apply theme from trigger attribute
  const theme = resolveTheme(trigger);
  if (theme === 'light') {
    el.setAttribute('data-tooltip-theme', 'light');
  } else {
    el.removeAttribute('data-tooltip-theme');
  }

  setDescribedBy(trigger, TOOLTIP_ID);

  try {
    await positionTooltip(trigger);
    if (activeTrigger !== trigger) return;

    el.setAttribute('aria-hidden', 'false');
    el.setAttribute('data-visible', 'true');
  } catch {
    if (activeTrigger === trigger) {
      clearDescribedBy(trigger, TOOLTIP_ID);
      activeTrigger = null;
    }
    el.setAttribute('aria-hidden', 'true');
    el.removeAttribute('data-visible');
  }
}

function hideTooltip(): void {
  cancelHideTimer();
  const el = tooltipEl;
  if (!el) return;

  if (activeTrigger) {
    clearDescribedBy(activeTrigger, TOOLTIP_ID);
  }

  activeTrigger = null;
  el.setAttribute('aria-hidden', 'true');
  el.removeAttribute('data-visible');
}

function findTooltipTrigger(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof Element)) return null;
  const trigger = target.closest(TOOLTIP_SELECTOR);
  return trigger instanceof HTMLElement ? trigger : null;
}

function onPointerOver(ev: PointerEvent): void {
  // Touch events are handled by long-press (pointerdown/up), not hover.
  if (ev.pointerType === 'touch') return;

  // If pointer enters the tooltip panel itself, keep the tooltip visible.
  if (tooltipEl && ev.target instanceof Node && tooltipEl.contains(ev.target as Node)) {
    cancelHideTimer();
    return;
  }
  const trigger = findTooltipTrigger(ev.target);
  if (!trigger) return;
  cancelHideTimer();
  cancelShowTimer();
  scheduleShow(trigger);
}

function onPointerOut(ev: PointerEvent): void {
  // Touch events are handled by long-press (pointerdown/up), not hover.
  if (ev.pointerType === 'touch') return;

  cancelShowTimer();
  if (!activeTrigger) return;
  const next = ev.relatedTarget;
  // Pointer moved to a child of the trigger — stay visible.
  if (next instanceof Node && activeTrigger.contains(next as Node)) return;
  // Pointer moved onto the tooltip panel — stay visible (WCAG 1.4.13).
  if (tooltipEl && next instanceof Node && tooltipEl.contains(next as Node)) return;
  scheduleHide();
}

function onPointerDown(ev: PointerEvent): void {
  // Only handle touch long-press.
  if (ev.pointerType !== 'touch') return;
  const trigger = findTooltipTrigger(ev.target);
  if (!trigger) return;

  cancelLongPressTimer();
  longPressTarget = trigger;
  const longPressDuration = readCssDelayMs('--io-tooltip-show-delay', LONG_PRESS_MS);
  longPressTimer = setTimeout(() => {
    longPressTimer = null;
    if (longPressTarget === trigger) {
      void showTooltip(trigger);
    }
  }, longPressDuration);
}

function onPointerUp(ev: PointerEvent): void {
  if (ev.pointerType !== 'touch') return;
  // If released before long-press fires, cancel it (it was a tap, not a long-press).
  cancelLongPressTimer();
}

function onClickOutside(ev: MouseEvent): void {
  // Dismiss touch-triggered tooltip when user taps outside trigger and panel.
  if (!activeTrigger) return;
  if (activeTrigger.contains(ev.target as Node)) return;
  if (tooltipEl && tooltipEl.contains(ev.target as Node)) return;
  hideTooltip();
}

async function onFocusIn(ev: FocusEvent): Promise<void> {
  const trigger = findTooltipTrigger(ev.target);
  if (!trigger) return;
  cancelHideTimer();
  cancelShowTimer();
  await showTooltip(trigger);
}

function onFocusOut(ev: FocusEvent): void {
  cancelShowTimer();
  if (!activeTrigger) return;
  const next = ev.relatedTarget;
  if (next instanceof Node && activeTrigger.contains(next)) return;
  hideTooltip();
}

function onKeyDown(ev: KeyboardEvent): void {
  if (ev.key === 'Escape' && activeTrigger) {
    cancelShowTimer();
    cancelLongPressTimer();
    hideTooltip();
  }
}

function onWindowChange(): void {
  if (!activeTrigger) return;
  void positionTooltip(activeTrigger).catch(() => {
    hideTooltip();
  });
}

export function initTooltipAttribute(): void {
  if (typeof document === 'undefined' || listenersBound) return;
  // Cross-instance guard: bail if another module instance already initialised.
  const win = globalThis as WinWithFlag;
  if (win[WIN_INIT_FLAG]) return;
  win[WIN_INIT_FLAG] = true;

  pointerOverHandler = onPointerOver;
  pointerOutHandler = onPointerOut;
  pointerDownHandler = onPointerDown;
  pointerUpHandler = onPointerUp;
  focusInHandler = (ev) => { void onFocusIn(ev); };
  focusOutHandler = onFocusOut;
  keyDownHandler = onKeyDown;
  clickOutsideHandler = onClickOutside;

  document.addEventListener('pointerover', pointerOverHandler as EventListener, true);
  document.addEventListener('pointerout', pointerOutHandler as EventListener, true);
  document.addEventListener('pointerdown', pointerDownHandler as EventListener, true);
  document.addEventListener('pointerup', pointerUpHandler as EventListener, true);
  document.addEventListener('focusin', focusInHandler, true);
  document.addEventListener('focusout', focusOutHandler, true);
  document.addEventListener('keydown', keyDownHandler, true);
  document.addEventListener('click', clickOutsideHandler, true);
  window.addEventListener('resize', onWindowChange, true);
  window.addEventListener('scroll', onWindowChange, true);

  listenersBound = true;
}

export function __resetTooltipAttributeForTests(): void {
  if (pointerOverHandler) document.removeEventListener('pointerover', pointerOverHandler as EventListener, true);
  if (pointerOutHandler) document.removeEventListener('pointerout', pointerOutHandler as EventListener, true);
  if (pointerDownHandler) document.removeEventListener('pointerdown', pointerDownHandler as EventListener, true);
  if (pointerUpHandler) document.removeEventListener('pointerup', pointerUpHandler as EventListener, true);
  if (focusInHandler) document.removeEventListener('focusin', focusInHandler, true);
  if (focusOutHandler) document.removeEventListener('focusout', focusOutHandler, true);
  if (keyDownHandler) document.removeEventListener('keydown', keyDownHandler, true);
  if (clickOutsideHandler) document.removeEventListener('click', clickOutsideHandler, true);
  window.removeEventListener('resize', onWindowChange, true);
  window.removeEventListener('scroll', onWindowChange, true);

  pointerOverHandler = null;
  pointerOutHandler = null;
  pointerDownHandler = null;
  pointerUpHandler = null;
  focusInHandler = null;
  focusOutHandler = null;
  keyDownHandler = null;
  clickOutsideHandler = null;

  cancelHideTimer();
  cancelShowTimer();
  cancelLongPressTimer();
  activeTrigger = null;
  tooltipEl?.remove();
  tooltipEl = null;
  listenersBound = false;
  // Clear the cross-instance window flag so tests can re-initialise cleanly.
  delete (globalThis as WinWithFlag)[WIN_INIT_FLAG];
}
