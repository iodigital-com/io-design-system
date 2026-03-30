'use client';

import React, { useRef } from 'react';
import { Playground } from '@/components/playground/Playground';
import { ExamplesSectionHeader } from '@/components/examples/ExamplesPrimitives';
import type { FrameworkCode } from '@/models/framework';

// ── Framework code ────────────────────────────────────────────────────────────

const statesCode: FrameworkCode = {
  html: `<io-toast id="toast"></io-toast>

<script>
  const toast = document.getElementById('toast');
  // variant: 'neutral' | 'success' | 'error' | 'warning' | 'info'
  toast.addToast({ text: 'Changes saved.', variant: 'success' });
</script>`,
  react: `import { useRef } from 'react';

function App() {
  const toastRef = useRef(null);
  const notify = (text, variant) => toastRef.current?.addToast({ text, variant });

  return (
    <>
      <io-toast ref={toastRef} />
      <io-button onClick={() => notify('Changes saved.', 'success')}>Success</io-button>
      <io-button onClick={() => notify('Something went wrong.', 'error')}>Error</io-button>
    </>
  );
}`,
  angular: `import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IoToast, IoButton, ToastManager } from '@io-digital/components-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IoToast, IoButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: \`
    <io-toast></io-toast>
    <io-button (click)="notify('Changes saved.', 'success')">Success</io-button>
    <io-button (click)="notify('Something went wrong.', 'error')">Error</io-button>
  \`,
})
export class AppComponent {
  constructor(private toast: ToastManager) {}

  notify(text: string, variant: string) {
    this.toast.addToast({ text, variant });
  }
}`,
  vue: `<template>
  <io-toast ref="toast" />
  <io-button @click="notify('Changes saved.', 'success')">Success</io-button>
  <io-button @click="notify('Something went wrong.', 'error')">Error</io-button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const toast = ref<HTMLElement | null>(null);
const notify = (text: string, variant: string) =>
  (toast.value as any)?.addToast({ text, variant });
</script>`,
};

const durationCode: FrameworkCode = {
  html: `<script>
  // 2-second auto-dismiss
  toast.addToast({ text: 'Disappears in 2 s.', variant: 'info', duration: 2000 });

  // Persistent — user must dismiss manually
  toast.addToast({ text: 'Stays until closed.', variant: 'warning', duration: 0 });
</script>`,
  react: `// Pass duration (ms) to addToast — default is 6000.
// duration: 0 keeps the toast open until the user dismisses it.
toastRef.current?.addToast({ text: 'Disappears in 2 s.', variant: 'info', duration: 2000 });
toastRef.current?.addToast({ text: 'Stays until closed.', variant: 'warning', duration: 0 });`,
  angular: `this.toast.addToast({ text: 'Disappears in 2 s.', variant: 'info', duration: 2000 });
this.toast.addToast({ text: 'Stays until closed.', variant: 'warning', duration: 0 });`,
  vue: `(toast.value as any)?.addToast({ text: 'Disappears in 2 s.', variant: 'info', duration: 2000 });
(toast.value as any)?.addToast({ text: 'Stays until closed.', variant: 'warning', duration: 0 });`,
};

const multipleCode: FrameworkCode = {
  html: `<script>
  // Toasts are displayed one at a time in FIFO order
  toast.addToast({ text: 'First message.', variant: 'neutral' });
  toast.addToast({ text: 'Second message.', variant: 'success' });
  toast.addToast({ text: 'Third message.', variant: 'info' });
</script>`,
  react: `// Each addToast call produces an independent, dismissible toast.
// They are shown one at a time — the next appears after the current is dismissed.
toastRef.current?.addToast({ text: 'First message.', variant: 'neutral' });
toastRef.current?.addToast({ text: 'Second message.', variant: 'success' });
toastRef.current?.addToast({ text: 'Third message.', variant: 'info' });`,
  angular: `this.toast.addToast({ text: 'First message.', variant: 'neutral' });
this.toast.addToast({ text: 'Second message.', variant: 'success' });
this.toast.addToast({ text: 'Third message.', variant: 'info' });`,
  vue: `(toast.value as any)?.addToast({ text: 'First message.', variant: 'neutral' });
(toast.value as any)?.addToast({ text: 'Second message.', variant: 'success' });
(toast.value as any)?.addToast({ text: 'Third message.', variant: 'info' });`,
};

// ── Page ──────────────────────────────────────────────────────────────────────

const VARIANTS = [
  { label: 'Neutral', variant: 'neutral', text: 'This is a neutral notification.' },
  { label: 'Success', variant: 'success', text: 'Changes saved successfully.' },
  { label: 'Error', variant: 'error', text: 'Something went wrong. Please try again.' },
  { label: 'Warning', variant: 'warning', text: 'Your session will expire soon.' },
  { label: 'Info', variant: 'info', text: 'A new version is available.' },
] as const;

export default function IoToastExamplesPage() {
  const toastRef = useRef<any>(null);

  const showToast = (text: string, variant: string, duration?: number) => {
    toastRef.current?.addToast({ text, variant, duration });
  };

  return (
    <div className="space-y-12">
      <io-toast ref={toastRef} suppressHydrationWarning />

      <section className="space-y-4">
        <ExamplesSectionHeader title="States" />
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Five semantic variants — each uses a distinct colour and icon.
        </p>
        <Playground frameworkCode={statesCode}>
          <div className="flex flex-wrap justify-center gap-2">
            {VARIANTS.map(({ label, variant, text }) => (
              <io-button
                key={variant}
                variant="ghost"
                size="sm"
                onClick={() => showToast(text, variant)}
              >
                {label}
              </io-button>
            ))}
          </div>
        </Playground>
      </section>

      <section className="space-y-4">
        <ExamplesSectionHeader title="Custom duration" />
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Default duration is 6 000 ms. Pass <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}>duration</code> to override. A value of <code className="text-xs font-mono px-1 rounded" style={{ background: 'var(--io-bg-surface)', border: '1px solid var(--io-border)' }}>0</code> disables auto-dismiss.
        </p>
        <Playground frameworkCode={durationCode}>
          <div className="flex flex-wrap justify-center gap-2">
            <io-button variant="ghost" size="sm" onClick={() => showToast('Disappears in 2 seconds.', 'info', 2000)}>
              2 s duration
            </io-button>
            <io-button variant="ghost" size="sm" onClick={() => showToast('This toast stays until dismissed.', 'warning', 0)}>
              Persistent (duration: 0)
            </io-button>
          </div>
        </Playground>
      </section>

      <section className="space-y-4">
        <ExamplesSectionHeader title="Multiple messages" />
        <p className="text-sm" style={{ color: 'var(--io-text-secondary)', lineHeight: '1.6' }}>
          Toasts are displayed one at a time in FIFO order. Queued messages appear as each one is dismissed.
        </p>
        <Playground frameworkCode={multipleCode}>
          <io-button
            variant="ghost"
            size="sm"
            onClick={() => {
              showToast('First message.', 'neutral');
              showToast('Second message.', 'success');
              showToast('Third message.', 'info');
            }}
          >
            Show 3 toasts
          </io-button>
        </Playground>
      </section>
    </div>
  );
}
