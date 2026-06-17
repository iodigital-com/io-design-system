'use client';

import Link from 'next/link';
import { ApiTable, EmptyNote, InlineCode, MutableBadge, ReflectBadge, SectionHeader, CodeNote } from '@/components/api/ApiPrimitives';

export default function IoPaginationApiPage() {
  return (
    <div className="space-y-16">
      <section id="properties" className="space-y-4">
        <SectionHeader
          title="Properties"
          description="Public props for io-pagination. Reflecting props sync to host attributes; mutable props can change internally."
        />
        <ApiTable
          columns={[
            { label: 'Property', width: '170px' },
            { label: 'Attribute', width: '170px' },
            { label: 'Type', width: '180px' },
            { label: 'Default', width: '140px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <span key="property"><InlineCode>page</InlineCode><ReflectBadge /><MutableBadge /></span>,
              <InlineCode key="attribute">page</InlineCode>,
              <InlineCode key="type">number</InlineCode>,
              <InlineCode key="default">1</InlineCode>,
              <span key="description">Current 1-based active page.</span>,
            ],
            [
              <span key="property"><InlineCode>totalPages</InlineCode><ReflectBadge /><MutableBadge /></span>,
              <InlineCode key="attribute">total-pages</InlineCode>,
              <InlineCode key="type">number</InlineCode>,
              <InlineCode key="default">1</InlineCode>,
              <span key="description">
                Total number of pages (Pattern A). Mutable — normalised internally if a non-finite or negative value is supplied.
                Ignored when both <InlineCode>totalItems</InlineCode> and <InlineCode>perPage</InlineCode> are provided.
              </span>,
            ],
            [
              <InlineCode key="property">totalItems</InlineCode>,
              <InlineCode key="attribute">total-items</InlineCode>,
              <InlineCode key="type">number | undefined</InlineCode>,
              <InlineCode key="default">—</InlineCode>,
              <span key="description">
                Total number of items in the dataset (Pattern B). Provide together with <InlineCode>perPage</InlineCode> to
                let the component derive <InlineCode>totalPages</InlineCode> via <InlineCode>Math.ceil(totalItems / perPage)</InlineCode>.
                Takes precedence over an explicit <InlineCode>totalPages</InlineCode> prop when both patterns are set.
              </span>,
            ],
            [
              <InlineCode key="property">perPage</InlineCode>,
              <InlineCode key="attribute">per-page</InlineCode>,
              <InlineCode key="type">number | undefined</InlineCode>,
              <InlineCode key="default">—</InlineCode>,
              <span key="description">
                Items shown per page (Pattern B). Provide together with <InlineCode>totalItems</InlineCode> to
                let the component derive the page count. Values &le; 0 are treated as 1 to avoid division by zero.
              </span>,
            ],
            [
              <InlineCode key="property">prevLabel</InlineCode>,
              <InlineCode key="attribute">prev-label</InlineCode>,
              <InlineCode key="type">string</InlineCode>,
              <InlineCode key="default">&apos;Previous page&apos;</InlineCode>,
              <span key="description">aria-label for the previous button.</span>,
            ],
            [
              <InlineCode key="property">nextLabel</InlineCode>,
              <InlineCode key="attribute">next-label</InlineCode>,
              <InlineCode key="type">string</InlineCode>,
              <InlineCode key="default">&apos;Next page&apos;</InlineCode>,
              <span key="description">aria-label for the next button.</span>,
            ],
            [
              <span key="property"><InlineCode>compact</InlineCode><ReflectBadge /></span>,
              <InlineCode key="attribute">compact</InlineCode>,
              <InlineCode key="type">boolean</InlineCode>,
              <InlineCode key="default">false</InlineCode>,
              <span key="description">Dense layout for toolbar contexts. Hides page-number buttons and shows only prev/next controls.</span>,
            ],
          ]}
        />
      </section>

      <section id="events" className="space-y-4">
        <SectionHeader
          title="Events"
          description="Custom events emitted by io-pagination."
        />
        <ApiTable
          columns={[
            { label: 'Event', width: '180px' },
            { label: 'Detail type', width: '220px' },
            { label: 'Description' },
          ]}
          rows={[
            [
              <InlineCode key="event">change</InlineCode>,
              <InlineCode key="detail">{`{ page: number }`}</InlineCode>,
              <span key="description">Fires when the user navigates to a different 1-based page.</span>,
            ],
          ]}
        />
      </section>

      <section id="methods-slots" className="space-y-4">
        <SectionHeader
          title="Methods / Slots"
          description="Imperative APIs and slots exposed by io-pagination."
        />
        <EmptyNote>
          None. io-pagination is fully configured through props and emits change events for integration.
        </EmptyNote>
      </section>

      {/* ── Code examples ─────────────────────────────────────────────────── */}
      <section id="code-examples" className="space-y-4">
        <SectionHeader
          title="Code examples"
          description="Framework integration snippets for io-pagination. Pattern A uses an explicit page count; Pattern B derives it from item count and page size."
        />

        <p className="text-sm font-medium" style={{ color: 'var(--io-text-secondary)' }}>Pattern A — explicit page count</p>
        <CodeNote label="HTML">
{`<io-pagination page="1" total-pages="10"></io-pagination>

<script>
  document.querySelector('io-pagination')
    .addEventListener('change', (e) => {
      console.log('Page:', e.detail.page);
    });
</script>`}
        </CodeNote>

        <p className="text-sm font-medium mt-6" style={{ color: 'var(--io-text-secondary)' }}>Pattern B — data-driven (totalItems + perPage)</p>
        <CodeNote label="HTML">
{`<!-- 95 items, 10 per page → component derives totalPages = 10 -->
<io-pagination page="1" total-items="95" per-page="10"></io-pagination>

<script>
  document.querySelector('io-pagination')
    .addEventListener('change', (e) => {
      console.log('Page:', e.detail.page);
    });
</script>`}
        </CodeNote>
        <CodeNote label="React">
{`import { useState, useRef, useEffect } from 'react';

function App() {
  const [page, setPage] = useState(1);
  const paginationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = paginationRef.current;
    if (!el) return;
    const handler = (e: Event) =>
      setPage((e as CustomEvent<{ page: number }>).detail.page);
    el.addEventListener('change', handler);
    return () => el.removeEventListener('change', handler);
  }, []);

  // 95 items, 10 per page → component derives totalPages = 10
  return <io-pagination ref={paginationRef} page={page} total-items={95} per-page={10} />;
}`}
        </CodeNote>
        <CodeNote label="Angular">
{`import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { IoPagination } from '@iodigital-com/components-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IoPagination],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <io-pagination
      [page]="page()"
      [totalItems]="95"
      [perPage]="10"
      (change)="onPageChange($event)"
    />
  \`,
})
export class AppComponent {
  page = signal(1);

  onPageChange(e: CustomEvent<{ page: number }>) {
    this.page.set(e.detail.page);
  }
}`}
        </CodeNote>
        <CodeNote label="Vue">
{`<template>
  <!-- 95 items, 10 per page → component derives totalPages = 10 -->
  <io-pagination
    :page="page"
    :total-items="95"
    :per-page="10"
    @change="onPageChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const page = ref(1);
const onPageChange = (e: CustomEvent<{ page: number }>) => {
  page.value = e.detail.page;
};
</script>`}
        </CodeNote>
      </section>

      {/* ── CSS Custom Properties ─────────────────────────────────── */}
      <section id="css-custom-properties" className="space-y-4">
        <SectionHeader
          title="CSS Custom Properties"
          description="These tokens can be set on the host element (or any ancestor) to override component-specific defaults without breaking out of the design system."
        />
        <p className="text-sm leading-relaxed" style={{ color: 'var(--io-text-secondary)' }}>
          This component has no component-level override tokens. All visual properties are governed by global design tokens documented in the <Link href="/styles/tokens" className="underline">Token Explorer</Link>.
        </p>
      </section>
    </div>
  );
}
