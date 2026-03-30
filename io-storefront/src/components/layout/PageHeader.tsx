"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentStatus } from '@/sitemap';
import { StatusBadge } from '@/components/StatusBadge';

export type PageTab = {
  label: string;
  /** null = disabled/greyed tab (coming soon) */
  href: string | null;
};

type Props = {
  title: string;
  description?: string;
  tabs: PageTab[];
  /** Optional category chip rendered above the title, e.g. "Component" */
  category?: string;
  status?: ComponentStatus;
};

/**
 * PageHeader — component page header with title, description, and pill tab navigation.
 */
export function PageHeader({ title, description, tabs, category, status }: Props) {
  const pathname = usePathname();

  return (
    <div className="mb-0">
      {category && (
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-io-accent-text">
            {category}
          </span>
          <StatusBadge status={status} />
        </div>
      )}

      <h1
        className="font-bold leading-tight text-[var(--io-text-primary)] mb-4"
        style={{
          fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
          letterSpacing: "var(--io-heading-tracking-1, -0.025em)",
        }}
      >
        {title}
      </h1>

      {description && (
        <p className="text-[1.1rem] mb-6 text-io-text-secondary leading-[1.6]">
          {description}
        </p>
      )}

      {tabs.length > 0 && (
        <nav className="mb-8" aria-label="Component page tabs">
          <div className="inline-flex items-center bg-[var(--io-bg-raised)] border border-[var(--io-border)] rounded-xl p-1 gap-0.5">
            {tabs.map((tab) => {
              if (!tab.href) {
                return (
                  <span
                    key={tab.label}
                    title="Coming soon"
                    className="rounded-lg px-4 py-1.5 text-sm font-medium text-[var(--io-text-secondary)] opacity-40 cursor-not-allowed select-none"
                    aria-disabled="true"
                  >
                    {tab.label}
                  </span>
                );
              }

              const isActive = pathname === tab.href;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "rounded-lg px-4 py-1.5 text-sm io-decorative-transition transition-colors duration-[var(--io-duration-normal)]",
                    isActive
                      ? "font-semibold bg-[var(--io-color-primary)] text-white shadow-sm"
                      : "font-medium text-[var(--io-text-secondary)] hover:text-[var(--io-text-primary)]",
                  ].join(" ")}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}
