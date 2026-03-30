'use client';

import { ComponentCard } from '@/components/ComponentCard';
import { PageHeader } from '@/components/layout/PageHeader';
import { getComponentItems } from '@/sitemap';

export default function ComponentsReadyPage() {
  const allComponents = getComponentItems();
  const stable = allComponents.filter((c) => c.status === 'stable');
  const beta = allComponents.filter((c) => c.status === 'beta');

  return (
    <div className="space-y-10">
      <PageHeader
        title="Components Ready"
        description="An at-a-glance view of every io component and its current availability. Stable components are production-ready; beta components are functional but their API may still evolve."
        tabs={[]}
      />

      {stable.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
            Stable
          </h2>
          <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
            These components follow semantic versioning — breaking changes will only land in major releases.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {stable.map((component) => (
              <ComponentCard
                key={component.slug}
                name={component.label}
                description={component.description}
                href={component.href}
                status={component.status}
              />
            ))}
          </div>
        </section>
      )}

      {beta.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
            Beta
          </h2>
          <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
            Beta components are available for use but may receive API refinements before they graduate to stable.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {beta.map((component) => (
              <ComponentCard
                key={component.slug}
                name={component.label}
                description={component.description}
                href={component.href}
                status={component.status}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
