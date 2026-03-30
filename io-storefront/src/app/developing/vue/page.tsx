'use client';

import { type ReactNode } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';

function CodeBlock({ children }: { children: string }) {
  return (
    <pre
      className="rounded-lg p-4 text-sm overflow-x-auto"
      style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)', color: 'var(--io-text-secondary)' }}
    >
      {children}
    </pre>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-bold" style={{ color: 'var(--io-text-primary)' }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Note({ children }: { children: ReactNode }) {
  return (
    <div
      className="rounded-lg p-4 text-sm"
      style={{ background: 'var(--io-bg-raised)', border: '1px solid var(--io-border)', color: 'var(--io-text-secondary)', lineHeight: '1.6' }}
    >
      {children}
    </div>
  );
}

export default function DevelopingVuePage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Vue"
        description="Use io components in Vue 3 projects via the official Vue wrapper package. Works with Vite, Nuxt, and any SFC-based setup."
        tabs={[]}
      />

      <Section title="Installation">
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Install the core web components package alongside the Vue wrapper. Both are required.
        </p>
        <CodeBlock>{`npm install @io-digital/components @io-digital/components-vue`}</CodeBlock>
      </Section>

      <Section title="Register the loader">
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Call <code>defineCustomElements</code> once in your app entry point (typically <code>main.ts</code>) to register
          all io web components with the browser. This only needs to happen once per application.
        </p>
        <CodeBlock>{`// main.ts
import { createApp } from 'vue';
import { defineCustomElements } from '@io-digital/components/loader';
import App from './App.vue';

defineCustomElements();

createApp(App).mount('#app');`}</CodeBlock>
      </Section>

      <Section title="First render">
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Import named wrapper components from <code>@io-digital/components-vue</code> and use them inside any SFC.
          The wrappers handle prop forwarding and DOM event bridging transparently.
        </p>
        <CodeBlock>{`<!-- MyComponent.vue -->
<script setup lang="ts">
import { IoButton, IoBadge } from '@io-digital/components-vue';
</script>

<template>
  <div>
    <IoBadge variant="success">Live</IoBadge>
    <IoButton variant="solid">Get started</IoButton>
  </div>
</template>`}</CodeBlock>
      </Section>

      <Section title="Binding props">
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Reactive state flows from Vue to io components via standard <code>:prop</code> bindings. The wrappers
          reflect attribute changes to the underlying custom element automatically.
        </p>
        <CodeBlock>{`<script setup lang="ts">
import { ref } from 'vue';
import { IoButton } from '@io-digital/components-vue';

const loading = ref(false);

function submit() {
  loading.value = true;
  // ... async work
}
</script>

<template>
  <IoButton variant="solid" :disabled="loading" @click="submit">
    {{ loading ? 'Saving…' : 'Save' }}
  </IoButton>
</template>`}</CodeBlock>
      </Section>

      <Section title="Listening to events">
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          io components emit custom DOM events. The Vue wrappers expose these as native Vue events so you can
          use <code>@event-name</code> in templates or <code>onEventName</code> in <code>{'<script setup>'}</code>.
        </p>
        <CodeBlock>{`<script setup lang="ts">
import { ref } from 'vue';
import { IoInput } from '@io-digital/components-vue';

const email = ref('');

function onEmailChange(event: CustomEvent<{ value: string }>) {
  email.value = event.detail.value;
}
</script>

<template>
  <IoInput
    label="Email address"
    type="email"
    :value="email"
    @io-change="onEmailChange"
  />
  <p>Current value: {{ email }}</p>
</template>`}</CodeBlock>
        <Note>
          io components dispatch events with the <code>io-</code> prefix (e.g. <code>io-change</code>,{' '}
          <code>io-focus</code>, <code>io-blur</code>). Check the individual component&apos;s documentation for
          the full event list.
        </Note>
      </Section>

      <Section title="v-model support">
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          The Vue wrappers implement <code>modelValue</code> / <code>update:modelValue</code> so you can use
          the familiar <code>v-model</code> shorthand on form components.
        </p>
        <CodeBlock>{`<script setup lang="ts">
import { ref } from 'vue';
import { IoInput, IoSelect } from '@io-digital/components-vue';

const name = ref('');
const country = ref('');
</script>

<template>
  <IoInput label="Full name" v-model="name" />
  <IoSelect label="Country" v-model="country">
    <option value="nl">Netherlands</option>
    <option value="be">Belgium</option>
  </IoSelect>
</template>`}</CodeBlock>
      </Section>

      <Section title="SSR and client-only caveats">
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Web Components rely on browser APIs that are unavailable during server-side rendering. When using
          Nuxt or another SSR framework, wrap io components in a client-only boundary.
        </p>
        <CodeBlock>{`<!-- Nuxt: use the built-in <ClientOnly> wrapper -->
<template>
  <ClientOnly>
    <IoButton variant="solid">Server-safe button</IoButton>
  </ClientOnly>
</template>`}</CodeBlock>
        <CodeBlock>{`// Nuxt: or use the .client.vue suffix convention
// Rename your component file to IoButtonClient.client.vue
// Nuxt automatically restricts any component ending in .client.vue
// to client-side rendering — no extra configuration is required.`}</CodeBlock>
        <Note>
          Call <code>defineCustomElements</code> inside a <code>{'<ClientOnly>'}</code> wrapper or inside a
          plugin that checks <code>process.client</code> / <code>import.meta.client</code> before executing.
        </Note>
      </Section>

      <Section title="Testing with Vitest">
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Use <code>@vue/test-utils</code> to mount components in a jsdom environment. Custom elements are not
          rendered in jsdom, so stub them to keep tests focused on your own component logic.
        </p>
        <CodeBlock>{`// MyComponent.spec.ts
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import MyComponent from './MyComponent.vue';

describe('MyComponent', () => {
  it('emits the correct value on change', async () => {
    const wrapper = mount(MyComponent, {
      global: {
        // Stub io custom elements to avoid unknown element warnings
        stubs: { IoInput: true, IoButton: true },
      },
    });

    // Dispatch a CustomEvent directly on the stubbed element
    const input = wrapper.find('io-input-stub');
    input.element.dispatchEvent(
      new CustomEvent('io-change', {
        detail: { value: 'test@example.com' },
        bubbles: true,
      })
    );
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('update')?.[0]).toEqual(['test@example.com']);
  });
});`}</CodeBlock>
      </Section>

      <Section title="Troubleshooting">
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--io-text-primary)' }}>
              Unknown custom element warnings in the console
            </p>
            <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
              Ensure <code>defineCustomElements()</code> is called before <code>createApp().mount()</code>.
              If you see this only in tests, add stubs via <code>global.stubs</code> in your mount options.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--io-text-primary)' }}>
              Events not firing in templates
            </p>
            <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
              Custom element events use the <code>io-</code> prefix. Use <code>@io-change</code> rather than
              the plain <code>@change</code> that native inputs emit. Consult the component API docs for the
              exact event names.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--io-text-primary)' }}>
              Hydration mismatch errors in Nuxt
            </p>
            <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
              Wrap io components in <code>{'<ClientOnly>'}</code> to prevent the server from attempting to render
              custom elements that the client must upgrade. This resolves most hydration mismatches.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--io-text-primary)' }}>
              TypeScript property errors on wrapper components
            </p>
            <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
              The wrappers in <code>@io-digital/components-vue</code> are generated with full TypeScript types.
              Make sure your <code>tsconfig.json</code> includes <code>node_modules/@io-digital</code> in its
              type resolution paths and that you are on Vue 3.4 or later.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Next steps">
        <ul className="text-sm space-y-2" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          <li>
            Browse the <strong style={{ color: 'var(--io-text-primary)' }}>Components</strong> section for live
            examples and a full API reference for each io component.
          </li>
          <li>
            Explore the <strong style={{ color: 'var(--io-text-primary)' }}>Vanilla JS</strong> guide if you need
            to use io elements without the wrapper layer.
          </li>
          <li>
            Check the <strong style={{ color: 'var(--io-text-primary)' }}>Tokens</strong> section to customise
            colours, spacing, and typography through CSS custom properties.
          </li>
        </ul>
      </Section>
    </div>
  );
}
