const fs = require('fs');
const h = fs.readFileSync('/Users/jakeortega/Documents/Projects/io-design-system/docs/index.html','utf8');
const t = JSON.parse(fs.readFileSync('/Users/jakeortega/Documents/Projects/io-design-system/docs/tokens.json','utf8'));
const css = fs.readFileSync('/Users/jakeortega/Documents/Projects/io-design-system/io-components/src/global/app.css','utf8');

const chk = [
  // index.html CSS fixes — check specific .io-field label block
  ['html: io-field label font-weight 700',  /\.io-field label[\s\S]{0,200}font-weight: 700/.test(h)],
  ['html: io-field label font-size 0.875rem', /\.io-field label[\s\S]{0,200}font-size: 0\.875rem/.test(h)],
  ['html: floating label 0.75rem',          /not\(:placeholder-shown\) ~ label[\s\S]{0,200}font-size: 0\.75rem/.test(h)],
  ['html: io-field margin-bottom 1.5rem',   /\.io-field \{[\s\S]{0,200}margin-bottom: 1\.5rem/.test(h)],
  ['html: io-field label NOT font-weight 400', !/\.io-field label[\s\S]{0,200}font-weight: 400/.test(h)],
  ['html: io-field NOT margin-bottom 2rem', !/\.io-field \{[\s\S]{0,200}margin-bottom: 2rem/.test(h)],
  ['html: io-field NOT 0.6875rem in label CSS', !/\.io-field label[\s\S]{0,300}0\.6875rem/.test(h)],
  // DOM order: input before label (check textarea as sentinel)
  ['html: textarea before label in DOM',    h.indexOf('<textarea') < h.indexOf('<label>Message</label>')],
  // Focused demo: no border on wrapper div
  ['html: no border on .io-field wrapper',  !h.includes('class="io-field" style="border-bottom-width:5px"')],
  ['html: focused label correct 0.75rem',   h.includes('style="font-size:0.75rem;top:0;"')],
  // tokens.json
  ['tokens: label.fontSize 0.875rem',       t.form.label.fontSize.$value === '0.875rem'],
  ['tokens: label.fontSizeFloating 0.75rem',t.form.label.fontSizeFloating.$value === '0.75rem'],
  // app.css
  ['css: --io-label-font-size 0.875rem',    css.includes('--io-label-font-size:          0.875rem')],
  ['css: --io-label-font-size-float 0.75rem', css.includes('--io-label-font-size-float:    0.75rem')],
  ['css: NOT old 0.75rem label-font-size', !css.includes('--io-label-font-size:          0.75rem')],
  ['css: NOT 0.6875rem anywhere',          !css.includes('0.6875rem')],
];

// Antialiasing checks
const antiChk = [
  ['html body: -webkit-font-smoothing antialiased', h.includes('-webkit-font-smoothing: antialiased')],
  ['html body: -moz-osx-font-smoothing grayscale',  h.includes('-moz-osx-font-smoothing: grayscale')],
  ['html body: color still var(--text-primary)',    h.includes('color: var(--text-primary)')],
  ['app.css: body rule with antialiased',           css.includes('-webkit-font-smoothing: antialiased;')],
  ['app.css: moz smoothing in body',                css.includes('-moz-osx-font-smoothing: grayscale;')],
  ['app.css: io-text-primary still grey-6',         css.includes('--io-text-primary:             var(--io-color-grey-6)')],
];

let pass = 0, fail = 0;
[...chk, ...antiChk].forEach(([name, val]) => {
  if (val) { console.log('pass:', name); pass++; }
  else      { console.log('FAIL:', name); fail++; }
});
console.log('\n' + pass + ' pass, ' + fail + ' fail');
