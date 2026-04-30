import { computePosition } from '@floating-ui/dom';

import { getTooltipMiddleware } from '../components/io-tooltip/io-tooltip-utils';

import type { IoTooltipPlacement } from '../components/io-tooltip/types';

const TOOLTIP_ATTR = 'io-tooltip';
const TOOLTIP_PLACEMENT_ATTR = 'io-tooltip-placement';
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

let activeTrigger: HTMLElement | null = null;
let tooltipEl: HTMLDivElement | null = null;
let listenersBound = false;

let pointerOverHandler: ((ev: Event) => void) | null = null;
let pointerOutHandler: ((ev: MouseEvent) => void) | null = null;
let focusInHandler: ((ev: FocusEvent) => void) | null = null;
let focusOutHandler: ((ev: FocusEvent) => void) | null = null;
let keyDownHandler: ((ev: KeyboardEvent) => void) | null = null;

function isPlacement(value: string | null): value is IoTooltipPlacement {
  return value === 'top' || value === 'bottom' || value === 'left' || value === 'right';
}

function resolvePlacement(trigger: HTMLElement): IoTooltipPlacement {
  const value = trigger.getAttribute(TOOLTIP_PLACEMENT_ATTR);
  return isPlacement(value) ? value : 'top';
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

async function onPointerOver(ev: Event): Promise<void> {
  const trigger = findTooltipTrigger(ev.target);
  if (!trigger) return;
  await showTooltip(trigger);
}

function onPointerOut(ev: MouseEvent): void {
  if (!activeTrigger) return;
  const next = ev.relatedTarget;
  if (next instanceof Node && activeTrigger.contains(next)) return;
  hideTooltip();
}

async function onFocusIn(ev: FocusEvent): Promise<void> {
  const trigger = findTooltipTrigger(ev.target);
  if (!trigger) return;
  await showTooltip(trigger);
}

function onFocusOut(ev: FocusEvent): void {
  if (!activeTrigger) return;
  const next = ev.relatedTarget;
  if (next instanceof Node && activeTrigger.contains(next)) return;
  hideTooltip();
}

function onKeyDown(ev: KeyboardEvent): void {
  if (ev.key === 'Escape' && activeTrigger) {
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

  pointerOverHandler = (ev) => { void onPointerOver(ev); };
  pointerOutHandler = onPointerOut;
  focusInHandler = (ev) => { void onFocusIn(ev); };
  focusOutHandler = onFocusOut;
  keyDownHandler = onKeyDown;

  document.addEventListener('pointerover', pointerOverHandler, true);
  document.addEventListener('pointerout', pointerOutHandler, true);
  document.addEventListener('focusin', focusInHandler, true);
  document.addEventListener('focusout', focusOutHandler, true);
  document.addEventListener('keydown', keyDownHandler, true);
  window.addEventListener('resize', onWindowChange, true);
  window.addEventListener('scroll', onWindowChange, true);

  listenersBound = true;
}

export function __resetTooltipAttributeForTests(): void {
  if (pointerOverHandler) document.removeEventListener('pointerover', pointerOverHandler, true);
  if (pointerOutHandler) document.removeEventListener('pointerout', pointerOutHandler, true);
  if (focusInHandler) document.removeEventListener('focusin', focusInHandler, true);
  if (focusOutHandler) document.removeEventListener('focusout', focusOutHandler, true);
  if (keyDownHandler) document.removeEventListener('keydown', keyDownHandler, true);
  window.removeEventListener('resize', onWindowChange, true);
  window.removeEventListener('scroll', onWindowChange, true);

  pointerOverHandler = null;
  pointerOutHandler = null;
  focusInHandler = null;
  focusOutHandler = null;
  keyDownHandler = null;

  activeTrigger = null;
  tooltipEl?.remove();
  tooltipEl = null;
  listenersBound = false;
  // Clear the cross-instance window flag so tests can re-initialise cleanly.
  delete (globalThis as WinWithFlag)[WIN_INIT_FLAG];
}
