import type { IoToastMessage, IoToastEntry } from './types';

const DEFAULT_DURATION = 6000;
/** Gap before showing next queued item — matches slide-out animation duration. */
const DISMISS_DELAY = 200;

type RefreshFn = (entry: IoToastEntry | null) => void;

/**
 * IoToastManagerClass — singleton service that owns the toast queue.
 *
 * Only one `<io-toast>` element may be registered at a time.
 * The component registers a `refreshFn` callback in `connectedCallback`
 * and unregisters in `disconnectedCallback`.
 *
 * Consumers call `element.addToast()` (which delegates here) or import
 * `toastManager` directly.
 */
export class IoToastManagerClass {
  private queue: IoToastEntry[] = [];
  private current: IoToastEntry | null = null;
  private hostEl: HTMLElement | null = null;
  private refreshFn: RefreshFn | null = null;
  private timerId: ReturnType<typeof setTimeout> | null = null;
  private nextId = 0;

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
    this.clearTimer();
    this.queue = [];
    this.current = null;
    this.hostEl = null;
    this.refreshFn = null;
  }

  // ── Public API ────────────────────────────────────────────────

  addToast(message: IoToastMessage): void {
    if (!this.refreshFn) {
      console.warn('[io-toast] addToast() called but no <io-toast> element is mounted.');
      return;
    }
    if (!message.text?.trim()) {
      console.warn('[io-toast] addToast() called with empty text.');
      return;
    }

    const entry: IoToastEntry = {
      variant: 'neutral',
      ...message,
      id: this.nextId++,
    };

    if (this.current === null) {
      this.show(entry);
    } else {
      this.queue.push(entry);
    }
  }

  dismiss(): void {
    this.clearTimer();
    this.current = null;
    this.refreshFn?.(null);

    setTimeout(() => {
      const next = this.queue.shift();
      if (next) {
        this.show(next);
      }
    }, DISMISS_DELAY);
  }

  getCurrent(): IoToastEntry | null {
    return this.current;
  }

  // ── Private ───────────────────────────────────────────────────

  private show(entry: IoToastEntry): void {
    this.current = entry;
    this.refreshFn?.(entry);
    this.scheduleTimer(entry);
  }

  private scheduleTimer(entry: IoToastEntry): void {
    const duration = entry.duration ?? DEFAULT_DURATION;
    if (duration > 0) {
      this.timerId = setTimeout(() => this.dismiss(), duration);
    }
  }

  private clearTimer(): void {
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }
}

export const toastManager = new IoToastManagerClass();
