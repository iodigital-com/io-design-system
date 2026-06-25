import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { IoCarousel } from './io-carousel';

function makeCarousel(): IoCarousel {
  const c = new IoCarousel();
  (c as any).el = {
    shadowRoot: null,
    querySelectorAll: vi.fn(() => []),
    matches: vi.fn(() => false),
    contains: vi.fn(() => false),
  };
  (c as any).headingId = 'test-heading';
  (c as any).autoplay = false;
  (c as any).autoplayInterval = 5000;
  (c as any).isAutoplayPaused = false;
  (c as any).isAutoplayUserPaused = false;
  (c as any).isAutoplayInteractionPaused = false;
  (c as any).autoplayTimer = null;
  (c as any).activeSlideIndex = 0;
  return c;
}

describe('io-carousel — autoplay', () => {
  let c: IoCarousel;

  beforeEach(() => {
    vi.useFakeTimers();
    c = makeCarousel();
    // Stub onNext to avoid DOM dependency
    (c as any).onNext = vi.fn();
    // Stub stopAutoplayTimer to track calls
    vi.spyOn(c as any, 'stopAutoplayTimer');
  });

  afterEach(() => {
    (c as any).stopAutoplayTimer();
    vi.useRealTimers();
  });

  it('startAutoplayTimer calls onNext after interval', () => {
    (c as any).startAutoplayTimer();
    vi.advanceTimersByTime(5000);
    expect((c as any).onNext).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(5000);
    expect((c as any).onNext).toHaveBeenCalledTimes(2);
  });

  it('startAutoplayTimer clears existing timer before starting new one', () => {
    (c as any).startAutoplayTimer();
    const firstTimer = (c as any).autoplayTimer;
    (c as any).startAutoplayTimer();
    expect((c as any).stopAutoplayTimer).toHaveBeenCalled();
    expect((c as any).autoplayTimer).not.toBe(firstTimer);
  });

  it('stopAutoplayTimer clears the interval and nulls timer', () => {
    (c as any).startAutoplayTimer();
    expect((c as any).autoplayTimer).not.toBeNull();
    vi.restoreAllMocks();
    (c as any).stopAutoplayTimer();
    expect((c as any).autoplayTimer).toBeNull();
    vi.advanceTimersByTime(10000);
    expect((c as any).onNext).not.toHaveBeenCalled();
  });

  it('onAutoplayToggle pauses when playing', () => {
    (c as any).autoplay = true;
    (c as any).startAutoplayTimer();
    (c as any).onAutoplayToggle();
    expect((c as any).isAutoplayUserPaused).toBe(true);
    expect((c as any).isAutoplayPaused).toBe(true);
    vi.advanceTimersByTime(10000);
    expect((c as any).onNext).not.toHaveBeenCalled();
  });

  it('onAutoplayToggle resumes when paused', () => {
    (c as any).autoplay = true;
    (c as any).isAutoplayUserPaused = true;
    (c as any).isAutoplayPaused = true;
    (c as any).onAutoplayToggle();
    expect((c as any).isAutoplayUserPaused).toBe(false);
    expect((c as any).isAutoplayPaused).toBe(false);
    vi.advanceTimersByTime(5000);
    expect((c as any).onNext).toHaveBeenCalledTimes(1);
  });

  it('onMouseEnter pauses autoplay', () => {
    (c as any).autoplay = true;
    (c as any).startAutoplayTimer();
    (c as any).onMouseEnter();
    expect((c as any).isAutoplayInteractionPaused).toBe(true);
    expect((c as any).isAutoplayPaused).toBe(true);
    vi.advanceTimersByTime(10000);
    expect((c as any).onNext).not.toHaveBeenCalled();
  });

  it('onMouseLeave resumes autoplay', () => {
    (c as any).autoplay = true;
    (c as any).isAutoplayInteractionPaused = true;
    (c as any).isAutoplayPaused = true;
    (c as any).onMouseLeave();
    expect((c as any).isAutoplayInteractionPaused).toBe(false);
    expect((c as any).isAutoplayPaused).toBe(false);
    vi.advanceTimersByTime(5000);
    expect((c as any).onNext).toHaveBeenCalledTimes(1);
  });

  it('onMouseLeave does not resume when user has paused', () => {
    (c as any).autoplay = true;
    (c as any).isAutoplayUserPaused = true;
    (c as any).isAutoplayInteractionPaused = true;
    (c as any).onMouseLeave();
    // Early return when user-paused — interaction paused state unchanged
    expect((c as any).isAutoplayInteractionPaused).toBe(true);
    vi.advanceTimersByTime(10000);
    expect((c as any).onNext).not.toHaveBeenCalled();
  });

  it('onFocusIn pauses autoplay', () => {
    (c as any).autoplay = true;
    (c as any).startAutoplayTimer();
    (c as any).onFocusIn();
    expect((c as any).isAutoplayInteractionPaused).toBe(true);
    expect((c as any).isAutoplayPaused).toBe(true);
  });

  it('onFocusOut resumes autoplay', () => {
    (c as any).autoplay = true;
    (c as any).isAutoplayInteractionPaused = true;
    (c as any).isAutoplayPaused = true;
    // Pass a FocusEvent with relatedTarget=null (focus left the carousel entirely).
    // el.contains(null) returns false so the handler does not early-return.
    (c as any).onFocusOut({ relatedTarget: null } as unknown as FocusEvent);
    expect((c as any).isAutoplayInteractionPaused).toBe(false);
    vi.advanceTimersByTime(5000);
    expect((c as any).onNext).toHaveBeenCalledTimes(1);
  });

  it('onAutoplayChange(true) starts timer', () => {
    (c as any).onAutoplayChange(true);
    expect((c as any).isAutoplayPaused).toBe(false);
    expect((c as any).autoplayTimer).not.toBeNull();
    vi.advanceTimersByTime(5000);
    expect((c as any).onNext).toHaveBeenCalledTimes(1);
  });

  it('onAutoplayChange(false) stops timer and resets paused state', () => {
    (c as any).startAutoplayTimer();
    (c as any).isAutoplayPaused = true;
    (c as any).onAutoplayChange(false);
    expect((c as any).autoplayTimer).toBeNull();
    expect((c as any).isAutoplayPaused).toBe(false);
  });

  it('disconnectedCallback stops the timer', () => {
    (c as any).startAutoplayTimer();
    (c as any).disconnectedCallback();
    expect((c as any).autoplayTimer).toBeNull();
  });

  it('no mouse/focus events fire when autoplay=false', () => {
    (c as any).autoplay = false;
    (c as any).onMouseEnter();
    (c as any).onMouseLeave();
    (c as any).onFocusIn();
    (c as any).onFocusOut();
    expect((c as any).isAutoplayInteractionPaused).toBe(false);
    expect((c as any).isAutoplayPaused).toBe(false);
  });
});
