'use client';

import { useEffect } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { PageHeader } from '@/components/layout/PageHeader';

export default function HelpFaqRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/help#faq');
  }, [router]);

  return (
    <div className="space-y-8">
      <PageHeader
        title="FAQ"
        description="The FAQ moved to the main Help page. Redirecting you now."
        tabs={[]}
      />

      <section
        className="rounded-lg border p-6 space-y-2"
        style={{ borderColor: 'var(--io-border)', background: 'var(--io-bg-raised)' }}
      >
        <p className="text-sm text-[var(--io-text-secondary)]">
          If you are not redirected automatically, use the link below.
        </p>
        <Link
          href="/help#faq"
          className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold"
          style={{ background: 'var(--io-color-primary-bg)', color: 'var(--io-color-primary)' }}
        >
          Go to Help FAQ
        </Link>
      </section>
    </div>
  );
}
