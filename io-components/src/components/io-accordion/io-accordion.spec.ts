import { describe, it, expect, vi } from 'vitest';

import { IoAccordion } from './io-accordion';
import { getAccordionStyles } from './io-accordion-styles';

describe('io-accordion — default props', () => {
  let component: IoAccordion;

  beforeEach(() => {
    component = new IoAccordion();
  });

  it('starts closed by default', () => {
    expect(component.open).toBe(false);
  });

  it('uses h3 heading tag by default', () => {
    expect(component.headingTag).toBe('h3');
  });

  it('uses empty heading fallback by default', () => {
    expect(component.heading).toBe('');
  });

  it('defaults defaultExpanded to false', () => {
    expect(component.defaultExpanded).toBe(false);
  });

  it('defaults allowMultiple to false', () => {
    expect(component.allowMultiple).toBe(false);
  });

  it('defaults size to md', () => {
    expect(component.size).toBe('md');
  });

  it('defaults alignMarker to end', () => {
    expect(component.alignMarker).toBe('end');
  });
});

describe('io-accordion — size prop', () => {
  it('accepts size xs', () => {
    const component = new IoAccordion();
    component.size = 'xs';
    expect(component.size).toBe('xs');
  });

  it('accepts size sm', () => {
    const component = new IoAccordion();
    component.size = 'sm';
    expect(component.size).toBe('sm');
  });

  it('accepts size md', () => {
    const component = new IoAccordion();
    component.size = 'md';
    expect(component.size).toBe('md');
  });

  it('accepts size lg', () => {
    const component = new IoAccordion();
    component.size = 'lg';
    expect(component.size).toBe('lg');
  });

  it('size CSS includes xs host selector with densest padding token', () => {
    const styles = getAccordionStyles();
    expect(styles).toContain(':host([size="xs"])');
    expect(styles).toContain('var(--io-space-2)');
  });

  it('size CSS includes sm host selector with compact padding token', () => {
    const styles = getAccordionStyles();
    expect(styles).toContain(':host([size="sm"])');
    expect(styles).toContain('var(--io-space-3)');
  });

  it('size CSS includes md host selector with default padding token', () => {
    const styles = getAccordionStyles();
    expect(styles).toContain(':host([size="md"])');
    expect(styles).toContain('var(--io-space-6)');
  });

  it('size CSS includes lg host selector with comfortable padding token', () => {
    const styles = getAccordionStyles();
    expect(styles).toContain(':host([size="lg"])');
    expect(styles).toContain('var(--io-space-8)');
  });

  it('size CSS uses font-size tokens for each size variant', () => {
    const styles = getAccordionStyles();
    expect(styles).toContain('var(--io-font-size-sm)');
    expect(styles).toContain('var(--io-font-size-base)');
    expect(styles).toContain('var(--io-font-size-lg)');
    expect(styles).toContain('var(--io-font-size-xl)');
  });
});

describe('io-accordion — toggling', () => {
  let component: IoAccordion;
  let emitSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    component = new IoAccordion();
    emitSpy = vi.fn();
    (component as any).update = { emit: emitSpy };
    (component as any).el = { forceUpdate: vi.fn(), dispatchEvent: vi.fn() };
    component.componentWillLoad();
  });

  it('toggles open state on trigger interaction', () => {
    expect(component.open).toBe(false);
    (component as any).toggleSingle();
    expect(component.open).toBe(true);
    (component as any).toggleSingle();
    expect(component.open).toBe(false);
  });

  it('emits update with open=true when opening', () => {
    (component as any).toggleSingle();
    expect(emitSpy).toHaveBeenCalledWith({ open: true });
  });

  it('emits update with open=false when closing', () => {
    component.open = true;
    (component as any).toggleSingle();
    expect(emitSpy).toHaveBeenCalledWith({ open: false });
  });
});

describe('io-accordion — lifecycle', () => {
  it('does not throw during componentWillLoad', () => {
    const component = new IoAccordion();
    (component as any).update = { emit: vi.fn() };
    (component as any).el = { forceUpdate: vi.fn(), dispatchEvent: vi.fn() };
    expect(() => component.componentWillLoad()).not.toThrow();
  });

  it('creates a stable base id when host id exists', () => {
    const component = new IoAccordion();
    (component as any).el = { id: 'accordion-host', dispatchEvent: vi.fn() };
    component.componentWillLoad();
    expect((component as any).baseId).toBe('accordion-host');
  });

  it('panel uses grid-template-rows animation instead of max-height', () => {
    const styles = getAccordionStyles();
    expect(styles).toContain('grid-template-rows: 0fr');
    expect(styles).toContain('grid-template-rows: 1fr');
    expect(styles).not.toContain('max-height: 0');
  });
});

describe('io-accordion — background prop', () => {
  it('defaults background to transparent', () => {
    const component = new IoAccordion();
    expect(component.background).toBe('transparent');
  });

  it('accepts background value surface', () => {
    const component = new IoAccordion();
    component.background = 'surface';
    expect(component.background).toBe('surface');
  });

  it('accepts background value canvas', () => {
    const component = new IoAccordion();
    component.background = 'canvas';
    expect(component.background).toBe('canvas');
  });

  it('accepts background value transparent', () => {
    const component = new IoAccordion();
    component.background = 'transparent';
    expect(component.background).toBe('transparent');
  });

  it('CSS includes :host([background="surface"]) with --io-bg-surface token', () => {
    const styles = getAccordionStyles();
    expect(styles).toContain(':host([background="surface"])');
    expect(styles).toContain('var(--io-bg-surface)');
  });

  it('CSS includes :host([background="canvas"]) with --io-bg-page token', () => {
    const styles = getAccordionStyles();
    expect(styles).toContain(':host([background="canvas"])');
    expect(styles).toContain('var(--io-bg-page)');
  });

  it('CSS includes :host([background="transparent"]) with transparent value', () => {
    const styles = getAccordionStyles();
    expect(styles).toContain(':host([background="transparent"])');
    expect(styles).toContain('background-color: transparent');
  });
});

describe('io-accordion — sticky prop', () => {
  it('defaults sticky to false', () => {
    const component = new IoAccordion();
    expect(component.sticky).toBe(false);
  });

  it('accepts sticky=true', () => {
    const component = new IoAccordion();
    component.sticky = true;
    expect(component.sticky).toBe(true);
  });

  it('CSS includes :host([sticky]) with position sticky on accordion-heading', () => {
    const styles = getAccordionStyles();
    expect(styles).toContain(':host([sticky]) .accordion-heading');
    expect(styles).toContain('position: sticky');
    expect(styles).toContain('top: var(--io-accordion-summary-top, 0)');
  });

  it('CSS uses --io-z-sticky token for z-index on sticky heading', () => {
    const styles = getAccordionStyles();
    expect(styles).toContain('z-index: var(--io-z-sticky)');
  });

  it('sticky heading inherits background-color from host', () => {
    const styles = getAccordionStyles();
    expect(styles).toContain('background-color: inherit');
  });

  it('CSS uses --io-accordion-summary-top token for sticky top offset', () => {
    const styles = getAccordionStyles();
    expect(styles).toContain('top: var(--io-accordion-summary-top, 0)');
  });

  it('logs a warning when sticky=true and background="transparent"', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const component = new IoAccordion();
    component.sticky = true;
    component.background = 'transparent';
    (component as any).el = { id: '', dispatchEvent: vi.fn() };
    component.componentWillLoad();
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('[io-accordion] sticky=true with background="transparent"'),
    );
    warnSpy.mockRestore();
  });

  it('does not warn when sticky=true and background="surface"', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const component = new IoAccordion();
    component.sticky = true;
    component.background = 'surface';
    (component as any).el = { id: '', dispatchEvent: vi.fn() };
    component.componentWillLoad();
    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('does not warn when sticky=true and background="canvas"', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const component = new IoAccordion();
    component.sticky = true;
    component.background = 'canvas';
    (component as any).el = { id: '', dispatchEvent: vi.fn() };
    component.componentWillLoad();
    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('does not warn when sticky=false regardless of background', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const component = new IoAccordion();
    component.sticky = false;
    component.background = 'transparent';
    (component as any).el = { id: '', dispatchEvent: vi.fn() };
    component.componentWillLoad();
    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});

describe('io-accordion — indent prop', () => {
  it('defaults indent to false', () => {
    const component = new IoAccordion();
    expect(component.indent).toBe(false);
  });

  it('accepts indent=true', () => {
    const component = new IoAccordion();
    component.indent = true;
    expect(component.indent).toBe(true);
  });

  it('CSS includes .accordion-panel-inner--indent with padding-inline-start token', () => {
    const styles = getAccordionStyles();
    expect(styles).toContain('.accordion-panel-inner--indent');
    expect(styles).toContain('var(--io-accordion-indent,');
    expect(styles).toContain('padding-inline-start');
  });
});

describe('io-accordion — frosted background', () => {
  it('accepts background value frosted', () => {
    const component = new IoAccordion();
    component.background = 'frosted';
    expect(component.background).toBe('frosted');
  });

  it('CSS includes :host([background="frosted"]) with backdrop-filter', () => {
    const styles = getAccordionStyles();
    expect(styles).toContain(':host([background="frosted"])');
    expect(styles).toContain('backdrop-filter:');
  });

  it('CSS uses --io-accordion-bg-frosted token', () => {
    const styles = getAccordionStyles();
    expect(styles).toContain('var(--io-accordion-bg-frosted,');
  });
});

describe('io-accordion — summary slots layout', () => {
  it('CSS accordion-heading has display: flex for summary-before/after layout', () => {
    const styles = getAccordionStyles();
    expect(styles).toContain('display: flex');
  });

  it('CSS accordion-trigger has flex: 1 1 auto so it fills remaining space', () => {
    const styles = getAccordionStyles();
    expect(styles).toContain('flex: 1 1 auto');
  });
});

describe('io-accordion — alignMarker prop', () => {
  it('defaults alignMarker to end', () => {
    const component = new IoAccordion();
    expect(component.alignMarker).toBe('end');
  });

  it('accepts alignMarker=start', () => {
    const component = new IoAccordion();
    component.alignMarker = 'start';
    expect(component.alignMarker).toBe('start');
  });

  it('accepts alignMarker=end', () => {
    const component = new IoAccordion();
    component.alignMarker = 'end';
    expect(component.alignMarker).toBe('end');
  });

  it('CSS includes :host([align-marker=start]) with order: -1 on icon', () => {
    const styles = getAccordionStyles();
    expect(styles).toContain(":host([align-marker='start']) .accordion-icon");
    expect(styles).toContain('order: -1');
  });
});

describe('io-accordion — CSS token overrides', () => {
  it('trigger padding uses --io-accordion-py and --io-accordion-px tokens', () => {
    const styles = getAccordionStyles();
    expect(styles).toContain('var(--io-accordion-py, var(--io-space-6))');
    expect(styles).toContain('var(--io-accordion-px, 0)');
  });

  it('border uses --io-accordion-border-color token with --io-text-primary fallback', () => {
    const styles = getAccordionStyles();
    expect(styles).toContain('var(--io-accordion-border-color, var(--io-text-primary))');
  });

  it('sticky top uses --io-accordion-summary-top token with 0 fallback', () => {
    const styles = getAccordionStyles();
    expect(styles).toContain('top: var(--io-accordion-summary-top, 0)');
  });

  it('panel uses visibility: hidden when closed', () => {
    const styles = getAccordionStyles();
    expect(styles).toContain('visibility: hidden');
    expect(styles).toContain('visibility: visible');
  });

  it('panel-inner has min-height: 0 for grid animation', () => {
    const styles = getAccordionStyles();
    expect(styles).toContain('min-height: 0');
  });
});
