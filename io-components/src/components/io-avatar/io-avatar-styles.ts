export function getAvatarStyles(): string {
  return `
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      font-family: var(--io-font-primary);
      font-weight: var(--io-avatar-font-weight);
      user-select: none;
      line-height: 1;
    }

    /* ── Size variants ── */

    .avatar--xs {
      width: var(--io-avatar-size-xs);
      height: var(--io-avatar-size-xs);
      font-size: var(--io-avatar-font-size-xs);
    }

    .avatar--sm {
      width: var(--io-avatar-size-sm);
      height: var(--io-avatar-size-sm);
      font-size: var(--io-avatar-font-size-sm);
    }

    .avatar--md {
      width: var(--io-avatar-size-md);
      height: var(--io-avatar-size-md);
      font-size: var(--io-avatar-font-size-md);
    }

    .avatar--lg {
      width: var(--io-avatar-size-lg);
      height: var(--io-avatar-size-lg);
      font-size: var(--io-avatar-font-size-lg);
    }

    .avatar--xl {
      width: var(--io-avatar-size-xl);
      height: var(--io-avatar-size-xl);
      font-size: var(--io-avatar-font-size-xl);
    }

    /* ── Shape variants ── */

    .avatar--circle {
      border-radius: var(--io-avatar-border-radius);
    }

    .avatar--square {
      border-radius: var(--io-border-radius-sm, 9px);
    }

    /* ── Colour variants (initials / icon fallback only) ── */

    .avatar--blue {
      background: var(--io-avatar-bg-blue);
      color: var(--io-avatar-text-blue);
    }

    .avatar--orange {
      background: var(--io-avatar-bg-orange);
      color: var(--io-avatar-text-orange);
    }

    .avatar--green {
      background: var(--io-avatar-bg-green);
      color: var(--io-avatar-text-green);
    }

    .avatar--purple {
      background: var(--io-avatar-bg-purple);
      color: var(--io-avatar-text-purple);
    }

    .avatar--grey {
      background: var(--io-avatar-bg-grey);
      color: var(--io-avatar-text-grey);
    }

    /* ── Image ── */

    img.avatar-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    /* ── Person icon (no src, no name) ── */

    .avatar-icon {
      width: var(--io-avatar-icon-size);
      height: var(--io-avatar-icon-size);
      color: var(--io-text-secondary);
    }
  `;
}
