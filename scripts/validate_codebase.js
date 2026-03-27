/**
 * Validates that app.css and styles/index.ts are in sync with tokens.json.
 * Run: node scripts/validate_codebase.js
 */
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');

const css  = fs.readFileSync(path.join(root, 'io-components/src/global/app.css'), 'utf8');
const ts   = fs.readFileSync(path.join(root, 'io-components/src/styles/index.ts'), 'utf8');
const tok  = JSON.parse(fs.readFileSync(path.join(root, 'docs/tokens.json'), 'utf8'));

const checks = [
  // ── Typography ────────────────────────────────────────────────────────────
  ['app.css: --io-font-size-xs2',            css.includes('--io-font-size-xs2:')],
  ['app.css: --io-font-weight-extra-light',  css.includes('--io-font-weight-extra-light:')],
  ['app.css: --io-font-weight-extra-bold',   css.includes('--io-font-weight-extra-bold:')],
  ['app.css: --io-line-height-relaxed',      css.includes('--io-line-height-relaxed:')],
  ['app.css: --io-line-height-loose',        css.includes('--io-line-height-loose:')],
  ['app.css: --io-letter-spacing-tight',     css.includes('--io-letter-spacing-tight:')],
  ['app.css: --io-letter-spacing-wide',      css.includes('--io-letter-spacing-wide:')],
  ['app.css: --io-letter-spacing-wider',     css.includes('--io-letter-spacing-wider:')],
  ['app.css: --io-letter-spacing-widest',    css.includes('--io-letter-spacing-widest:')],
  // ── Spacing ───────────────────────────────────────────────────────────────
  ['app.css: --io-space-14',                 css.includes('--io-space-14:')],
  ['app.css: --io-space-15',                 css.includes('--io-space-15:')],
  ['app.css: --io-space-28',                 css.includes('--io-space-28:')],
  ['app.css: --io-space-32',                 css.includes('--io-space-32:')],
  ['app.css: --io-space-36',                 css.includes('--io-space-36:')],
  ['app.css: --io-space-40',                 css.includes('--io-space-40:')],
  // ── Shadows — corrected values ────────────────────────────────────────────
  ['app.css: shadow-sm correct (1px 3px)',   css.includes('0px 1px 3px rgba(0, 0, 0, 0.1)')],
  ['app.css: shadow-sm NOT old (2px 4px)',  !css.includes('0px 2px 4px rgba(0, 0, 0, 0.2)')],
  ['app.css: shadow-md correct (0.04)',      css.includes('rgba(0, 0, 0, 0.04)')],
  ['app.css: shadow-md NOT old (20px 0.1)', !css.includes('0px 0px 20px rgba(0, 0, 0, 0.1)')],
  ['app.css: shadow-lg correct (36,36,36)', css.includes('rgba(36, 36, 36, 0.25)')],
  ['app.css: shadow-lg NOT old (40px)',     !css.includes('0px 10px 40px rgba(0, 0, 0, 0.1)')],
  ['app.css: shadow-xl correct (-3px)',      css.includes('-3px rgba(0, 0, 0, 0.1)')],
  ['app.css: shadow-xl NOT old (60px)',     !css.includes('0px 20px 60px')],
  ['app.css: --io-shadow-2xl',               css.includes('--io-shadow-2xl:')],
  // ── Z-Index ───────────────────────────────────────────────────────────────
  ['app.css: --io-z-above: 20',              css.includes('--io-z-above:                  20')],
  ['app.css: --io-z-dropdown: 30',           css.includes('--io-z-dropdown:               30')],
  ['app.css: --io-z-fixed: 40',              css.includes('--io-z-fixed:                  40')],
  ['app.css: z-dropdown NOT 20',            !css.includes('--io-z-dropdown:               20')],
  // ── Motion ────────────────────────────────────────────────────────────────
  ['app.css: --io-motion-easing-ease-out',   css.includes('--io-motion-easing-ease-out:')],
  // ── Layout ────────────────────────────────────────────────────────────────
  ['app.css: --io-container-edge',           css.includes('--io-container-edge:')],
  ['app.css: --io-section-spacing-mobile',   css.includes('--io-section-spacing-mobile:')],
  ['app.css: --io-section-spacing-tablet',   css.includes('--io-section-spacing-tablet:')],
  ['app.css: --io-section-spacing-desktop',  css.includes('--io-section-spacing-desktop:')],
  // ── styles/index.ts ───────────────────────────────────────────────────────
  ['ts: fontSizeXs2',                        ts.includes('fontSizeXs2')],
  ['ts: fontSize4xl..7xl',                   ts.includes('fontSize4xl') && ts.includes('fontSize7xl')],
  ['ts: fontWeightExtraLight',               ts.includes('fontWeightExtraLight')],
  ['ts: fontWeightExtraBold',                ts.includes('fontWeightExtraBold')],
  ['ts: lineHeightRelaxed',                  ts.includes('lineHeightRelaxed')],
  ['ts: lineHeightLoose',                    ts.includes('lineHeightLoose')],
  ['ts: letterSpacingTight',                 ts.includes('letterSpacingTight')],
  ['ts: letterSpacingWidest',                ts.includes('letterSpacingWidest')],
  ['ts: space14..space40',                   ts.includes('space14') && ts.includes('space40')],
  ['ts: space20 and space24',                ts.includes('space20') && ts.includes('space24')],
  ['ts: motionEasingEaseOut',                ts.includes('motionEasingEaseOut')],
  ['ts: zAbove = 20',                        ts.includes('zAbove    = 20')],
  ['ts: zDropdown = 30',                     ts.includes('zDropdown = 30')],
  ['ts: zFixed = 40',                        ts.includes('zFixed    = 40')],
  ['ts: zDropdown NOT 20',                  !ts.includes('zDropdown = 20')],
  // ── tokens.json still valid ───────────────────────────────────────────────
  ['tokens.json: color.primary.blueHover',   !!tok.color.primary.blueHover],
  ['tokens.json: typography.letterSpacing',  !!tok.typography.letterSpacing],
  ['tokens.json: shadow.2xl',                !!tok.shadow['2xl']],
  ['tokens.json: shadow.focusRing',          !!tok.shadow.focusRing],
  ['tokens.json: zIndex.above',              !!tok.zIndex.above],
  ['tokens.json: motion.easing.easeOut',     !!tok.motion.easing.easeOut],
];

let pass = 0, fail = 0;
checks.forEach(([name, val]) => {
  if (val) { console.log('pass:', name); pass++; }
  else      { console.log('FAIL:', name); fail++; }
});
console.log(`\n${pass} pass, ${fail} fail`);
