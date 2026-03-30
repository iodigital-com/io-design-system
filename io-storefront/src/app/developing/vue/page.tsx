'use client';

import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="space-y-4">
      <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre
      className="rounded-lg p-4 text-sm overflow-x-auto"
      style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)', color: 'var(--io-text-secondary)' }}
    >
      <code>{children}</code>
    </pre>
  );
}

export default function DevelopingVuePage() {
  return (
    <div className="space-y-12">
      <PageHeader
        title="Vue"
        description="Use io components in Vue 3 applications via the Vue wrapper package. Components are registered globally or per-component and work with the Composition API."
        tabs={[]}
      />

      <Section id="install" title="Install">
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Install the core components package and the Vue wrapper.
        </p>
        <CodeBlock>{`npm install @io-digital/components @io-digital/components-vue`}</CodeBlock>
      </Section>

      <Section id="styles" title="Load styles">
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Import the component stylesheet in <code>main.ts</code> before mounting your application.
        </p>
        <CodeBlock>{`// main.ts
import '@io-digital/components/dist/io-components/io-components.css';
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).mount('#app');`}</CodeBlock>
      </Section>

      <Section id="usage" title="Basic usage">
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Import wrapper components from <code>@io-digital/components-vue</code> and use them directly in your template. Props are typed and events use Vue&apos;s standard emit syntax.
        </p>
        <CodeBlock>{`<script setup lang="ts">
import { IoButton, IoInput, IoBadge } from '@io-digital/components-vue';
</script>

<template>
  <IoBadge variant="blue">New</IoBadge>
  <IoInput label="Email" placeholder="name@example.com" />
  <IoButton color="blue" variant="solid" @io-click="onSubmit">
    Submit
  </IoButton>
</template>`}</CodeBlock>
      </Section>

      <Section id="events" title="Listening to events">
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          io components emit custom events prefixed with <code>io</code>. In Vue templates, listen with <code>@io-event-name</code> — for example, <code>@io-change</code> for <code>ioChange</code>.
        </p>
        <CodeBlock>{`<script setup lang="ts">
import { ref } from 'vue';
import { IoCheckbox } from '@io-digital/components-vue';

const subscribed = ref(false);

function onToggle(event: CustomEvent<{ checked: boolean }>) {
  subscribed.value = event.detail.checked;
}
</script>

<template>
  <IoCheckbox
    label="Subscribe to updates"
    :checked="subscribed"
    @io-change="onToggle"
  />
</template>`}</CodeBlock>
      </Section>

      <Section id="requirements" title="Requirements">
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Vue 3.4 or later is required. The wrapper package ships as an ES module and is compatible with Vite, Nuxt 3, and any Vue 3 build setup.
        </p>
      </Section>

    </div>
  );
}
