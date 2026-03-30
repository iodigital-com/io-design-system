'use client';

import { ComponentCard } from '@/components/ComponentCard';
import { getComponentItems } from '@/sitemap';

type RelatedComponentsProps = {
  currentSlug: string;
};

export function RelatedComponents({ currentSlug }: RelatedComponentsProps) {
  const componentItems = getComponentItems();
  const current = componentItems.find((item) => item.slug === currentSlug);

  if (!current) {
    return null;
  }

  const relatedItems = current.related
    .map((slug) => componentItems.find((item) => item.slug === slug))
    .filter((item): item is (typeof componentItems)[number] => Boolean(item))
    .slice(0, 3);

  if (relatedItems.length === 0) {
    return null;
  }

  return (
    <section className="mt-10 space-y-4">
      <h2 className="text-lg font-semibold text-[var(--io-text-primary)]">Related components</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {relatedItems.map((item) => (
          <ComponentCard
            key={item.slug}
            name={item.label}
            description={item.description}
            href={item.href}
            status={item.status}
          />
        ))}
      </div>
    </section>
  );
}