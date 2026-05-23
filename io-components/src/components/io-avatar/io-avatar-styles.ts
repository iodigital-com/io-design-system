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
      font-weight: 600;
      user-select: none;
      line-height: 1;
    }

    /* ── Size variants ── */

    .avatar--xs {
      width: 24px;
      height: 24px;
      font-size: 10px;
    }

    .avatar--sm {
      width: 32px;
      height: 32px;
      font-size: 12px;
    }

    .avatar--md {
      width: 40px;
      height: 40px;
      font-size: 14px;
    }

    .avatar--lg {
      width: 48px;
      height: 48px;
      font-size: 16px;
    }

    .avatar--xl {
      width: 64px;
      height: 64px;
      font-size: 20px;
    }

    /* ── Shape variants ── */

    .avatar--circle {
      border-radius: 50%;
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
      width: 60%;
      height: 60%;
      color: var(--io-text-secondary);
    }
  `;
}
