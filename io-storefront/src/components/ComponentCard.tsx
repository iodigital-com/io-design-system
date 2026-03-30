'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { StatusBadge } from '@/components/StatusBadge';
import type { ComponentStatus } from '@/sitemap';

type ComponentCardProps = {
  name: string;
  href: string;
  status?: ComponentStatus;
  children: ReactNode;
};

export function ComponentCard({ name, href, status, children }: ComponentCardProps) {
  return (
    <Link
      href={href}
      aria-label={`${name} – view configurator`}
      className="flex flex-col rounded-xl border border-[var(--io-border)] bg-[var(--io-bg-raised)] overflow-hidden transition-colors hover:bg-[var(--io-bg-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--io-border-focus)]"
    >
      <div className="flex-1 flex items-center justify-center p-6 min-h-[120px] pointer-events-none select-none">
        {children}
      </div>
      <div className="px-4 py-3 border-t border-[var(--io-border)] flex items-center gap-2">
        <span className="text-sm font-medium text-[var(--io-text-primary)]">{name}</span>
        <StatusBadge status={status} />
      </div>
    </Link>
  );
}
