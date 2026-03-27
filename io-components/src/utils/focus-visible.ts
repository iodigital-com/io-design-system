/**
 * Input modality tracker — keyboard vs. pointer.
 *
 * The CSS :focus-visible pseudo-class is insufficient on its own because:
 *   1. Browsers always show :focus-visible on form controls (<input>, <textarea>,
 *      <select>) regardless of whether focus came from a mouse or keyboard.
 *   2. Stencil's delegatesFocus: true can cause :focus-visible to fire on the
 *      inner element even when activated by mouse click.
 *
 * This module tracks whether the last interaction was a keyboard Tab key or a
 * pointer (mouse / touch). It exposes the result as a CSS custom property
 * --io-focus-ring-active on <html>, which CSS custom properties propagate into
 * every Shadow DOM automatically (they are inherited across shadow boundaries).
 *
 * Usage:
 *   - Call initFocusVisible() once at app startup.
 *   - In component CSS use: box-shadow: var(--io-focus-ring-active)
 *   - The default value (none) is set in app.css on :root.
 *   - After Tab press the value becomes var(--io-shadow-focus-ring).
 *   - After any pointerdown the value resets to none.
 */

let initialized = false;

export function initFocusVisible(): void {
  if (initialized || typeof document === 'undefined') return;
  initialized = true;

  const root = document.documentElement;

  function showRing(): void {
    root.style.setProperty('--io-focus-ring-active', 'var(--io-shadow-focus-ring)');
  }

  function hideRing(): void {
    // Removing the inline property falls back to the CSS :root default of none.
    root.style.removeProperty('--io-focus-ring-active');
  }

  // Tab key = keyboard navigation → show ring on the next focused element.
  document.addEventListener(
    'keydown',
    (e: KeyboardEvent): void => {
      if (e.key === 'Tab') showRing();
    },
    true, // capture phase so we see it before any component handler
  );

  // Any pointer press = pointer user → hide ring.
  document.addEventListener('pointerdown', hideRing, true);
}
