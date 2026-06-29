import { createToastEntry, hasToastText, isToastPersistent } from './io-toast-utils';

import type { IoToastMessage, IoToastEntry } from './types';

const DEFAULT_DURATION = 6000;
/** Gap before showing next queued item — matches slide-out animation duration. */
const DISMISS_DELAY = 200;
/** Maximum number of toasts visible simultaneously. */
export const MAX_VISIBLE = 3;

type RefreshFn = (entries: IoToastEntry[]) => void;

/**
 * IoToastManagerClass — singleton service that owns the toast queue.
 *
 * Only one `<io-toast>` element may be registered at a time.
 * The component registers a `refreshFn` callback in `connectedCallback`
 * and unregisters in `disconnectedCallback`.
 *
 * Consumers call `element.addToast()` (which delegates here) or import
 * `toastManager` directly.
 *
 * Up to `maxVisible` (default 3) toasts are shown simultaneously. Additional
 * toasts are queued and promoted as visible slots open up.
 */
export class IoToastManagerClass {
  private queue: IoToastEntry[] = [];
  private visible: IoToastEntry[] = [];
  private hostEl: HTMLElement | null = null;
  private refreshFn: RefreshFn | null = null;
  private timers: Map<number, ReturnType<typeof setTimeout>> = new Map();
  private nextId = 0;
  maxVisible: number = MAX_VISIBLE;

  // ── Registration ──────────────────────────────────────────────

  register(refreshFn: RefreshFn): void {
    if (this.hostEl) {
      console.error('[io-toast] Only one <io-toast> may exist per page. Multiple instances detected.');
      return;
    }
    // hostEl used only to track registration; we just need the callback
    this.hostEl = document.createElement('io-toast');
    this.refreshFn = refreshFn;
  }

  unregister(): void {
    this.clearAllTimers();
    this.queue = [];
    this.visible = [];
    this.hostEl = null;
    this.refreshFn = null;
  }

  // ── Public API ────────────────────────────────────────────────

  addToast(message: IoToastMessage): void {
    if (!this.refreshFn) {
      console.warn('[io-toast] addToast() called but no <io-toast> element is mounted.');
      return;
    }
    if (!hasToastText(message)) {
      console.warn('[io-toast] addToast() called with empty text.');
      return;
    }

    const entry = createToastEntry(message, this.nextId++);

    if (this.visible.length < this.maxVisible) {
      this.show(entry);
    } else {
      this.queue.push(entry);
    }
  }

  /**
   * Dismiss a specific toast by id, or the oldest visible toast when no id given.
   */
  dismiss(id?: number): void {
    if (id !== undefined) {
      this.dismissById(id);
    } else {
      // Dismiss oldest visible toast (first in array)
      const oldest = this.visible[0];
      if (oldest) {
        this.dismissById(oldest.id);
      }
    }
  }

  /** Dismiss all visible and queued toasts immediately. */
  dismissAll(): void {
    this.clearAllTimers();
    this.visible = [];
    this.queue = [];
    this.refreshFn?.(this.visible.slice());
  }

  /** Returns a readonly snapshot of the full queue (visible + pending). */
  getQueue(): readonly IoToastEntry[] {
    return [...this.visible, ...this.queue];
  }

  /** @deprecated Use getQueue() or getVisible(). Returns oldest visible entry or null. */
  getCurrent(): IoToastEntry | null {
    return this.visible[0] ?? null;
  }

  /** Returns the currently visible entries (up to maxVisible). */
  getVisible(): readonly IoToastEntry[] {
    return this.visible.slice();
  }

  // ── Private ───────────────────────────────────────────────────

  private dismissById(id: number): void {
    const idx = this.visible.findIndex((e) => e.id === id);
    if (idx === -1) return;

    this.clearTimer(id);
    this.visible.splice(idx, 1);
    this.refreshFn?.(this.visible.slice());

    // After a short delay, promote the next queued item into the vacant slot
    setTimeout(() => {
      const next = this.queue.shift();
      if (next) {
        this.show(next);
      }
    }, DISMISS_DELAY);
  }

  private show(entry: IoToastEntry): void {
    this.visible.push(entry);
    this.refreshFn?.(this.visible.slice());
    this.scheduleTimer(entry);
  }

  private scheduleTimer(entry: IoToastEntry): void {
    if (isToastPersistent(entry)) return;
    const duration = entry.duration ?? DEFAULT_DURATION;
    if (duration > 0) {
      const timerId = setTimeout(() => this.dismissById(entry.id), duration);
      this.timers.set(entry.id, timerId);
    }
  }

  private clearTimer(id: number): void {
    const timerId = this.timers.get(id);
    if (timerId !== undefined) {
      clearTimeout(timerId);
      this.timers.delete(id);
    }
  }

  private clearAllTimers(): void {
    this.timers.forEach((timerId) => clearTimeout(timerId));
    this.timers.clear();
  }
}

export const toastManager = new IoToastManagerClass();
