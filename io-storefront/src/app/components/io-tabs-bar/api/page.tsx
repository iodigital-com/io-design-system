'use client';

import { SectionHeader, InlineCode, ApiTable, ReflectBadge, MutableBadge, EmptyNote, CodeNote } from '@/components/api/ApiPrimitives';


// ── Page ──────────────────────────────────────────────────────────────────────

export default function IoTabsBarApiPage() {
  return (
    <div className="space-y-16">

      {/* ── Properties ───────────────────────────────────────────────────── */}
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="All @Prop() declarations on the io-tabs-bar Stencil component. Props marked 'reflects' are synchronised to a host HTML attribute. Props marked 'mutable' are updated internally by the component."
        />
        <ApiTable
          columns={[
            { label: 'Name', width: '200px' },
            { label: 'Type', width: '260px' },
            { label: 'Default', width: '110px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="n">
                <InlineCode>activeTabIndex</InlineCode>
                <MutableBadge />
                <ReflectBadge />
              </span>,
              <InlineCode key="t">number</InlineCode>,
              <InlineCode key="d">0</InlineCode>,
              <span key="desc">
                The 0-based index of the currently active tab. This is the primary controlled-state
                prop — pass the current index down (typically derived from the router), and update
                it in response to the <InlineCode>update</InlineCode> event. Mutable — updated
                internally when the user activates a tab. Reflected to the host attribute{' '}
                <InlineCode>active-tab-index</InlineCode>.
              </span>,
            ],
            [
              <InlineCode key="n">label</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              <span key="desc">
                Optional accessible label applied to the internal tablist via{' '}
                <InlineCode>aria-label</InlineCode>. Recommended when multiple tablists appear on the same page.
                Mutually exclusive with <InlineCode>labelledBy</InlineCode> — if both are set,{' '}
                <InlineCode>labelledBy</InlineCode> takes precedence.
              </span>,
            ],
            [
              <InlineCode key="n">labelledBy</InlineCode>,
              <InlineCode key="t">string | undefined</InlineCode>,
              <InlineCode key="d">undefined</InlineCode>,
              <span key="desc">
                ID of an external element whose text labels the tablist via{' '}
                <InlineCode>aria-labelledby</InlineCode>. Use when a visible heading already describes
                the tab group. Takes precedence over <InlineCode>label</InlineCode> when both are set.
              </span>,
            ],
            [
              <span key="n"><InlineCode>compact</InlineCode><ReflectBadge /></span>,
              <InlineCode key="t">boolean</InlineCode>,
              <InlineCode key="d">false</InlineCode>,
              <span key="desc">
                Reduces the tab bar height and font size for dense layout contexts such as toolbars or secondary navigation.
              </span>,
            ],
          ]}
        />
      </section>

      {/* ── Slots ────────────────────────────────────────────────────────── */}
      <section id="slots" className="space-y-4">
        <SectionHeader
          title="Slots"
          description="io-tabs-bar uses a default slot to project tab trigger buttons."
        />
        <ApiTable
          columns={[
            { label: 'Slot', width: '160px' },
            { label: 'Expected content' },
          ]}
          rows={[
            [
              <span key="s" style={{ color: 'var(--io-text-secondary)', fontStyle: 'italic' }}>default</span>,
              <span key="d">
                One <InlineCode>{'<button type="button">'}</InlineCode> or{' '}
                <InlineCode>{'<a href="...">'}</InlineCode> per tab. Use{' '}
                <InlineCode>{'<a>'}</InlineCode> elements for router link patterns where each tab
                corresponds to a navigable route. The component assigns{' '}
                <InlineCode>role=&quot;tab&quot;</InlineCode>,{' '}
                <InlineCode>aria-selected</InlineCode>, and <InlineCode>tabindex</InlineCode> to
                each element automatically. Add the HTML <InlineCode>disabled</InlineCode> attribute
                to a button, or <InlineCode>aria-disabled=&quot;true&quot;</InlineCode> to an anchor,
                to prevent it from being activated.
              </span>,
            ],
          ]}
        />
        <CodeNote label="HTML">
{`<io-tabs-bar active-tab-index="0" label="Product sections">
  <button type="button">Overview</button>
  <button type="button">Details</button>
  <button type="button" disabled>Settings</button>
</io-tabs-bar>`}
        </CodeNote>
      </section>

      {/* ── Events ───────────────────────────────────────────────────────── */}
      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-tabs-bar."
        />
        <ApiTable
          columns={[
            { label: 'Event', width: '160px' },
            { label: 'Detail type', width: '200px' },
            { label: 'Bubbles', width: '100px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">update</InlineCode>,
              <InlineCode key="t">{'{ activeTabIndex: number }'}</InlineCode>,
              'No',
              'Fires when the user activates a different tab (via click, Enter, or Space). In router-driven apps, navigate to the corresponding route in this handler.',
            ],
          ]}
        />
        <CodeNote label="Usage">
{`// HTML + vanilla JS
<io-tabs-bar active-tab-index="0" label="Sections">
  <button type="button">Overview</button>
  <button type="button">Details</button>
</io-tabs-bar>

<script>
  document.querySelector('io-tabs-bar')
    .addEventListener('update', (e) => {
      // In a router app: router.push(tabRoutes[e.detail.activeTabIndex]);
      console.log('Active tab:', e.detail.activeTabIndex);
    });
</script>

// Next.js App Router (simplified)
'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useRef, useEffect } from 'react';

const TAB_ROUTES = ['/products/overview', '/products/details', '/products/settings'];

function ProductTabBar() {
  const router = useRouter();
  const pathname = usePathname();
  const ref = useRef<HTMLIoTabsBarElement>(null);

  const activeTabIndex = TAB_ROUTES.indexOf(pathname);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e: Event) => {
      const { activeTabIndex } = (e as CustomEvent<{ activeTabIndex: number }>).detail;
      router.push(TAB_ROUTES[activeTabIndex]);
    };
    el.addEventListener('update', handler);
    return () => el.removeEventListener('update', handler);
  }, [router]);

  return (
    <io-tabs-bar ref={ref} active-tab-index={activeTabIndex} label="Product sections">
      <button type="button">Overview</button>
      <button type="button">Details</button>
      <button type="button">Settings</button>
    </io-tabs-bar>
  );
}

// Angular (standalone) with Angular Router
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { IoTabsBar } from '@iodigital-com/components-angular';

const TAB_ROUTES = ['/products/overview', '/products/details', '/products/settings'];

@Component({
  selector: 'app-product-tab-bar',
  standalone: true,
  imports: [IoTabsBar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <io-tabs-bar [activeTabIndex]="activeTabIndex()" (update)="onUpdate($event)" label="Product sections">
      <button type="button">Overview</button>
      <button type="button">Details</button>
      <button type="button">Settings</button>
    </io-tabs-bar>
  \`,
})
export class ProductTabBarComponent {
  activeTabIndex = signal(0);

  constructor(private router: Router) {
    router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        const index = TAB_ROUTES.indexOf(ev.url);
        if (index >= 0) this.activeTabIndex.set(index);
      }
    });
  }

  onUpdate(e: CustomEvent<{ activeTabIndex: number }>) {
    this.router.navigate([TAB_ROUTES[e.detail.activeTabIndex]]);
  }
}`}
        </CodeNote>
      </section>

      {/* ── Methods ──────────────────────────────────────────────────────── */}
      <section id="methods" className="space-y-4">
        <SectionHeader
          title="Methods"
          description="Public @Method() calls exposed on the element reference."
        />
        <EmptyNote>
          <strong style={{ color: 'var(--io-text-primary)' }}>io-tabs-bar exposes no public methods.</strong>
          {' '}All interactions are driven by the <InlineCode>activeTabIndex</InlineCode> prop and the{' '}
          <InlineCode>update</InlineCode> event.
        </EmptyNote>
      </section>

      {/* ── CSS Custom Properties ─────────────────────────────────── */}
      <section id="css-custom-properties" className="space-y-4">
        <SectionHeader
          title="CSS Custom Properties"
          description="These tokens can be set on the host element (or any ancestor) to override component-specific defaults without breaking out of the design system."
        />
        <ApiTable
          columns={[
            { label: 'Property', width: '280px' },
            { label: 'Default', width: '220px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="n">--io-tabs-track-color</InlineCode>,
              <InlineCode key="d">var(--io-border)</InlineCode>,
              'Colour of the full-width baseline track line under the tab list.',
            ],
            [
              <InlineCode key="n">--io-tabs-indicator-color</InlineCode>,
              <InlineCode key="d">var(--io-color-primary)</InlineCode>,
              'Colour of the active-tab indicator border drawn below the selected tab.',
            ],
            [
              <InlineCode key="n">--io-tabs-icon-size</InlineCode>,
              <InlineCode key="d">var(--io-icon-size-sm)</InlineCode>,
              <span key="desc">
                Size of icon elements placed inside tab buttons. Note: this token is not yet
                registered in <InlineCode>docs/public-css-api.json</InlineCode> — treat as an
                internal token subject to change.
              </span>,
            ],
            [
              <InlineCode key="n">--io-tabs-icon-gap</InlineCode>,
              <InlineCode key="d">var(--io-space-1)</InlineCode>,
              <span key="desc">
                Gap between an icon and the tab label text. Note: registered in{' '}
                <InlineCode>docs/public-css-api.json</InlineCode> under{' '}
                <InlineCode>component: &quot;io-tabs&quot;</InlineCode> — applies to all tabs
                components including io-tabs-bar.
              </span>,
            ],
            [
              <InlineCode key="n">--io-tabs-bar-indicator-duration</InlineCode>,
              <InlineCode key="d">250ms</InlineCode>,
              'Duration of the sliding indicator animation when switching tabs. Set to 0ms to disable animation.',
            ],
            [
              <InlineCode key="n">--io-tabs-bar-indicator-easing</InlineCode>,
              <InlineCode key="d">ease-out</InlineCode>,
              'CSS easing function for the sliding indicator animation.',
            ],
          ]}
        />
      </section>

    </div>
  );
}
