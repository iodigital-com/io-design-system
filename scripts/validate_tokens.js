const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'docs/index.html'), 'utf8');
const tok = JSON.parse(fs.readFileSync(path.join(root, 'docs/tokens.json'), 'utf8'));

const checks = [
  // tokens.json
  ['color.primary.blueHover',            !!tok.color.primary.blueHover],
  ['typography.fontWeight.extraLight',    !!tok.typography.fontWeight.extraLight],
  ['typography.fontWeight.extraBold',     !!tok.typography.fontWeight.extraBold],
  ['typography.fontSize.xs2',            !!tok.typography.fontSize.xs2],
  ['typography.lineHeight.relaxed',      !!tok.typography.lineHeight.relaxed],
  ['typography.lineHeight.loose',        !!tok.typography.lineHeight.loose],
  ['typography.letterSpacing',           !!tok.typography.letterSpacing],
  ['typography.letterSpacing.tight',     !!tok.typography.letterSpacing.tight],
  ['typography.letterSpacing.widest',    !!tok.typography.letterSpacing.widest],
  ['spacing.14',                         !!tok.spacing['14']],
  ['spacing.15',                         !!tok.spacing['15']],
  ['spacing.28',                         !!tok.spacing['28']],
  ['spacing.32',                         !!tok.spacing['32']],
  ['spacing.36',                         !!tok.spacing['36']],
  ['spacing.40',                         !!tok.spacing['40']],
  ['shadow.2xl',                         !!tok.shadow['2xl']],
  ['shadow.focusRing',                   !!tok.shadow.focusRing],
  ['zIndex.above',                       !!tok.zIndex.above],
  ['zIndex.dropdown',                    !!tok.zIndex.dropdown],
  ['zIndex.fixed',                       !!tok.zIndex.fixed],
  ['motion.duration.fastest',            !!tok.motion.duration.fastest],
  ['motion.duration.micro',              !!tok.motion.duration.micro],
  ['motion.easing.easeOut',              !!tok.motion.easing.easeOut],
  ['layout.containerEdge',              !!tok.layout.containerEdge],
  ['layout.sectionSpacingMobile',        !!tok.layout.sectionSpacingMobile],
  ['layout.sectionSpacingTablet',        !!tok.layout.sectionSpacingTablet],
  ['layout.sectionSpacingDesktop',       !!tok.layout.sectionSpacingDesktop],
  // shadow corrections
  ['shadow.sm is array',                 Array.isArray(tok.shadow.sm.$value)],
  ['shadow.md is array',                 Array.isArray(tok.shadow.md.$value)],
  ['shadow.xl spread -3px',              JSON.stringify(tok.shadow.xl.$value).includes('-3px')],
  // index.html
  ['html: blueHover',                    html.includes('0000a8')],
  ['html: xs2 size',                     html.includes("key: 'xs2'")],
  ['html: extraLight weight',            html.includes("key: 'extraLight'")],
  ['html: extraBold weight',             html.includes("key: 'extraBold'")],
  ['html: relaxed lineHeight',           html.includes("key: 'relaxed'")],
  ['html: loose lineHeight',             html.includes("key: 'loose'")],
  ['html: letterSpacings array',         html.includes('letterSpacings')],
  ['html: typo-tracking div',            html.includes('typo-tracking')],
  ['html: spacing 40',                   html.includes("key: '40', val: '160px'")],
  ['html: shadow 2xl',                   html.includes("key: '2xl'")],
  ['html: focusRing shadow',             html.includes("key: 'focusRing'")],
  ['html: zIndex above',                 html.includes("key: 'above'")],
  ['html: easeOut easing',               html.includes("key: 'easeOut'")],
  ['html: fastest duration',             html.includes("key: 'fastest'")],
  ['html: sectionSpacing layout',        html.includes('sectionSpacingMobile')],
  ['html: 195 tokens',                   html.includes('195 tokens')],
];

let pass = 0, fail = 0;
checks.forEach(([name, val]) => {
  if (val) { console.log('pass:', name); pass++; }
  else { console.log('FAIL:', name); fail++; }
});
console.log('\n' + pass + ' pass, ' + fail + ' fail');
