import type { Metadata } from 'next';

import { ComponentCard } from '@/components/ComponentCard';
import { PageHeader } from '@/components/layout/PageHeader';
import { getComponentItems } from '@/sitemap';

export const metadata: Metadata = {
  title: 'Components — io Design System',
  description: '19 production-ready Web Components — each ships with a live configurator, full API reference, and Angular, React, Vue, and HTML examples.',
  openGraph: {
    title: 'Components — io Design System',
    description: '19 production-ready Web Components — each ships with a live configurator, full API reference, and Angular, React, Vue, and HTML examples.',
    type: 'website',
  },
};

export default function ComponentsPage() {
  const components = getComponentItems();

  return (
    <div className="space-y-10">
      <PageHeader
        title="Components"
        description={`${components.length} Web Components — each ships with a live configurator, full API reference, and code samples in HTML, React, Angular, and Vue.`}
        tabs={[]}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {components.map((item) => (
          <ComponentCard
            key={item.slug}
            name={item.label}
            href={item.href}
            status={item.status}
            description={item.description}
            tag={item.slug}
          />
        ))}
      </div>
    </div>
  );
}
