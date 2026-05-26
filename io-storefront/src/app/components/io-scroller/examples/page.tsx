'use client';

import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';

export default function IoScrollerExamplesPage() {
  const chipLabels = [
    'All',
    'Technology',
    'Design',
    'Engineering',
    'Product',
    'Strategy',
    'Marketing',
    'Research',
    'Data Science',
    'Infrastructure',
  ];

  return (
    <div className="space-y-10">

      <section>
        <ExamplesSectionHeader title="Horizontal chip bar — overflowing filter chips with left/right fades" />
        <div
          className="rounded-lg p-4"
          style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)', maxWidth: '480px' }}
        >
          <io-scroller orientation="horizontal">
            <div style={{ display: 'flex', gap: 'var(--io-space-2)', padding: '2px' }}>
              {chipLabels.map((label) => (
                <io-tag key={label} style={{ flexShrink: '0' }}>
                  {label}
                </io-tag>
              ))}
            </div>
          </io-scroller>
        </div>
      </section>

      <section>
        <ExamplesSectionHeader title="Vertical scroll region — long list with top/bottom fades" />
        <div
          className="rounded-lg p-4"
          style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)', maxWidth: '320px' }}
        >
          <io-scroller
            orientation="vertical"
            label="Navigation links"
            style={{ height: '160px', display: 'block' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--io-space-2)' }}>
              {['Home', 'About', 'Products', 'Pricing', 'Blog', 'Careers', 'Contact', 'Help', 'Status'].map(
                (item) => (
                  <io-link key={item} href="#">
                    {item}
                  </io-link>
                ),
              )}
            </div>
          </io-scroller>
        </div>
      </section>

      <section>
        <ExamplesSectionHeader title="With native scrollbar — show-scrollbar=true for users who prefer native controls" />
        <div
          className="rounded-lg p-4"
          style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)', maxWidth: '480px' }}
        >
          <io-scroller orientation="horizontal" show-scrollbar>
            <div style={{ display: 'flex', gap: 'var(--io-space-3)', padding: '4px 2px 12px' }}>
              {chipLabels.map((label) => (
                <io-tag key={label} style={{ flexShrink: '0' }}>
                  {label}
                </io-tag>
              ))}
            </div>
          </io-scroller>
        </div>
      </section>

      <section>
        <ExamplesSectionHeader title="Button group strip — horizontal row of action buttons" />
        <div
          className="rounded-lg p-4"
          style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)', maxWidth: '400px' }}
        >
          <io-scroller orientation="horizontal" label="Action buttons">
            <div style={{ display: 'flex', gap: 'var(--io-space-2)', padding: '2px' }}>
              {['Edit', 'Duplicate', 'Archive', 'Share', 'Export', 'Delete', 'History', 'Settings'].map(
                (action) => (
                  <io-button key={action} variant="ghost" style={{ flexShrink: '0' }}>
                    {action}
                  </io-button>
                ),
              )}
            </div>
          </io-scroller>
        </div>
      </section>

    </div>
  );
}
