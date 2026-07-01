/**
 * io Design System — Color tokens
 *
 * Brand color primitives and semantic color aliases.
 * Use semantic tokens in component styles; use primitives only to compose new semantics.
 */

// ── Brand Color Palette — Primitive values ─────────────────────────────────
/** Default: `var(--io-color-grey-2)` */
export const border = '--io-border' as const;

/** Default: `var(--io-color-error)` */
export const borderError = '--io-border-error' as const;

/** Default: `var(--io-color-primary)` */
export const borderFocus = '--io-border-focus' as const;

/** Default: `var(--io-color-grey-3)` */
export const borderHover = '--io-border-hover' as const;

/** Default: `#767676` */
export const borderInteractive = '--io-border-interactive' as const;

/** Default: `2px` */
export const borderRadius2xs = '--io-border-radius-2xs' as const;

/** Default: `14px` */
export const borderRadiusLg = '--io-border-radius-lg' as const;

/** Default: `12px` */
export const borderRadiusMd = '--io-border-radius-md' as const;

/** Default: `9999px` */
export const borderRadiusPill = '--io-border-radius-pill' as const;

/** Default: `9px` */
export const borderRadiusSm = '--io-border-radius-sm' as const;

/** Default: `24px` */
export const borderRadiusXl = '--io-border-radius-xl' as const;

/** Default: `4px` */
export const borderRadiusXs = '--io-border-radius-xs' as const;

/** Default: `235, 235, 235` */
export const borderRgb = '--io-border-rgb' as const;

/** Default: `#454545` */
export const colorAntraciet = '--io-color-antraciet' as const;

/** Default: `#333333` */
export const colorAntracietHover = '--io-color-antraciet-hover' as const;

/** Default: `#DCCFC2` */
export const colorBeige = '--io-color-beige' as const;

/** Default: `#cdb99e` */
export const colorBeigeHover = '--io-color-beige-hover' as const;

/** Default: `#000000` */
export const colorBlack = '--io-color-black' as const;

/** Default: `#e1cfbf` */
export const colorCalmBeige = '--io-color-calm-beige' as const;

/** Default: `#bdcad1` */
export const colorCalmBlue = '--io-color-calm-blue' as const;

/** Default: `#c4d1ce` */
export const colorCalmGreen = '--io-color-calm-green' as const;

/** Default: `#dcc8c2` */
export const colorCalmPink = '--io-color-calm-pink' as const;

/** Default: `#9ea3f0` */
export const colorDarkAccent = '--io-color-dark-accent' as const;

/** Default: `rgba(100, 100, 255, 0.15)` */
export const colorDarkAccentBg = '--io-color-dark-accent-bg' as const;

/** Default: `#181818` */
export const colorDarkBgBase = '--io-color-dark-bg-base' as const;

/** Default: `#333333` */
export const colorDarkBgHover = '--io-color-dark-bg-hover' as const;

/** Default: `#2a2a2a` */
export const colorDarkBgRaised = '--io-color-dark-bg-raised' as const;

/** Default: `#222222` */
export const colorDarkBgSurface = '--io-color-dark-bg-surface' as const;

/** Default: `#333333` */
export const colorDarkBorder = '--io-color-dark-border' as const;

/** Default: `#444444` */
export const colorDarkBorderHover = '--io-color-dark-border-hover' as const;

/** Default: `#ff7c7c` */
export const colorDarkError = '--io-color-dark-error' as const;

/** Default: `#ff9eb5` */
export const colorDarkFocusInner = '--io-color-dark-focus-inner' as const;

/** Default: `#64b5f6` */
export const colorDarkInfo = '--io-color-dark-info' as const;

/** Default: `rgba(255, 255, 255, 0.06)` */
export const colorDarkPlaygroundDot = '--io-color-dark-playground-dot' as const;

/** Default: `#4d4dff` */
export const colorDarkPrimary = '--io-color-dark-primary' as const;

/** Default: `#4ade80` */
export const colorDarkSuccess = '--io-color-dark-success' as const;

/** Default: `#9c9c9c` */
export const colorDarkTextMuted = '--io-color-dark-text-muted' as const;

/** Default: `#f0ece6` */
export const colorDarkTextPrimary = '--io-color-dark-text-primary' as const;

/** Default: `#9e9e9e` */
export const colorDarkTextSecondary = '--io-color-dark-text-secondary' as const;

/** Default: `#ffa100` */
export const colorDarkWarning = '--io-color-dark-warning' as const;

/** Default: `#ff6161` */
export const colorError = '--io-color-error' as const;

/** Default: `#D35454` */
export const colorErrorDark = '--io-color-error-dark' as const;

/** Default: `#FF9E9A` */
export const colorErrorOnBlue = '--io-color-error-on-blue' as const;

/** Default: `rgba(255, 97, 97, 0.1)` */
export const colorErrorSoft = '--io-color-error-soft' as const;

/** Default: `var(--io-focus-inner)` */
export const colorFocusDarkRed = '--io-color-focus-dark-red' as const;

/** Default: `var(--io-focus-outer)` */
export const colorFocusLightPink = '--io-color-focus-light-pink' as const;

/** Default: `#f7f7f7` */
export const colorGrey1 = '--io-color-grey-1' as const;

/** Default: `#ebebeb` */
export const colorGrey2 = '--io-color-grey-2' as const;

/** Default: `#C4C4C4` */
export const colorGrey3 = '--io-color-grey-3' as const;

/** Default: `#747474` */
export const colorGrey4 = '--io-color-grey-4' as const;

/** Default: `#F4F4F4` */
export const colorGrey5 = '--io-color-grey-5' as const;

/** Default: `#242424` */
export const colorGrey6 = '--io-color-grey-6' as const;

/** Default: `#1565C0` */
export const colorInfo = '--io-color-info' as const;

/** Default: `rgba(21, 101, 192, 0.1)` */
export const colorInfoSoft = '--io-color-info-soft' as const;

/** Default: `#868ada` */
export const colorLavendel = '--io-color-lavendel' as const;

/** Default: `#EBE8E3` */
export const colorOffWhite = '--io-color-off-white' as const;

/** Default: `#ed7f53` */
export const colorOrange = '--io-color-orange' as const;

/** Default: `#d96a3b` */
export const colorOrangeHover = '--io-color-orange-hover' as const;

/** Default: `#DCC8C2` */
export const colorPink = '--io-color-pink' as const;

/** Default: `#c9afa8` */
export const colorPinkHover = '--io-color-pink-hover' as const;

/** Default: `#0000D2` */
export const colorPrimary = '--io-color-primary' as const;

/** Default: `#000080` */
export const colorPrimaryActive = '--io-color-primary-active' as const;

/** Default: `rgba(0, 0, 210, 0.06)` */
export const colorPrimaryBg = '--io-color-primary-bg' as const;

/** Default: `#0000a8` */
export const colorPrimaryHover = '--io-color-primary-hover' as const;

/** Default: `rgba(0, 0, 210, 0.12)` */
export const colorPrimaryMuted = '--io-color-primary-muted' as const;

/** Default: `#a13865` */
export const colorRouge = '--io-color-rouge' as const;

/** Default: `#8a2e54` */
export const colorRougeHover = '--io-color-rouge-hover' as const;

/** Default: `var(--io-color-error-dark)` */
export const colorSemanticRed = '--io-color-semantic-red' as const;

/** Default: `var(--io-color-error)` */
export const colorStateError = '--io-color-state-error' as const;

/** Default: `var(--io-color-error-soft)` */
export const colorStateErrorSoft = '--io-color-state-error-soft' as const;

/** Default: `var(--io-color-info)` */
export const colorStateInfo = '--io-color-state-info' as const;

/** Default: `var(--io-color-info-soft)` */
export const colorStateInfoSoft = '--io-color-state-info-soft' as const;

/** Default: `var(--io-color-success)` */
export const colorStateSuccess = '--io-color-state-success' as const;

/** Default: `var(--io-color-success-soft)` */
export const colorStateSuccessSoft = '--io-color-state-success-soft' as const;

/** Default: `var(--io-color-warning)` */
export const colorStateWarning = '--io-color-state-warning' as const;

/** Default: `var(--io-color-warning-soft)` */
export const colorStateWarningSoft = '--io-color-state-warning-soft' as const;

/** Default: `#30c58e` */
export const colorSuccess = '--io-color-success' as const;

/** Default: `rgba(48, 197, 142, 0.1)` */
export const colorSuccessSoft = '--io-color-success-soft' as const;

/** Default: `#0019FF` */
export const colorSystemBlue = '--io-color-system-blue' as const;

/** Default: `var(--io-color-system-blue)` */
export const colorSystemInteractiveBlue = '--io-color-system-interactive-blue' as const;

/** Default: `#ffa100` */
export const colorWarning = '--io-color-warning' as const;

/** Default: `rgba(255, 161, 0, 0.1)` */
export const colorWarningSoft = '--io-color-warning-soft' as const;

/** Default: `#ffffff` */
export const colorWhite = '--io-color-white' as const;

/** Default: `rgba(255, 255, 255, 0.3)` */
export const colorWhiteAlpha30 = '--io-color-white-alpha-30' as const;

/** Default: `#fdbc75` */
export const colorYellow = '--io-color-yellow' as const;

/** Default: `#f0a952` */
export const colorYellowHover = '--io-color-yellow-hover' as const;

/** Default: `#7D0034` */
export const focusInner = '--io-focus-inner' as const;

/** Default: `#FFE4EE` */
export const focusOuter = '--io-focus-outer' as const;

/** Default: `none` */
export const focusRingActive = '--io-focus-ring-active' as const;

/** Default: `rgba(0, 0, 210, 0.12)` */
export const stateActive = '--io-state-active' as const;

/** Default: `var(--io-color-grey-3)` */
export const stateDisabledBg = '--io-state-disabled-bg' as const;

/** Default: `0.5` */
export const stateDisabledOpacity = '--io-state-disabled-opacity' as const;

/** Default: `rgba(0, 0, 210, 0.06)` */
export const stateHover = '--io-state-hover' as const;

